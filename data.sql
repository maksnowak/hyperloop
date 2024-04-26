-- stacje
insert into hyperloop.public.stations values (1, 'Świebodzin', 52.236731, 15.546846); --Chrystus Świebodziński
insert into hyperloop.public.stations values (2, 'Warszawa', 52.232149, 21.006627); --PKiN
insert into hyperloop.public.stations values (3, 'Kraków', 50.054140, 19.936580); --Wawel
insert into hyperloop.public.stations values (4, 'Bydgoszcz', 53.121684, 17.998683); --Muzeum mydła i brudu
insert into hyperloop.public.stations values (5, 'Gdańsk', 54.352025, 18.646638); --Muzeum II Wojny Światowej
insert into hyperloop.public.stations values (6, 'Poznań', 52.406374, 16.925168); --Stary Rynek
insert into hyperloop.public.stations values (7, 'Wrocław', 51.107883, 17.038538); --Ostrów Tumski
insert into hyperloop.public.stations values (8, 'Szczecin', 53.428543, 14.552812); --Zamek Książąt Pomorskich
insert into hyperloop.public.stations values (9, 'Lublin', 51.246454, 22.568446); --Zamek Lubelski
insert into hyperloop.public.stations values (10, 'Katowice', 50.264892, 19.023782); --Spodek
insert into hyperloop.public.stations values (11, 'Łódź', 51.768732, 19.456991); --Manufaktura
insert into hyperloop.public.stations values (12, 'Białystok', 53.132488, 23.168840); --Pałac Branickich
insert into hyperloop.public.stations values (13, 'Olsztyn', 53.778422, 20.480119); --Zamek Kapituły Warmińskiej
insert into hyperloop.public.stations values (14, 'Rzeszów', 50.041187, 21.999121); --Zamek Lubomirskich
insert into hyperloop.public.stations values (15, 'Kielce', 50.866077, 20.628568); --Pałac Biskupów Krakowskich
insert into hyperloop.public.stations values (16, 'Jarosławiec', 54.539833, 16.542434); -- Latarnia w Jarosławcu

-- tuby
CALL connect_stations('Warszawa', 'Olsztyn', 1200);
CALL connect_stations('Bydgoszcz', 'Warszawa', 1200);
CALL connect_stations('Bydgoszcz', 'Olsztyn', 1200);
CALL connect_stations('Gdańsk', 'Olsztyn', 1200);
CALL connect_stations('Gdańsk', 'Bydgoszcz', 1200);
CALL connect_stations('Jarosławiec', 'Gdańsk', 1200);
CALL connect_stations('Jarosławiec', 'Bydgoszcz', 1200);
CALL connect_stations('Szczecin', 'Jarosławiec', 1200);
CALL connect_stations('Szczecin', 'Bydgoszcz', 1200);
CALL connect_stations('Poznań', 'Szczecin', 1200);
CALL connect_stations('Poznań', 'Bydgoszcz', 1200);
CALL connect_stations('Świebodzin', 'Szczecin', 1200);
CALL connect_stations('Świebodzin', 'Poznań', 1200);
CALL connect_stations('Wrocław', 'Świebodzin', 1200);
CALL connect_stations('Wrocław', 'Poznań', 1200);
CALL connect_stations('Łódź', 'Wrocław', 1200);
CALL connect_stations('Łódź', 'Poznań', 1200);
CALL connect_stations('Łódź', 'Bydgoszcz', 1200);
CALL connect_stations('Łódź', 'Warszawa', 1200);
CALL connect_stations('Białystok', 'Olsztyn', 1200);
CALL connect_stations('Białystok', 'Warszawa', 1200);
CALL connect_stations('Lublin', 'Białystok', 1200);
CALL connect_stations('Lublin', 'Warszawa', 1200);
CALL connect_stations('Kielce', 'Warszawa', 1200);
CALL connect_stations('Kielce', 'Łódź', 1200);
CALL connect_stations('Kielce', 'Lublin', 1200);
CALL connect_stations('Rzeszów', 'Kielce', 1200);
CALL connect_stations('Rzeszów', 'Lublin', 1200);
CALL connect_stations('Kraków', 'Kielce', 1200);
CALL connect_stations('Kraków', 'Rzeszów', 1200);
CALL connect_stations('Katowice', 'Kielce', 1200);
CALL connect_stations('Katowice', 'Kraków', 1200);
CALL connect_stations('Katowice', 'Łódź', 1200);
CALL connect_stations('Katowice', 'Wrocław', 1200);

