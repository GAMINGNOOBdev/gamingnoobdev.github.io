const audio = document.getElementsByTagName('audio')[0];
const jaronaDisplay = document.createElement("div");
var maxJPS = 0, maxJPM = 0;
var jpsCollection = [];
var jps = 0, jpm = 0;
var jaronaCount = 0;

document.body.appendChild(jaronaDisplay);
audio.volume = 0.25;

function showJaronaMeter(){
    jaronaDisplay.style = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        color: green;
        text-shadow: 0 0 10px #009900;
        border: 1px solid green;
        box-shadow: 1px 1px 1px 1px #003300;
        padding: 5px;
    `;
    jaronaDisplay.innerHTML = `
        JARONA PER SECOND<br/>${jps} (PB: ${maxJPS})<br/>
        JARONA PER MINUTE<br/>${jpm} (PB: ${maxJPM})
    `;
}

function hideJaronaMeter()
{
    jaronaDisplay.style = `display:none;`;
}

window.setInterval(() => {
    jps = jaronaCount;
    maxJPS = jps > maxJPS ? jps : maxJPS;
    jpsCollection.push(jps);
    if (jpsCollection.length > 60)
        jpsCollection.shift();

    jpm = (jpsCollection.reduce((a, b) => a + b) / jpsCollection.length).toFixed(2);
    maxJPM = jpm > maxJPM ? jpm : maxJPM;

    jaronaCount = 0;

    if (jps == 0 && jpm == 0)
    {
        hideJaronaMeter();
        return;
    }

    showJaronaMeter();
}, 1000);

var keybuffer = "";
document.addEventListener("keydown", function(event){
    if (event.key.length > 1)
        return;

    keybuffer += event.key;
    if (keybuffer.length > 6)
        keybuffer = keybuffer.substring(1);

    if (keybuffer.toLocaleLowerCase() == "jarona")
    {
        var jarona = new Audio("snd/jarona.mp3");
        jarona.volume = 0.25;
        jarona.play();
        jaronaCount++;
        jaronaMinuteCount++;
        showJaronaMeter();
    }
});