document.addEventListener("deviceready", startAppEinstellungen, false);

function startAppEinstellungen() {
    $('#auto').on('click',auto);
}

function auto(){
    $('#auto').click(function(){
        navigator.app.exitApp();
    });
}

