import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app-check.js';

const firebaseConfig = {
    apiKey: "AIzaSyCWpFccrfHtTMXJbiU_74SvPbnByFKCkYw",
    authDomain: "gamingnoobdev.firebaseapp.com",
    databaseURL: "https://gamingnoobdev-default-rtdb.firebaseio.com",
    projectId: "gamingnoobdev",
    storageBucket: "gamingnoobdev.firebasestorage.app",
    messagingSenderId: "983937650680",
    appId: "1:983937650680:web:abe755eb358eafa90ad00d"
};

var app;

let message_input, maindatabase, textsdatabase, imagedatabase, status_text;

window.initEverything = initEverything
window.submit_text_message = submit_text_message
window.erase = erase
window.submit_drawing = submit_drawing
window.redo = redo
window.undo = undo

export function initEverything()
{
    app = initializeApp(firebaseConfig);
    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider('6LdiA70rAAAAAJCDnWvYC3mm4CcRKzVrROj-2w5o'),
        isTokenAutoRefreshEnabled: true
    })

    maindatabase = getDatabase();
    textsdatabase = ref(maindatabase, "texts/");
    imagedatabase = ref(maindatabase, "images/");
    status_text = document.getElementById("status_text");

    message_input = document.getElementById("message-input");

    initDrawing();
}

export function playSound(url)
{
    const audio = new Audio(url);
    audio.play();
}

export function submit_text_message()
{
    if (message_input.value == "")
    {
        status_text.textContent = "no empty images smh"
        return
    }

    if (message_input.disabled == true)
    {
        status_text.textContent = "taking away your privileges for sending gimmicks womp womp."
        return
    }

    message_input.disabled = true

    var data = {
        time: time_and_date_string(),
        message: message_input.value
    };

    push(textsdatabase, data)
        .then(() => {
            playSound("../snd/explode.mp3");
            status_text.textContent = "Message sent!!";
        })
        .catch((error) => {
            status_text.textContent = `failed to send message ${error.message})`
            console.error("failed", error)
        })
}

function time_and_date_string()
{
    var currentdate = new Date();
    return  currentdate.getUTCDate() + "-" + (currentdate.getUTCMonth() + 1) + "-" + currentdate.getUTCFullYear() + " at " +
            currentdate.getUTCHours() + ":" + currentdate.getUTCMinutes() + ":" + currentdate.getUTCSeconds() + " UTC";
}

/**
 * Drawing stuff
 */

var canvas, toooooolbar, ctx,
    flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false,
    drawcolor = "black",
    lineWidth = 5,
    isTouch = false,
    w = 512,
    h = 512

let history = []
let historyIndex = -1

function initDrawing()
{
    canvas = document.getElementById("masterpiece-input")
    toooooolbar = document.getElementById("toolbar")
    ctx = canvas.getContext("2d")

    drawcolor = document.getElementById("drawcolor").value
    lineWidth = parseInt(document.getElementById("thicc-ness").value)

    w = canvas.width
    h = canvas.height

    toooooolbar.addEventListener("click", e => {
        if (e.target.id === "clear")
            ctx.clearRect(0, 0, canvas.width, canvas.height)
    })

    toooooolbar.addEventListener("change", e => {
        if(e.target.id === "drawcolor")
            drawcolor = e.target.value;

        if(e.target.id === "thicc-ness")
            lineWidth = e.target.value;
    })

    canvas.addEventListener("touchstart", function (e) {
        isTouch = true
        findxy("down", e)
        e.preventDefault()
    }, false);
    canvas.addEventListener("touchend", function (e) {
        isTouch = true
        findxy("up", e)
        e.preventDefault()
    }, false);
    canvas.addEventListener("touchmove", function (e) {
        isTouch = true
        findxy("move", e)
    }, false);

    canvas.addEventListener("mousemove", function (e) {
        isTouch = false
        findxy("move", e)
    }, false)
    canvas.addEventListener("mousedown", function (e) {
        isTouch = false
        findxy("down", e)
    }, false)
    canvas.addEventListener("mouseup", function (e) {
        isTouch = false
        findxy("up", e)
    }, false)
    canvas.addEventListener("mouseout", function (e) {
        isTouch = false
        findxy("out", e)
    }, false)

    document.addEventListener('keydown', function(e) {
        if (document.activeElement == message_input)
            return

        if ((e.ctrlKey || e.metaKey) && e.key === 'z')
            undo()

        if (((e.ctrlKey || e.metaKey) && e.key === 'y') || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z'))
            redo()
    });
}

function draw()
{
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currX, currY)
    ctx.strokeStyle = drawcolor
    ctx.lineWidth = lineWidth
    ctx.lineCap = "round"
    ctx.stroke()
    ctx.closePath()
}

