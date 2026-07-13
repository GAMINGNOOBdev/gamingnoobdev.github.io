var audio = document.getElementsByTagName('audio')[0];
audio.volume = 0.25;

var keybuffer = "";
document.addEventListener("keydown", function(event){
    keybuffer += event.key;
    if (keybuffer.length > 6)
        keybuffer = keybuffer.substring(1);

    if (keybuffer.toLocaleLowerCase() === "jarona")
    {
        var jarona = new Audio("snd/jarona.mp3");
        jarona.volume = 0.25;
        jarona.play();
    }
});