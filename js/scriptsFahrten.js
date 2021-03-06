document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    getAlleFahrtenDB();    
    $('#neueFahrt').on('click',getAlleKundenfuerFahrt);
    $('#fanlegen').on('click',addFahrt);
    $('#kmberechnen').on('click',abfrageDistanceAPI);
    $('#startgps').on('click',standortGPSstart);
    $('#endegps').on('click',standortGPSende);
    $(document).on('click', '#fabbrechen',fzuruecksetzen);
    $(document).on('click', '#fahrtenuebersicht a', function(){
        getFahrt(this);
    });
     $(document).on('swipeleft', '#fahrtenuebersicht a', function(){
        deleteFahrt(this);
    });
}

//Alle Fahrten in der Übersicht anzeigen      
function alleFahrtenAnzeigen(tx, results){
    var len = results.rows.length;  
    $('#fahrtenuebersicht').empty();     
    if ( len > 0) {                           
        for(var i=0; i < len; i++){
            console.log(results);
            $('#fahrtenuebersicht').append('<li><a href="#fahrtanlegen" data-fnr="' + results.rows[i].FNR + '" selected="selected" data-transition="slide">' + results.rows[i].NAMEUNTERNEHMEN +' - '+ results.rows[i].DATUM +'</a></li>');
        } 
    $('#fahrtenuebersicht').listview().listview('refresh');         
    }          
} 


function kundenInSelectMenu (tx, results){
    //Alle Kunden in Select-Menü einfügen:
    $('#kundewaehlen').empty();
    var len = results.rows.length;
    for (var i=0; i<len; i++){
        $('#kundewaehlen').append('<option value="'+ results.rows[i].KNR + '">' + results.rows[i].NAMEUNTERNEHMEN + '</option>');
    }
    $('#kundewaehlen').val(results.rows[0].KNR).selectmenu('refresh');
}

//Fahrt zur Datenbank hinzufügen
function addFahrt(){
    var knr = parseInt($('#kundewaehlen').val());
    var fnr = $('#fnr').val();
    var datum = $('#datum').val();
    var start = $('#start').val();
    var ende = $('#ende').val();
    var dauer = $('#dauer').val();
    var kilometer = parseInt($('#kilometer').val());
    //Prüfuen ob fahrt bereits vorhanden ist und geändert werden soll, oder ob er neu angelegt werden soll    
    if(fnr == ""){
        //Fahrt neu anlegen
        addFahrtDB(knr, start, ende, kilometer, dauer, datum);
    } else {
        //Fahrt bereits vorhanden -> ändern
        changeFahrt(fnr, knr, start, ende, kilometer, dauer, datum);
    }
    getAlleFahrtenDB();
    fzuruecksetzen();
    history.back();

}

//Felder in denen Daten der Fahrten eingetragen wurden zurücksetzen
function fzuruecksetzen(){
    $('#kundewaehlen').empty();
    $('#kundewaehlen').listview().listview('refresh');
    $('#fnr').val('');
    $('#start').val('');
    $('#ende').val('');
    $('#datum').val('');
    $('#dauer').val('');
    $('#kilometer').val('');
}

//Eine Fahrt darstellen
function fahrtDarstellen(tx, results){
    $('#kundewaehlen').empty();
    var len = results.rows.length;
    $('#kundewaehlen').append('<option value="'+ results.rows[0].KNR + '" selected="selected">' + results.rows[0].NAMEUNTERNEHMEN + '</option>');
    $('#kundewaehlen').val(results.rows[0].KNR).selectmenu('refresh');
    
    console.log(results);
    $('#fnr').val(results.rows[0].FNR);
    $('#start').val(results.rows[0].START);
    $('#ende').val(results.rows[0].ENDE);
    $('#datum').val(results.rows[0].DATUM);
    $('#dauer').val(results.rows[0].DAUER);
    $('#kilometer').val(results.rows[0].KM);
    console.log(results.rows[0].FNR);
}


