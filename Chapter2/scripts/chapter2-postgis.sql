-- 7.1 Start Postgis
SELECT postgis_full_version();

-- 7.2 Geometry Objects
-- Create Table Point
CREATE TABLE poi (id integer, p_name varchar(50), geom geometry(POINT, 4326));
INSERT INTO poi(id, p_name, geom) VALUES (1, 'GISTNU', ST_GeomFromText('POINT(100.192222 16.742397)', 4326));
INSERT INTO poi(id, p_name, geom) VALUES (2, 'Phitsanulok Airport', ST_GeomFromText('POINT(100.278178 16.783647)',4326));

-- Create Table Linestring
CREATE TABLE road (id integer, r_name varchar(50), geom geometry(LINESTRING,4326));
INSERT INTO road(id, r_name, geom) VALUES (1, 'road1', ST_GeomFromText('LINESTRING (100.195330 16.768094, 100.182625 16.744542, 100.179696 16.736981)',4326));
INSERT INTO road(id, r_name, geom) VALUES (2, 'road2', ST_GeomFromText('LINESTRING (100.215040 16.760632, 100.263804 16.756872, 100.305111 16.754764, 100.331450 16.795192)',4326));

-- Create Table Polygon
CREATE TABLE polygon (id integer, pl_name varchar(50), geom geometry(POLYGON, 4326));
INSERT INTO polygon(id, pl_name, geom) VALUES (1, 'polygon1', ST_GeomFromText('POLYGON ((100.282702 16.765242, 100.291548 16.770246, 100.274220 16.796035, 100.265901 16.789726, 100.282702 16.765242))', 4326));
INSERT INTO polygon(id, pl_name, geom) VALUES (2, 'polygon2', ST_GeomFromText('POLYGON ((100.191673 16.743723, 100.195280 16.745630, 100.195784 16.744773, 100.194817 16.744228, 100.194817 16.744228, 100.193997 16.743049, 100.192566 16.742340, 100.191673 16.743723))', 4326));

-- 7.3 Coordinate Transform
SELECT proj4text FROM spatial_ref_sys WHERE srid = 4326;
SELECT ST_AsText(ST_Transform(ST_GeomFromText('POINT(627041.307 1852064.295)',32647),4326));
SELECT ST_AsText(ST_Transform (geom, 32647)) FROM village LIMIT 5;
SELECT gid, vill_nam_t, ST_AsText(ST_Transform (geom, 3857)) FROM village LIMIT 5;

-- 7.4 Geometries
SELECT * FROM geometry_columns;
SELECT ST_GeometryType(geom) FROM ways;
SELECT ST_SRID(geom) FROM ways LIMIT 10;
SELECT vill_nam_t, ST_AsText(geom) FROM village;
SELECT vill_nam_t, ST_X(geom), ST_Y(geom) FROM village LIMIT 5;
SELECT vill_nam_t, ST_X(geom), ST_Y(geom),ST_AsText(geom)  FROM village LIMIT 5;
SELECT COUNT(*) FROM village;

-- ST_Length(geometry);
SELECT ST_Length(geom) FROM ways WHERE rdlnname = 'HIGHWAY 12'; -- crs epsg:4326
SELECT ST_Length(ST_Transform(geom,32647)) FROM ways WHERE rdlnname = 'HIGHWAY 12'; -- crs epsg:32647

-- ST_Perimeter(geometry);
SELECT tam_code, tam_th, ST_Perimeter(geom) FROM tambon WHERE tam_th = 'ท่าโพธิ์';
SELECT tam_code, tam_th, ST_Perimeter(ST_Transform(geom,32647)) FROM tambon WHERE tam_th = 'ท่าโพธิ์';

-- ST_Area(geometry);
SELECT tam_code, tam_th, ST_Area(geom) FROM tambon;
SELECT tam_code, tam_th, ST_Area(ST_Transform(geom,32647)) FROM tambon;

-- 7.5 Spatial Relationships
-- ST_Distance(geometry A, geometry B);
SELECT a.vill_nam_t, b.name, ST_Distance(a.geom, b.geom) FROM village a, hospital b LIMIT 10;
-- SELECT a.vill_nam_t, b.name, ST_Distance(ST_Transform(a.geom,32647), ST_Transform(b.geom,32647)) FROM village a, hospital b LIMIT 10;

-- ST_Buffer(geometry g1, float radius_of_buffer);
SELECT gid, name, ST_Buffer(geom, 0.1) AS geom FROM hospital;

-- ST_Within(geometry A, geometry B);
SELECT h.name, t.tam_th, amp_th FROM hospital h, tambon t WHERE ST_Within(h.geom, t.geom);

SELECT gid, name FROM hospital WHERE ST_DWithin(geom, ST_GeomFromText('POINT(100.29876 16.81760)',4326),0.04);

-- ST_Intersects( geometry geomA , geometry geomB );
-- type I
-- DROP TABLE nuhp_b10km;
CREATE TABLE nuhp_b10km AS
SELECT gid, name, ST_Buffer(geom,0.1) AS geom
FROM hospital WHERE name = 'โรงพยาบาลมหาวิทยาลัยนเรศวร';

SELECT COUNT(r.geom),SUM(ST_Length(r.geom)) as degree, SUM(ST_Length(ST_Transform(r.geom,32647))) as meter
FROM ways r, nuhp_b10km b
WHERE ST_Intersects(r.geom,b.geom);

-- type II
WITH hbuffer AS(
	SELECT gid, name, ST_Buffer(geom,0.1) AS geom
	FROM hospital WHERE name = 'โรงพยาบาลมหาวิทยาลัยนเรศวร'
	)
SELECT COUNT(r.geom),SUM(ST_Length(r.geom)) as degree, SUM(ST_Length(ST_Transform(r.geom,32647))) as meter
FROM ways r, hbuffer b
WHERE ST_Intersects(r.geom,b.geom);

-- JOIN population
CREATE VIEW pop_59 AS
SELECT t.gid, t.tam_code, t.tam_th, t.amp_th, t.prov_th, p.m_tot, p.f_tot, p.t_tot, t.geom
FROM tambon t
JOIN  population p ON t.tam_code = p.tam_code
