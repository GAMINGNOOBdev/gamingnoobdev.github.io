const firebaseConfig = {
    apiKey: "AIzaSyCWpFccrfHtTMXJbiU_74SvPbnByFKCkYw",
    authDomain: "gamingnoobdev.firebaseapp.com",
    databaseURL: "https://gamingnoobdev-default-rtdb.firebaseio.com",
    projectId: "gamingnoobdev",
    storageBucket: "gamingnoobdev.firebasestorage.app",
    messagingSenderId: "983937650680",
    appId: "1:983937650680:web:abe755eb358eafa90ad00d"
};

let message_input, maindatabase, textsdatabase, imagedatabase;

function initEverything()
{
    firebase.initializeApp(firebaseConfig);

    maindatabase = firebase.database();
    textsdatabase = maindatabase.ref().child('texts');
    imagedatabase = maindatabase.ref().child('images');

    message_input = document.getElementById("message-input");
}

function submit_text_message()
{
    if (message_input.value == "")
        return;

    var data = {
        time: time_and_date_string(),
        message: message_input.value
    };

    message_input.value = "";

    var newPostKey = maindatabase.ref().child('texts').push().key;
    var updates = {};
    updates['/' + newPostKey] = data;
    textsdatabase.update(updates);
    alert("Message sent!!");
}

function time_and_date_string()
{
    var currentdate = new Date();
    return  currentdate.getUTCDate() + "-" + (currentdate.getUTCMonth() + 1) + "-" + currentdate.getUTCFullYear() + " at " +
            currentdate.getUTCHours() + ":" + currentdate.getUTCMinutes() + ":" + currentdate.getUTCSeconds() + " UTC";
}

