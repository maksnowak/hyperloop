-- CONNECT_STATIONS
-- połączenie stacji z samą sobą
CALL connect_stations('Wrocław', 'Wrocław', 1200);
-- prędkość <= 0
CALL connect_stations('Wrocław', 'Katowice', 0);
-- nieistniejące stacje
CALL connect_stations('Wrocław', 'NIEISTNIEJE', 1200);
CALL connect_stations('NIEISTNIEJE', 'Wrocław', 1200);

-- ADD_CAPSULE
-- nieistniejący typ
CALL add_capsule('rower', 'przyklad', 'NIEISTNIEJE', 1);

-- ADD_SCHEDULE
-- tylko jedna stacja
CALL add_schedule(ARRAY ['Wrocław']::varchar(32)[], TIME '08:00:00', 'Passenger');
-- nieistniejąca stacja
CALL add_schedule(ARRAY ['Wrocław', 'Kraków', 'NIEISTNIEJE']::varchar(32)[], TIME '08:00:00', 'Passenger');
-- niepołączone stacje
CALL add_schedule(ARRAY ['Katowice', 'Wrocław', 'Olsztyn', 'Białystok']::varchar(32)[], TIME '08:00:00', 'Passenger');
-- stacja sama z sobą
CALL add_schedule(ARRAY ['Wrocław', 'Wrocław']::varchar(32)[], TIME '08:00:00', 'Passenger');

-- FINISH_REPAIR
-- nieistniejąca kapsuła
CALL finish_repair(999);
-- nie w naprawie
CALL finish_repair(14);

-- START_REPAIR
-- nieistniejąca kapsuła
CALL start_repair(999);
-- w naprawie
CALL start_repair(31);
-- nie ma na podmianę
CALL start_repair(37);

-- CREATE_TRIP_HISTORY
-- nieistniejący rozkład
CALL create_trip_history(9999, 12, 30, null);
-- za mało biletów
CALL create_trip_history(999, -12, 30, null);
-- za dużo biletów
CALL create_trip_history(999, 120, 30, null);
-- za mała waga
CALL create_trip_history(999, 2, -30, null);
-- za duża waga
CALL create_trip_history(999, 2, 99999, null);

-- AVERAGE_PASSENGER_COUNT
-- nie ma połączenia
SELECT average_passenger_count(1, 13, current_date, current_date);
