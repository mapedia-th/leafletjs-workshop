const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'leaflet_2020',
    password: '1234',
});

app.use(express.static(__dirname + '/www'));
app.listen(3000, () => {
    console.log('run on port 3000..')
})

app.get('/api_household', (req, res) => {
    sql = 'SELECT *,ST_AsGeoJSON(geom) AS geojson  FROM patient_households    ';
    let jsonFeatures = [];
    db.query(sql).then((data) => {
        var rows = data.rows;
        rows.forEach((e) => {
            let feature = {
                type: 'Feature',
                geometry: JSON.parse(e.geojson),
                properties: e
            };
            jsonFeatures.push(feature);
        });
        let geoJson = {
            type: 'FeatureCollection',
            features: jsonFeatures
        };
        res.status(200).json(geoJson);
    });
});

app.get('/api_hospital', (req, res) => {
    sql = 'SELECT *,ST_AsGeoJSON(geom) AS geojson  FROM hospital     ';
    let jsonFeatures = [];
    db.query(sql).then((data) => {
        var rows = data.rows;
        rows.forEach((e) => {
            let feature = {
                type: 'Feature',
                geometry: JSON.parse(e.geojson),
                properties: e
            };
            jsonFeatures.push(feature);
        });
        let geoJson = {
            type: 'FeatureCollection',
            features: jsonFeatures
        };
        res.status(200).json(geoJson);
    });
});

app.post('/house_search', async (req, res) => {
    const {
        disease,
        gender,
        radius
    } = req.body;

    if (radius != 0) {

        if (disease == 'p_ht') {
            var text = "SELECT *,ST_AsGeoJSON(a.geom) AS geojson  FROM patient_households a \
            inner join hospital b on ST_DWithin(a.geom::geography, b.geom::geography, $2) \
            where p_ht = 1 and  gender like $1  "

        } else if (disease == 'p_dm') {
            var text = "SELECT *,ST_AsGeoJSON(a.geom) AS geojson  FROM patient_households a \
            inner join hospital b on ST_DWithin(a.geom::geography, b.geom::geography, $2) \
            where p_dm = 1 and  gender like $1 "

        } else if (disease == 'p_hf') {
            var text = "SELECT *,ST_AsGeoJSON(a.geom) AS geojson  FROM patient_households a \
            inner join hospital b on ST_DWithin(a.geom::geography, b.geom::geography, $2) \
            where p_hf = 1 and  gender like $1 "

        } else {
            var text = "SELECT *,ST_AsGeoJSON(a.geom) AS geojson  FROM patient_households a \
            inner join hospital b on ST_DWithin(a.geom::geography, b.geom::geography, $2) \
            where gender like $1 "
        }
        const sql = {
            text: text,
            values: [`${gender}`, radius],
        }
        console.log(sql);
        let jsonFeatures = [];
        db.query(sql).then((data) => {
            var rows = data.rows;
            rows.forEach((e) => {
                let feature = {
                    type: 'Feature',
                    geometry: JSON.parse(e.geojson),
                    properties: e
                };
                jsonFeatures.push(feature);
            });
            let geoJson = {
                type: 'FeatureCollection',
                features: jsonFeatures
            };
            res.status(200).json(geoJson);
        });
    } else {

        if (disease == 'p_ht') {
            var text = "SELECT *,ST_AsGeoJSON(geom) AS geojson  FROM patient_households   where p_ht = 1 and  gender like $1  "

        } else if (disease == 'p_dm') {
            var text = "SELECT *,ST_AsGeoJSON(geom) AS geojson  FROM patient_households where p_dm = 1 and  gender like $1 "

        } else if (disease == 'p_hf') {
            var text = "SELECT *,ST_AsGeoJSON(geom) AS geojson  FROM patient_households  where p_hf = 1 and  gender like $1 "

        } else {
            var text = "SELECT *,ST_AsGeoJSON(geom) AS geojson  FROM patient_households where gender like $1 "
        }
        const sql = {
            text: text,
            values: [`${gender}`],
        }
        console.log(sql);
        let jsonFeatures = [];
        db.query(sql).then((data) => {
            var rows = data.rows;
            rows.forEach((e) => {
                let feature = {
                    type: 'Feature',
                    geometry: JSON.parse(e.geojson),
                    properties: e
                };
                jsonFeatures.push(feature);
            });
            let geoJson = {
                type: 'FeatureCollection',
                features: jsonFeatures
            };
            res.status(200).json(geoJson);
        });
    }


})
