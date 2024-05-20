CREATE OR REPLACE PROCEDURE connect_stations(
    IN station1_name VARCHAR(32),
    IN station2_name VARCHAR(32),
    IN max_speed INTEGER
)
    LANGUAGE plpgsql
AS $$
DECLARE
    station1_id INTEGER;
    station2_id INTEGER;
    lat1 NUMERIC(9,6);
    lon1 NUMERIC(9,6);
    lat2 NUMERIC(9,6);
    lon2 NUMERIC(9,6);
    distance INTEGER;
    tube1_id INTEGER;
    tube2_id INTEGER;
    rau_lat_step NUMERIC(9, 7);
    rau_lon_step NUMERIC(9, 7);
BEGIN
    -- CHECK PARAMETERS
    IF station1_name = station2_name THEN
        RAISE EXCEPTION 'The stations must be different';
    END IF;
    IF max_speed <= 0 THEN
        RAISE EXCEPTION 'The maximum speed must be greater than 0';
    END IF;

    -- SELECT STATIONS DATA
    SELECT station_id, latitude, longitude INTO station1_id, lat1, lon1
    FROM stations WHERE name = station1_name;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Station % not found', station1_name;
    END IF;
    SELECT station_id, latitude, longitude INTO station2_id, lat2, lon2
    FROM stations WHERE name = station2_name;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Station % not found', station2_name;
    END IF;

    -- CALCULATE DISTANCE
    distance = acos(sin(radians(lat1)) * sin(radians(lat2)) +
                    cos(radians(lat1)) * cos(radians(lat2)) *
                    cos(radians(lon2 - lon1))) * 6371;

    -- INSERT TUBES
    INSERT INTO tubes (name, length, max_speed, estimated_travel_time, starting_station_id, ending_station_id)
    VALUES (station1_name || ' - ' || station2_name, distance, max_speed,
            (distance * 3600 / max_speed * '1 second'::interval)::time, station1_id, station2_id) RETURNING tube_id INTO tube1_id;
    INSERT INTO tubes (name, length, max_speed, estimated_travel_time, starting_station_id, ending_station_id)
    VALUES (station2_name || ' - ' || station1_name, distance, max_speed,
            (distance * 3600 / max_speed * '1 second'::interval)::time, station2_id, station1_id) RETURNING tube_id INTO tube2_id;

    -- UPDATE PLATFORM NUMBERS
    UPDATE stations SET platforms = platforms + 1
    WHERE station_id IN (station1_id, station2_id);

    -- ADD RAU
    rau_lat_step = (lat2 - lat1) / 10;
    rau_lon_step = (lon2 - lon1) / 10;

    FOR i IN 0..10 LOOP
        INSERT INTO remote_access_units (latitude, longitude, tube_id, environmental_conditions, health_status)
        VALUES (lat1 + rau_lat_step * i, lon1 + rau_lon_step * i, tube1_id, 'GOOD', 'OK');
        INSERT INTO remote_access_units (latitude, longitude, tube_id, environmental_conditions, health_status)
        VALUES (lat1 + rau_lat_step * i, lon1 + rau_lon_step * i, tube2_id, 'GOOD', 'OK');
    END LOOP;
END
$$;

CREATE OR REPLACE PROCEDURE add_capsule(
    IN capsule_model varchar(32),
    IN capsule_producer varchar(32),
    IN capsule_type varchar(32),
    IN capsule_servicing_depot_id integer
)
    LANGUAGE plpgsql
AS $$
DECLARE
    capsule_seats INTEGER;
    capsule_cargo_space INTEGER;
BEGIN
    -- CHECK PARAMETERS
    IF capsule_model IS NULL OR capsule_producer IS NULL OR capsule_type IS NULL THEN
        RAISE EXCEPTION 'All parameters must be not null';
    END IF;

    -- SET CAPSULE PARAMETERS BASED ON IT'S TYPE
    IF capsule_type = 'Passenger' THEN
        capsule_seats = 40;
        capsule_cargo_space = 200;
    ELSIF capsule_type = 'Hybrid' THEN
        capsule_seats = 28;
        capsule_cargo_space = 3000;
    ELSIF capsule_type = 'Cargo' THEN
        capsule_seats = 4;
        capsule_cargo_space = 10000;
    ELSE
        RAISE EXCEPTION 'Invalid capsule type';
    END IF;

    -- INSERT CAPSULE
    INSERT INTO capsules (model, producer, type, seats, cargo_space, servicing_depot_id)
    VALUES (capsule_model, capsule_producer, capsule_type, capsule_seats, capsule_cargo_space, capsule_servicing_depot_id);
