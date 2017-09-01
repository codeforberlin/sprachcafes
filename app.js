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
    location: {
        center: [51.165, 10.455278], // Germany
        zoom: 5
    },
    locate_control: {
        locateOptions: {
            maxZoom: 12
        }
    }
}

function init() {
    map = L.map('map');

    L.tileLayer(opt.map.url, opt.map.options).addTo(map);

    map.setView(opt.location.center, opt.location.zoom);

    var locate_control = L.control.locate(opt.locate_control);

    map.addControl(locate_control);

    locate_control.start();

    $.ajax({
        type: 'GET',
        url: 'sprachcafes.txt',
        dataType: 'text',
        success: function(csv) {
            var data = $.csv.toArrays(csv, {
                separator: '\t'
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
                    district = values[10],
                    link = values[13],
                    facebook_link = values[14],
                    contact = values[15],
                    mail = values[16],
                    phone = values[17]
                    comment_venue = values[18],
                    comment_group = values[19],
                    comment_time = values[20];

                var address = street + ', ' + plz + ' ' + city;

                var html = '<div>';
                html += '<h6>' + title + '</h6>';
                html += '<p>' + venue + '</p>';
                html += '<p>' + address + '</p>';
                html += '<p>Geöffnet: ' + day + '., ' + opens + ' Uhr - ' + closes + ' Uhr';

                if (link) {
                    html += '<p><a href="' + link + '">' + link + '</a></p>';
                }
                if (facebook_link) {
                    html += '<p><a href="' + facebook_link + '">' + facebook_link + '</a></p>';
                }
                if (contact) {
                    html += '<p>Kontakt: ' + contact + '</p>';
                }
                if (mail) {
                    html += '<p>Email: ' + mail + '</p>';
                }
                if (phone) {
                    html += '<p>Telefon: ' + phone + '</p>';
                }
                if (comment_venue) {
                    html += '<p>' + comment_venue + '</p>';
                }
                if (comment_group) {
                    html += '<p>' + comment_group + '</p>';
                }
                if (comment_time) {
                    html += '<p>' + comment_time + '</p>';
                }

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
