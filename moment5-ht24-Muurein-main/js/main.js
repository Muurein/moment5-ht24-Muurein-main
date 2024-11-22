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
    //stores the url, changes the recieved data to JSON
    const url = "http://api.sr.se/api/v2/channels?format=json";

    //fetch - calls for the url
    fetch(url)
        //turn the response into JSON
        .then(response => response.json())
        //gets the data
        .then(data => {writeChannels(data.channels)})
        .catch(error => console.log("There was an error " + error))

    }

//1ac + 1ad + 1b
function writeChannels(channels) {

    //get the HTML-element where I want to write out the channels
    const channelsEl = document.getElementById("mainnavlist");

    //loops through the given array to create the list of channels
    channels.forEach(channel => {
         //creates the list item and adds the "hovering-box"
        let channelLiEl = document.createElement("li");
        let listTextEl = document.createTextNode(channel.name);
        channelLiEl.setAttribute("title", channel.tagline);
        
        channelLiEl.addEventListener("click", () => {getTVTable(channel.id)});


        //smush them together
        channelLiEl.appendChild(listTextEl);
        channelsEl.appendChild(channelLiEl);
        
       
    })
    //channelsEl.addEventListener("click", getTVTable); //förut var det getTableP1
}





//pre-2 - get the channel programs
function getTVTable(channelId) {
    const url = `http://api.sr.se/api/v2/scheduledepisodes?channelid=${channelId}&format=json&pagination=false`; 
    console.log(channelId);
    clearTVTable();

    //fetch - calls for the url
    fetch(url)
        //turn the response into JSON
        .then(response => response.json())
        //från Malins övning - vill få ut värdet ur nycklarna, dock var det variabler så det kanske inte funkar - VALUES ÄR FEL
        //.then(data => writeChannels(Object.keys(data.channels))) //KAN OCKSÅ TESTA BARA SKRIVA .then(data => writeChannels.data), får inga siffror bara [object object] .then(data => console.log(data.channels))
        .then(data => {writeTVTable(data.schedule)})
        //.catch(error => console.log("There was a schedule error " + error))
}




//2aa + 2ab + 2ac + 2ad write out the channel programs
function writeTVTable(schedule) {
    //get div-element where the table will be written out
    let tableEl = document.getElementById("info");

    //loops through and adds elements <article><h2>title</h2><h4>subtitle</h4><p>description</p></article>
    schedule.forEach(episode => {
        //convert endtimeutc to JavaScript-date to be able to handle it
        let episodeEndDateTime = episode.endtimeutc.replace(/\D/g, ''); //replaces everything that isn't numbers in string
        episodeEndDateTime = new Date(parseInt(episodeEndDateTime)); //converts unix-timestamp-string to numbers and gives timestamp and it converts to hours, minuites etc.
        
        //if episode has ended, stop this loop-iteration
        if(episodeEndDateTime < Date.now()) {
            return;
        }
    
        
        let articleEl = document.createElement("article");

        //title h2
        let heading2El = document.createElement("h2");
        let heading2TextEl = document.createTextNode(episode.title);
        heading2El.appendChild(heading2TextEl);

        //subtitle h4
        let heading4El = document.createElement("h4");
        //adds empty string if there is no subtitle
        let heading4TextEl = document.createTextNode(episode.subtitle || "");
        heading4El.appendChild(heading4TextEl);

        //description
        let descEl = document.createElement("p");
        let descTextEl = document.createTextNode(episode.description);
        descEl.appendChild(descTextEl)

        //time
        let newDivEl = document.createElement("div");
        let dateText = document.createTextNode(getDateAndTime(episode.starttimeutc)+ " - " +getDateAndTime(episode.endtimeutc));
        newDivEl.appendChild(dateText);


        //smush them all together
        articleEl.appendChild(heading2El);
        articleEl.appendChild(heading4El);
        articleEl.appendChild(descEl);
        articleEl.appendChild(newDivEl);
        tableEl.appendChild(articleEl);
        
    })
}

function getDateAndTime(dateStr) {
    //convert endtimeutc to JavaScript-date to be able to handle it
    let onlyNumbers = dateStr.replace(/\D/g, ''); //replaces everything that isn't numbers in string
    onlyNumbers = parseInt(onlyNumbers); //converts unix-timestamp-string to numbers

    const date = new Date(onlyNumbers); //gives timestamp and it converts to hours, minuites etc.
    let time = date.toLocaleString("sv-SE", {hour:"numeric", minute:"numeric"});


     return time;
}

//remove from list when clicking on another channel
function clearTVTable() {
    let tableEl = document.getElementById("info");

    while(tableEl.firstChild) {
        tableEl.removeChild(tableEl.firstChild);
    }

}
