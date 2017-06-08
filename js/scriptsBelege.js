document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    getAlleBelege();
    $('#banlegen').on('click',addBeleg);
    $(document).on('click', '#babbrechen', bzuruecksetzen);
    $(document).on('click', '#belegeuebersicht a', function(){
        getBeleg(this);
    });
    
}

//Belege Kurz�bersicht
function alleBelegeAnzeigen(tx, results){
    var len = results.rows.length;  
    $('#belegeuebersicht').empty();
    if ( len > 0) {                           
      for(var i=0; i < len; i++){
        $('#belegeuebersicht').append('<li><a href="#tankbelegehinzufuegen" data-bnr="' + results.rows[i].bnr + '" data-transition="slide">' + results.rows[i].Ort + '</a></li>');
      } 
      $('#belegeuebersicht').listview('refresh');             //FEHLER???????????
    }          
} 

function bzuruecksetzen(){
    $('#Datum').val('');
    $('#bnr').val('');
    $('#Ort').val('');
    $('#Tankstelle').val('');
    $('#Betrag').val('');
}

function addBeleg(){
    var datum = $('#Datum').val();
    var ort = $('#Ort').val();
    var tankstelle = $('#Tankstelle').val();
    var betrag = $('#Betrag').val();
    //var bild = $('#image').val();
    //alert("bild: "+bild);
    
    //addBelegDB(datum, ort, tankstelle, betrag, bild);
    $('#image').hide();
    bzuruecksetzen(); 
    getAlleBelege();   
}

function belegDarstellen(tx, results){ 
    $('#Datum').val(results.rows[0].Datum);
    $('#bnr').val(results.rows[0].bnr);
    $('#Ort').val(results.rows[0].Ort);
    $('#Tankstelle').val(results.rows[0].Tankstelle);
    $('#Betrag').val(results.rows[0].Betrag);

    //Bild anzeigen wenn vorhanden
    if (results.rows[0].Bild != null){
      alert("Bild"+results.rows[0].Bild);
      $('#image').show();
      $('#image').attr('src', results.rows[0].Bild);
    }
}