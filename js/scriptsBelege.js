document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    getAlleBelege();
    $('#banlegen').on('click',addBeleg);
    $(document).on('click', '#babbrechen', bzuruecksetzen);
    $(document).on('click', '#belegeuebersicht a', function(){
        getBeleg(this);
    });
    $(document).on('swipeleft', '#belegeuebersicht a', function(){
        loescheBeleg(this);
    })
}

//Belege Kurzübersicht
function alleBelegeAnzeigen(tx, results){
    var len = results.rows.length;   
    $('#belegeuebersicht').empty();
    if ( len > 0) {                           
      for(var i=0; i < len; i++){
        $('#belegeuebersicht').append('<li><a href="#tankbelegehinzufuegen" data-bnr="' + results.rows[i].bnr + '" data-transition="slide">' + results.rows[i].Ort + '</a></li>');
      }
      $('#belegeuebersicht').listview().listview('refresh');  
    }          
} 

function bzuruecksetzen(){
    $('#Datum').val('');
    $('#bnr').val('');
    $('#Ort').val('');
    $('#Tankstelle').val('');
    $('#Betrag').val('');
    $('#image').val('');
    $('#image').hide();
}

function addBeleg(){
    if($('#Ort').val()== ""){
      alert("Bitte gebben Sie einen Ort an.");
    }
    else{
      var bnr = $('#bnr').val();    
      var datum = $('#Datum').val();
      var ort = $('#Ort').val();
      var tankstelle = $('#Tankstelle').val();
      var betrag = $('#Betrag').val();
      var bild = $('#image').attr('src');
      if(bnr == ""){   
        addBelegDB(datum, ort, tankstelle, betrag, bild);
      }else{
        //Falls Beleg bereits vorhanden -> ändern
        changeBelegDB(bnr, datum, ort, tankstelle, betrag, bild);
      }
      bzuruecksetzen();
      getAlleBelege();  
      history.back();
    } 
}

function belegDarstellen(tx, results){ 
    $('#bnr').val(results.rows[0].bnr);
    $('#Datum').val(results.rows[0].Datum);
    $('#Ort').val(results.rows[0].Ort);
    $('#Tankstelle').val(results.rows[0].Tankstelle);
    $('#Betrag').val(results.rows[0].Betrag);
    
    //Bild anzeigen wenn vorhanden
    if (results.rows[0].Bild != null && results.rows[0].Bild != "undefined" && results.rows[0].Bild != ""){     
      $('#image').show();
      $('#image').attr('src', results.rows[0].Bild);
    }
}

function loescheBeleg(belegElement){
    var bnr = $(belegElement).attr('data-bnr');
    if (confirm('Soll der Eintrag wirklich gelöscht werden?')){
        deleteBelegDB(bnr);
    }
}