-- depoty
insert into hyperloop.public.depots values (1, 'Wadowice', 49.883353, 19.493670); -- muzeum JP2 - pasażerskie
insert into hyperloop.public.depots values (2, 'Częstochowa', 50.811018, 19.120306); -- Jasna Góra - hybrydowe
insert into hyperloop.public.depots values (3, 'Radom', 51.397447, 21.156443); -- Katedra Opieki NMP - towarowe

-- kapsuły
alter sequence hyperloop.public.capsules_capsule_id_seq restart with 1;
-- czysto pasażerskie
CALL add_capsule('Passenger-zero', 'Hindenburg', 'Passenger', 1);
CALL add_capsule('Passenger-one', 'Hindenburg', 'Passenger', 1);
CALL add_capsule('Passenger-two', 'Hindenburg', 'Passenger', 1);
CALL add_capsule('Passenger-three', 'Hindenburg', 'Passenger', 1);
CALL add_capsule('Passenger-four', 'Hindenburg', 'Passenger', 1);
CALL add_capsule('Passenger-five', 'Hindenburg', 'Passenger', 1);
CALL add_capsule('Passenger-six', 'Hindenburg', 'Passenger', 1);
CALL add_capsule('Passenger-seven', 'Hindenburg', 'Passenger', 1);
CALL add_capsule('Passenger-eight', 'Hindenburg', 'Passenger', 1);
CALL add_capsule('Passenger-nine', 'Hindenburg', 'Passenger', 1);
-- hybrydowe
CALL add_capsule('Hybrid-zero', 'Challenger', 'Hybrid', 2);
CALL add_capsule('Hybrid-one', 'Challenger', 'Hybrid', 2);
CALL add_capsule('Hybrid-two', 'Challenger', 'Hybrid', 2);
CALL add_capsule('Hybrid-three', 'Challenger', 'Hybrid', 2);
CALL add_capsule('Hybrid-four', 'Challenger', 'Hybrid', 2);
CALL add_capsule('Hybrid-five', 'Challenger', 'Hybrid', 2);
CALL add_capsule('Hybrid-six', 'Challenger', 'Hybrid', 2);
CALL add_capsule('Hybrid-seven', 'Challenger', 'Hybrid', 2);
CALL add_capsule('Hybrid-eight', 'Challenger', 'Hybrid', 2);
CALL add_capsule('Hybrid-nine', 'Challenger', 'Hybrid', 2);
-- towarowe
CALL add_capsule('Cargo-zero', 'Ever Given', 'Cargo', 3);
CALL add_capsule('Cargo-one', 'Ever Given', 'Cargo', 3);
CALL add_capsule('Cargo-two', 'Ever Given', 'Cargo', 3);
CALL add_capsule('Cargo-three', 'Ever Given', 'Cargo', 3);
CALL add_capsule('Cargo-four', 'Ever Given', 'Cargo', 3);
CALL add_capsule('Cargo-five', 'Ever Given', 'Cargo', 3);
CALL add_capsule('Cargo-six', 'Ever Given', 'Cargo', 3);
CALL add_capsule('Cargo-seven', 'Ever Given', 'Cargo', 3);
CALL add_capsule('Cargo-eight', 'Ever Given', 'Cargo', 3);
CALL add_capsule('Cargo-nine', 'Ever Given', 'Cargo', 3);

-- kilka napraw
insert into hyperloop.public.repairs_history values (1, now() - interval '2 months', now() - interval '1 month', 1, 1);
insert into hyperloop.public.repairs_history values (2, now() - interval '1 month', now() - interval '14 days', 13, 2);
insert into hyperloop.public.repairs_history values (3, now() - interval '28 days', now(), 27, 3);
-- naprawa trwająca teraz
CALL add_capsule('Cargo-in-repair', 'Ever Given', 'Cargo', 3);
UPDATE hyperloop.public.capsules
set status = 'Under repair' where model = 'Cargo-in-repair';
insert into hyperloop.public.repairs_history values (4, now() - interval '14 days', null, (SELECT capsule_id from capsules where model = 'Cargo-in-repair'), 3);

-- rozkłady
-- =====================
-- = NIGHTMARE SECTION =
-- =====================
-- Szczecin(8) - Bydgoszcz(4) - Olsztyn(13)
-- ((12 + 1 + 10 + 1)*2 = 48 min, 24 * 60 / 48 = 30 razy)
DO
$$
DECLARE
    base_time TIME;
    base_idx integer;
