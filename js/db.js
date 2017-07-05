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
    tx.executeSql('DROP TABLE IF EXISTS KUNDEN');        //@Jonny, kein Autoincrement für die ID?
    tx.executeSql('CREATE TABLE IF NOT EXISTS KUNDEN (KNR INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, NAMEUNTERNEHMEN, ANSPRECHPARTNER, TELEFON, STRASSE, PLZ, STADT, LAND, INFOS)');
    tx.executeSql('INSERT INTO KUNDEN (nameunternehmen, ansprechpartner, telefon, strasse, plz, stadt, land, infos) VALUES ("Beste Firma", "Theo Test", "12345/678910", "Am Weg", 777, "Testhausen", "Ustestikan", "Was1GeileNotiz")');
    tx.executeSql('INSERT INTO KUNDEN (nameunternehmen, ansprechpartner, telefon, strasse, plz, stadt, land, infos) VALUES ("Firma 2", "Theo Test2", "12345/6789102", "Am Weg2", 7772, "Testhausen2", "Ustestikan2", "Was1GeileNotiz2")');
    
    //Tabelle für Fahrten
    tx.executeSql('DROP TABLE IF EXISTS FAHRTEN');
    tx.executeSql('CREATE TABLE IF NOT EXISTS FAHRTEN (FNR INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, KNR, START, ENDE, KM, DAUER, DATUM)');
    tx.executeSql('INSERT INTO FAHRTEN (KNR, START, ENDE, KM, DAUER, DATUM) VALUES (1, "Karlsruhe", "Mannheim", 100, 60, "2017-06-01")'); 
    tx.executeSql('INSERT INTO FAHRTEN (KNR, START, ENDE, KM, DAUER, DATUM) VALUES (2, "Karlsruhe", "Frankfurt", 150, 70, "2017-06-02")'); 
    tx.executeSql('INSERT INTO FAHRTEN (KNR, START, ENDE, KM, DAUER, DATUM) VALUES (2, "Karlsruhe", "Berlin", 150, 70, "2017-06-03")'); 
    
    //Tabelle für Belege (Bilder)
    tx.executeSql('DROP TABLE IF EXISTS BELEGE');
    tx.executeSql('CREATE TABLE IF NOT EXISTS BELEGE (bnr INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Bild TEXT, Ort TEXT, Tankstelle TEXT, Datum TEXT, Betrag REAL)');
    tx.executeSql('INSERT INTO BELEGE (Ort, Tankstelle, Datum, Betrag) VALUES ("Karlsruhe", "Aral", "2017-06-03", 50)'); 
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
function addKundeDB(nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, text){
    db.transaction(function(tx){
        tx.executeSql("INSERT INTO KUNDEN (nameunternehmen, ansprechpartner, telefon, strasse, plz, stadt, land, infos) VALUES (?,?,?,?,?,?,?,?)", [nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, text], successCB, errorCB);
    });
}

function changeKundeDB(knr, nameunternehmen, ansprechpartner, telefonnummer, strasse, plz, stadt, land, text){
    db.transaction(function(tx){
        console.log('UPDATE KUNDEN SET nameunternehmen="'+nameunternehmen+'", ansprechpartner="'+ansprechpartner+'", telefonnummer="'+telefonnummer+'", strasse="'+strasse+'", plz="'+plz+'", stadt="'+stadt+'", land="'+land+'", infos="'+text+'" WHERE knr='+knr+';');
        tx.executeSql('UPDATE KUNDEN SET  nameunternehmen="'+nameunternehmen+'", ansprechpartner="'+ansprechpartner+'", telefonnummer="'+telefonnummer+'", strasse="'+strasse+'", plz="'+plz+'", stadt="'+stadt+'", land="'+land+'", infos="'+text+'" WHERE knr='+knr+';', [], successCB, errorCB);
    });
}

//Alle Kunden bekommen
function getAlleKunden(){
    db.transaction(function(tx){
        tx.executeSql("SELECT * FROM Kunden ORDER BY nameunternehmen ASC", [], kundenInListView, errorCB);
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
    
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM Fahrten WHERE KNR=" + knr, [], successCB, errorCB);
    });
    getAlleFahrtenDB();
    
}

//-------------------------------------Fahrten----------------------------------------------------------------
//Fahrt hinzufügen
function addFahrtDB(knr, start, ende, km, dauer, datum){
    db.transaction(function(tx){
        tx.executeSql('INSERT INTO FAHRTEN (KNR, START, ENDE, KM, DAUER, DATUM) VALUES (?,?,?,?,?,?)', [knr, start, ende, km, dauer, datum], successCB, errorCB);
    });
}

