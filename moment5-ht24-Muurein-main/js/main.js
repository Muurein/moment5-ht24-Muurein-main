// Denna fil ska innehålla din lösning till uppgiften (moment 5).

"use strict"; 

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare
document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

/* Här under börjar du skriva din JavaScript-kod */
/*
    PLANERING
    1. Skapa sidomeny
        1a. window.onload init:
            1aa. getElementById mainnavlist
            1ab. skapa 10 li-element med olika namn/värden, ska läsas in från Sveriges Radios rest-webbtjänst
            1ac. lägg till under mainnavlist.appendChild
            1ad. lägg till under mainnav.appendChild?????
        1b. förs muspekaren över ska (("hover", function)???) ska en info-rutan dyka upp med info om kanalen. Ska läsas in från Sveriges Radois rest-webbtjäsnt - 2.01 i videon
            https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event
    2. Skapa tablå ¨
        2a. klickar man på en kanal ska man se en tablå över kanalens program som inte redan har gått (bara dagens fram till midnatt - date-objekt, getDate, getHour(?)). Följande info om programmet ska finnas med:
            2aa. titel
            2ab. undertitel (om det finns), ska annars inte visas och *ska inte dyka upp ett felmeddelande*
            2ac. sändnigstid
            2ad. info om programmet
        2b. ska bara kunna se kanalens program som inte redan har gått (bara dagens fram till midnatt - date-objekt, getDate, getHour(?))
            
*/

//1a when the page loads
window.onload = init;

//1a - gets and shows a list of the channels when the page loads 
function init() {
    getChannels();
}

//1aa + 1ab - get channels to be able to show them in the list
function getChannels() {
    //stores the url, changes the recieved data to JSON - GETS ALL CHANNELS???
    const url = "http://api.sr.se/api/v2/channels?format=json";

    //fetch - calls for the url
    fetch(url)
    //turn the response into JSON
    .then(response => response.json())
    //från Malins övning - vill få ut värdet ur nycklarna, dock var det variabler så det kanske inte funkar - VALUES ÄR FEL
    //.then(data => writeChannels(Object.keys(data.channels))) //KAN OCKSÅ TESTA BARA SKRIVA .then(data => {writeChannels.data}), får inga siffror bara [object object]
    .then(data => writeChannels(data.channels))
    .catch(error => console.log("There was an error " + error))
}



//i det här stadiet är arrayen uttagen ur datan. Nu ska vi bara få fram namnen
//1ac + 1ad + 1b? - write out the channels under <ul id="mainnavlist">
function writeChannels(channels) {

    //get the HTML-element where I want to write out the channels
    const channelsEl = document.getElementById("mainnavlist");
    console.log(channels);
    
  
//Eftersom det är en array - måste jagf först definiera index och sen namn????????
    //loops through the given array to create the list of channels
    channels.forEach(channel => {
        //got help from youtuber ByteGrad at https://www.youtube.com/watch?v=zUcc4vW-jsI
        //creates a li-element and puts the name-property from the channels-array into the ul-element
        const markup = `<li>${channel.name}</li>`;
        document.querySelector("ul").insertAdjacentHTML("beforeend", markup);
    })
    
}

//pre-2 - get the channel programs
function getTVTable() {

}



//2aa + 2ab + 2ac + 2ad write out the channel programs
function writeTVTable() {

}



