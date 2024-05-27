CREATE TABLE hyperloop.public.Capsules (
                         Capsule_ID         serial constraint capsule_pk primary key,
                         Model              VARCHAR(32) NOT NULL,
                         Producer           VARCHAR(32) NOT NULL,
                         Status             VARCHAR(16) NOT NULL default ('Operational') check ( status in ('In use', 'Operational', 'Under repair') ),
                         Type               VARCHAR(16) NOT NULL check ( type in ('Passenger', 'Hybrid', 'Cargo') ),
                         Seats              INTEGER NOT NULL check ( Seats >= 0 ),
                         Cargo_space        INTEGER NOT NULL CHECK ( Cargo_space >= 0 ),
                         Servicing_depot_ID INTEGER NOT NULL
);

CREATE TABLE hyperloop.public.Depots (
                       Depot_ID  serial constraint depot_pk primary key,
                       Name      VARCHAR(32) NOT NULL,
                       Latitude  NUMERIC(9, 6) NOT NULL check ( Latitude >= -90 and Latitude <= 90 ),
                       Longitude NUMERIC(9, 6) NOT NULL check ( Longitude >= -180 and Longitude <= 180 )
);

CREATE TABLE hyperloop.public.Remote_access_units (
                                    Unit_ID                  serial constraint remote_access_unit_pk primary key,
                                    Latitude                 NUMERIC(9, 6) NOT NULL check ( Latitude >= -90 and Latitude <= 90 ),
                                    Longitude                NUMERIC(9, 6) NOT NULL check ( Longitude >= -180 and Longitude <= 180 ),
                                    Environmental_conditions VARCHAR(32),
                                    Health_status            VARCHAR(32),
                                    Tube_ID             INTEGER NOT NULL
);

CREATE TABLE hyperloop.public.Repairs_history (
                                 Repair_ID           serial constraint repairs_history_pk primary key,
                                 Date_start          DATE NOT NULL DEFAULT (now()),
                                 Date_end            DATE,
                                 Referred_capsule_ID INTEGER NOT NULL,
                                 Performing_depot_ID INTEGER NOT NULL
);

CREATE TABLE hyperloop.public.Schedule (
                          Schedule_ID           serial constraint schedule_pk primary key,
                          Departure_time        TIME NOT NULL,
                          Arrival_time          TIME NOT NULL,
                          Status                VARCHAR(32) NOT NULL default ('Active') check ( status in ('Active', 'Not used') ),
                          Referred_capsule_ID   INTEGER NOT NULL,
                          Current_station_ID    INTEGER NOT NULL,
                          Next_station_ID       INTEGER NOT NULL,
                          Previous_schedule_ID  INTEGER check ( Previous_schedule_ID != Schedule.Schedule_ID )
);

ALTER TABLE hyperloop.public.Schedule
    ADD CONSTRAINT arc_1 CHECK (Next_station_ID != Current_station_ID);

CREATE TABLE hyperloop.public.Stations (
                         Station_ID serial constraint station_pk primary key,
                         Name       VARCHAR(32) NOT NULL,
                         Latitude   NUMERIC(9, 6) NOT NULL check ( Latitude >= -90 and Latitude <= 90 ),
                         Longitude  NUMERIC(9, 6) NOT NULL check ( Longitude >= -180 and Longitude <= 180 ),
                         Platforms  INTEGER NOT NULL DEFAULT 0 check ( Platforms >= 0 )
);

CREATE TABLE hyperloop.public.Station_logs (
                              Log_ID              serial constraint station_logs_pk primary key,
                              Date                DATE NOT NULL,
                              Passengers_served   INTEGER NOT NULL check ( Passengers_served >= 0 ),
                              Referred_station_ID INTEGER NOT NULL
);

CREATE TABLE hyperloop.public.Trips_history (
                               Ride_ID             serial constraint trips_history_pk primary key,
                               Date_start          TIMESTAMP NOT NULL,
                               Date_end            TIMESTAMP NOT NULL,
                               Tickets_sold        INTEGER NOT NULL check ( tickets_sold >= 0 ),
                               Cargo               TEXT,
                               Cargo_weight        INTEGER NOT NULL check ( cargo_weight >= 0 ),
                               Referred_capsule_ID INTEGER NOT NULL,
                               Referred_tube_ID    INTEGER NOT NULL
);

CREATE TABLE hyperloop.public.Tubes (
                      Tube_ID               serial constraint tube_pk primary key,
                      Name                  VARCHAR(65) NOT NULL,
                      Length                NUMERIC NOT NULL check ( Length > 0 ),
                      Max_speed             NUMERIC(7, 3) NOT NULL DEFAULT 1200 check ( Max_speed > 0 ),
                      Estimated_travel_time TIME NOT NULL,
                      Starting_station_ID   INTEGER NOT NULL,
                      Ending_station_ID     INTEGER NOT NULL
);

