-- 7.1 Start Postgis
SELECT postgis_full_version();

-- 7.2 Geometry Objects
-- example
CREATE TABLE geometries (name varchar, geom geometry);

INSERT INTO geometries VALUES
  ('Point', 'POINT(0 0)'),
  ('Linestring', 'LINESTRING(0 0, 1 1, 2 1, 2 2)'),
  ('Polygon', 'POLYGON((0 0, 1 0, 1 1, 0 1, 0 0))'),
  ('PolygonWithHole', 'POLYGON((0 0, 10 0, 10 10, 0 10, 0 0),(1 1, 1 2, 2 2, 2 1, 1 1))'),
  ('Collection', 'GEOMETRYCOLLECTION(POINT(2 0),POLYGON((0 0, 1 0, 1 1, 0 1, 0 0)))');

SELECT name, ST_AsText(geom) FROM geometries;

-- Create Table Point
CREATE TABLE point (id integer, p_name varchar(50), geom geometry(POINT, 4326));

INSERT INTO point(id, p_name, geom) VALUES (1, 'MAPEDIA Workspace', ST_GeomFromText('POINT(100.191781 16.741732)', 4326));
INSERT INTO point(id, p_name, geom) VALUES (2, 'Phitsanulok Airport', ST_GeomFromText('POINT(100.278178 16.783647)',4326));

-- Create Table Linestring
CREATE TABLE trans (id integer, r_name varchar(50), geom geometry(LINESTRING,4326));

INSERT INTO trans(id, r_name, geom) VALUES (1, 'trans-no1', ST_GeomFromText('LINESTRING (100.195330 16.768094, 100.182625 16.744542, 100.179696 16.736981)',4326));
INSERT INTO trans(id, r_name, geom) VALUES (2, 'trans-no2', ST_GeomFromText('LINESTRING (100.215040 16.760632, 100.263804 16.756872, 100.305111 16.754764, 100.331450 16.795192)',4326));

-- Create Table Polygon
CREATE TABLE polygon (id integer, pl_name varchar(50), geom geometry(POLYGON, 4326));

INSERT INTO polygon(id, pl_name, geom) VALUES (1, 'polygon1', ST_GeomFromText('POLYGON ((100.282702 16.765242, 100.291548 16.770246, 100.274220 16.796035, 100.265901 16.789726, 100.282702 16.765242))', 4326));
INSERT INTO polygon(id, pl_name, geom) VALUES (2, 'polygon2', ST_GeomFromText('POLYGON ((100.191673 16.743723, 100.195280 16.745630, 100.195784 16.744773, 100.194817 16.744228, 100.194817 16.744228, 100.193997 16.743049, 100.192566 16.742340, 100.191673 16.743723))', 4326));

-- 7.3 Coordinate Transform
SELECT proj4text FROM spatial_ref_sys WHERE srid = 4326;

SELECT ST_AsText(ST_Transform(ST_GeomFromText('POINT(627041.307 1852064.295)',32647),4326));

SELECT ST_AsText(ST_Transform (geom, 32647)) FROM village LIMIT 5;

SELECT gid, vill_nam_t, ST_AsText(ST_Transform (geom, 3857)) FROM village LIMIT 5;

-- project testing
-- ADD Column
ALTER TABLE poi ADD lat numeric(10,7);
ALTER TABLE poi ADD lon numeric(10,7);
ALTER TABLE poi ADD utm_e numeric(19,5);
ALTER TABLE poi ADD utm_n numeric(19,5);

-- Calculate lat, lon coordinate
UPDATE poi SET lon = ST_X(geom);
UPDATE poi SET lat = ST_Y(geom);

-- Calculate utm coordinate
UPDATE poi SET utm_e = ST_X(ST_Transform(geom,32647));
UPDATE poi SET utm_n = ST_Y(ST_Transform(geom,32647));

SELECT * FROM poi LIMIT 100;

-- 7.4 Geometries
SELECT * FROM geometry_columns;

SELECT ST_GeometryType(geom) FROM ways;

SELECT ST_SRID(geom) FROM ways LIMIT 10;

SELECT vill_nam_t, ST_AsText(geom) FROM village;

SELECT vill_nam_t, ST_X(geom), ST_Y(geom) FROM village LIMIT 5;

SELECT vill_nam_t, ST_X(geom), ST_Y(geom),ST_AsText(geom)  FROM village LIMIT 5;

SELECT COUNT(*) FROM village;

-- Centroid
SELECT gid, name, fclass, ST_Y(ST_Centroid(geom)) AS lat,
ST_X(ST_Centroid(geom)) AS lon
FROM building;

-- PointOnSurface
SELECT gid, name, fclass, ST_Y(ST_PointOnSurface(geom)) AS lat,
ST_X(ST_PointOnSurface(geom)) AS lon
FROM building;

-- ST_StartPoint, ST_EndPoint
SELECT name,
 ST_AsText(ST_StartPoint(geom)) AS first_coord,
 ST_AsText(ST_EndPoint(geom)) AS last_coord,
 ST_NPoints(geom) AS number_coord
FROM trans 
WHERE id = 1;