BEGIN
    select max(schedule_id) into base_idx from hyperloop.public.schedule;
    IF base_idx is null THEN
        base_idx = 0;
    END IF;
    base_time = TIME '00:00:00';
    update hyperloop.public.capsules
        set status = 'In use' where capsule_id in (1, 11, 21);
    FOR i IN 1..30 LOOP
        -- osobowy
            -- tam
        insert into hyperloop.public.schedule
        values (base_idx + 1, base_time, base_time + interval '12 minutes', default, 1, 8, 4, null);
        insert into hyperloop.public.schedule
        values (base_idx + 2, base_time + interval '13 minutes', base_time + interval '23 minutes', default, 1, 4, 13, base_idx + 1);
            -- z powrotem
        insert into hyperloop.public.schedule
        values (base_idx + 3, base_time + interval '24 minutes', base_time + interval '34 minutes', default, 1, 13, 4, null);
        insert into hyperloop.public.schedule
        values (base_idx + 4, base_time + interval '35 minutes', base_time + interval '47 minutes', default, 1, 4, 8, base_idx + 3);
        -- hybrydowy (zaczyna z drugiego końca)
            -- tam
        insert into hyperloop.public.schedule
        values (base_idx + 5, base_time, base_time + interval '10 minutes', default, 11, 13, 4, null);
        insert into hyperloop.public.schedule
        values (base_idx + 6, base_time + interval '11 minutes', base_time + interval '23 minutes', default, 11, 4, 8, base_idx + 5);
            -- z powrotem
        insert into hyperloop.public.schedule
        values (base_idx + 7, base_time + interval '24 minutes', base_time + interval '36 minutes', default, 11, 8, 4, null);
        insert into hyperloop.public.schedule
        values (base_idx + 8, base_time + interval '37 minutes', base_time + interval '47 minutes', default, 11, 4, 13, base_idx + 7);
        -- cargo (zaczyna jak passenger jest w połowie trasy w jedną stronę)
            -- tam
        insert into hyperloop.public.schedule
        values (base_idx + 9, base_time + interval '12 minutes', base_time + interval '24 minutes', default, 21, 8, 4, null);
        insert into hyperloop.public.schedule
        values (base_idx + 10, base_time + interval '25 minutes', base_time + interval '35 minutes', default, 21, 4, 13, base_idx + 9);
            -- z powrotem
        insert into hyperloop.public.schedule
        values (base_idx + 11, base_time + interval '36 minutes', base_time + interval '46 minutes', default, 21, 13, 4, null);
        insert into hyperloop.public.schedule
        values (base_idx + 12, base_time + interval '47 minutes', base_time + interval '59 minutes', default, 21, 4, 8, base_idx + 11);
        -- update parametrów
        base_idx = base_idx + 12;
        base_time = base_time + interval '48 minutes';
    END LOOP;
end;
$$;

