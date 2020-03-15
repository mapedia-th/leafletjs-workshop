-- Script Database part I
-- Create database template postgis
CREATE DATABASE test_db WITH OWNER =  postgres TEMPLATE = postgis_23_sample

-- Create Table
CREATE TABLE pop
(
popid integer,
tam_name text,
amp_name text,
prov_name text,
m_tot integer,
f_tot integer
)

ALTER TABLE pop ADD mf_tot integer ;

ALTER TABLE pop RENAME COLUMN mf_tot TO sum_tot ;

ALTER TABLE pop ALTER COLUMN sum_tot TYPE numeric;

ALTER TABLE pop ADD PRIMARY KEY (popid);

ALTER TABLE pop DROP COLUMN sum_tot;

DROP TABLE pop;

DROP DATABASE test_db;

SELECT * FROM population ;

SELECT prov_th , t_tot FROM population;

SELECT prov_th  FROM population WHERE prov_th = ‘สุโขทัย’ ;

SELECT t_tot  FROM population WHERE t_tot > 10000;

SELECT tam_th  FROM population WHERE tam_th LIKE ‘%หนอง%’;

SELECT tam_th, t_tot  FROM population WHERE t_tot BETWEEN 20000 and 30000;

SELECT amp_th FROM population WHERE amp_th = ‘เนินมะปราง’ OR amp_th = ‘วังทอง’ ;

SELECT * FROM population WHERE amp_th = ‘เมืองพิษณุโลก’ AND t_tot > 10000 ;

SELECT * FROM population WHERE prov_th = ‘พิษณุโลก’ AND (amp_th = ‘เมืองพิษณุโลก’ AND t_tot > 20000);

SELECT DISTINCT prov_th FROM population ;

SELECT tam_th , prov_th , t_tot FROM population WHERE prov_th = 'พิษณุโลก'
ORDER BY t_tot DESC ;

SELECT amp_th , prov_th FROM population WHERE prov_th = 'พิษณุโลก'
ORDER BY amp_th ASC ;

SELECT count(prov_th) FROM population WHERE prov_th = 'พิษณุโลก' ;

SELECT SUM(t_tot) FROM population WHERE prov_th = 'พิษณุโลก' ;

SELECT AVG(t_tot) FROM population WHERE prov_th = 'พิษณุโลก' ;

SELECT amp_th, prov_th, SUM(t_tot) FROM population WHERE prov_th = 'พิษณุโลก' GROUP BY amp_th, prov_th ORDER BY SUM DESC ;

SELECT amp_th, prov_th, COUNT(t_tot) FROM population WHERE prov_th = 'พิษณุโลก' GROUP BY amp_th, prov_th ORDER BY SUM DESC ;

SELECT tam_th, amp_th, prov_th, AVG(t_tot)  FROM population
WHERE prov_th = 'พิษณุโลก'  GROUP BY tam_th, amp_th, prov_th
HAVING AVG(t_tot) > 10000 ORDER BY  AVG ASC ;

SELECT MAX(t_tot)  FROM population WHERE prov_th = 'พิษณุโลก' ;

SELECT tam_th as ตำบล, amp_th as อำเภอ, prov_th as จังหวัด, t_tot as ผลรวมประชากร FROM population WHERE prov_th = 'พิษณุโลก' ;

INSERT INTO hospital (gid, provcode, maincode, bed, name, lat, lon)
VALUES (‘40’,’65’,’14972’,’0’,’โรงพยาบาลมหาวิทยาลัยนเรศวร’,’ 16.748757’,’ 100.189647’);

UPDATE hospital
SET bed = ‘120’, name = ‘โรงพยาบาล มน.’
WHERE gid = ‘40’;


DELETE FROM hospital WHERE gid = ‘40’;
