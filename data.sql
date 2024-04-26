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
-- czysto pasażerskie
insert into hyperloop.public.capsules values (1, 'Passenger-zero', 'Hindenburg', default, 40, 200, 1);
insert into hyperloop.public.capsules values (2, 'Passenger-one', 'Hindenburg', default, 40, 200, 1);
insert into hyperloop.public.capsules values (3, 'Passenger-two', 'Hindenburg', default, 40, 200, 1);
insert into hyperloop.public.capsules values (4, 'Passenger-three', 'Hindenburg', default, 40, 200, 1);
insert into hyperloop.public.capsules values (5, 'Passenger-four', 'Hindenburg', default, 40, 200, 1);
insert into hyperloop.public.capsules values (6, 'Passenger-five', 'Hindenburg', default, 40, 200, 1);
insert into hyperloop.public.capsules values (7, 'Passenger-six', 'Hindenburg', default, 40, 200, 1);
insert into hyperloop.public.capsules values (8, 'Passenger-seven', 'Hindenburg', default, 40, 200, 1);
insert into hyperloop.public.capsules values (9, 'Passenger-eight', 'Hindenburg', default, 40, 200, 1);
insert into hyperloop.public.capsules values (10, 'Passenger-nine', 'Hindenburg', default, 40, 200, 1);
-- hybrydowe
insert into hyperloop.public.capsules values (11, 'Hybrid-zero', 'Challenger', default, 28, 3000, 2);
insert into hyperloop.public.capsules values (12, 'Hybrid-one', 'Challenger', default, 28, 3000, 2);
insert into hyperloop.public.capsules values (13, 'Hybrid-two', 'Challenger', default, 28, 3000, 2);
insert into hyperloop.public.capsules values (14, 'Hybrid-three', 'Challenger', default, 28, 3000, 2);
insert into hyperloop.public.capsules values (15, 'Hybrid-four', 'Challenger', default, 28, 3000, 2);
insert into hyperloop.public.capsules values (16, 'Hybrid-five', 'Challenger', default, 28, 3000, 2);
insert into hyperloop.public.capsules values (17, 'Hybrid-six', 'Challenger', default, 28, 3000, 2);
insert into hyperloop.public.capsules values (18, 'Hybrid-seven', 'Challenger', default, 28, 3000, 2);
insert into hyperloop.public.capsules values (19, 'Hybrid-eight', 'Challenger', default, 28, 3000, 2);
insert into hyperloop.public.capsules values (20, 'Hybrid-nine', 'Challenger', default, 28, 3000, 2);
-- towarowe
insert into hyperloop.public.capsules values (21, 'Cargo-zero', 'Ever Given', default, 4, 10000, 3);
insert into hyperloop.public.capsules values (22, 'Cargo-one', 'Ever Given', default, 4, 10000, 3);
insert into hyperloop.public.capsules values (23, 'Cargo-two', 'Ever Given', default, 4, 10000, 3);
insert into hyperloop.public.capsules values (24, 'Cargo-three', 'Ever Given', default, 4, 10000, 3);
insert into hyperloop.public.capsules values (25, 'Cargo-four', 'Ever Given', default, 4, 10000, 3);
insert into hyperloop.public.capsules values (26, 'Cargo-five', 'Ever Given', default, 4, 10000, 3);
insert into hyperloop.public.capsules values (27, 'Cargo-six', 'Ever Given', default, 4, 10000, 3);
insert into hyperloop.public.capsules values (28, 'Cargo-seven', 'Ever Given', default, 4, 10000, 3);
insert into hyperloop.public.capsules values (29, 'Cargo-eight', 'Ever Given', default, 4, 10000, 3);
insert into hyperloop.public.capsules values (30, 'Cargo-nine', 'Ever Given', default, 4, 10000, 3);

