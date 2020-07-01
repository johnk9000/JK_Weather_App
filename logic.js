
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

var cityList = {
    "id": 4671654,
    "name": "Austin",
    "state": "TX",
    "country": "US",
    "coord": {
      "lon": -97.743057,
      "lat": 30.267151,
    }
}

//=========Open_Weather====================
var openOpts = {
    'key': 'fd15340e692655f40245e097f416fdec',
    'city': 'Austin',
    'state': 'TX',
    'country': 'US',
    'coord': {
        'lat': 30.25,
        'lon': -97.75,
    },
    'main': {
        'temp': 1,
        'feels_like': 2,
        'temp_min': 3,
        'temp_max': 4,
        'pressure': 5,
        'humidity': 6,
    }
};

let result;

var usrSearch = openOpts.city;
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + usrSearch + '&appid=c835e38833e917a2efa2b43399dae95e';//https://api.openweathermap.org/data/2.5/weather?id=4671654&appid=fd15340e692655f40245e097f416fdec
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(data) {
      console.log(data);
      result = data;

      openOpts.main.temp = result.main.temp;
     // openOpts.main.feels_like = response.main.feels_like;
      openOpts.main.temp_min = result.main.temp_min;
      openOpts.main.temp_max = result.main.temp_max;
      openOpts.main.pressure = result.main.pressure;
        openOpts.main.humidity = result.main.humidity;
  });
