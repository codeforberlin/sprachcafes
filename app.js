var map;
var opt = {
    map: {
        url: 'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        options: {
            'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> | contributors <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> | Tiles © <a href="http://cartodb.com/attributions">CartoDB</a>',
            'minZoom': 6,
            'maxZoom': 15
        }
    },
    // location: {
    //     center: [51.165, 10.455278], // Germany
    //     zoom: 5
    // },
    location: {
        center: [52.518611, 13.408333], // Berlin
        zoom: 12
    }
}

function init() {
    map = L.map('map');

    L.tileLayer(opt.map.url, opt.map.options).addTo(map);

    map.setView(opt.location.center, opt.location.zoom);

    $.ajax({
        type: 'GET',
        url: 'sprachcafes.csv',
        dataType: 'text',
        success: function(csv) {
            var data = $.csv.toArrays(csv, {
                separator: ';'
            });

            $.each(data, function (key, values) {

                var lat = parseFloat(values[11].replace(',', '.')),
                    lon = parseFloat(values[12].replace(',', '.'));

                var day = values[1],
                    opens = values[2],
                    closes = values[3],
                    type = values[4]
                    title = values[5],
                    venue = values[6],
                    street = values[7],
                    plz = values[8],
                    city = values[9],
                    district = values[10];

                var address = street + ', ' + plz + ' ' + city;

                var html = '<div>';
                html += '<h6>' + title + '</h6>';
                html += '<p>' + venue + '</p>';
                html += '<p>' + address + '</p>';
                html += '<p>Geöffnet: ' + day + '., ' + opens + ' Uhr - ' + closes + ' Uhr';

                if (!isNaN(lat) && !isNaN(lon)) {
                    var marker = L.marker([lon, lat]).addTo(map);
                    marker.bindPopup(html);
                }
            });
        }
    });
}

$(document).ready(function() {
    setTimeout('init()', 100);
});
