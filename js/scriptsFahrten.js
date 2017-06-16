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
//API_KEY=
//Entfernung und Dauer Beispiel von Google (https://developers.google.com/maps/documentation/distance-matrix/start?hl=de) 
//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=YOUR_API_KEY