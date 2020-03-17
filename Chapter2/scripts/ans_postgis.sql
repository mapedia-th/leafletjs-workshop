-- Exercise.1
SELECT rdlntype, SUM(ST_Length(ST_Transform(geom,32647))) AS length
FROM ways
GROUP BY rdlntype
ORDER BY length DESC;

-- Exercise.2
SELECT SUM(ST_Area(ST_Transform(geom,32647))) / 1600 AS Rai
FROM amphoe
WHERE amp_th = 'นครไทย';

-- Exercise.3
SELECT p.fclass, p.name, p.geom
FROM poi p
WHERE ST_DWithin(p.geom, (SELECT ST_Union(geom) 
		FROM ways 
		WHERE rdlnnamt = 'ทางหลวงแผ่นดินหมายเลข 12'),0.001) 
AND p.fclass = 'restaurant';