END;
$$;

CREATE OR REPLACE PROCEDURE add_schedule (
    IN station_names VARCHAR(32)[],
    IN starting_time TIME,
    IN capsule_type VARCHAR(16),
    IN both_ways BOOLEAN DEFAULT TRUE
)
LANGUAGE plpgsql
AS $$
DECLARE
    picked_capsule_id INTEGER;
    station_ids INTEGER[];
    curr_station_id INTEGER;
    station_count INTEGER;
    travel_times TIME[];
    travel_time TIME;
    departure_times TIME[];
    arrival_times TIME[];
    last_schedule_id INTEGER;
BEGIN
    -- CHECK PARAMETERS
    IF station_names IS NULL OR array_length(station_names, 1) < 2 THEN
        RAISE EXCEPTION 'At least two cities must be provided';
    END IF;

    -- CHECK IF TYPE IS CORRECT
    IF capsule_type NOT IN ('Passenger', 'Hybrid', 'Cargo') THEN
        RAISE EXCEPTION 'Invalid capsule type';
    END IF;

    -- SELECT station IDS
    station_count = array_length(station_names, 1);
    FOR i IN 1..station_count LOOP
        SELECT station_id INTO curr_station_id FROM stations WHERE name = station_names[i];
        IF NOT FOUND THEN
            RAISE EXCEPTION 'station % not found', station_names[i];
        END IF;
        station_ids = station_ids || curr_station_id;
    END LOOP;

    -- CHECK IF STATIONS ARE CONNECTED BY TUBES + GET TIMES
    FOR i IN 1..station_count - 1 LOOP
        SELECT date_trunc('minute', estimated_travel_time + interval '1 minute') INTO travel_time FROM tubes
        WHERE starting_station_id = station_ids[i] AND ending_station_id = station_ids[i + 1];
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Stations % and % are not connected', station_names[i], station_names[i + 1];
        END IF;
        travel_times = travel_times || travel_time;
    end loop;

    travel_time = starting_time;
    -- CONSTRUCT DEPARTURE AND ARRIVAL TIMES
    FOR i in 1..station_count - 1 LOOP
        departure_times = departure_times || travel_time;
        -- CHECK FOR COLLISION
        SELECT schedule_id INTO curr_station_id FROM schedule WHERE current_station_id = station_ids[i]
        AND next_station_id = station_ids[i + 1] AND departure_time = departure_times[i];
        FOR _ in 1..1440 LOOP -- NUMBER OF MINUTES IN A DAY
            EXIT WHEN curr_station_id IS NULL;
            -- MOVE DEPARTURE TIME BY 1 MINUTE
            departure_times[i] = departure_times[i] + interval '1 minute';
            SELECT schedule_id INTO curr_station_id FROM schedule WHERE current_station_id = station_ids[i]
            AND next_station_id = station_ids[i + 1] AND departure_time = departure_times[i];
        END LOOP;
        IF curr_station_id IS NOT NULL THEN
            RAISE EXCEPTION 'Unable to find free time slot for section % - %', station_names[i], station_names[i + 1];
        END IF;
        -- ADD ARRIVAL TIME
        arrival_times = arrival_times || (departure_times[i] + travel_times[i]::interval);
        -- UPDATE TRAVEL TIME
        travel_time = arrival_times[i] + interval '1 minute';
    END LOOP;

    IF both_ways IS TRUE THEN
        FOR i in 1..station_count - 1 LOOP
            departure_times = departure_times || travel_time;
            -- CHECK FOR COLLISION
            SELECT schedule_id INTO curr_station_id FROM schedule WHERE current_station_id = station_ids[i + 1]
                                                                    AND next_station_id = station_ids[i] AND departure_time = departure_times[i + station_count - 1];
            FOR _ in 1..1440 LOOP  -- NUMBER OF MINUTES IN A DAY
                    EXIT WHEN curr_station_id IS NULL;
                    -- MOVE DEPARTURE TIME BY 1 MINUTE
                    departure_times[i + station_count - 1] = departure_times[i + station_count - 1] + interval '1 minute';
                    SELECT schedule_id INTO curr_station_id FROM schedule WHERE current_station_id = station_ids[i + 1]
                                                                            AND next_station_id = station_ids[i] AND departure_time = departure_times[i + station_count - 1];
                END LOOP;
            IF curr_station_id IS NOT NULL THEN
                RAISE EXCEPTION 'Unable to find free time slot for section % - %', station_names[i + 1], station_names[i];
            END IF;
            -- ADD ARRIVAL TIME
            arrival_times = arrival_times || (departure_times[i + station_count - 1] + travel_times[station_count - i]::interval);
            -- UPDATE TRAVEL TIME
            travel_time = arrival_times[i + station_count - 1] + interval '1 minute';
        END LOOP;
    end if;

    -- SELECT CAPSULE (PRIORITIZE IN USE)
    SELECT referred_capsule_id INTO picked_capsule_id FROM schedule s1 JOIN capsules ON referred_capsule_id = capsule_id
    WHERE type = capsule_type AND NOT EXISTS (
        SELECT 1 FROM schedule s2 WHERE s2.referred_capsule_id = s1.referred_capsule_id
            AND ((s2.departure_time BETWEEN departure_times[1] AND arrival_times[array_length(arrival_times, 1)]) -- DEPARTS IN GIVEN TIME PERIOD
            OR (s2.arrival_time BETWEEN departure_times[1] AND arrival_times[array_length(arrival_times, 1)])   -- ARRIVES IN GIVEN TIME PERIOD
            OR (s2.departure_time <= departure_times[1] AND s2.arrival_time >= arrival_times[array_length(arrival_times, 1)])) -- TRAVELS IN GIVEN TIME PERIOD
    ) LIMIT 1;

    -- IF THERE ARE NO USED CAPSULES THAT CAN BE APPLIED, CHECK FOR FREE CAPSULE
    IF NOT FOUND THEN
        -- CHECK FOR FREE CAPSULE
        SELECT capsule_id INTO picked_capsule_id FROM capsules
        WHERE type = capsule_type AND status = 'Operational';
        IF NOT FOUND THEN
            RAISE EXCEPTION 'No free capsule of type % found', capsule_type;
        END IF;
        -- UPDATE CAPSULE STATUS
        UPDATE capsules SET status = 'In use' WHERE capsule_id = picked_capsule_id;
    end if;

    -- INSERT SCHEDULE
    last_schedule_id = NULL;
    FOR i IN 1..station_count - 1 LOOP
        INSERT INTO schedule (departure_time, arrival_time, referred_capsule_id, current_station_id, next_station_id, previous_schedule_id)
        values (departure_times[i], arrival_times[i], picked_capsule_id, station_ids[i], station_ids[i + 1], last_schedule_id)
        RETURNING schedule_id INTO last_schedule_id;
    END LOOP;

    -- ANALOGICALLY CREATE RETURN TRIP
    IF both_ways IS TRUE THEN
        last_schedule_id = NULL;
        FOR i IN 1..station_count - 1 LOOP
            INSERT INTO schedule (departure_time, arrival_time, referred_capsule_id, current_station_id, next_station_id, previous_schedule_id)
            values (departure_times[i + station_count - 1], arrival_times[i + station_count - 1], picked_capsule_id, station_ids[station_count - i + 1], station_ids[station_count - i], last_schedule_id)
            RETURNING schedule_id INTO last_schedule_id;
        END LOOP;
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE finish_repair(
    IN the_capsule_id INTEGER
)
    LANGUAGE plpgsql
