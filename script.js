var binGen = $('.bins');
var locateSearch = $('#localSearch');
var localeGen = $('#locale-');

var destination = ['Austin, TX', 'Pensacola, FL', 'Lompoc, CA'];



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

    var btnGen = $('<button>');
            btnGen.attr('id', 'locale-' + i);
            var loco = usrSearch;
            btnGen.text(loco);
                console.log(loco + i);
            $('#bin-' + i).append(btnGen);
};

function renderWeather () {
    fetchWeather();
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
//let result;

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

var isLocalStore = false;

while(isLocalStore == false) {
localStorage.setItem("usrInputs", "");
    if(localStorage.getItem("userInputs") == ""){
        isLocalStore == true;
    }
}

function fetchWeather() {
    var usrSearch = openOpts.city;
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + usrSearch + '&appid=' + openOpts.key;
    //https://api.openweathermap.org/data/2.5/weather?id=4671654&appid=fd15340e692655f40245e097f416fdec
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(result) {
            console.log(result);
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

        console.log(openOpts);

        destination.push(openOpts.city);
    });
}


function fetchLocale() {
    let userInputs = "";
    while(userInputs !== "") {
    destination = JSON.parse(localStorage.getItem("usrInputs"));
    }
}

// Event listeners
$(document).on('click', "#search-button", function(e) {
    console.log('button clicked');
    e.preventDefault();
    while($('#search').val().trim() !== "") {
        console.log('refreshing components');
    var usrSearch = $('#search').val().trim();
    console.log(usrSearch);
    
    fetchWeather();
    renderWeather();
    renderBins();
    }
});

$(document).on('click', '.bins', function(e) {
    var index = $(this).attr('index');
    usrSearch = destination[index];
    fetchWeather();
    renderWeather();
});

setInterval(fetchWeather(), 1500);
setInterval(renderWeather(), 2000);
setInterval(fetchLocale(), 2100);
setInterval(renderBins(), 2200);

//==DOC END==