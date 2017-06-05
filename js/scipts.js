document.addEventListener("deviceready", startApp, false);

function startApp(){
// An dieser Stelle die Buttons mit Listener einfügen:
    getAlleKunden();
    $('#kanlegen').on('click',addKunde);
    $(document).on('click', '#kabbrechen', kzuruecksetzen);
    $(document).on('click', '#kundenuebersicht a', function(){
        zeigeKundeAn(this);
    });
}

// Neuen Kunden anlegen - Werte werden ausgelesen und an die Datenbankfunktion übergeben
function addKunde(){
    var knr = $('#knr').val();
    var nameunternehmen = $('#nameunternehmen').val();
    var ansprechpartner = $('#ansprechpartner').val();
    var telefonnummer = $('#telefonnummer').val();
    var strasse = $('#strasse').val();
    var plz = $('#plz').val();
    var stadt = $('#stadt').val();
    var land = $('#land').val();
    var text = $('#infos').val();
    
    if (knr.length == 0) {
		alert('Bitte Kundennummer angeben');
		return;
	}
        
    addKundeDB(knr, nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, text);
    getAlleKunden();
    kzuruecksetzen();
    history.back();
}

// Das Formular für einen neuen Kunden wird zurückgesetzt
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

// Ein Kunde wird zum Anlegen oder Bearbeiten angezeigt
function kundeDarstellen(tx, results){
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

// Die Kunden werden in das ListView zur Kundenübersicht eingefügt
function kundenInListView(tx, results){
    var len = results.rows.length;
    $('#kundenuebersicht').empty();
    if (len > 0){
        for (var i=0; i<len; i++){
            var knr = results.rows[i].KNR;
            $('#kundenuebersicht').append('<li><a href="#kundeanlegen" data-knr="' + knr + '" data-transition="slide">' + results.rows[i].NAMEUNTERNEHMEN + '</a></li>');
        }
    $('#kundenuebersicht').listview('refresh');
    } else {
        alert("Tabelle ist leer");
    }
}

function zeigeKundeAn(kundeElement){
    var knr = $(kundeElement).attr('data-knr');
    getKunde(knr);
}