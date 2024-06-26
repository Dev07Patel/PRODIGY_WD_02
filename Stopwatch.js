let startTime;
let elapsedTime = 0;
let timerInterval;

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const lapButton = document.getElementById('lap-button');
const resetButton = document.getElementById('reset-button');
const lapTimes = document.getElementById('lap-times');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(3, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        timeDisplay.innerHTML = timeToString(elapsedTime);
    }, 10);
    showButton('PAUSE');
}

function pauseTimer() {
    clearInterval(timerInterval);
    showButton('PLAY');
}

function resetTimer() {
    clearInterval(timerInterval);
    timeDisplay.innerHTML = "00:00:00.000";
    elapsedTime = 0;
    lapTimes.innerHTML = '';
    showButton('PLAY');
}

function lapTimer() {
    const lapTime = document.createElement('div');
    lapTime.textContent = timeToString(elapsedTime);
    lapTimes.appendChild(lapTime);
}

function showButton(buttonKey) {
    const buttonToShow = buttonKey === 'PLAY' ? startButton : pauseButton;
    const buttonToHide = buttonKey === 'PLAY' ? pauseButton : startButton;
    buttonToShow.style.display = 'inline';
    buttonToHide.style.display = 'none';
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);

showButton('PLAY');
