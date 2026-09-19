export function initWindows() {

  initWindowControls();
  initExplorerRows();
}

// Handle window titlebar and minimize buttons.
function initWindowControls() {
  document.querySelectorAll(".win-titlebar").forEach((bar) => {
    const windowElement = bar.closest(".win");

    if (!windowElement) return;

    // Skip modal windows.
    if (windowElement.classList.contains("modal-win")) return;

    // Toggle window collapse when clicking the titlebar.
    bar.addEventListener("click", (event) => {
      // Ignore clicks on window control buttons.
      if (event.target.closest(".dot")) return;

      windowElement.classList.toggle("collapsed");
    });

    // Handle minimize buttons.
    bar.querySelectorAll("[data-action='minimize']").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        windowElement.classList.toggle("collapsed");
      });
    });
  });
}

// Handle expandable explorer rows.
function initExplorerRows() {
  document.querySelectorAll(".explorer-row").forEach((row) => {
    const button = row.querySelector(".row-main");

    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = row.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
}