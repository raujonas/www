//cordova plugin add cordova-plugin-geolocation

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    $('#startgps').on('click',standortGPSstart);
    $('#endegps').on('click',standortGPSende);
}

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
        console.log( 'Latitude: '          + position.coords.latitude          + '\n' +
                   'Longitude: '         + position.coords.longitude         + '\n' +
                   'Altitude: '          + position.coords.altitude          + '\n' +
                   'Accuracy: '          + position.coords.accuracy          + '\n' +
                   'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                   'Heading: '           + position.coords.heading           + '\n' +
                   'Speed: '             + position.coords.speed             + '\n' +
                   'Timestamp: '         + position.timestamp                + '\n');
                   //8.3895348,49.0297141
        $('#start').val(position.coords.latitude + "," + position.coords.longitude);
        
   };

    // onError Callback receives a PositionError object
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

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
        console.log( 'Latitude: '          + position.coords.latitude          + '\n' +
                   'Longitude: '         + position.coords.longitude         + '\n' +
                   'Altitude: '          + position.coords.altitude          + '\n' +
                   'Accuracy: '          + position.coords.accuracy          + '\n' +
                   'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                   'Heading: '           + position.coords.heading           + '\n' +
                   'Speed: '             + position.coords.speed             + '\n' +
                   'Timestamp: '         + position.timestamp                + '\n');
                   //8.3895348,49.0297141
        $('#ende').val(position.coords.latitude + "," + position.coords.longitude);
        
   };

    // onError Callback receives a PositionError object
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}