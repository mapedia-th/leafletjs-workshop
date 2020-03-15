

--CREATE OR REPLACE VIEW age_14_ap AS 
select pop_age.amp_th, pop_age.amp_code, pop_age.prov_th, pop_age.prov_code, sum(age_0_14) as age_0_14,
       amphoe.gid, amphoe.id, amphoe.area, amphoe.geom
from pop_age
INNER JOIN amphoe ON pop_age.amp_code = amphoe.amp_code
group by  pop_age.prov_th, pop_age.amp_th, pop_age.amp_code, pop_age.prov_code,amphoe.gid, amphoe.id, amphoe.area, amphoe.geom

----------



--CREATE OR REPLACE VIEW age_59_ap AS 
select pop_age.amp_th, pop_age.amp_code, pop_age.prov_th, pop_age.prov_code, sum(age_15_59) as age_15_59,
       amphoe.gid, amphoe.id, amphoe.area, amphoe.geom
from pop_age
INNER JOIN amphoe ON pop_age.amp_code = amphoe.amp_code
group by  pop_age.prov_th, pop_age.amp_th, pop_age.amp_code, pop_age.prov_code,amphoe.gid, amphoe.id, amphoe.area, amphoe.geom

-----------



--CREATE OR REPLACE VIEW age_101_ap AS 
select pop_age.amp_th, pop_age.amp_code, pop_age.prov_th, pop_age.prov_code, sum(age_60_101) as age_60_101,
       amphoe.gid, amphoe.id, amphoe.area, amphoe.geom
from pop_age
INNER JOIN amphoe ON pop_age.amp_code = amphoe.amp_code
group by  pop_age.prov_th, pop_age.amp_th, pop_age.amp_code, pop_age.prov_code,amphoe.gid, amphoe.id, amphoe.area, amphoe.geom

-----------
