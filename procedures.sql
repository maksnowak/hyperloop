CREATE OR REPLACE VIEW hyperloop.public.Solar_panel_view ( Data_ID, Time_of_measurement, Generated_power, Referred_tube_ID ) AS
SELECT
    Tubes_data.Data_ID,
    Tubes_data.Time_of_measurement,
    Tubes_data.Generated_power,
    Tubes_data.Referred_tube_ID
FROM
    Tubes_data
;

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