-- Białystok(12) - Warszawa(2) - Łódź(11) - Poznań(6) - Świebodzin(1)
-- (9 + 1 + 6 + 1 + 10 + 1 + 5 + 3) * 2 = 72 min, 24 * 60 / 72 = 20 razy)
DO
$$
    DECLARE
        base_time TIME;
        base_idx integer;
    BEGIN
        select max(schedule_id) into base_idx from hyperloop.public.schedule;
        IF base_idx is null THEN
            base_idx = 0;
        END IF;
        base_time = TIME '00:00:00';
        update hyperloop.public.capsules
        set status = 'In use' where capsule_id in (2, 12, 22);
        FOR i IN 1..20 LOOP
                -- osobowy
                    -- tam
                insert into hyperloop.public.schedule
                values (base_idx + 1, base_time, base_time + interval '9 minutes', default, 2, 12, 2, null);
                insert into hyperloop.public.schedule
                values (base_idx + 2, base_time + interval '10 minutes', base_time + interval '16 minutes', default, 2, 2, 11, base_idx + 1);
                insert into hyperloop.public.schedule
                values (base_idx + 3, base_time + interval '17 minutes', base_time + interval '27 minutes', default, 2, 11, 6, base_idx + 2);
                insert into hyperloop.public.schedule
                values (base_idx + 4, base_time + interval '28 minutes', base_time + interval '33 minutes', default, 2, 6, 1, base_idx + 3);
                    -- z powrotem
                insert into hyperloop.public.schedule
                values (base_idx + 5, base_time + interval '36 minutes', base_time + interval '41 minutes', default, 2, 1, 6, null);
                insert into hyperloop.public.schedule
                values (base_idx + 6, base_time + interval '42 minutes', base_time + interval '52 minutes', default, 2, 6, 11, base_idx + 4);
                insert into hyperloop.public.schedule
                values (base_idx + 7, base_time + interval '53 minutes', base_time + interval '59 minutes', default, 2, 11, 2, base_idx + 5);
                insert into hyperloop.public.schedule
                values (base_idx + 8, base_time + interval '60 minutes', base_time + interval '69 minutes', default, 2, 2, 12, base_idx + 6);
                -- hybrydowy (zaczyna z drugiego końca)
                    -- tam
                insert into hyperloop.public.schedule
                values (base_idx + 9, base_time, base_time + interval '5 minutes', default, 12, 1, 6, null);
                insert into hyperloop.public.schedule
                values (base_idx + 10, base_time + interval '6 minutes', base_time + interval '16 minutes', default, 12, 6, 11, base_idx + 9);
                insert into hyperloop.public.schedule
                values (base_idx + 11, base_time + interval '17 minutes', base_time + interval '23 minutes', default, 12, 11, 2, base_idx + 10);
                insert into hyperloop.public.schedule
                values (base_idx + 12, base_time + interval '24 minutes', base_time + interval '33 minutes', default, 12, 2, 12, base_idx + 11);
                    -- z powrotem
                insert into hyperloop.public.schedule
                values (base_idx + 13, base_time + interval '36 minutes', base_time + interval '45 minutes', default, 12, 12, 2, null);
                insert into hyperloop.public.schedule
                values (base_idx + 14, base_time + interval '46 minutes', base_time + interval '52 minutes', default, 12, 2, 11, base_idx + 13);
                insert into hyperloop.public.schedule
                values (base_idx + 15, base_time + interval '53 minutes', base_time + interval '63 minutes', default, 12, 11, 6, base_idx + 14);
                insert into hyperloop.public.schedule
                values (base_idx + 16, base_time + interval '64 minutes', base_time + interval '69 minutes', default, 12, 6, 1, base_idx + 15);
                -- cargo (zaczyna jak passenger jest w połowie trasy w jedną stronę)
                    -- tam
                insert into hyperloop.public.schedule
                values (base_idx + 17, base_time + interval '18 minutes', base_time + interval '27 minutes', default, 22, 12, 2, null);
                insert into hyperloop.public.schedule
                values (base_idx + 18, base_time + interval '28 minutes', base_time + interval '34 minutes', default, 22, 2, 11, base_idx + 17);
                insert into hyperloop.public.schedule
                values (base_idx + 19, base_time + interval '35 minutes', base_time + interval '45 minutes', default, 22, 11, 6, base_idx + 18);
                insert into hyperloop.public.schedule
                values (base_idx + 20, base_time + interval '46 minutes', base_time + interval '51 minutes', default, 22, 6, 1, base_idx + 19);
                    -- z powrotem
                insert into hyperloop.public.schedule
                values (base_idx + 21, base_time + interval '54 minutes', base_time + interval '59 minutes', default, 22, 1, 6, null);
                insert into hyperloop.public.schedule
                values (base_idx + 22, base_time + interval '60 minutes', base_time + interval '70 minutes', default, 22, 6, 11, base_idx + 21);
                insert into hyperloop.public.schedule
                values (base_idx + 23, base_time + interval '71 minutes', base_time + interval '77 minutes', default, 22, 11, 2, base_idx + 22);
                insert into hyperloop.public.schedule
                values (base_idx + 24, base_time + interval '78 minutes', base_time + interval '87 minutes', default, 22, 2, 12, base_idx + 23);
                -- update parametrów
                base_idx = base_idx + 24;
                base_time = base_time + interval '72 minutes';
            END LOOP;
    end;
$$;

