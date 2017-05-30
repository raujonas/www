document.addEventListener("deviceready", startApp, false);

function startApp(){
    // An dieser Stelle die Buttons mit Listener einfügen:
    $('#kanlegen').on('click',addKunde);
}

function addKunde(){
    alert('addKunde() aufgerufen')
    var knr = $('#knr').val();
    var nameunternehmen = $('#nameunternehmen').val();
    var ansprechpartner = $('#ansprechpartner').val();
    var telefonnummer = $('#telefonnummer').val();
    
    var strasse = $('#strasse').val();
    var plz = $('#plz').val();
    var stadt = $('#stadt').val();
    var land = $('#land').val();
    
    var text = $('#text').val();
    
    addKundeDB(knr, nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, text);
    
}