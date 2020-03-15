const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());

const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'leaflet_2020',
    password: '1234',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/www'));
app.listen(3000, () => {
    console.log('run on port 3000..')
})


app.get('/api_province', (req, res) => {

    sql = 'select  pv_th,count(*) ,ST_AsGeoJSON(b.geom) AS geojson \
    from modis_join a  \
    inner join province b on a.pv_th = b.pv_tn \
    group by pv_th ,b.geom order by count desc limit 100 ';

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

app.post('/province_search', async (req, res) => {
    const {
        province,
        start_date,
        end_date
    } = req.body;

    const sql = {
        text: 'select  pv_th,count(*) ,ST_AsGeoJSON(b.geom) AS geojson \
        from modis_join a  \
        inner join province b on a.pv_th = b.pv_tn \
        where a.pv_th like $1 and acq_date between  $2 and $3 \
        group by pv_th ,b.geom order by count desc limit 100;',
        values: [`%${province}%`, `${start_date}`, `${end_date}`],
    }

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
})

app.get('/api_point_hotspot', (req, res) => {
    sql = 'select  * ,ST_AsGeoJSON(geom) AS geojson \
    from modis_join   ';
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