-- Łódź(11) - Wrocław(7) - Świebodzin(1) - Szczecin(8)
-- (10 + 1 + 9 + 1 + 8 + 1) * 2 = 60 min, 24 * 60 / 60 = 24 razy)
DO
$$
    DECLARE
        base_time TIME;
        base_idx integer;
    BEGIN
        select max(schedule_id) into base_idx from hyperloop.public.schedule;
        IF base_idx is null THEN
            base_idx = 0;
        END IF;
        base_time = TIME '00:00:00';
        update hyperloop.public.capsules
        set status = 'In use' where capsule_id in (3, 13, 23);
        FOR i IN 1..24 LOOP
            -- osobowy
                -- tam
                insert into hyperloop.public.schedule
                values (base_idx + 1, base_time, base_time + interval '10 minutes', default, 3, 11, 7, null);
                insert into hyperloop.public.schedule
                values (base_idx + 2, base_time + interval '11 minutes', base_time + interval '20 minutes', default, 3, 7, 1, base_idx + 1);
                insert into hyperloop.public.schedule
                values (base_idx + 3, base_time + interval '21 minutes', base_time + interval '29 minutes', default, 3, 1, 8, base_idx + 2);
                -- z powrotem
                insert into hyperloop.public.schedule
                values (base_idx + 4, base_time + interval '30 minutes', base_time + interval '38 minutes', default, 3, 8, 1, null);
                insert into hyperloop.public.schedule
                values (base_idx + 5, base_time + interval '39 minutes', base_time + interval '48 minutes', default, 3, 1, 7, base_idx + 4);
                insert into hyperloop.public.schedule
                values (base_idx + 6, base_time + interval '49 minutes', base_time + interval '59 minutes', default, 3, 7, 11, base_idx + 5);
                -- hybrydowy (zaczyna z drugiego końca)
                -- tam
                insert into hyperloop.public.schedule
                values (base_idx + 7, base_time, base_time + interval '10 minutes', default, 13, 8, 1, null);
                insert into hyperloop.public.schedule
                values (base_idx + 8, base_time + interval '11 minutes', base_time + interval '20 minutes', default, 13, 1, 7, base_idx + 7);
                insert into hyperloop.public.schedule
                values (base_idx + 9, base_time + interval '21 minutes', base_time + interval '29 minutes', default, 13, 7, 11, base_idx + 8);
                -- z powrotem
                insert into hyperloop.public.schedule
                values (base_idx + 10, base_time + interval '30 minutes', base_time + interval '38 minutes', default, 13, 11, 7, null);
                insert into hyperloop.public.schedule
                values (base_idx + 11, base_time + interval '39 minutes', base_time + interval '48 minutes', default, 13, 7, 1, base_idx + 10);
                insert into hyperloop.public.schedule
                values (base_idx + 12, base_time + interval '49 minutes', base_time + interval '59 minutes', default, 13, 1, 8, base_idx + 11);
                -- cargo (zaczyna jak passenger jest w połowie trasy w jedną stronę)
                -- tam
                insert into hyperloop.public.schedule
                values (base_idx + 13, base_time + interval '15 minutes', base_time + interval '25 minutes', default, 23, 11, 7, null);
                insert into hyperloop.public.schedule
                values (base_idx + 14, base_time + interval '26 minutes', base_time + interval '35 minutes', default, 23, 7, 1, base_idx + 13);
                insert into hyperloop.public.schedule
                values (base_idx + 15, base_time + interval '36 minutes', base_time + interval '44 minutes', default, 23, 1, 8, base_idx + 14);
                -- z powrotem
                insert into hyperloop.public.schedule
                values (base_idx + 16, base_time + interval '45 minutes', base_time + interval '53 minutes', default, 23, 8, 1, null);
                insert into hyperloop.public.schedule
                values (base_idx + 17, base_time + interval '58 minutes', base_time + interval '63 minutes', default, 23, 1, 7, base_idx + 16);
                insert into hyperloop.public.schedule
                values (base_idx + 18, base_time + interval '64 minutes', base_time + interval '74 minutes', default, 23, 7, 11, base_idx + 17);
                -- update parametrów
                base_idx = base_idx + 18;
                base_time = base_time + interval '60 minutes';
            END LOOP;
    end;
$$;

