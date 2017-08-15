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
        center: [51.165, 10.455278],
        zoom: 5
    }
}

function init() {
    map = L.map('map');

    L.tileLayer(opt.map.url, opt.map.options).addTo(map);

    map.setView(opt.location.center, opt.location.zoom);
}

$(document).ready(function() {
    setTimeout('init()', 100);
});
