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
const texterrors = document.getElementById("errorlist");
const textbetaling = document.getElementById("betalingswijze");
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

//---------------------------------------validatie-hoofdfunctie---------------------------------
function validateForm(){
//var
 let errors =[];
 let veldenArrey =[veldVoornaam,veldNaam,veldGebruikersnaam,veldEmail,veldPass1,veldPass2,veldAdres,veldLand,veldProvincie,veldPostcode];
 let veldenNamen =["voornaam","naam","gebruikersnaam","email","wachtwoord","herhaal wachtwoord","adres","land","provincie","postcode"];
 let veldenBetaling = [veldBankingapp,veldOverschrijving,veldVisa,veldPaypal];
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
let mail = validateEmail(veldEmail.value);
//mail niet correct
if(!mail){
errors.push("E-mailadres is niet correct.");
}

//controleer wachtwoorden
let wachtwoorden = validatePass(String(veldPass1.value),String(veldPass2.value));
if(wachtwoorden != null){
    wachtwoorden.forEach(element => {
        errors.push(element);
    });
}

//controleer gebruikersnaam
//output: 0: alles fout, 1: bevat tekens die niet mogen, 2:eerste letter bevat tekens die niet mogen, 3: alles juist
let gebruikersnaam = validateUsername(String(veldGebruikersnaam.value));
switch (gebruikersnaam) {
    case 0:
        errors.push("De gebruikersnaam mag enkel letters, nummers, punten, koppeltekens of underscore bevatten");
        errors.push("De gebruikersnaam mag enkel beginnen met een letter, nummer of underscore");
        break;
    case 1:
        errors.push("De gebruikersnaam mag enkel letters, nummers, punten, koppeltekens of underscore bevatten");
        break;
    case 2:
        errors.push("De gebruikersnaam mag enkel beginnen met een letter, nummer of underscore");
        break;

    default:
        break;
}

//betalingswijze
// https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked
let betalingswijzeAangeduid = false;
veldenBetaling.forEach(element => {
    if(element.checked){
        validatePayment(element);
        betalingswijzeAangeduid = true;
    }
});
if(!betalingswijzeAangeduid){
    errors.push("Duid een betalingswijze aan.");
}

//postcode
let postcodeWaarde = checkPC(veldPostcode);
if(postcodeWaarde != "")
{
    errors.push(postcodeWaarde);
}

//algemene voorwaarden
let algemenevoorwaarden = validateVoorwaarden(veldVoorwaarden);
if(algemenevoorwaarden != ""){
    errors.push(algemenevoorwaarden);
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

//--------------------------------functies van velden ------------------------------
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
    //return true als email leeg is => foutmelding email is niet ingevuld wordt al gebruikt
    if(emailadres==""){
        return true;
    }

    //gebruik RegEx
    //domein van mail adres moet starten met letter of nummer == (^[A-Za-z0-9])
    //mag een punt of kopppeltekens bevatten (geen undescore, meerdere tekens) == ([-A-Za-z0-9.]*)
    // @ == @
    // mag een punt of kopppeltekens bevatten + minstens 2 lang == ([-A-Za-z0-9]{2,})
    //dot == [.]
    //huidige langste top level domain is 24 char lang => extentie email is dus max 24 char lang == ([A-Za-z0-9]{2,24})
    //volledige mail controle /(^[A-Za-z0-9])([-A-Za-z0-9.]*)@([-A-Za-z0-9]{2,})[.]([-A-Za-z0-9]{2,24})/g
    //gebruikte bronnen
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
    //https://www.icann.org/resources/pages/tlds-2012-02-25-en
    //https://stackoverflow.com/questions/9238640/how-long-can-a-tld-possibly-be#:~:text=Longest%20TLD%20up%20to%20date,northwesternmutual%20or%20.
    //https://regexr.com/
    
    //probleem; sectie tussen @ en .(com) zou punten(.) mogen bevatten, oplossing: afsplitsen .(com) met string methode
    //test eerste deel is dan /(^[A-Za-z0-9])([-A-Za-z0-9.]*)@([-A-Za-z0-9.]{2,})/g
    //test tweede deel is dan /([-A-Za-z0-9]{2,24})/g
    let regex1 = /(^[A-Za-z0-9])([-A-Za-z0-9.]*)@([-A-Za-z0-9.]{2,})/g;
    let regex2 = /([-A-Za-z0-9]{2,24})/g;

    let email1 = emailadres.substring(0,emailadres.length - (emailadres.split(".")[(emailadres.split(".").length - 1)].length + 1));
    let email2 = emailadres.split(".")[(emailadres.split(".").length - 1)];
    //console.log(email1)
    //console.log(email2)

    //regex check
    let check1 = email1.match(regex1);
    let check2 = email2.match(regex2);
    //console.log(check1)
    //console.log(check2)
    //regex arrey mag niet leeg zijn => geen match tussen mail en patroon
    if(check1 == null || check2.length == null){
        return false;
    }

    //mail komt niet overeen met regex
    if(emailadres != check1[0] + "." + check2[0]){
        return false;
    }
    //mail komt overeen met regex
    else{
        return true;
    }
}

function validatePass(passwoord1,passwoord2){
//var
let fouten = ["Je wachtwoorden komen niet overeen.","Het gebruikte wachtwoord is te kort, gebruik minstens 8 tekens"];
let output = [];
//test of beide wachtwoorden zijn ingevuld => wordt reeds gedaan, niet nodig in deze functie
//test of wachtwoorden gelijk zijn
if(passwoord1 !== passwoord2){
 output.push(fouten[0]);
}
//test of wachtwoord minder dan 8 karakters heeft
if(( passwoord1.length >= 1 && passwoord1.length < 8)||(passwoord2.length >= 1 && passwoord2.length < 8)){
    output.push(fouten[1]);
}
//geef fouten terug
return output;
}

function validateUsername(Username){
//moet minstens één karakter zijn => indien niet is het vak leeg; wordt reeds getest
if(Username == ""){
    return 3;
}
//1) mag letters nummers of underscore bevatten => zie volgende lijn: letters,nummers,underscore,punten en koppeltekens == /[-A-Za-z0-9_.]*/g
//2) mag punten en koppeltekens bevatten maar niet als eerste => enkel nummers,letters en underscore eerst == /^[A-Za-z0-9_]/g
//3) samen == /(^[A-Za-z0-9_])([-A-Za-z0-9_.]*)/g
//zie regex bij function validateEmail voor de bronnen

let regex = /(^[A-Za-z0-9_])([-A-Za-z0-9_.]*)/g;
let regex1 = /^[A-Za-z0-9_]/g;
let regex2 = /[-A-Za-z0-9_.]*/g;

//test1: eerste letter
//test2: test voor tekens
//test: test geheel
let test1 = false;
let test2 = false;
let test = false;
let check1 = Username.match(regex1);
let check2 = Username.match(regex2);
let check = Username.match(regex);

//test1 heeft return waarde? == geslaagd
if(check1 != null){
    test1 = true;
    //console.log(check1[0])
}
//test2 heeft return waarde? 
if(check2 != null){
    //komt overeen met input?
    if(check2[0] == Username){
        test2 = true;
        //console.log(check2[0])
    }
}
//test heeft returnwaarde?
if(check != null){
    //test komt overeen met input? ja == true
    if(Username == check[0]){
        test = true;
        //console.log(check[0])
    }
}

//output: 0: alles fout, 1: bevat tekens die niet mogen, 2:eerste letter bevat tekens die niet mogen, 3: alles juist
// test = true == return 3
// !test1 & test2 = true == return 2
// test1 & !test2 = true == return 1
// !test1 & !test2 = true == return 0
if(test){
    return 3;
}
else if(!test1 && test2){
    return 2;
}
else if(test1 && !test2){
    return 1;
}
else{
    return 0;
}
}

function validatePayment(veld){
// vul betalingswijze alert op
textbetaling.innerText = "Je betalingswijze is " + veld.value + ".";
}

function checkPC(veld){
// veld mag niet leeg zijn = > wordt al getest
if(veld.value == ""){
    return "";
}
//test of waarde tussen 1000 en 9999 ligt
// https://www.w3schools.com/jsref/jsref_parseint.asp
//test of ingegeven waarde enkel getal is
if(String(parseInt(veld.value)) == veld.value){
    //waarde tussen 1000 en 9999
    if((parseInt(veld.value) < 10000) & (parseInt(veld.value)>= 1000)){
        return "";
    }
    else{
        return "De waarde van postcode moet tussen 1000 en 9999 liggen.";
    }

   
}
return "De waarde van postcode moet tussen 1000 en 9999 liggen.";
}

function validateVoorwaarden(veld){
//test of algemene voorwaarden zijn aangeduid
if(veld.checked){
    return "";
}
else{
    return"Je moet de algemene voorwaarden accepteren.";
} 
}
