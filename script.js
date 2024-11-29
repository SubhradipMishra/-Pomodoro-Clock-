let sessionTime = 25; // Default session time in minutes
let breakTime = 5; // Default break time in minutes
let timer;
let isSession = true; // To track whether it's session or break time
let isRunning = false; // To track whether the timer is running

const countdownDisplay = document.getElementById('countdown-display');
const sessionTimeDisplay = document.getElementById('session-time');
const breakTimeDisplay = document.getElementById('break-time');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const increaseSessionButton = document.getElementById('increase-session');
const decreaseSessionButton = document.getElementById('decrease-session');
const increaseBreakButton = document.getElementById('increase-break');
const decreaseBreakButton = document.getElementById('decrease-break');

function updateCountdownDisplay() {
  let minutes = Math.floor(sessionTime / 60);
  let seconds = sessionTime % 60;
  countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (isSession) {
    timer = setInterval(() => {
      if (sessionTime > 0) {
        sessionTime--;
        updateCountdownDisplay();
      } else {
        clearInterval(timer);
        isSession = false;
        sessionTime = breakTime * 60; // Set session time to break time for break countdown
        updateCountdownDisplay();
        startTimer(); // Start break time countdown
      }
    }, 1000);
  } else {
    timer = setInterval(() => {
      if (sessionTime > 0) {
        sessionTime--;
        updateCountdownDisplay();
      } else {
        clearInterval(timer);
        isSession = true;
        sessionTime = 25 * 60; // Reset to default session time after break
        updateCountdownDisplay();
      }
    }, 1000);
  }
}

function toggleButtons(disable) {
  increaseSessionButton.disabled = disable;
  decreaseSessionButton.disabled = disable;
  increaseBreakButton.disabled = disable;
  decreaseBreakButton.disabled = disable;
}

startButton.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    toggleButtons(true);
    startButton.textContent = "Stop";
    startTimer();
  } else {
    isRunning = false;
    toggleButtons(false);
    startButton.textContent = "Start";
    clearInterval(timer);
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  toggleButtons(false);
  startButton.textContent = "Start";
  sessionTime = 25 * 60;
  breakTime = 5 * 60;
  updateCountdownDisplay();
});

increaseSessionButton.addEventListener('click', () => {
  if (!isRunning) {
    sessionTime += 60;
    sessionTimeDisplay.textContent = sessionTime / 60;
    updateCountdownDisplay();
  }
});

decreaseSessionButton.addEventListener('click', () => {
  if (!isRunning && sessionTime > 60) {
    sessionTime -= 60;
    sessionTimeDisplay.textContent = sessionTime / 60;
    updateCountdownDisplay();
  }
});

increaseBreakButton.addEventListener('click', () => {
  if (!isRunning) {
    breakTime += 60;
    breakTimeDisplay.textContent = breakTime / 60;
  }
});

decreaseBreakButton.addEventListener('click', () => {
  if (!isRunning && breakTime > 60) {
    breakTime -= 60;
    breakTimeDisplay.textContent = breakTime / 60;
  }
});

updateCountdownDisplay();