AS $$
BEGIN
    -- CHECK IF CAPSULE EXISTS
    IF NOT EXISTS (SELECT 1 FROM capsules WHERE capsule_id = the_capsule_id) THEN
        RAISE EXCEPTION 'Capsule with id % not found', the_capsule_id;
    END IF;

    -- CHECK IF CAPSULE IS IN REPAIR
    IF NOT EXISTS (SELECT 1 FROM capsules WHERE capsule_id = the_capsule_id AND status = 'Under repair') THEN
        RAISE EXCEPTION 'Capsule with id % is not in repair', the_capsule_id;
    END IF;

    -- UPDATE CAPSULE STATUS
    UPDATE capsules SET status = 'Operational' WHERE capsule_id = the_capsule_id;
    UPDATE repairs_history SET date_end = current_date WHERE referred_capsule_id = the_capsule_id AND date_end IS NULL;
END;
$$;

CREATE OR REPLACE PROCEDURE start_repair(
    IN the_capsule_id INTEGER,
    IN repairer_id INTEGER DEFAULT NULL
)
    LANGUAGE plpgsql
AS $$
DECLARE
    the_capsule_status VARCHAR(16);
    the_capsule_type VARCHAR(16);
    replacement_capsule_id INTEGER;
BEGIN
    -- CHECK CAPSULE STATUS
    SELECT status INTO the_capsule_status FROM capsules WHERE capsule_id = the_capsule_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Capsule with id % not found', the_capsule_id;
    END IF;

    IF the_capsule_status = 'Under repair' THEN
        RAISE EXCEPTION 'Capsule with id % is already under repair', the_capsule_id;
    END IF;

    -- IF CAPSULE IS IN USE, CHECK FOR REPLACEMENT CAPSULE (HAS TO BE FREE)
    IF the_capsule_status = 'In use' THEN
        SELECT type INTO the_capsule_type FROM capsules WHERE capsule_id = the_capsule_id;
        SELECT capsule_id INTO replacement_capsule_id FROM capsules
        WHERE type = the_capsule_type AND status = 'Operational' LIMIT 1;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'No replacement capsule of type % found', the_capsule_type;
        END IF;
        -- UPDATE REPLACEMENT CAPSULE STATUS
        UPDATE capsules SET status = 'In use' WHERE capsule_id = replacement_capsule_id;
        -- UPDATE SCHEDULE
        UPDATE schedule SET referred_capsule_id = replacement_capsule_id WHERE referred_capsule_id = the_capsule_id;
    END IF;

    -- IF REPAIRER ID IS NULL, ASSIGN THE CAPSULE SERVICING DEPOT
    IF repairer_id IS NULL THEN
        SELECT servicing_depot_id INTO repairer_id FROM capsules WHERE capsule_id = the_capsule_id;
    END IF;

    -- UPDATE CAPSULE STATUS
    UPDATE capsules SET status = 'Under repair' WHERE capsule_id = the_capsule_id;
    INSERT INTO repairs_history (referred_capsule_id, date_start, performing_depot_id)
    VALUES (the_capsule_id, current_date, repairer_id);
