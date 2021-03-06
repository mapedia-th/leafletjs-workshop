var mymap = L.map('mapid').setView([16.741170, 100.192108], 13);

L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    attributions: '&copy; <a href="https://www.google.co.th/maps/">Google</a>'
}).addTo(mymap);

var point = turf.point([100.192108, 16.741170]);
// console.log(point);
// var geojson = L.geoJson(point).addTo(mymap)

var line = turf.lineString([[100.183692, 16.746401], [100.195331, 16.767831], [100.214625, 16.761074]], {
    name: 'line'
});
// console.log(line);
// var geojson = L.geoJson(line).addTo(mymap)

var polygon = turf.polygon([[
    [
        100.18655776977539,
        16.751372605133916
    ],
    [
        100.19011974334717,
        16.74952335677951
    ],
    [
        100.1901626586914,
        16.748701462856012
    ],
    [
        100.18956184387207,
        16.747550805402405
    ],
    [
        100.18964767456055,
        16.74668780774876
    ],
    [
        100.19179344177246,
        16.743194682053716
    ],
    [
        100.19351005554199,
        16.740359038787155
    ],
    [
        100.1939821243286,
        16.73735896444993
    ],
    [
        100.1941967010498,
        16.73649592061665
    ],
    [
        100.19462585449217,
        16.735879458342335
    ],
    [
        100.19578456878662,
        16.73555067764719
    ],
    [
        100.19702911376953,
        16.735961653427477
    ],
    [
        100.19861698150635,
        16.736454823193746
    ],
    [
        100.1993465423584,
        16.73744115889682
    ],
    [
        100.19938945770264,
        16.739085040388055
    ],
    [
        100.19904613494873,
        16.741304257899912
    ],
    [
        100.1985740661621,
        16.7426604336514
    ],
    [
        100.1976728439331,
        16.744263174362437
    ],
    [
        100.19771575927734,
        16.744920705111202
    ],
    [
        100.19625663757323,
        16.747591900431217
    ],
    [
        100.19501209259033,
        16.749605545976692
    ],
    [
        100.19393920898436,
        16.749975396925
    ],
    [
        100.19235134124756,
        16.74952335677951
    ],
    [
        100.1909351348877,
        16.750016491430458
    ],
    [
        100.1872444152832,
        16.752441051550466
    ],
    [
        100.18655776977539,
        16.751372605133916
    ]
]], { name: 'poly1' });

// console.log(polygon);
// var geojson = L.geoJson(polygon).addTo(mymap)


// var centroid = turf.centroid(polygon);
// var geojson = L.geoJson(centroid).addTo(mymap)
// var geojson = L.geoJson(polygon).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())


// var from = turf.point([100.19325256347656, 16.741756317556643]);
// var to = turf.point([100.2608871459961, 16.817029809832597]);
// var options = { units: 'kilometers' };
// var distance = turf.distance(from, to, options);
// var geojson = L.geoJson(from).addTo(mymap)
// var geojson = L.geoJson(to).addTo(mymap)
// console.log(distance);




// var features = turf.featureCollection([
//     turf.point([100.17677307128906, 16.72367309469941], { "name": "Location A" }),
//     turf.point([100.2114486694336, 16.696051772358455], { "name": "Location B" }),
//     turf.point([100.30311584472655, 16.84824804297156], { "name": "Location C" })
// ]);
// var enveloped = turf.envelope(features);
// var geojson = L.geoJson(features).addTo(mymap)
// var geojson = L.geoJson(enveloped).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())




// var length = turf.length(line, { units: 'kilometers' });
// console.log(length);
// var geojson = L.geoJson(line).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())



// var buffered = turf.buffer(point, 500, { units: 'kilometers' });
// var geojson = L.geoJson(point).addTo(mymap)
// var geojson = L.geoJson(buffered).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())