-- ST_Length(geometry);
SELECT ST_Length(geom) FROM ways WHERE rdlnname = 'HIGHWAY 12'; -- crs epsg:4326
SELECT ST_Length(ST_Transform(geom,32647)) FROM ways WHERE rdlnname = 'HIGHWAY 12'; -- crs epsg:32647

-- ST_Perimeter(geometry);
SELECT tb_code, tb_th, ST_Perimeter(geom) FROM tambon WHERE tam_th = 'ท่าโพธิ์';
SELECT tb_code, tb_th, ST_Perimeter(ST_Transform(geom,32647)) FROM tambon WHERE tam_th = 'ท่าโพธิ์';

-- ST_Area(geometry);
SELECT tb_code, tb_th, ST_Area(geom) FROM tambon;
SELECT tb_code, tb_th, ST_Area(ST_Transform(geom,32647)) FROM tambon;

-- 7.5 Spatial Relationships
--ST_Equals
SELECT fclass, name
FROM poi
WHERE ST_Equals(geom, ST_AsEWKB(ST_GeomFromText('POINT(100.2596266 16.8196515)',4326)));

--ST_Crosses
SELECT t.tam_code, t.tam_th, t.amp_th, t.geom
FROM ways r, tambon t
WHERE ST_Crosses(r.geom, t.geom) AND r.rdlnnum = '117';

--ST_Contains
SELECT b.gid, b.osm_id, b.fclass, b.name, b.geom
FROM land l, building b
WHERE ST_Contains(l.geom, b.geom) AND l.name = 'โรงพยาบาลพุทธชินราช';

--ST_Intersects
SELECT r.rdlnnum, r.rdlnname, w.name, w.fclass, ST_AsText(ST_Intersection(r.geom,w.geom)) AS coord
FROM ways r, water_way w
WHERE ST_Intersects(r.geom,w.geom);

--ST_Distance
-- crs epsg:4326 
SELECT a.vill_nam_t, b.name, ST_Distance(a.geom, b.geom)
FROM village a, hospital b LIMIT 10; 

-- crs epsg:32647
SELECT a.vill_nam_t, b.name,
ST_Distance(ST_Transform(a.geom,32647), ST_Transform(b.geom,32647)) AS dist
FROM village a, hospital b LIMIT 10; 

SELECT a.vill_nam_t, b.name,
ST_Distance(ST_Transform(a.geom,32647), ST_Transform(b.geom,32647)) AS dist
FROM village a, hospital b 
WHERE a.vill_nam_t = 'บ้านจูงนาง' 
ORDER BY dist ASC 
LIMIT 10;

-- project testing
SELECT vill_nam_t, ST_AsText(ST_Transform(geom,32647))
FROM village WHERE gid=13;

Vill_nam_t |   	          st_astext                   |
-----------+------------------------------------------+
 บ้านกร่าง	   | POINT(628776.407486442 1864386.91110039) | 

SELECT name,
ST_Distance(ST_Transform(geom,32647),ST_GeomFromText('POINT(628776.407486442 1864386.91110039)',32647)) / 1000 AS dist_km
FROM hospital
ORDER BY dist_km ASC 
LIMIT 3

--ST_DWithin
SELECT maincode, name, geom
	FROM hospital 
	WHERE ST_DWithin(
		ST_Transform(geom,32647),
		ST_GeomFromText('POINT(640332 1858360)',32647),10000);

--ST_Within
--ex1
SELECT h.name, a.amp_th 
FROM hospital h, amphoe a 
WHERE ST_Within(h.geom, a.geom);

--ex2
SELECT h.name,h.maincode, h.geom
FROM hospital h
WHERE ST_Within(h.geom, (SELECT geom FROM amphoe WHERE amp_code = '6501'));

-- ST_Buffer
-- crs epsg:4326 
SELECT gid, maincode, name, ST_Buffer(geom, 0.1) AS geom FROM hospital WHERE maincode=10735;

-- ST_Distance(geometry A, geometry B);
SELECT a.vill_nam_t, b.name, ST_Distance(a.geom, b.geom) FROM village a, hospital b LIMIT 10;

SELECT a.vill_nam_t, b.name, ST_Distance(ST_Transform(a.geom,32647), ST_Transform(b.geom,32647)) FROM village a, hospital b LIMIT 10;

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

-- ST_Overlaps
-- Check overlap area
SELECT * 
FROM land l, building b 
WHERE ST_Overlaps(l.geom,b.geom) = TRUE
AND l.gid <> b.gid;

-- Calculate overlap area
SELECT b.name, 
ST_Area(ST_Transform(ST_Intersection(l.geom,b.geom),32647)) AS area_intersect,
ST_Area(ST_Transform(b.geom,32647)) AS area_building
FROM land l, building b
WHERE ST_Overlaps(l.geom,b.geom);


-- JOIN population
CREATE VIEW pop_59 AS
SELECT t.gid, t.tam_code, t.tam_th, t.amp_th, t.prov_th, p.m_tot, p.f_tot, p.t_tot, t.geom
FROM tambon t
JOIN  population p ON t.tam_code = p.tam_code