END;
$$;

CREATE OR REPLACE PROCEDURE create_trip_history (
    IN referred_schedule_id INTEGER,
    IN sold_tickets INTEGER,
    IN weight_of_cargo INTEGER,
    IN cargo_content TEXT,
    IN trip_end_date TIMESTAMP DEFAULT current_timestamp
)
    LANGUAGE plpgsql
AS $$
DECLARE
    the_capsule_id INTEGER;
    the_departure_time TIME;
    the_arrival_time TIME;
    the_start_date TIMESTAMP;
    the_end_date TIMESTAMP;
    the_start_station_id INTEGER;
    the_end_station_id INTEGER;
    the_tube_id INTEGER;
BEGIN
    -- GET CAPSULE ID
    SELECT referred_capsule_id, departure_time, arrival_time, current_station_id, next_station_id
    INTO the_capsule_id, the_departure_time, the_arrival_time, the_start_station_id, the_end_station_id
    FROM schedule WHERE schedule_id = referred_schedule_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Schedule with id % not found', referred_schedule_id;
    END IF;

    -- GET TUBE ID
    SELECT tube_id INTO the_tube_id FROM tubes WHERE starting_station_id = the_start_station_id AND ending_station_id = the_end_station_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Tube between stations % and % not found', the_start_station_id, the_end_station_id;
    END IF;

    -- CHECK IF NUMBER OF TICKETS SOLD IS VALID
    IF sold_tickets < 0 THEN
        RAISE EXCEPTION 'Number of sold tickets must be greater or equal to 0';
    END IF;
    IF sold_tickets > (SELECT seats FROM capsules WHERE capsule_id = the_capsule_id) THEN
        RAISE EXCEPTION 'Number of sold tickets exceeds the number of seats in the capsule';
    END IF;

    -- CHECK IF WEIGHT OF CARGO IS VALID
    IF weight_of_cargo < 0 THEN
        RAISE EXCEPTION 'Weight of cargo must be greater or equal to 0';
    END IF;
    IF weight_of_cargo > (SELECT cargo_space FROM capsules WHERE capsule_id = the_capsule_id) THEN
        RAISE EXCEPTION 'Weight of cargo exceeds the cargo space in the capsule';
    END IF;

    -- SET TIMESTAMPS
    the_end_date = date_trunc('day', trip_end_date) + the_arrival_time::interval;
    IF the_arrival_time > the_departure_time THEN
        the_start_date = date_trunc('day', trip_end_date) + the_departure_time::interval;
    ELSE
        the_start_date = date_trunc('day', trip_end_date - interval '1 day') + the_departure_time::interval;
    END IF;

    -- INSERT TRIP HISTORY
    INSERT INTO trips_history (date_start, date_end, tickets_sold, cargo, cargo_weight, referred_capsule_id, referred_tube_id)
    VALUES (the_start_date, the_end_date, sold_tickets, cargo_content, weight_of_cargo, the_capsule_id, the_tube_id);
