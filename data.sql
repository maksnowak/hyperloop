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
-- obecnie w naprawie
CALL add_capsule('Cargo-in-repair', 'Ever Given', 'Cargo', 3);
UPDATE hyperloop.public.capsules
    set status = 'Under repair' where model = 'Cargo-in-repair';
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
insert into hyperloop.public.repairs_history values (4, now() - interval '14 days', null, (SELECT capsule_id from capsules where model = 'Cargo-in-repair'), 3);
