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
   // showInfo();
    getTVTable();
}

//1aa + 1ab - get channels to be able to show them in the list
function getChannels() {
    //stores the url, changes the recieved data to JSON
    const url = "http://api.sr.se/api/v2/channels?format=json";

    //fetch - calls for the url
    fetch(url)
        //turn the response into JSON
        .then(response => response.json())
        //gets the data
        .then(data => { 
            console.log(data)
            writeChannels(data.channels)})
        .catch(error => console.log("There was an error " + error))
    }

//1ac + 1ad + 1b
function writeChannels(channels) {

    //get the HTML-element where I want to write out the channels
    const channelsEl = document.getElementById("mainnavlist");
   // console.log(channels);

    //loops through the given array to create the list of channels
    channels.forEach(channel => {

         //creates the list item and adds the "hovering-box"
        let channelLiEl = document.createElement("li");
        let listTextEl = document.createTextNode(channel.name);
        channelLiEl.setAttribute("title", channel.tagline);
        channelLiEl.value = channel;


        //smush them together
        channelLiEl.appendChild(listTextEl);
        channelsEl.appendChild(channelLiEl);
        
    })
    
}


//pre-2 - get the channel programs
function getTVTable() {
    let url = "http://api.sr.se/api/v2/scheduledepisodes/rightnow?format=json"; 

    console.log(url);

    //fetch - calls for the url
    fetch(url)
        //turn the response into JSON
        .then(response => response.json())
        //från Malins övning - vill få ut värdet ur nycklarna, dock var det variabler så det kanske inte funkar - VALUES ÄR FEL
        //.then(data => writeChannels(Object.keys(data.channels))) //KAN OCKSÅ TESTA BARA SKRIVA .then(data => writeChannels.data), får inga siffror bara [object object] .then(data => console.log(data.channels))
        .then(data => writeTVTable(data.channels))
        .catch(error => console.log("There was an error " + error))
}




//2aa + 2ab + 2ac + 2ad write out the channel programs
function writeTVTable() {
    //console.table(channels.name.title.description);
    let tableEl = document.getElementById("info");

    //console.log(tableEl);

    //skapa datum??
    

}




/*
        //creates the list item
       // let channelLiEl = document.createElement("li");




       /försök från föreläsning
       //add text(value)
       let textNode = document.createTextNode(channels.name); //BLIR BARA UNDEFINED VA FAN DÅ FÖR
       channelLiEl.appendChild(textNode);
       channelsEl.appendChild(channelLiEl);/

       //eget försök som inte funkade
        itemEl.classname = "item";

        document.getElementsByClassName("item").innerHTML = channel.name;
        console.log(channel.name);/

        //försök från övningen med hundarna
        /channelLiEl.value = channel;

        //add text(value)
        channelLiEl.textContent = channel;

        channel

        channelsEl.appendChild(channelLiEl);/


        //BEHÖVER FÅ UT KANALNAMN SÅ KEYS I GETCHANNELS ÄR KANSKE FEL??
*/
