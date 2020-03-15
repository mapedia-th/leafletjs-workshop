var mymap = L.map('mapid').setView([16.821317, 100.235372], 12);

var mapnik = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(mymap);
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
})
var ghyb = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    attributions: '&copy; <a href="https://www.google.co.th/maps/">Google</a>'
});
var gter = L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    attributions: '&copy; <a href="https://www.google.co.th/maps/">Google</a>'
});


var household = L.markerClusterGroup().addTo(mymap)
$.getJSON("/api_household", function (data) {
    console.log(data);

    var household_icon = L.icon({
        iconUrl: 'img/home.png',
        iconSize: [40, 40]
    });
    for (var i = 0; i < data.features.length; i++) {
        var a = data.features[i].geometry.coordinates
        var propertie = data.features[i].properties

        var popup = '<table class="table">\
        <thead>\
          <tr>\
            <th>คำอธิบาย</th>\
            <th>ข้อมูล</th>\
          </tr>\
        </thead>\
        <tbody>\
        <tr>\
          <td>รูปประจำตัว</td>\
          <td> <img src=" '+ propertie.pic_medium + '  " width="100%"></td>\
        </tr>\
        <tr>\
          <td>ชื่อ - นามสกุล</td>\
          <td>'+ propertie.fname + ' ' + propertie.sname + '</td>\
        </tr>\
        <tr>\
          <td>เพศ</td>\
          <td>'+ propertie.gender + '</td>\
        </tr>\
        <tr>\
          <td>อายุ</td>\
          <td>'+ propertie.age + '</td>\
        </tr>\
        <tr>\
          <td>wt</td>\
          <td>'+ propertie.wt + '</td>\
        </tr>\
        <tr>\
          <td>ht</td>\
          <td>'+ propertie.ht + '</td>\
        </tr>\
        <tr>\
          <td>tb_th</td>\
          <td>'+ propertie.tb_th + '</td>\
        </tr>\
        <tr>\
          <td>ap_th</td>\
          <td>'+ propertie.ap_th + '</td>\
        </tr>\
        </tbody>\
      </table>'
        var marker = L.marker(new L.LatLng(a[1], a[0]), { icon: household_icon })
            .bindPopup(popup)
            .addTo(household)
    }
})

var hospital = L.layerGroup().addTo(mymap)
var hospital_data = []
$.getJSON("/api_hospital", function (data) {
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var hospital_icon = L.icon({
                iconUrl: 'img/hospital.png',
                iconSize: [40, 40]
            });
            return new L.marker([latlng.lat, latlng.lng], {
                opacity: 1,
                icon: hospital_icon,
            });
        },
    }).addTo(hospital)
    hospital_data = data
})


var buffer = L.layerGroup().addTo(mymap)
$("#form_query").submit(function (event) {
    event.preventDefault();
    household.clearLayers();
    buffer.clearLayers();
    var disease = event.target.disease.value
    var gender = event.target.gender.value
    var radius = event.target.radius.value

    $.ajax({
        url: '/house_search',
        method: 'post',
        data: ({
            disease: disease,
            gender: gender,
            radius: radius
        }),
        success: function (data) {
            console.log(data);
            var household_icon = L.icon({
                iconUrl: 'img/home.png',
                iconSize: [40, 40]
            });

            for (var i = 0; i < data.features.length; i++) {
                var a = data.features[i].geometry.coordinates
                var propertie = data.features[i].properties

                var popup = '<table class="table">\
                <thead>\
                  <tr>\
                    <th>คำอธิบาย</th>\
                    <th>ข้อมูล</th>\
                  </tr>\
                </thead>\
                <tbody>\
                <tr>\
                  <td>รูปประจำตัว</td>\
                  <td> <img src=" '+ propertie.pic_medium + '  " width="100%"></td>\
                </tr>\
                <tr>\
                  <td>ชื่อ - นามสกุล</td>\
                  <td>'+ propertie.fname + ' ' + propertie.sname + '</td>\
                </tr>\
                <tr>\
                  <td>เพศ</td>\
                  <td>'+ propertie.gender + '</td>\
                </tr>\
                <tr>\
                  <td>อายุ</td>\
                  <td>'+ propertie.age + '</td>\
                </tr>\
                <tr>\
                  <td>wt</td>\
                  <td>'+ propertie.wt + '</td>\
                </tr>\
                <tr>\
                  <td>ht</td>\
                  <td>'+ propertie.ht + '</td>\
                </tr>\
                <tr>\
                  <td>tb_th</td>\
                  <td>'+ propertie.tb_th + '</td>\
                </tr>\
                <tr>\
                  <td>ap_th</td>\
                  <td>'+ propertie.ap_th + '</td>\
                </tr>\
                </tbody>\
              </table>'
                var marker = L.marker(new L.LatLng(a[1], a[0]), { icon: household_icon })
                    .bindPopup(popup)
                    .addTo(household)
            }
            if (radius != 0) {
                for (var i = 0; i < hospital_data.features.length; i++) {
                    var lat = hospital_data.features[i].geometry.coordinates[1]
                    var lon = hospital_data.features[i].geometry.coordinates[0]
                    L.circle([lat, lon], {
                        stroke: false,
                        fillColor: 'red',
                        fillOpacity: 0.3,
                        radius: radius
                    }).addTo(buffer);
                }
            }

        }, error: function () {
            console.log('error  data!');
        }
    })

})


var baseMaps = {
    "mapnik": mapnik,
    "CartoDB_DarkMatter": CartoDB_DarkMatter,
    "Google Hybrid": ghyb,
    "Google Terrain": gter
};
var overlayMaps = {
    'household': household,
    'hospital': hospital,
    'buffer': buffer
};
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(mymap);