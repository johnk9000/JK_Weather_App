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
    'weather': 'clear',
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
var binGen = $('.bins');
var locateSearch = $('#localSearch');
var localeGen = $('#locale-');

var destination = ['Austin', 'Pensacola', 'Lompoc'];



function renderBins(){
    //var destination = ['Austin, TX', 'Pensacola, FL', 'Lompoc, CA'];

    let len = destination.length;
    var binSpot = $('.aside-cont');

    binSpot.empty();
    var divHead = $('<div class="bins aside-head">');
    binSpot.append(divHead);

    var hTag = $('<h2>');
    hTag.text("Points of Interest");
    $('.aside-head').append(hTag);

    for(i = 0; i < (len + 1); i ++) {
        console.log(destination);
        var divGen = $('<div>');
        divGen.addClass('bins');

        if (i == 0) {
            
            divGen.addClass('search-bin')
            divGen.attr('id', 'search');
            binSpot.append(divGen);
                console.log(binSpot);
            var inptGen = $('<input>');
            inptGen.attr('type', 'text');
            inptGen.attr('id', 'localSearch');
            var btnGen = $('<button>');
            btnGen.text('🔍');
            btnGen.attr('id', 'search-button');
            //console.log(this);
            $('#search').append(inptGen);
            $('#search').append(btnGen);

            
        } else {
            divGen.addClass('location');
            divGen.attr('id', 'bin-'+ i)
            divGen.attr('index', i);
            binSpot.append(divGen);

            var btnGen = $('<button>');
            btnGen.attr('id', 'locale-' + i);
            var loco = destination[i - 1];
            btnGen.text(loco);
                console.log(loco + i);
            $('#bin-' + i).append(btnGen);
        }
    }
    divGen.addClass('location');
    divGen.attr('id', 'bin-'+ i)
    binSpot.append(divGen)
};

function renderWeather () {

    let len = 5;
    var weather = $('.weather');
    weather.empty();
    // top-row section
    weather.append($('<div class="top-row">'));
    $('.top-row').append('<div class="temp-high" id = "flank">');
    $('.top-row').append('<div class="temp-low" id = "flank">');

    var highTemp = $('.temp-high');
    var lowTemp = $('.temp-low');

    var dat = parseFloat(openOpts.main.temp_max); // should make function to save n x 4-lines
    dat = (dat - 273.15) * 1.8 + 32;
    dat = Math.round(dat);
    highTemp.text("HIGH: " + dat + "°F");

    var dat = parseFloat(openOpts.main.temp_min);
    dat = (dat - 273.15) * 1.8 + 32;
    dat = Math.round(dat);
    lowTemp.text("LOW: " + dat + "°F");
    // mid-row section
    var hTag = $('<h3>');
    hTag.text('CURRENTLY');
    weather.append(hTag)

    weather.append($('<div class="mid-row">'));
    $('.mid-row').append('<div class="cond" id="mid">');
    $('.mid-row').append('<div class="temp" id="mid">');

    var condition = $('.cond');
    var temp = $('.temp');
    condition.text(openOpts.weather);
    var dat = openOpts.main.temp
    dat = (dat - 273.15) * 1.8 + 32;
    dat = Math.round(dat);
    temp.text(dat + "°F");
    
    //bottom-row section
    weather.append($('<div class="bot-row">'));
    $('.bot-row').append('<div class="latitude" id = "flank">');
    $('.bot-row').append('<div class="longitude" id = "flank">');

    var lat = $('.latitude');
    var lon = $('.longitude');
    
    lat.text('LATITUDE: ' + openOpts.coord.lat + "°");
    lon.text('LONGITUDE: ' + openOpts.coord.lon + "°");
}

function fetchWeather() {
    var usrSearch = openOpts.city;
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + usrSearch + '&appid=' + openOpts.key;
    //https://api.openweathermap.org/data/2.5/weather?id=4671654&appid=fd15340e692655f40245e097f416fdec
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(result) {
            console.log("fetched results");
            //console.log(result);
        openOpts.weather = result.weather[0].main; 
        openOpts.main.temp = result.main.temp;
        openOpts.main.feels_like = result.main.feels_like;
        openOpts.main.temp_min = result.main.temp_min;
        openOpts.main.temp_max = result.main.temp_max;
        openOpts.main.pressure = result.main.pressure;
        openOpts.main.humidity = result.main.humidity;
        openOpts.coord.lat = result.coord.lat;
        openOpts.coord.lon = result.coord.lon;
        openOpts.city = result.name;

            //console.log(openOpts);
    });
}

function fetchLocale() {
    let userInputs = "";
    while(userInputs !== "") {
    destination = JSON.parse(localStorage.getItem("usrInputs"));
    }
}

function windyLocate () {
    var latitude = openOpts.coord.lat;
    var longitude = openOpts.coord.lon;
    var city = openOpts.city;
    
    var opts = {
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
            .setLatLng([latitude, longitude])
            .setContent(city)
            .openOn(map)
    });

}

// Event listeners
$(document).on('click', "#search-button", function(e) {
    console.log('button clicked');
    e.preventDefault();
    while($('#localSearch').val().trim() !== "") {
        console.log('refreshing components');
    var usrSearch = $('#localSearch').val().trim();
        console.log("searching: " + usrSearch);
        destination.push(usrSearch);
    openOpts.city = usrSearch;
    
    fetchWeather();
    setInterval(renderWeather(), 800);
    setInterval(windyLocate(), 900);
    renderBins()
let index = destination.length
console.log(index)
        $('#locale-' + index).addClass('active');
        
    }
});

$(document).on('click', '.location', function(e) {
    renderBins();
    var index = $(this).attr('index');
    $('#locale-' + index).addClass('active');
    index = parseInt(index) - 1;
    var usrSearch = destination[index];
    console.log("Switching to: " + usrSearch);
    openOpts.city = usrSearch;
    fetchWeather();
    renderWeather();
    setInterval(windyLocate(), 900);
});

setInterval(fetchWeather(), 1500);
setInterval(renderWeather(), 2000);
setInterval(fetchLocale(), 2100);
setInterval(renderBins(), 2200);

//==DOC END==