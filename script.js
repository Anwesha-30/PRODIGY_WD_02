// script.js — robust stopwatch using Date.now() so it does not drift
document.addEventListener('DOMContentLoaded', () => {
  const timeDisplay = document.getElementById('time');
  const startBtn = document.getElementById('start');
  const stopBtn  = document.getElementById('stop');
  const resetBtn = document.getElementById('reset');

  let startTime = 0;       // timestamp when started (Date.now())
  let elapsed = 0;         // elapsed ms accumulated while paused
  let timerInterval = null;

  // format ms -> HH:MM:SS
  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  }

  // update display from elapsed + (now - startTime) if running
  function updateDisplay() {
    const now = Date.now();
    const current = elapsed + (startTime ? (now - startTime) : 0);
    timeDisplay.textContent = formatTime(current);
  }

  function start() {
    if (timerInterval) return;           // already running
    startTime = Date.now();
    // update ~10 times per second (100ms) — smooth enough and cheap
    timerInterval = setInterval(updateDisplay, 100);
  }

  function stop() {
    if (!timerInterval) return;          // already stopped
    clearInterval(timerInterval);
    timerInterval = null;
    elapsed += Date.now() - startTime;   // accumulate
    startTime = 0;
    updateDisplay();
  }

  function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    startTime = 0;
    elapsed = 0;
    timeDisplay.textContent = '00:00:00';
  }

  startBtn.addEventListener('click', start);
  stopBtn.addEventListener('click', stop);
  resetBtn.addEventListener('click', reset);
});