// var points = turf.featureCollection([
//     turf.point([100.18711566925049, 16.75203011133075]),
//     turf.point([100.19179344177246, 16.749646640561995]),
//     turf.point([100.19484043121338, 16.749646640561995]),
//     turf.point([100.1894760131836, 16.74701656922089]),
//     turf.point([100.19011974334717, 16.749194599635885]),
//     turf.point([100.18647193908691, 16.75100275690014]),
// ]);
// var options = { units: 'miles', maxEdge: 1 };

// var hull = turf.convex(points, options);

// var geojson = L.geoJson(points).addTo(mymap)
// var geojson = L.geoJson(hull).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())




var polygon2 = turf.polygon([[
    [100.19303798675537, 16.741263161514286],
    [100.19119262695312, 16.740359038787155],
    [100.19145011901855, 16.737071283606536],
    [100.19346714019775, 16.73271492060529],
    [100.19479751586914, 16.732262839495974],
    [100.2019214630127, 16.736372628321345],
    [100.1999044418335, 16.74142754700361],
    [100.19956111907958, 16.7440987913205],
    [100.19801616668701, 16.743441257733952],
    [100.19840240478516, 16.742783721877252],
    [100.19638538360596, 16.742043991325044],
    [100.19389629364014, 16.742948106054254],
    [100.19248008728027, 16.742167279949925],
    [100.19303798675537, 16.741263161514286],
]]);
// var difference = turf.difference(polygon, polygon2);
// var geojson = L.geoJson(polygon).addTo(mymap)
// var geojson = L.geoJson(polygon2).addTo(mymap)
// var geojson = L.geoJson(difference).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())


// var features = turf.featureCollection([
//     polygon2,
//     polygon
// ]);
// var dissolved = turf.dissolve(features, { propertyName: 'combine' });
// var geojson = L.geoJson(dissolved).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())


// var intersection = turf.intersect(polygon, polygon2);
// var geojson = L.geoJson(intersection).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())



// var options = { tolerance: 0.001, highQuality: false };
// var simplified = turf.simplify(polygon, options);
// var geojson = L.geoJson(simplified).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())

// var union = turf.union(polygon, polygon2);
// var geojson = L.geoJson(union).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())

// var options = {
//     bbox: [100.181645, 16.732000, 100.204562, 16.754540]
// };
// var points = turf.randomPoint(50, options);
// var voronoiPolygons = turf.voronoi(points, options);
// var geojson = L.geoJson(points).addTo(mymap)
// var geojson = L.geoJson(voronoiPolygons).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())

// var explode = turf.explode(voronoiPolygons);
// var geojson = L.geoJson(explode).addTo(mymap)
// var geojson = L.geoJson(voronoiPolygons).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())


// var bbox = [99.811993, 16.324505, 101.355572, 17.815787];
// var cellSide = 10;
// var options = { units: 'kilometers' };
// var hexgrid = turf.hexGrid(bbox, cellSide, options);
// var geojson = L.geoJson(hexgrid).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())


// var grid = turf.pointGrid(bbox, cellSide, options);
// var geojson = L.geoJson(grid).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())


// var squareGrid = turf.squareGrid(bbox, cellSide, options);
// var geojson = L.geoJson(squareGrid).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())


// var triangleGrid = turf.triangleGrid(bbox, cellSide, options);
// var geojson = L.geoJson(triangleGrid).addTo(mymap)
// mymap.fitBounds(geojson.getBounds())




