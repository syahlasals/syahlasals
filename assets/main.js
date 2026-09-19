import { initClock } from "./js/clock.js";
import { initProjectModal } from "./js/projects-modal.js";
import { initNavigation } from "./js/navigation.js";
import { initWindows } from "./js/windows.js";

document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initProjectModal();
  initNavigation();
  initWindows();

  // document.getElementById("printBtn").addEventListener("click", () => window.print());
});