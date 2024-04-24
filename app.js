let timer; // Variable to hold the interval timer
let running = false; // Flag to track if stopwatch is running
let startTime; // Variable to hold start time
let lapNumber = 1; // Variable to keep track of lap number

// start and stop function
function startStop() {
  if (running) {
    clearInterval(timer);
    document.getElementById("startStop").innerText = "Start";
    running = false;
  } else {
    startTime = Date.now() - laps.reduce((acc, lap) => acc + lap.time, 0);
    timer = setInterval(updateDisplay, 10);
    document.getElementById("startStop").innerText = "Stop";
    running = true;
  }
}

// lap function
function lapReset() {
  if (running) {
    const lapTime = Date.now() - startTime;
    laps.push({ number: lapNumber++, time: lapTime });
    updateLaps();
  } else {
    document.getElementById("display").innerText = "00:00:00";
    lapNumber = 1;
    laps = [];
    updateLaps();
  }
}

// time update function
function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById("display").innerText = formattedTime;
}

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const centiseconds = Math.floor((milliseconds % 1000) / 10);

  return (
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + "." +
    (centiseconds < 10 ? "0" : "") + centiseconds
  );
}

// lap update function
function updateLaps() {
  const lapsList = document.getElementById("laps");
  lapsList.innerHTML = "";
  laps.forEach(lap => {
    const lapItem = document.createElement("li");
    lapItem.innerText = `Lap ${lap.number}: ${formatTime(lap.time)}`;
    lapsList.appendChild(lapItem);
  });
}

let laps = [];
