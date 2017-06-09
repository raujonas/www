document.addEventListener("deviceready", onDeviceReady, false);

//Datenbank-Funktionen

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
    tx.executeSql('DROP TABLE IF EXISTS KUNDEN');                         //@Jonas keine Datentypen?
    tx.executeSql('CREATE TABLE IF NOT EXISTS KUNDEN (KNR INTEGER PRIMARY KEY NOT NULL, NAMEUNTERNEHMEN, ANSPRECHPARTNER, TELEFON, STRASSE, PLZ, STADT, LAND, INFOS)');
    tx.executeSql('INSERT INTO KUNDEN (knr, nameunternehmen, ansprechpartner, telefon, strasse, plz, stadt, land, infos) VALUES (123, "Beste Firma", "Theo Test", "12345/678910", "Am Weg", 777, "Testhausen", "Ustestikan", "Was1GeileNotiz")');
    tx.executeSql('INSERT INTO KUNDEN (knr, nameunternehmen, ansprechpartner, telefon, strasse, plz, stadt, land, infos) VALUES (456, "Beste Firma2", "Theo Test2", "12345/6789102", "Am Weg2", 7772, "Testhausen2", "Ustestikan2", "Was1GeileNotiz2")');
    //Tabelle für Belege (Bilder)
    tx.executeSql('DROP TABLE IF EXISTS BELEGE');
    tx.executeSql('CREATE TABLE IF NOT EXISTS BELEGE (bnr INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Bild TEXT, Ort TEXT, Tankstelle TEXT, Datum TEXT, Betrag REAL)');
    tx.executeSql('INSERT INTO BELEGE (Ort, Tankstelle, Datum, Betrag) VALUES ("Karlsruhe", "Aral", "01-02-17", 50)'); 
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
        tx.executeSql("INSERT OR REPLACE INTO KUNDEN (knr, nameunternehmen, ansprechpartner, telefon, strasse, plz, stadt, land, infos) VALUES (?,?,?,?,?,?,?,?,?)", [knr, nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, text], successCB, errorCB);
    });
}

//Alle Kunden bekommen
function getAlleKunden(){
    db.transaction(function(tx){
        tx.executeSql("SELECT * FROM Kunden ORDER BY  nameunternehmen ASC", [], kundenInListView, errorCB);
    })
}

//Einen bestimmten Kunden bekommen
function getKunde(knr){
    db.transaction(function(tx){
        tx.executeSql("SELECT * FROM Kunden WHERE KNR=" + knr, [], kundeDarstellen, errorCB);
    });
}

//Einen bestimmten Kunden löschen
function deleteKunde(knr){
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM Kunden WHERE KNR=" + knr, [], successCB, errorCB);
    });
    getAlleKunden();
}

//------------------- Belege (Bilder) hinzufügen und auslesen-------------------
//Hinzufügen
function addBelegDB(datum, ort, tankstelle, betrag, bild){
    db.transaction(function(tx){
      tx.executeSql("INSERT INTO BELEGE (Ort, Tankstelle, Datum, Betrag, Bild) VALUES (?,?,?,?,?)", [datum, ort, tankstelle, betrag, bild], successCB, errorCB);
    }, 
    errorCB);
}

//Alle Belege Auslesen
function getAlleBelege(){
    db.transaction(
      function(tx){tx.executeSql("SELECT * FROM BELEGE", [], alleBelegeAnzeigen, errorCB);}, 
      errorCB);
}

//Spezifische Belege auslesen
function getBeleg(belegElement){
    var bnr = $(belegElement).attr('data-bnr');
    db.transaction(
      function(tx){tx.executeSql("SELECT * FROM BELEGE WHERE bnr=" + bnr, [], belegDarstellen, errorCB);}, 
      errorCB);
}      

      