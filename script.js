let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

/*function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}*/
function speak(text) {
    console.log("Speak function called with text:", text);
    window.speechSynthesis.cancel(); // Clear previous queue
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";  // Switch to "en-US" if issues persist
    window.speechSynthesis.speak(text_speak);
}


function wishme() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon");
    } else if (hours >= 16 && hours <= 19) {
        speak("Good evening");
    } else {
        speak("Good night");
    }
}

window.addEventListener('load', () => {
    wishme();
});

let speechrecog = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = new speechrecog();

recog.onresult = (event) => {
    let currentindex = event.resultIndex;
    let transcript = event.results[currentindex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener("click", () => {
    recog.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    if (message.includes("hello") || message.includes("hey") || message.includes("hii")) {
        speak("Hello, how can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am Shifra, your virtual assistant, created by Prachi.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com", "_blank");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("whatsapp://", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator");
        window.open("calculator://", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let day = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(`Today is ${day}`);
    } 
    else if (message.includes("director of sitcoe")) {
        speak("director of sitcoe");
        window.open("https://www.sitcoe.ac.in/","_blank");
    }
    
        else{
        let finaltxt = "This is what I found on the internet regarding " + message.replace("shifra", "").replace("shipra", "");
        speak(finaltxt);
        window.open(`https://www.google.com/search?q=${message.replace("shipra", "").replace("shifra", "")}`, "_blank");
    }
}
