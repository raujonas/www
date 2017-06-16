document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    getAlleFahrtenDB();
   
}
      
function alleFahrtenAnzeigen(tx, results){
    var len = results.rows.length;  
    $('#belegeuebersicht').empty();
    if ( len > 0) {                           
      for(var i=0; i < len; i++){
        $('#fahrtenuebersicht').append('<li><a href="#fahrtanlegen" data-FNR="' + results.rows[i].FNR + '" data-transition="slide">' + results.rows[i].START +' '+ results.rows[i].DATUM +'</a></li>');
      } 
      $('#belegeuebersicht').listview().listview('refresh');             //FEHLER???????????
    }          
} 
//-> Distance Matrix API
//Bei Google Maps Distance Matrix API handelt es sich um einen Dienst, der Reisezeiten und Entfernungen für eine Start- und Zielortmatrix bereitstellt.

//API_KEY=AIzaSyDuGWHnapuM2Q4o2PLnL4457wZdJ1r-ZyA
//Entfernung und Dauer Beispiel von Google (https://developers.google.com/maps/documentation/distance-matrix/start?hl=de) 
//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=YOUR_API_KEY

//Beispiel JSON Ergebnis: 
/*
{
   "destination_addresses" : [ "Frankfurt am Main, Deutschland" ],
   "origin_addresses" : [ "Kanalweg 101, 76149 Karlsruhe, Deutschland" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "134 km",
                  "value" : 133697
               },
               "duration" : {
                  "text" : "1 Stunde, 36 Minuten",
                  "value" : 5736
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
}
*/

function abfrageDistanceAPI(){
    var Start = "Deutschland+Karlsruhe+Kanalweg+101"
    var Ziel = "Frankfurt"
    
    var request = new XMLHttpRequest();
    //Anfrage URL
    request.open("GET","https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+Start+"&destinations="+Ziel+"&key=AIzaSyDuGWHnapuM2Q4o2PLnL4457wZdJ1r-ZyA");
    request.addEventListener('load', function(event) {
       //Bei Erfolg
       if (request.status >= 200 && request.status < 300) {
          console.log(request.responseText);
          //JSON parsen
          var ergebnis = JSON.parse(request.responseText);
          //Kilometer
          console.log("Kilometer :"+ergebnis.rows[0].elements[0].distance.text);
          //Dauer
          console.log("Kilometer :"+ergebnis.rows[0].elements[0].duration.text);          
       } 
       //Bei einem Fehler
       else {
          console.warn(request.statusText, request.responseText);
       }
    });
    request.send();
}