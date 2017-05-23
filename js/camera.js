function startApp(){
  #('camera').on('click',aufnehmen);
}

function aufnehmen() {
      // Take a photo and retrieve the image's file location:
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50, 
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA 
      });             
}

function onSuccess(imageURI){
  $('#image').show();
  $('#image').attr('src',imageURI);
  $('#camera').hide();
}

function onFail(message){
  alert('Failed because: ' + message);
}