ALTER TABLE hyperloop.public.Tubes
    ADD CONSTRAINT arc_2 CHECK (Starting_station_ID != Ending_station_ID);

CREATE TABLE hyperloop.public.Tubes_data (
                           Data_ID             serial constraint tube_data_pk primary key,
                           Time_of_measurement TIMESTAMP NOT NULL,
                           Pressure            NUMERIC(8, 3) check ( pressure >= 0 ),
                           Generated_power     NUMERIC(8, 3) check ( generated_power >= 0 ),
                           Referred_tube_ID    INTEGER NOT NULL
);

ALTER TABLE hyperloop.public.Capsules
    ADD CONSTRAINT capsule_servicing_depot_fk FOREIGN KEY ( Servicing_depot_ID )
        REFERENCES Depots ( Depot_ID );

ALTER TABLE hyperloop.public.Tubes_data
    ADD CONSTRAINT data_referred_tube_fk FOREIGN KEY ( Referred_tube_ID )
        REFERENCES Tubes ( Tube_ID );

ALTER TABLE hyperloop.public.Repairs_history
    ADD CONSTRAINT history_performing_depot_fk FOREIGN KEY ( Performing_depot_ID )
        REFERENCES Depots ( Depot_ID );

ALTER TABLE hyperloop.public.Trips_history
    ADD CONSTRAINT history_referred_capsule_fk FOREIGN KEY ( Referred_capsule_ID )
        REFERENCES Capsules ( Capsule_ID );

ALTER TABLE hyperloop.public.Repairs_history
    ADD CONSTRAINT history_referred_capsule_fkv2 FOREIGN KEY ( Referred_capsule_ID )
        REFERENCES Capsules ( Capsule_ID );

ALTER TABLE hyperloop.public.Trips_history
    ADD CONSTRAINT history_referred_tube_fk FOREIGN KEY ( Referred_tube_ID )
        REFERENCES Tubes ( Tube_ID );

ALTER TABLE hyperloop.public.Station_logs
    ADD CONSTRAINT logs_referred_station_fk FOREIGN KEY ( Referred_station_ID )
        REFERENCES Stations ( Station_ID );

ALTER TABLE hyperloop.public.Remote_access_units
    ADD CONSTRAINT remote_access_unit_tube_fk FOREIGN KEY ( Tube_ID )
        REFERENCES Tubes ( Tube_ID );

ALTER TABLE hyperloop.public.Schedule
    ADD CONSTRAINT schedule_current_station_fk FOREIGN KEY ( Current_station_ID )
        REFERENCES Stations ( Station_ID );

ALTER TABLE hyperloop.public.Schedule
    ADD CONSTRAINT schedule_next_station_fk FOREIGN KEY ( Next_station_ID )
        REFERENCES Stations ( Station_ID );

ALTER TABLE hyperloop.public.Schedule
    ADD CONSTRAINT schedule_referred_capsule_fk FOREIGN KEY ( Referred_capsule_ID )
        REFERENCES Capsules ( Capsule_ID );

ALTER TABLE hyperloop.public.Tubes
    ADD CONSTRAINT tube_ending_station_fk FOREIGN KEY ( Ending_station_ID )
        REFERENCES Stations ( Station_ID );

ALTER TABLE hyperloop.public.Tubes
    ADD CONSTRAINT tube_starting_station_fk FOREIGN KEY ( Starting_station_ID )
        REFERENCES Stations ( Station_ID );

ALTER TABLE hyperloop.public.schedule
    ADD CONSTRAINT schedule_previous_schedule_fk FOREIGN KEY ( Previous_schedule_ID )
        REFERENCES Schedule ( Schedule_ID );

CREATE OR REPLACE VIEW hyperloop.public.Pressure_view ( Data_ID, Time_of_measurement, Pressure, Referred_tube_ID ) AS
SELECT
    Tubes_data.Data_ID,
    Tubes_data.Time_of_measurement,
    Tubes_data.Pressure,
    Tubes_data.Referred_tube_ID
FROM
    Tubes_data
;

CREATE OR REPLACE VIEW hyperloop.public.Solar_panel_view ( Data_ID, Time_of_measurement, Generated_power, Referred_tube_ID ) AS
SELECT
    Tubes_data.Data_ID,
    Tubes_data.Time_of_measurement,
    Tubes_data.Generated_power,
    Tubes_data.Referred_tube_ID
FROM
    Tubes_data
;