//Fahrt ändern
function changeFahrt(fnr, knr, start, ende, km, dauer, datum){
    db.transaction(function(tx){
        console.log('UPDATE FAHRTEN SET knr='+knr+', start="'+start+'", ende="'+ende+'", km='+km+', dauer="'+dauer+'", datum="'+datum+'" WHERE fnr="'+fnr+'";');
        tx.executeSql('UPDATE FAHRTEN SET knr='+knr+', start="'+start+'", ende="'+ende+'", km='+km+', dauer="'+dauer+'", datum="'+datum+'" WHERE fnr="'+fnr+'";', [], successCB, errorCB);
    });
}

//Alle Fahrten auslesen
function getAlleFahrtenDB(){
    db.transaction(                            
      function(tx){tx.executeSql("SELECT * FROM FAHRTEN, KUNDEN WHERE FAHRTEN.KNR = KUNDEN.KNR", [], alleFahrtenAnzeigen, errorCB);}, 
      errorCB);
}

//Alle Kunden bekommen für Fahrten (anderes Callback)
function getAlleKundenfuerFahrt(){
    db.transaction(function(tx){
        tx.executeSql("SELECT * FROM Kunden ORDER BY nameunternehmen ASC", [], kundenInSelectMenu, errorCB);
    })
}

function getAlleKundenfuerStatistik(){
    db.transaction(function(tx){
        tx.executeSql("SELECT * FROM Kunden ORDER BY nameunternehmen ASC",[], kundenInSelectMenuStatistik, errorCB);
    })
}

//Eine bestimmte Fahrt bekommen
function getFahrt(fahrtElement){
    var fnr = $(fahrtElement).attr('data-fnr');
    db.transaction(function(tx){
        tx.executeSql("SELECT * FROM Fahrten, Kunden WHERE Fahrten.KNR = Kunden.KNR AND fnr=" + fnr, [], fahrtDarstellen, errorCB);
    });
}

function deleteFahrt(kundeElement){
    var fnr = $(kundeElement).attr('data-fnr');
    if (confirm('Soll der Eintrag wirklich gelöscht werden?')){
        db.transaction(function(tx){
        tx.executeSql("DELETE FROM Fahrten WHERE FNR=" + fnr, [], successCB, errorCB);
        });
        getAlleFahrtenDB();
    }
    
}

function kundeAuswerten(){
    var knr = $('#kundewaehlenstatistik').val();
    var anfang = $('#datum2').val();
    var ende = $('#datum3').val();
    if(anfang > ende){
      alert("Das Enddatum darf nicht vor dem Startdatum liegen.");  
    }else{
      console.log(anfang, ende);
      console.log("SELECT * FROM Fahrten WHERE DATUM >= '" + anfang + "' AND DATUM <= '" + ende + "'");
      db.transaction(function(tx){
        tx.executeSql("SELECT * FROM Fahrten WHERE KNR=" + knr + " AND DATUM >= '" + anfang + "' AND DATUM <= '" + ende + "'", [], statistikDarstellen, errorCB);
      })
    }
}

//------------------- Belege hinzufügen und auslesen-------------------
//Hinzufügen
function addBelegDB(datum, ort, tankstelle, betrag, bild){
    db.transaction(function(tx){
      tx.executeSql("INSERT INTO BELEGE (Ort, Tankstelle, Datum, Betrag, Bild) VALUES (?,?,?,?,?)", [ort, tankstelle, datum, betrag, bild], successCB, errorCB);
    }, 
    errorCB);
}

//Beleg ändern
function changeBelegDB(bnr, datum, ort, tankstelle, betrag, bild){
    db.transaction(function(tx){
      tx.executeSql("UPDATE BELEGE SET Ort='"+ort+"', Tankstelle='"+tankstelle+"', Datum='"+datum+"', Betrag='"+betrag+"', Bild='"+bild+"' WHERE bnr = "+bnr+";", [], successCB, errorCB);
    }, 
    errorCB);
}       

//Beleg löschen
function deleteBelegDB(bnr){
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM BELEGE WHERE bnr=" + bnr, [], successCB, errorCB);
    });
    getAlleBelege();
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

//------------------- Stadardzustand -------------------

function allReset(){
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM Kunden", [], successCB, errorCB);
        tx.executeSql("DELETE FROM Fahrten", [], successCB, errorCB);
        tx.executeSql("DELETE FROM Belege", [], successCB, errorCB);
    });
    getAlleKunden();
    getAlleFahrtenDB();
    getAlleBelege();
}

      