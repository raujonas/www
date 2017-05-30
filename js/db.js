//Datenbank-Funktionen

document.addEventListener("deviceready", onDeviceReady, false);

var db;

function onDeviceReady() {
  //Verbindung zur Datenbank aufbauen
  db = openDatabase('fahrtenbuch', '1.0', 'Datenbank Fahrtenbuch', 1000000);  //Argumente: Datenbankname, Versionsnummer, Beschreibung, Geschätzte Größe
  //Datenbank erstellen
  db.transaction(populateDB, errorCB, successCB);
}

//-----------------------Datenbank erstellen------------------------------------
//Was soll erstellt werden?
function populateDB(tx) {
    //Tabelle für Tests
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    //Tabelle für Kunden erstellen
    tx.executeSql('DROP TABLE IF EXISTS KUNDEN');
    tx.executeSql('CREATE TABLE IF NOT EXISTS KUNDEN (ID INTEGER PRIMARY KEY NOT NULL, NAMEUNTERNEHMEN TEXT, ANSPRECHPARTNER TEXT, TELEFON TEXT, STRASSE TEXT, PLZ INT, STADT TEXT, LAND TEXT, NOTIZ TEXT)');
    //Tabelle für Belege (Bilder)
    tx.executeSql('DROP TABLE IF EXISTS BELEGE');
    tx.executeSql('CREATE TABLE IF NOT EXISTS BELEGE (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Bild TEXT)');
}
//Wenn was schief geht
function errorCB(err) {
    alert("Error processing SQL: "+err.code + " "+err.message);
}
//bei Erfolg
function successCB() {
    alert("success!");
}

//------------------- Kunden verwalten -----------------------------------------
//Kunde hinzufügen
function addKundeDB(knr, nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, text){
    db.transaction(function(tx){
        tx.executeSql("INSERT INTO  Kunden (knr, nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, text) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [knr, nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, text], callback);
    } errorCB, successCB);
    alert('Kunde angelegt');
}

//------------------- Belege (Bilder) hinzufügen und auslesen-------------------
//Hinzufügen
function addBelege(Pfad){
    db.transaction(function(tx){
      tx.executeSql("INSERT INTO BELEGE (Bild) VALUES (?)", [Pfad]);
    }, errorCB, successCB);
}
//Auslesen   //TO do
function getBelege(){
    db.transaction(
      function(tx){tx.executeSql("SELECT Bild from BELEGE", ergebnis, errorCB);}, 
      errorCB, 
      successCB);
}         

function ergebnis(tx, results){
  alert("ergebnis wurde aufgerufen!!!");  
}       

