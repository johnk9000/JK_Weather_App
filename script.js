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
            binSpot.append(divGen);

            var btnGen = $('<button>');
            btnGen.attr('id', 'locale-' + i);
            var loco = destination[i - 1];
            btnGen.text(loco);
                console.log(loco + i);
            $('#bin-' + i).append(btnGen);
        }
    }
};

$('#search').button.on("click", function(e){
    renderBins();
});

$('.bins').on('click', function(e) {

});

renderBins();