var food = {
    "type": "FeatureCollection",
    "name": "sci",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "ID": 1, "Name": "ร้านที่ 1", "Lat": 16.737768, "Long": 100.1993566 }, "geometry": { "type": "Point", "coordinates": [100.1993566, 16.737768] } },
        { "type": "Feature", "properties": { "ID": 2, "Name": "ร้านที่ 2", "Lat": 16.7448941, "Long": 100.1959841 }, "geometry": { "type": "Point", "coordinates": [100.1959841, 16.7448941] } },
        { "type": "Feature", "properties": { "ID": 3, "Name": "ร้านที่ 3", "Lat": 16.7461202, "Long": 100.1953973 }, "geometry": { "type": "Point", "coordinates": [100.1953973, 16.7461202] } },
        { "type": "Feature", "properties": { "ID": 4, "Name": "ร้านที่ 4", "Lat": 16.7456794, "Long": 100.1946128 }, "geometry": { "type": "Point", "coordinates": [100.1946128, 16.7456794] } },
        { "type": "Feature", "properties": { "ID": 5, "Name": "ร้านที่ 5", "Lat": 16.7456957, "Long": 100.1938836 }, "geometry": { "type": "Point", "coordinates": [100.1938836, 16.7456957] } },
        { "type": "Feature", "properties": { "ID": 6, "Name": "ร้านที่ 6", "Lat": 16.7465677, "Long": 100.1947774 }, "geometry": { "type": "Point", "coordinates": [100.1947774, 16.7465677] } },
        { "type": "Feature", "properties": { "ID": 7, "Name": "ร้านที่ 7", "Lat": 16.7465128, "Long": 100.1950677 }, "geometry": { "type": "Point", "coordinates": [100.1950677, 16.7465128] } },
        { "type": "Feature", "properties": { "ID": 8, "Name": "ร้านที่ 8", "Lat": 16.7473485, "Long": 100.1942845 }, "geometry": { "type": "Point", "coordinates": [100.1942845, 16.7473485] } },
        { "type": "Feature", "properties": { "ID": 9, "Name": "ร้านที่ 9", "Lat": 16.7466547, "Long": 100.1953561 }, "geometry": { "type": "Point", "coordinates": [100.1953561, 16.7466547] } },
        { "type": "Feature", "properties": { "ID": 10, "Name": "ร้านที่ 10", "Lat": 16.74819, "Long": 100.1969621 }, "geometry": { "type": "Point", "coordinates": [100.1969621, 16.74819] } },
        { "type": "Feature", "properties": { "ID": 11, "Name": "ร้านที่ 11", "Lat": 16.7484783, "Long": 100.1939818 }, "geometry": { "type": "Point", "coordinates": [100.1939818, 16.7484783] } },
        { "type": "Feature", "properties": { "ID": 12, "Name": "ร้านที่ 12", "Lat": 16.7487294, "Long": 100.1895568 }, "geometry": { "type": "Point", "coordinates": [100.1895568, 16.7487294] } },
        { "type": "Feature", "properties": { "ID": 13, "Name": "ร้านที่ 13", "Lat": 16.7480398, "Long": 100.1889932 }, "geometry": { "type": "Point", "coordinates": [100.1889932, 16.7480398] } },
        { "type": "Feature", "properties": { "ID": 14, "Name": "ร้านที่ 14", "Lat": 16.7479277, "Long": 100.1889241 }, "geometry": { "type": "Point", "coordinates": [100.1889241, 16.7479277] } },
        { "type": "Feature", "properties": { "ID": 15, "Name": "ร้านที่ 15", "Lat": 16.7473126, "Long": 100.1887012 }, "geometry": { "type": "Point", "coordinates": [100.1887012, 16.7473126] } },
        { "type": "Feature", "properties": { "ID": 16, "Name": "ร้านที่ 16", "Lat": 16.747685, "Long": 100.1885064 }, "geometry": { "type": "Point", "coordinates": [100.1885064, 16.747685] } },
        { "type": "Feature", "properties": { "ID": 17, "Name": "ร้านที่ 17", "Lat": 16.7459786, "Long": 100.1890103 }, "geometry": { "type": "Point", "coordinates": [100.1890103, 16.7459786] } },
        { "type": "Feature", "properties": { "ID": 18, "Name": "ร้านที่ 18", "Lat": 16.745742, "Long": 100.1890324 }, "geometry": { "type": "Point", "coordinates": [100.1890324, 16.745742] } },
        { "type": "Feature", "properties": { "ID": 19, "Name": "ร้านที่ 19", "Lat": 16.7462836, "Long": 100.1916942 }, "geometry": { "type": "Point", "coordinates": [100.1916942, 16.7462836] } },
        { "type": "Feature", "properties": { "ID": 20, "Name": "ร้านที่ 20", "Lat": 16.7464955, "Long": 100.1916986 }, "geometry": { "type": "Point", "coordinates": [100.1916986, 16.7464955] } },
        { "type": "Feature", "properties": { "ID": 21, "Name": "ร้านที่ 21", "Lat": 16.7464461, "Long": 100.1918518 }, "geometry": { "type": "Point", "coordinates": [100.1918518, 16.7464461] } },
        { "type": "Feature", "properties": { "ID": 22, "Name": "ร้านที่ 22", "Lat": 16.7468679, "Long": 100.1921847 }, "geometry": { "type": "Point", "coordinates": [100.1921847, 16.7468679] } },
        { "type": "Feature", "properties": { "ID": 23, "Name": "ร้านที่ 23", "Lat": 16.7471967, "Long": 100.1924147 }, "geometry": { "type": "Point", "coordinates": [100.1924147, 16.7471967] } },
        { "type": "Feature", "properties": { "ID": 24, "Name": "ร้านที่ 24", "Lat": 16.7472445, "Long": 100.1922682 }, "geometry": { "type": "Point", "coordinates": [100.1922682, 16.7472445] } },
        { "type": "Feature", "properties": { "ID": 25, "Name": "ร้านที่ 25", "Lat": 16.7440972, "Long": 100.1934722 }, "geometry": { "type": "Point", "coordinates": [100.1934722, 16.7440972] } },
        { "type": "Feature", "properties": { "ID": 26, "Name": "ร้านที่ 26", "Lat": 16.7459898, "Long": 100.1919859 }, "geometry": { "type": "Point", "coordinates": [100.1919859, 16.7459898] } },
        { "type": "Feature", "properties": { "ID": 27, "Name": "ร้านที่ 27", "Lat": 16.7425516, "Long": 100.193784 }, "geometry": { "type": "Point", "coordinates": [100.193784, 16.7425516] } },
        { "type": "Feature", "properties": { "ID": 28, "Name": "ร้านที่ 28", "Lat": 16.7414609, "Long": 100.1944693 }, "geometry": { "type": "Point", "coordinates": [100.1944693, 16.7414609] } },
        { "type": "Feature", "properties": { "ID": 29, "Name": "ร้านที่ 29", "Lat": 16.7418456, "Long": 100.1938282 }, "geometry": { "type": "Point", "coordinates": [100.1938282, 16.7418456] } },
        { "type": "Feature", "properties": { "ID": 30, "Name": "ร้านที่ 30", "Lat": 16.737585, "Long": 100.1988775 }, "geometry": { "type": "Point", "coordinates": [100.1988775, 16.737585] } },
        { "type": "Feature", "properties": { "ID": 31, "Name": "ร้านที่ 31", "Lat": 16.7440237, "Long": 100.1900564 }, "geometry": { "type": "Point", "coordinates": [100.1900564, 16.7440237] } }
    ]
}

var geojson = L.layerGroup().addTo(mymap)
var json_food = L.geoJson(food).addTo(geojson)
mymap.fitBounds(json_food.getBounds())

function onMapClick(e) {
    geojson.clearLayers()

    var point = turf.point([e.latlng.lng, e.latlng.lat]);
    var buffered = turf.buffer(point, 0.3, { units: 'kilometers' });
    var ptsWithin = turf.pointsWithinPolygon(food, buffered);
    for (var i = 0; i < ptsWithin.features.length; i++) {
        var greatCircle = turf.greatCircle(point, ptsWithin.features[i], { 'name': '' });
        L.geoJson(greatCircle).addTo(geojson)
    }

    L.geoJson(ptsWithin).addTo(geojson)
    L.geoJson(point).addTo(geojson)
    L.geoJson(buffered).addTo(geojson)

}

mymap.on('click', onMapClick);

