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