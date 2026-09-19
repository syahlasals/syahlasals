import { projects } from "./projects-data.js";

export function initProjectModal() {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  // Stop initialization if required modal elements are missing.
  if (!modalOverlay || !modalTitle || !modalBody || !modalClose) {
    console.warn("Project modal elements were not found.");
    return;
  }

  // Carousel Images
  let currentProjectImages = [];
  let currentImageIndex = 0;

  // Update the image displayed in the carousel.
  function updateCarouselImage() {
    const imageElement = document.getElementById("modalCarouselImage");

    if (imageElement && currentProjectImages.length > 0) {
      imageElement.src = currentProjectImages[currentImageIndex];
    }
  }

  // Display the selected project's details in the modal.
  function openProjectModal(projectId) {
    const project = projects[projectId];

    if (!project) {
      console.warn(`Project "${projectId}" was not found.`);
      return;
    }

    modalTitle.textContent = project.title;

    currentProjectImages = project.images || [];
    currentImageIndex = 0;

    // Create the image carousel if project images are available.
    let carouselHTML = "";

    if (currentProjectImages.length > 0) {
      const showArrows = currentProjectImages.length > 1;

      carouselHTML = `
        <div class="modal-carousel">
          ${ showArrows ? ` <button class="carousel-btn prev" id="carouselPrev" aria-label="Previous image"><i class="fa-solid fa-angle-left"></i></button>` : ""}
          <img src="${currentProjectImages[0]}" alt="${project.title}" id="modalCarouselImage" class="modal-image" loading="lazy">
          ${showArrows ? `<button class="carousel-btn next" id="carouselNext" aria-label="Next image"><i class="fa-solid fa-angle-right"></i></button>` : ""}
        </div>
      `;
    }

    // Create the project's technology stack.
    const stackHTML = (project.stack || [])
      .map((tech) => `<span class="tag">${tech}</span>`)
      .join("");

    // Create project links if available.
    const linksHTML =
      project.links && project.links.length > 0 ? `
          <div>
            <dt>Links</dt>
            <dd>
              ${project.links
                .map(
                  (link) => `
                    <a class="modal-link" href="${link.url}" target="_blank" rel="noopener noreferrer">
                      ${link.label} ↗
                    </a>
                  `
                )
                .join(", ")}
            </dd>
          </div>
        `
        : "";

    // Insert the project details into the modal.
    modalBody.innerHTML = `
      ${carouselHTML}

      <p class="modal-desc">${project.desc || ""}</p>

      <div class="modal-stack">
        ${stackHTML}
      </div>

      <dl class="modal-fields">
        <div>
          <dt>Role</dt>
          <dd>${project.role || "-"}</dd>
        </div>

        <div>
          <dt>Highlights</dt>
          <dd>${project.highlights || "-"}</dd>
        </div>

        ${linksHTML}
      </dl>
    `;

    // Set up carousel navigation when there is more than one image.
    if (currentProjectImages.length > 1) {
      document
        .getElementById("carouselPrev")
        .addEventListener("click", () => {
          currentImageIndex =
            (currentImageIndex - 1 + currentProjectImages.length) %
            currentProjectImages.length;

          updateCarouselImage();
        });

      document
        .getElementById("carouselNext")
        .addEventListener("click", () => {
          currentImageIndex =
            (currentImageIndex + 1) % currentProjectImages.length;

          updateCarouselImage();
        });
    }

    // Show the modal.
    modalOverlay.classList.add("open");
  }

  // Hide the modal.
  function closeProjectModal() {
    modalOverlay.classList.remove("open");
  }

  // Attach one click listener to each project folder.
  document.querySelectorAll(".folder").forEach((folder) => {
    folder.addEventListener("click", () => {
      const projectId = folder.dataset.project;

      openProjectModal(projectId);
    });
  });

  // Close the modal using the close button.
  modalClose.addEventListener("click", closeProjectModal);

  // Close the modal when clicking the overlay.
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeProjectModal();
    }
  });

  // Close the modal when pressing Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
    }
  });
}