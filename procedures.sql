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
        INSERT INTO remote_access_units (latitude, longitude, tube_id)
        VALUES (lat1 + rau_lat_step * i, lon1 + rau_lon_step * i, tube1_id);
        INSERT INTO remote_access_units (latitude, longitude, tube_id)
        VALUES (lat1 + rau_lat_step * i, lon1 + rau_lon_step * i, tube2_id);
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
        FOR _ in 1..1440 LOOP
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
            FOR _ in 1..1440 LOOP
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