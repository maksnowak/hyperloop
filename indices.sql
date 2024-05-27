CREATE INDEX idx_capsules_producer_model_id ON capsules(producer, model, capsule_id);

CREATE INDEX idx_stations_name_id ON stations(name, station_id);

CREATE INDEX idx_tubes_name_id ON tubes(name, tube_id);

CREATE INDEX idx_schedule_current_next_id ON schedule(current_station_id, next_station_id, schedule_id);

CREATE INDEX idx_tubes_start_end ON tubes(starting_station_id, ending_station_id);

CREATE INDEX idx_trips_history_tube_date_start ON trips_history(referred_tube_id, date_start);

CREATE INDEX idx_repairs_history_capsule_dates ON repairs_history(referred_capsule_id, date_start, date_end) INCLUDE (date_start);

CREATE INDEX idx_tubes_starting_station ON tubes(tube_id, starting_station_id, ending_station_id);

CREATE INDEX idx_trips_history_tube_date_end ON trips_history(referred_tube_id, date_end);

CREATE INDEX idx_station_logs_station_date ON station_logs(referred_station_id, date);

CREATE INDEX idx_capsules_servicing_depot_id ON capsules(servicing_depot_id);

CREATE INDEX idx_schedule_capsule_departure ON schedule(referred_capsule_id, departure_time);

CREATE INDEX idx_schedule_capsule_arrival ON schedule(referred_capsule_id, arrival_time);

CREATE INDEX idx_capsules_type_status ON capsules(type, status);

CREATE INDEX idx_remote_access_units_tube_id ON remote_access_units(tube_id);