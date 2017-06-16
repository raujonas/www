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
      $('#belegeuebersicht').listview('refresh');             //FEHLER???????????
    }          
} 
//API_KEY=AIzaSyDuGWHnapuM2Q4o2PLnL4457wZdJ1r-ZyA
//Entfernung und Dauer Beispiel von Google (https://developers.google.com/maps/documentation/distance-matrix/start?hl=de) 
//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=YOUR_API_KEY

//Beispiel Ergebnis: 
/*
{
   "destination_addresses" : [ "New York City, New York, USA" ],
   "origin_addresses" : [ "Washington, D.C., District of Columbia, USA" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "362 km",
                  "value" : 361721
               },
               "duration" : {
                  "text" : "3 Stunden, 48 Minuten",
                  "value" : 13656
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
    var request = new XMLHttpRequest();
    //Anfrage URL
    request.open("GET","https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyDuGWHnapuM2Q4o2PLnL4457wZdJ1r-ZyA");
    request.addEventListener('load', function(event) {
       //Bei Erfolg
       if (request.status >= 200 && request.status < 300) {
          console.log(request.responseText);
          //JSON parsen
          var ergebnis = JSON.parse(request.responseText);
          console.log("Kilometer :"+ergebnis.rows[0].elements[0].distance.text);
          
       } 
       //Bei einem Fehler
       else {
          console.warn(request.statusText, request.responseText);
       }
    });
    request.send();
}