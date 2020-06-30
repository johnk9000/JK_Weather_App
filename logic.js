
//==============Windy============================
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

//=========Open_Weather====================
const openOpts = {
    key: 'fd15340e692655f40245e097f416fdec',
    city: 'Austin',
    state: 'Texas',
    country: 'US',
    coord: {
        lat: 30.25,
        lon: -97.75,
    },
    main: {
        temp: 282.55,
        feels_like: 281.86,
        temp_min: 280.37,
        temp_max: 284.26,
        pressure: 1023,
        humidity: 100,
    }
};

let log;
var queryURL = '';

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      log = response;

      openOpts.main.temp = response.main.temp;
      openOpts.main.feels_like = response.main.feels_like;
      openOpts.main.temp_min = response.main.temp_min;
      openOpts.main.temp_max = response.main.temp_max;
      openOpts.main.pressure = response.main.pressure;
        openOpts.main.humidity = response.main.humidity;
  });
