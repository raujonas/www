document.addEventListener("deviceready", startAppEinstellungen, false);

function startAppEinstellungen() {
    $('#auto').on('click',auto);
    $('#allreset').on('click',allReset);
}

//Bei Klick auf das Auto, wird die App geschlossen
function auto(){
    $('#auto').click(function(){
        navigator.app.exitApp();
    });
}

