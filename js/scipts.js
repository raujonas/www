document.addEventListener("deviceready", startApp, false);

function startApp(){
    // An dieser Stelle die Buttons mit Listener einfügen:
    alert('startApp');
    $('#kanlegen').on('click',addKunde);
}

function addKunde(){
    alert('addKunde() aufgerufen');
    
    var knr = $("#knr").text();
    alert(knr);
    
    var nameunternehmen = $('#nameunternehmen').text();
    var ansprechpartner = $('#ansprechpartner').text();
    var telefonnummer = $('#telefonnummer').text();
    var strasse = $('#strasse').text();
    var plz = $('#plz').text();
    var stadt = $('#stadt').text();
    var land = $('#land').text();
    var text = $('#text').text();
    
    addKundeDB(knr, nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, text);
    
    
}

function fuegeKundenInListViewEin(){
    getAlleKundenDB(function(tx, results){
        var len = results.rows.length;
        alert('fuegeKundenInListViewEin aufgerufen');
        if (len > 0){
            for (var i=0; i<len; i++){
                $('#kundenuebersicht').append('<li>TEST</li>');
            }
        } else {
            
        }
    });
}