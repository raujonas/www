document.addEventListener("deviceready", startAppEinstellungen, false);

function startAppEinstellungen() {
    $('#auto').on('click',auto);
    $('#allreset').on('click',allReset);
}

function auto(){
    $('#auto').click(function(){
        navigator.app.exitApp();
    });
}

