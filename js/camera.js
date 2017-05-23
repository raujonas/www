document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(navigator.camera);    //Aktivert den ADB Log der Kamera
}

function aufnehmen() {                //Kamera starten
   navigator.camera.getPicture(onSuccess, onFail, { 
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI
   });

   function onSuccess(imageData) {     // Wenn ein Bild erfolgreich aufgenommen wurde
      $('#image').show();
      $('#image').attr('src', imageData);
      //$('#camera').hide();
   }

   function onFail(message) {         //Wenn es beim Kamerea-Aufruf zu einem Fehler gekommen ist
      alert('Failed because: ' + message);
   }
}