export function erase()
{
    var m = confirm("Want to clear? (will reset history)")
    if (!m)
        return

    ctx.clearRect(0, 0, w, h)
    history = []
    historyIndex = -1
}

export function submit_drawing()
{
    if (history.length == 0)
    {
        status_text.textContent = "no empty images smh"
        return
    }

    if (canvas.disabled == true)
    {
        status_text.textContent = "please don't spam."
        return
    }

    if (canvas.width != w || canvas.height != h)
    {
        status_text.textContent = "STOP MESSING WITH ME YOU MOTHERFUCKER"
        return
    }

    canvas.disabled = true

    var dataURL = canvas.toDataURL();

    var data = {
        time: time_and_date_string(),
        image: dataURL
    };

    push(imagedatabase, data)
        .then(() => {
            playSound("../snd/explode.mp3");
            status_text.textContent = "Image sent!!"
        })
        .catch((error) => {
            status_text.textContent = `failed to send image ${error.message}`
            console.error("failed", error)
        })
}

function findxy(res, e)
{
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (res == "down")
    {
        prevX = currX;
        prevY = currY;
        currX = e.clientX;
        currY = e.clientY;
        if (isTouch)
        {
            currX = e.touches[0].clientX;
            currY = e.touches[0].clientY;
        }

        currX = (currX - rect.left) * scaleX
        currY = (currY - rect.top) * scaleY

        flag = true;
        dot_flag = true;
        if (dot_flag)
        {
            ctx.beginPath();
            ctx.fillStyle = drawcolor;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }

    if (res == "up" || res == "out")
    {
        flag = false;
        if (res == "up")
            saveToHistory();
    }

    if (res == "move" && flag)
    {
        prevX = currX;
        prevY = currY;
        currX = e.clientX;
        currY = e.clientY;
        if (isTouch)
        {
            currX = e.touches[0].clientX;
            currY = e.touches[0].clientY;
        }

        currX = (currX - rect.left) * scaleX
        currY = (currY - rect.top) * scaleY
        draw();
    }
}

function saveToHistory()
{
    if (historyIndex < history.length - 1)
        history = history.slice(0, historyIndex+1)
    var currentData = canvas.toDataURL();
    history.push(currentData)
    historyIndex++
}

export function redo()
{
    if (historyIndex == history.length - 1)
        return

    historyIndex++
    const prevState = history[historyIndex]

    const img = new Image()
    img.onload = function() {
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, w, h)
        ctx.drawImage(img, 0, 0)
    }
    img.onerror = function() {
        console.error("cannot undo idk why")
    }
    img.src = prevState
}

export function undo()
{
    if (historyIndex < 0)
        return

    if (historyIndex == 0)
    {
        ctx.clearRect(0, 0, w, h)
        history = []
        historyIndex = -1
        return
    }

    historyIndex--
    const prevState = history[historyIndex]
    
    const img = new Image()
    img.onload = function() {
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, w, h)
        ctx.drawImage(img, 0, 0)
    }
    img.onerror = function() {
        console.error("cannot undo idk why")
    }
    img.src = prevState
}