-- Rzeszów(14) - Kielce(15) - Warszawa(2) - Olsztyn(13) - Gdańsk(5)
-- (7 + 1 + 8 + 1 + 9 + 1 + 7 + 2) * 2 = 72 min, 24 * 60 / 72 = 20 razy)
DO
$$
    DECLARE
        base_time TIME;
        base_idx integer;
    BEGIN
        select max(schedule_id) into base_idx from hyperloop.public.schedule;
        IF base_idx is null THEN
            base_idx = 0;
        END IF;
        base_time = TIME '00:00:00';
        update hyperloop.public.capsules
        set status = 'In use' where capsule_id in (4, 14, 24);
        FOR i IN 1..20 LOOP
            -- osobowy
            -- tam
                insert into hyperloop.public.schedule
                values (base_idx + 1, base_time, base_time + interval '7 minutes', default, 4, 14, 15, null);
                insert into hyperloop.public.schedule
                values (base_idx + 2, base_time + interval '8 minutes', base_time + interval '16 minutes', default, 4, 15, 2, base_idx + 1);
                insert into hyperloop.public.schedule
                values (base_idx + 3, base_time + interval '17 minutes', base_time + interval '26 minutes', default, 4, 2, 13, base_idx + 2);
                insert into hyperloop.public.schedule
                values (base_idx + 4, base_time + interval '27 minutes', base_time + interval '34 minutes', default, 4, 13, 5, base_idx + 3);
                -- z powrotem
                insert into hyperloop.public.schedule
                values (base_idx + 5, base_time + interval '36 minutes', base_time + interval '43 minutes', default, 4, 5, 13, null);
                insert into hyperloop.public.schedule
                values (base_idx + 6, base_time + interval '44 minutes', base_time + interval '53 minutes', default, 4, 13, 2, base_idx + 4);
                insert into hyperloop.public.schedule
                values (base_idx + 7, base_time + interval '54 minutes', base_time + interval '62 minutes', default, 4, 2, 15, base_idx + 5);
                insert into hyperloop.public.schedule
                values (base_idx + 8, base_time + interval '63 minutes', base_time + interval '70 minutes', default, 4, 15, 14, base_idx + 6);
                -- hybrydowy (zaczyna z drugiego końca)
                -- tam
                insert into hyperloop.public.schedule
                values (base_idx + 9, base_time, base_time + interval '7 minutes', default, 14, 5, 13, null);
                insert into hyperloop.public.schedule
                values (base_idx + 10, base_time + interval '8 minutes', base_time + interval '17 minutes', default, 14, 13, 2, base_idx + 9);
                insert into hyperloop.public.schedule
                values (base_idx + 11, base_time + interval '18 minutes', base_time + interval '26 minutes', default, 14, 2, 15, base_idx + 10);
                insert into hyperloop.public.schedule
                values (base_idx + 12, base_time + interval '27 minutes', base_time + interval '34 minutes', default, 14, 15, 14, base_idx + 11);
                -- z powrotem
                insert into hyperloop.public.schedule
                values (base_idx + 13, base_time + interval '36 minutes', base_time + interval '43 minutes', default, 14, 14, 15, null);
                insert into hyperloop.public.schedule
                values (base_idx + 14, base_time + interval '44 minutes', base_time + interval '52 minutes', default, 14, 15, 2, base_idx + 13);
                insert into hyperloop.public.schedule
                values (base_idx + 15, base_time + interval '53 minutes', base_time + interval '62 minutes', default, 14, 2, 13, base_idx + 14);
                insert into hyperloop.public.schedule
                values (base_idx + 16, base_time + interval '63 minutes', base_time + interval '70 minutes', default, 14, 13, 5, base_idx + 15);
                -- cargo (zaczyna jak passenger jest w połowie trasy w jedną stronę)
                -- tam
                insert into hyperloop.public.schedule
                values (base_idx + 17, base_time + interval '18 minutes', base_time + interval '25 minutes', default, 24, 14, 15, null);
                insert into hyperloop.public.schedule
                values (base_idx + 18, base_time + interval '26 minutes', base_time + interval '34 minutes', default, 24, 15, 2, base_idx + 17);
                insert into hyperloop.public.schedule
                values (base_idx + 19, base_time + interval '35 minutes', base_time + interval '44 minutes', default, 24, 2, 13, base_idx + 18);
                insert into hyperloop.public.schedule
                values (base_idx + 20, base_time + interval '45 minutes', base_time + interval '52 minutes', default, 24, 13, 5, base_idx + 19);
                -- z powrotem
                insert into hyperloop.public.schedule
                values (base_idx + 21, base_time + interval '54 minutes', base_time + interval '61 minutes', default, 24, 5, 13, null);
                insert into hyperloop.public.schedule
                values (base_idx + 22, base_time + interval '62 minutes', base_time + interval '71 minutes', default, 24, 13, 2, base_idx + 21);
                insert into hyperloop.public.schedule
                values (base_idx + 23, base_time + interval '72 minutes', base_time + interval '80 minutes', default, 24, 2, 15, base_idx + 22);
                insert into hyperloop.public.schedule
                values (base_idx + 24, base_time + interval '81 minutes', base_time + interval '88 minutes', default, 24, 15, 14, base_idx + 23);
                -- update parametrów
                base_idx = base_idx + 24;
                base_time = base_time + interval '72 minutes';
            END LOOP;
    end;
$$;