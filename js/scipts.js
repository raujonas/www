document.addEventListener("deviceready", startApp, false);

function startApp(){
    $('#liKunden').on('click',fuegeKundenInListViewEin);
    // An dieser Stelle die Buttons mit Listener einfügen:
    $('#kanlegen').on('click',addKunde);
}

function addKunde(){
    var knr = $('#knr').val();
    var nameunternehmen = $('#nameunternehmen').val();
    var ansprechpartner = $('#ansprechpartner').val();
    var telefonnummer = $('#telefonnummer').val();
    var strasse = $('#strasse').val();
    var plz = $('#plz').val();
    var stadt = $('#stadt').val();
    var land = $('#land').val();
    var text = $('#text').val();
    
    addKundeDB(knr, nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, text);
    
    alert('addKunde() aufgerufen');
}

function fuegeKundenInListViewEin(){
    alert('fuegeKundenInListViewEin aufgerufen');
    getAlleKundenDB(function(tx, results){
        var len = results.rows.length;
        if (len > 0){
            for (var i=0; i<len; i++){
                
            }
        } else {
            
        }
    });
}