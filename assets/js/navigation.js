export function initNavigation() {

  const menubarButtons = document.querySelectorAll(".menubar-apps button");
  const sections = [
    "about",
    "experience",
    "projects",
    "education",
    "certifications",
    "contact"
  ]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let isAutoScrolling = false;
  let autoScrollTimeout;

  // scroll to selected section
  function scrollToTarget(selector) {
    const element = document.querySelector(selector);
    if (!element) return;

    // Expand the window if it is collapsed.
    if (element.classList.contains("win") && element.classList.contains("collapsed")) {
      element.classList.remove("collapsed");
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });

    // Highlight the target section temporarily.
    element.classList.add("flash");
    setTimeout(() => element.classList.remove("flash"), 700);
  }

  // Update the active navigation button.
  function setActiveMenu(targetId) {
    menubarButtons.forEach((button) => {
      const isActive = button.getAttribute("data-target") === `#${targetId}`;
      button.classList.toggle("active", button.getAttribute("data-target") === `#${targetId}`);
    });
  }

  // Handle clicks on the main navigation menu.
  menubarButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const targetSelector = button.getAttribute("data-target");
      if (!targetSelector) return;

      const targetId = targetSelector.substring(1);

      clearTimeout(autoScrollTimeout);

      isAutoScrolling = true;

      setActiveMenu(targetId);
      scrollToTarget(targetSelector);

      // Resume scroll-based active menu detection.
      autoScrollTimeout = setTimeout(() => {
        isAutoScrolling = false;
      }, 800);
    });
  });

  // Handle other elements that link to a section.
  document.querySelectorAll("[data-target]").forEach((element) => {
    // Main navigation buttons are handled above.
    if (element.closest('.menubar-apps')) return;

    element.addEventListener("click", (event) => {
      event.preventDefault();

      const targetSelector = element.getAttribute("data-target");

      if (targetSelector) {
        scrollToTarget(targetSelector);
      }
    });
  });

  // Detect which section is currently visible.
  const observer = new IntersectionObserver(
    (entries) => {
      if (isAutoScrolling) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveMenu(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-100px 0px -50% 0px"
    }
  );
  sections.forEach((section) => observer.observe(section));

  // Activate the contact menu when reaching the bottom.
  window.addEventListener("scroll", () => {
    if (isAutoScrolling) return;

    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

    if (isAtBottom) {
      setActiveMenu("contact");
    }
  });
}