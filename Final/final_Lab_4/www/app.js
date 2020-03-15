var mymap = L.map('mapid').setView([51.505, -0.09], 13);

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(mymap);

var ghyb = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    attributions: '&copy; <a href="https://www.google.co.th/maps/">Google</a>'
});
var gter = L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    attributions: '&copy; <a href="https://www.google.co.th/maps/">Google</a>'
});

var prov = L.tileLayer.wms("http://119.59.125.189/mapservice/gis/wms?", {
    layers: 'gis:prov_thailand',
    format: 'image/png',
    attribution: '&copy; <a href="https://mapedia.co.th/">MAPEDIA</a>',
    transparent: true,
}).addTo(mymap);

L.control.locate({
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(mymap);



var map_hotspot = L.layerGroup().addTo(mymap);
$.getJSON("/api_province", function (data) {
    console.log(data);
    var geojson = L.geoJson(data, {
        style: style
    })
    geojson.addTo(map_hotspot);
    mymap.fitBounds(geojson.getBounds())

    var categories = []
    var data_chart = []
    var tb_data = ''
    for (var i = 0; i < 10; i++) {
        categories.push(data.features[i].properties.pv_th);
        data_chart.push(parseInt(data.features[i].properties.count));
        tb_data += '<tr>  <td> ' + data.features[i].properties.pv_th + '</td >  <td>' + data.features[i].properties.count + '</td>  </tr > '
    }
    document.getElementById("tb_data").innerHTML = tb_data


    Highcharts.chart('chart-container', {
        chart: {
            backgroundColor: {
                stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                ]
            },
            type: 'column'
        },
        title: {
            text: ''
        },
        legend: {
            itemStyle: {
                'color': '#ffffff',
                'font-family': 'Kanit'
            }
        },
        xAxis: {
            categories: categories,
            labels: {
                style: {
                    color: '#ffffff',
                }
            },
            crosshair: true
        },
        yAxis: {
            title: {
                text: '',
                style: {
                    color: '#ffffff',
                }
            }, labels: {
                style: {
                    color: '#ffffff',
                }
            },
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
            shared: true,
            valueSuffix: ' point'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'MODIS',
            data: data_chart,
            color: '#F0AC4E'

        }]
    });


    var all_point = []
    var option_province = '<option value="">ทั้งหมด</option>'
    for (var i = 0; i < data.features.length; i++) {
        all_point.push(data.features[i].properties.count)
        option_province += '<option value="' + data.features[i].properties.pv_th + '">' + data.features[i].properties.pv_th + '</option> <br>'

    }
    var sum_point = eval(all_point.join('+'))
    document.getElementById("all_point").innerHTML = 'จำนวนจุดความร้อนทั้งหมด : ' + sum_point + ' จุด'
    document.getElementById("list_province").innerHTML = option_province


})




function style(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: '#ecf2f9',
        dashArray: '3',
        fillOpacity: 1,
        fillColor: getColor(feature.properties.count)
    };
}
function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
            d > 200 ? '#E31A1C' :
                d > 100 ? '#FC4E2A' :
                    d > 50 ? '#FD8D3C' :
                        d > 20 ? '#FEB24C' :
                            d > 10 ? '#FED976' :
                                '#FFEDA0';
}


$(document).ready(function () {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [10, 20, 100, 200, 500, 1000],
        labels = [],
        from, to;
    document.getElementById("custom-map-controls").innerHTML = labels;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1] - 1;
        labels.push(
            '<i style="background:' + getColor(from + 0.5) + '"></i> ' + from + (to ? '&ndash;' + to : '+ '));
    }
    div.innerHTML = labels.join('<br>');
    document.getElementById("custom-map-controls").innerHTML = labels.join('<br>');
    return div;
});

$("#form_query").submit(function (event) {
    event.preventDefault();
    map_hotspot.clearLayers();

    var province = event.target.province.value
    var start_date = event.target.start_date.value
    var end_date = event.target.end_date.value

    $.ajax({
        url: '/province_search',
        method: 'post',
        data: ({
            province: province,
            start_date: start_date,
            end_date: end_date
        }),
        success: function (data) {

            var geojson = L.geoJson(data, {
                style: style
            })
            geojson.addTo(map_hotspot);
            mymap.fitBounds(geojson.getBounds())

            var categories = []
            var data_chart = []
            var tb_data = ''
            for (var i = 0; i < data.features.length; i++) {
                categories.push(data.features[i].properties.pv_th);
                data_chart.push(parseInt(data.features[i].properties.count));
                tb_data += '<tr>  <td> ' + data.features[i].properties.pv_th + '</td >  <td>' + data.features[i].properties.count + '</td>  </tr > '
            }
            document.getElementById("tb_data").innerHTML = tb_data
            var all_point = []
            for (var i = 0; i < data.features.length; i++) {
                all_point.push(data.features[i].properties.count)
            }

            var sum_point = eval(all_point.join('+'))
            document.getElementById("all_point").innerHTML = 'จำนวนจุดความร้อนทั้งหมด : ' + sum_point + ' จุด'

            Highcharts.chart('chart-container', {
                chart: {
                    backgroundColor: {
                        stops: [
                            [0, '#2a2a2b'],
                            [1, '#3e3e40']
                        ]
                    },
                    type: 'column'
                },
                title: {
                    text: ''
                },
                legend: {
                    itemStyle: {
                        'color': '#ffffff',
                        'font-family': 'Kanit'
                    }
                },
                xAxis: {
                    categories: categories,
                    labels: {
                        style: {
                            color: '#ffffff',
                        }
                    },
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: '',
                        style: {
                            color: '#ffffff',
                        }
                    }, labels: {
                        style: {
                            color: '#ffffff',
                        }
                    },
                },
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' point'
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'MODIS',
                    data: data_chart,
                    color: '#F0AC4E'

                }]
            });

        }, error: function () {
            console.log('error  data!');
        }
    })

})


var hexgrid = L.layerGroup()
$.getJSON("/api_point_hotspot", function (data) {
    console.log(data);
    var bbox = [105.637024930, 21.080008, 97.343701921, 5.192359]
    var cellSide = 50;
    var units = 'kilometers';
    var t_hexgrid = turf.hexGrid(bbox, cellSide, units);
    L.geoJson(count, {
        style: GridStyle
    }).addTo(hexgrid)

    function GridStyle(feature) {
        return {
            fillColor: getColor(feature.properties.point),
            weight: 0,
            opacity: 1,
            color: 'white',
            fillOpacity: getopacity(feature.properties.point)
        };
    }
    function getopacity(y) {
        return y == 0 ? 0 :
            1;
    }
})


var baseMaps = {
    "CartoDB_DarkMatter": CartoDB_DarkMatter,
    "Google Hybrid": ghyb,
    "Google Terrain": gter
};
var overlayMaps = {
    'prov': prov,
    'map_hotspot': map_hotspot,
    'hexgrid': hexgrid
};
L.control.layers(baseMaps, overlayMaps).addTo(mymap);













