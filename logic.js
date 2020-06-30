const opts = {
    key: 'l89NU2nczduLb4zwodOBPiTmZXF1Elx9',
    verbose: true,
    lat: (30.25 - 1.5),
    lon: -97.75, //ATX coordinates
    zoom: 8,
};

windyInit(opts, windyAPI => {

    const { map } = windyAPI; //.map is instance of Leaflet map

    console.log(windyAPI);

    L.popup()
        .setLatLng([30.25, -97.75])
        .setContent('Home')
        .openOn(map);
        
});

var map = L.map('windy').setView([51.505, -0.09], 13);