//-------------------------------------------------------------APIs------------------------------------------------------------------------------------------------
//-> Distance Matrix API
//Bei Google Maps Distance Matrix API handelt es sich um einen Dienst, der Reisezeiten und Entfernungen für eine Start- und Zielortmatrix bereitstellt.
//API_KEY=AIzaSyDuGWHnapuM2Q4o2PLnL4457wZdJ1r-ZyA
//Entfernung und Dauer Beispiel von Google (https://developers.google.com/maps/documentation/distance-matrix/start?hl=de) 
//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=YOUR_API_KEY

function abfrageDistanceAPI(){
    //Start und Ziel einlesen
    var Start = $('#start').val();;  //Oder GPS: "49.0297141,8.3895348" geht auch
    var Ziel = $('#ende').val();;
    
    var request = new XMLHttpRequest();
    //Anfrage URL
    request.open("GET","https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+Start+"&destinations="+Ziel+"&key=AIzaSyDuGWHnapuM2Q4o2PLnL4457wZdJ1r-ZyA"); 
    request.addEventListener('load', function(event) {
       //Bei Erfolg
       if (request.status >= 200 && request.status < 300) {
          //Notwendig, damit bei einem Fehlern nur eine Fehlermeldung ausgegeben wird, und nicht mehrere
          try{
              //JSON parsen
              var ergebnis = JSON.parse(request.responseText);
              console.info(request.responseText);
               $('#kilometer').val(parseInt(ergebnis.rows[0].elements[0].distance.value/1000));           
               $('#dauer').val(ergebnis.rows[0].elements[0].duration.text);
          }catch(err){
               alert("Bitte überprüfen Sie Start- und Zieladresse.");
          }  
       } 
       //Bei einem Fehler
       else {
          alert("Fehler bei der Übertragung")
          console.warn(request.statusText, request.responseText);
       }
    });
    //API konnte nicht erreicht werden
    request.onerror = function () {
      alert("Bitte überprüfen Sie die Netzwerkverbindung.")
    };
    //Anfrage senden
    request.send();
}

//-> GeoCode API
//Rechnet GPS Längengrad und Breitengrad in Adresse um
//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

//Längengrad und Breitengrad des Startpunks in Adresse umrechnen
function GPStoAddressStart(latitude, longitude){   
    var request = new XMLHttpRequest();
    //Anfrage URL
    request.open("GET","https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key=AIzaSyDR05F26qJcelogO0KFvURFKta04L6aGhw")
    request.addEventListener('load', function(event) {
       //Bei Erfolg
       if (request.status >= 200 && request.status < 300) {
          try{  
            //JSON parsen
            var ergebnis = JSON.parse(request.responseText);
            console.info(request.responseText);      
            var adresse = ergebnis.results[0].formatted_address;      
            $('#start').val(adresse);  
          }catch(err){
               alert("Fehler in den übermittelten GPS-Daten");
          } 
       } 
       //Bei einem Fehler
       else {
          alert("Es ist ein Fehler aufgetreten.");
          console.warn(request.statusText, request.responseText);
       }
    });
    //API konnte nicht erreicht werden
    request.onerror = function () {
      alert("Bitte überprüfen Sie die Netzwerkverbindung.")
    };
    //Anfrage senden
    request.send();
}

//Längengrad und Breitengrad des Zielpunktes in Adresse umrechen
function GPStoAddressEnde(latitude, longitude){   
    var request = new XMLHttpRequest();
    //Anfrage URL
    request.open("GET","https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key=AIzaSyDR05F26qJcelogO0KFvURFKta04L6aGhw")
    request.addEventListener('load', function(event) {
       //Bei Erfolg
       if (request.status >= 200 && request.status < 300) {
          try{
              //JSON parsen
              var ergebnis = JSON.parse(request.responseText);
              console.info(request.responseText);
              var adresse = ergebnis.results[0].formatted_address;      
              $('#ende').val(adresse);  
          }catch(err){
               alert("Fehler in den übermittelten GPS-Daten");
          } 
       } 
       //Bei einem Fehler
       else {
          alert("Es ist ein Fehler aufgetreten.");
          console.warn(request.statusText, request.responseText);
       }
    });
    //API konnte nicht erreicht werden
    request.onerror = function () {
      alert("Bitte überprüfen Sie die Netzwerkverbindung.")
    };
    //Anfrage senden
    request.send();
}
