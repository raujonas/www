//cordova plugin add cordova-plugin-geolocation

//Standort des Startpunkts erfassen
function standortGPSstart(){ 
    //Zeitbeschränkung der Standorterfassung 
    var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
    }

    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates    
    
    function onSuccess(position) {
        /*
        console.log( 'Latitude: '          + position.coords.latitude          + '\n' +
                   'Longitude: '         + position.coords.longitude         + '\n' +
                   'Altitude: '          + position.coords.altitude          + '\n' +
                   'Accuracy: '          + position.coords.accuracy          + '\n' +
                   'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                   'Heading: '           + position.coords.heading           + '\n' +
                   'Speed: '             + position.coords.speed             + '\n' +
                   'Timestamp: '         + position.timestamp                + '\n');         
        */
        
        //GPS in Adresse umrechnen und darstellen
        GPStoAddressStart(position.coords.latitude, position.coords.longitude);       
   };

    // onError Callback receives a PositionError object
    function onError(error) {
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    //Standortbestimmung starten
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

//Standort des Endpunkts erfassen
function standortGPSende(){ 
    //Zeitbeschränkung der Standorterfassung 
    var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
    }

    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates    
    
    function onSuccess(position) {
        
        console.info( 'Latitude: '          + position.coords.latitude          + '\n' +
                   'Longitude: '         + position.coords.longitude         + '\n' +
                   'Altitude: '          + position.coords.altitude          + '\n' +
                   'Accuracy: '          + position.coords.accuracy          + '\n' +
                   'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                   'Heading: '           + position.coords.heading           + '\n' +
                   'Speed: '             + position.coords.speed             + '\n' +
                   'Timestamp: '         + position.timestamp                + '\n'
                   );     
        
        
        //GPS in Adresse umrechnen und darstellen
        GPStoAddressEnde(position.coords.latitude, position.coords.longitude); 
        
   };

    // onError Callback receives a PositionError object
    function onError(error) {
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        alert("Bitte überprüfen sie Ihre GPS-Einstellungen.");
    }
    //standortbestimmung starten
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}