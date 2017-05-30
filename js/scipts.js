document.addEventListener("deviceready", startApp, false);

function startApp(){
    // An dieser Stelle die Buttons mit Listener einfügen:
    $('#kanlegen').on('click',function(){
        alert('Kunde wird angelegt ...');
    });
}