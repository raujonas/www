document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    getAlleKundenfuerStatistik();
    $('#kundeauswerten').on('click',kundeAuswerten);
}

function kundenInSelectMenuStatistik(tx, results){
    $('#kundewaehlenstatistik').empty();
    var len = results.rows.length;
    for (var i=0; i<len; i++){
        $('#kundewaehlenstatistik').append('<option value="'+ results.rows[i].KNR + '">' + results.rows[i].NAMEUNTERNEHMEN + '</option>');
    }
    $('#kundewaehlen').val(results.rows[0].KNR).selectmenu('refresh');
}

function statistikDarstellen(tx, results){
    console.log(results);
    var len = results.rows.length;
    var gesamtkm = 0;
    for (var i=0; i<len; i++){
        gesamtkm = parseInt(gesamtkm + results.rows[i].KM);
    }
    $('#statistikkm').val(gesamtkm);
}