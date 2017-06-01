document.addEventListener("deviceready", startApp, false);

function startApp(){
    // An dieser Stelle die Buttons mit Listener einfügen:
    alert('startApp');
    $('#kanlegen').on('click',addKunde);
    $('kabbrechen').on('click',kzuruecksetzen);
    $(document).on('click', '#kundenuebersicht', function(){
        zeigeKundeAn(this);
    });
    getAlleKunden();
    alert("fertig");
}

function addKunde(){
    alert('addKunde() aufgerufen');
    
    var knr = $('#knr').val();
    var nameunternehmen = $('#nameunternehmen').val();
    var ansprechpartner = $('#ansprechpartner').val();
    var telefonnummer = $('#telefonnummer').val();
    var strasse = $('#strasse').val();
    var plz = $('#plz').val();
    var stadt = $('#stadt').val();
    var land = $('#land').val();
    var text = $('#infos').val();
    
    alert(knr + ' ' + nameunternehmen + ' ' +  ansprechpartner + ' ' +  telefonnummer + ' ' +  strasse + ' ' +  plz + ' ' +  stadt + ' ' +  land + ' ' +  text);
    
    if (knr.length == 0) {
		alert('Bitte KNR angeben! (PRIMARY KEY)');
		return;
	}
    kzuruecksetzen();
        
//    addKundeDB(knr, nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, //text);
    
    history.back();
}

function kzuruecksetzen(){
    $('#knr').val('');
    $('#nameunternehmen').val('');
    $('#ansprechpartner').val('');
    $('#telefonnummer').val('');
    $('#strasse').val('');
    $('#plz').val('');
    $('#stadt').val('');
    $('#land').val('');
    $('#infos').val('');
}

function zeigeKundeAn(kundeElement){
    alert('zeigeKundeAn');
    var knr = $(kundeElement).text();
    alert(knr);
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