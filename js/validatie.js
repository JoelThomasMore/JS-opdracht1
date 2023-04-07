//constante variabelen 
const knop = document.getElementById("submit");
// message boxes
const alertError = document.getElementById("errors");
const alertSucces = document.getElementById("succes");
const alertBetaling = document.getElementById("betaling");
// velden
const veldVoornaam = document.getElementById("Voornaam");
const veldNaam = document.getElementById("naam");
const veldGebruikersnaam = document.getElementById("gebruikersnaam");
const veldEmail = document.getElementById("email");
const veldPass1 = document.getElementById("pass1");
const veldPass2= document.getElementById("pass2");
const veldAdres = document.getElementById("Adres");
const veldLand = document.getElementById("land");
const veldProvincie = document.getElementById("provincie");
const veldPostcode = document.getElementById("postcode");
const veldNieuwsbrief = document.getElementById("nieuwsbrief");
const veldVoorwaarden = document.getElementById("voorwaarden");
const veldBankingapp = document.getElementById("bankingapp");
const veldOverschrijving = document.getElementById("overschrijving");
const veldVisa = document.getElementById("visa");
const veldPaypal = document.getElementById("paypal");
//tekstvakken
const texterrors = document.getElementById("errorlist")
const textbetaling = document.getElementById("betalingswijze")
//---------

//code start als pagina geladen is (body)
function start(){
knop.addEventListener("click",validateForm,false);
// verbergen van elementene met js
// https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
alertError.style.display = "none";
alertSucces.style.display = "none";
alertBetaling.style.display = "none";
}

//validatie indrukken knop
function validateForm(){
//var
 let errors =[];
 let veldenArrey =[veldVoornaam,veldNaam,veldGebruikersnaam,veldEmail,veldPass1,veldPass2,veldAdres,veldLand,veldProvincie,veldPostcode]
 let veldenNamen =["voornaam","naam","gebruikersnaam","email","wachtwoord","herhaal wachtwoord","adres","land","provincie","postcode"]
 //reset alerts
alertError.style.display = "none";
alertSucces.style.display = "none";
alertBetaling.style.display = "none";

//validatie

//vereiste velden gevuld?
for (let index = 0; index < veldenArrey.length; index++) {
   
    let errormessage = checkEmptyField(veldenArrey[index],"het veld " + veldenNamen[index] + " is vereist.");
    if(errormessage != ""){
        errors.push(errormessage);
    }

}

//controleer email
let mail = validateEmail(veldEmail.value)
//mail niet correct
if(!mail){
errors.push("E-mailadres is niet correct.")
}



//einde validatie, if errors => display, else display rest
if(errors.length != 0){
    //var
    let output = "";
    //reset text
    texterrors.innerText = "";
    //zet errors naar string
    errors.forEach(element => {
        output = output + String(element) + "\n";
    });
    //zet text naar string
    texterrors.innerText = output;
    //display alert
    alertError.style.display = "block";
}
else{
    alertSucces.style.display = "block";
    alertBetaling.style.display = "block";
}
}

function checkEmptyField(veld,melding){
    //veld is leeg = return melding
if(veld.value ==""){
    return melding;
}
    //anders return leeg
else{
    return "";
}
}

function validateEmail(emailadres){
    //mail is fout, maar niet leeg
    //domein van mail adres moet starten met letter of nummer
    //mag een punt of kopppeltekens bevatten
    //gebruik RegEx
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
    if(emailadres ==""){
        return false;
    }
    //mail is juist
    else{
        return true;
    }
}

function validatePass(passwoord1,passwoord2){
//test of beide wachtwoorden zijn ingevuld
//test of wachtwoorden gelijk zijn
//test of wachtwoord minder dan 8 karakters heeft
//geef fouten terug
return;
}

function validateUsername(Username){
//moet minstens één karakter zijn => indien niet is het vak leeg; wordt reeds getest
// mag letter nummers of underscore bevatten
// mag punten en koppeltekens bevatten maar niet als eerste
}

function validatePayment(veld){
// vul betalingswijze alert op
}

function checkPC(veld){
//test of waarde tussen 1000 en 9999 ligt
return "";
return "De waarde van postcode moet tussen 1000 en 9999 liggen.";
}

function validateVoorwaarden(veld){
//test of algemene voorwaarden zijn aangeduid
if(veld.value){
    return "";
}
else{
    return"Je moet de algemene voorwaarden accepteren.";
} 
}
