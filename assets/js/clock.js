export function initClock() {

  const clockElement = document.getElementById("clock");

    if (!clockElement) {
    console.warn('Clock element "#clock" was not found.');
    return;
  }

  function updateClock() {
    const now = new Date();

    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12 || 12;
    
    clockElement.textContent = `${h}:${m} ${ampm}`;
  }

  updateClock();
  setInterval(updateClock, 1000 * 15);
}