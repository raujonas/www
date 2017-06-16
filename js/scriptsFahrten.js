document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    getAlleFahrtenDB();
    
}

function alleFahrtenAnzeigen(){
    var len = results.rows.length;  
    $('#belegeuebersicht').empty();
    if ( len > 0) {                           
      for(var i=0; i < len; i++){
        $('#fahrtenuebersicht').append('<li><a href="#fahrtanlegen" data-FNR="' + results.rows[i].FNR + '" data-transition="slide">' + results.rows[i].DATUM +'" "'+ results.rows[i].DATUM +'</a></li>');
      } 
      $('#belegeuebersicht').listview('refresh');             //FEHLER???????????
    }          
} 