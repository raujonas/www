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

//Belege in der Übersichtsseite darstellen
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

//Felder in denen Daten der Belege eingetragen wurden zurücksetzen
function bzuruecksetzen(){
    $('#datumtank').val('');
    $('#bnr').val('');
    $('#Ort').val('');
    $('#Tankstelle').val('');
    $('#Betrag').val('');
    $('#image').val('');
    $('#image').hide();
}

//Beleg zur Datenbank hinzufügen
function addBeleg(){
    //Es muss mindestens ein Ort angegeben werden
    if($('#Ort').val()== ""){
      alert("Bitte gebben Sie einen Ort an.");
    }
    else{
      var bnr = $('#bnr').val();    
      var datum = $('#datumtank').val();
      var ort = $('#Ort').val();
      var tankstelle = $('#Tankstelle').val();
      var betrag = $('#Betrag').val();
      var bild = $('#image').attr('src');
      //Prüfuen ob Beleg bereits vorhanden ist und geändert werden soll, oder ob er neu angelegt werden soll
      if(bnr == ""){   
        //neuen Beleg anlegen
        addBelegDB(datum, ort, tankstelle, betrag, bild);
      }else{
        //Beleg vorhanen -> ändern
        changeBelegDB(bnr, datum, ort, tankstelle, betrag, bild);
      }
      bzuruecksetzen();
      getAlleBelege();  
      history.back();
    } 
}

//Den ausgewählten Beleg anzeigen (Felder füllen)
function belegDarstellen(tx, results){ 
    $('#bnr').val(results.rows[0].bnr);
    $('#datumtank').val(results.rows[0].Datum);
    $('#Ort').val(results.rows[0].Ort);
    $('#Tankstelle').val(results.rows[0].Tankstelle);
    $('#Betrag').val(results.rows[0].Betrag);
    
    //Tankbeleg (Bild) anzeigen wenn vorhanden
    if (results.rows[0].Bild != null && results.rows[0].Bild != "undefined" && results.rows[0].Bild != ""){     
      $('#image').show();
      $('#image').attr('src', results.rows[0].Bild);
    }
}

//Beleg löschen
function loescheBeleg(belegElement){
    var bnr = $(belegElement).attr('data-bnr');
    if (confirm('Soll der Eintrag wirklich gelöscht werden?')){
        deleteBelegDB(bnr);
    }
}