END;
$$;

-- Passenger flow function + type
CREATE TYPE passenger_flow_type AS (
    trips_in INTEGER,
    trips_out INTEGER,
    passengers_in INTEGER,
    passengers_out INTEGER
);

CREATE OR REPLACE FUNCTION passenger_flow(
    IN the_station_id INTEGER,
    IN start_date TIMESTAMP,
    IN end_date TIMESTAMP
)
    RETURNS passenger_flow_type
    LANGUAGE plpgsql
AS $$
    DECLARE
        result passenger_flow_type;
    BEGIN
        -- COUNT TRIPS IN AND TICKETS SOLD IN
        SELECT COUNT(*), SUM(tickets_sold) INTO result.trips_in, result.passengers_in FROM trips_history
        WHERE referred_tube_id IN (SELECT tube_id FROM tubes WHERE ending_station_id = the_station_id)
        AND date_end BETWEEN start_date AND end_date;

        -- COUNT TRIPS OUT AND TICKETS SOLD OUT
        SELECT COUNT(*), SUM(tickets_sold) INTO result.trips_out, result.passengers_out FROM trips_history
        WHERE referred_tube_id IN (SELECT tube_id FROM tubes WHERE starting_station_id = the_station_id)
        AND date_start BETWEEN start_date AND end_date;

        RETURN result;
    end;
$$;

-- Average passenger count on a given tube
CREATE OR REPLACE FUNCTION average_passenger_count(
    IN the_starting_station_id INTEGER,
    IN the_ending_station_id INTEGER,
    IN start_date TIMESTAMP,
    IN end_date TIMESTAMP,
    IN both_ways BOOLEAN DEFAULT TRUE
)
    RETURNS NUMERIC
    LANGUAGE plpgsql
AS $$
    DECLARE
        the_tube_id INTEGER;
        other_way_average NUMERIC;
        result NUMERIC;
    BEGIN
        -- GET TUBE ID
        SELECT tube_id INTO the_tube_id FROM tubes WHERE starting_station_id = the_starting_station_id AND ending_station_id = the_ending_station_id;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Tube between stations % and % not found', the_starting_station_id, the_ending_station_id;
        END IF;

        -- COUNT AVERAGE PASSENGER COUNT
        SELECT AVG(tickets_sold) INTO result FROM trips_history WHERE referred_tube_id = the_tube_id
        AND date_start BETWEEN start_date AND end_date;

        IF both_ways IS TRUE THEN
            -- UPDATE TUBE ID
            SELECT tube_id INTO the_tube_id FROM tubes WHERE starting_station_id = the_ending_station_id AND ending_station_id = the_starting_station_id;
            IF NOT FOUND THEN
                RAISE EXCEPTION 'Tube between stations % and % not found', the_ending_station_id, the_starting_station_id;
            END IF;

            -- COUNT AVERAGE PASSENGER COUNT
            SELECT AVG(tickets_sold) INTO other_way_average FROM trips_history WHERE referred_tube_id = the_tube_id
            AND date_start BETWEEN start_date AND end_date;

            result = (result + other_way_average) / 2;
        END IF;

        RETURN result;
    end;
$$;
