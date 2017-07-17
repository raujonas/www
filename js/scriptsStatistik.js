document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    getAlleKundenfuerStatistik();
    //$('#statistik').on('click',getAlleKundenfuerStatistik);
    $('#kundeauswerten').on('click',kundeAuswerten);
}

//Kunden in das SelectMenu zur Kundenauswahl in der Statistik-Funktion einfügen
function kundenInSelectMenuStatistik(tx, results){
    $('#kundewaehlenstatistik').empty();
    var len = results.rows.length;
    for (var i=0; i<len; i++){
        $('#kundewaehlenstatistik').append('<option value="'+ results.rows[i].KNR + '">' + results.rows[i].NAMEUNTERNEHMEN + '</option>');
    }
    $('#kundewaehlenstatistik').val(results.rows[0].KNR).selectmenu('refresh');
}

//Aus der Datenbank abgefragte Werte als Statistik darstellen
function statistikDarstellen(tx, results){
    console.log(results);
    var len = results.rows.length;
    var gesamtkm = 0;
    for (var i=0; i<len; i++){
        gesamtkm = parseInt(gesamtkm + results.rows[i].KM);
    }
    $('#statistikkm').val(gesamtkm);
}

function statistikZuruecksetzen(){
     $('#datum2').val('');
     $('#datum3').val('');     
     $('#statistikkm').val('');     
}