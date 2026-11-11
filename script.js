
function pad(n) {
    return String(n).padStart(2, "0");
}


const clockTime = document.getElementById("clockTime");
const clockDate = document.getElementById("clockDate");

function updateClock() {
    const now = new Date();
    clockTime.textContent = pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
    clockDate.textContent = now.toDateString();
}

updateClock();
setInterval(updateClock, 1000);


const timerHour = document.getElementById("timerHour");
const timerMin = document.getElementById("timerMin");
const timerSec = document.getElementById("timerSec");
const timerDisplay = document.getElementById("timerDisplay");
const timerMsg = document.getElementById("timerMsg");

let timerInterval = null;
let timeLeft = 0; 

function showTimer() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

document.getElementById("timerStart").addEventListener("click", function () {
    if (timerInterval) return; // already running

    if (timeLeft === 0) {
        timeLeft = Number(timerHour.value) * 3600 + Number(timerMin.value) * 60 + Number(timerSec.value);
    }
    if (timeLeft <= 0) {
        timerMsg.textContent = "Please enter some time";
        return;
    }

    timerMsg.textContent = "";
    showTimer();

    timerInterval = setInterval(function () {
        timeLeft--;
        showTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerMsg.textContent = "Time is up!";
        }
    }, 1000);
});

document.getElementById("timerPause").addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById("timerReset").addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 0;
    timerMsg.textContent = "";
    showTimer();
});


const swDisplay = document.getElementById("swDisplay");

let swInterval = null;
let swStartTime = 0;
let swElapsed = 0; 

function showStopwatch() {
    const minutes = Math.floor(swElapsed / 60000);
    const seconds = Math.floor(swElapsed / 1000) % 60;
    const centi = Math.floor(swElapsed / 10) % 100;
    swDisplay.textContent = pad(minutes) + ":" + pad(seconds) + "." + pad(centi);
}

document.getElementById("swStart").addEventListener("click", function () {
    if (swInterval) return; // already running

    swStartTime = Date.now() - swElapsed;
    swInterval = setInterval(function () {
        swElapsed = Date.now() - swStartTime;
        showStopwatch();
    }, 10);
});

document.getElementById("swStop").addEventListener("click", function () {
    clearInterval(swInterval);
    swInterval = null;
});

document.getElementById("swReset").addEventListener("click", function () {
    clearInterval(swInterval);
    swInterval = null;
    swElapsed = 0;
    showStopwatch();
});
