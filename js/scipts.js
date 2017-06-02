document.addEventListener("deviceready", startApp, false);

function startApp(){
    // An dieser Stelle die Buttons mit Listener einfügen:
    alert('startApp');
    getAlleKunden();
    $('#kanlegen').on('click',addKunde);
    $('kabbrechen').on('click',kzuruecksetzen);
    $(document).on('click', '#kundenuebersicht a', function(){
        zeigeKundeAn(this);
    });
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

function kundeDarstellen(tx, results){
    alert("kundeDarstellen");
    $('#knr').val(results.rows[0].KNR);
    $('#nameunternehmen').val(results.rows[0].NAMEUNTERNEHMEN);
    $('#ansprechpartner').val(results.rows[0].ANSPRECHPARTNER);
    $('#telefonnummer').val(results.rows[0].TELEFON);
    $('#strasse').val(results.rows[0].STRASSE);
    $('#plz').val(results.rows[0].PLZ);
    $('#stadt').val(results.rows[0].STADT);
    $('#land').val(results.rows[0].LAND);
    $('#infos').val(results.rows[0].INFOS);
}

function kundenInListView(tx, results){
    var len = results.rows.length;
    if (len > 0){
        for (var i=0; i<len; i++){
            var knr = results.rows[i].KNR;
            $('#kundenuebersicht').append('<li><a href="#kundeanlegen" data-knr="' + knr + '" data-transition="slide">' + results.rows[i].NAMEUNTERNEHMEN + '</a></li>');
            $('#kundenuebersicht').listview('refresh');
        }
    } else {
        alert("Tabelle ist leer");
    }
}

function zeigeKundeAn(kundeElement){
    console.log(kundeElement,"kundeElement");
    console.log($(kundeElement).attr('data-knr'),"KNR");
    var knr = $(kundeElement).attr('data-knr');
    getKunde(knr);
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