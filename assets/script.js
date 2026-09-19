function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  document.getElementById("clock").textContent = `${h}:${m} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000 * 15);

// document.getElementById("printBtn").addEventListener("click", () => window.print());

function scrollToTarget(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  if (el.classList.contains("win") && el.classList.contains("collapsed")) {
    el.classList.remove("collapsed");
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });

  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 700);
}

document.querySelectorAll(".win-titlebar").forEach((bar) => {
  const win = bar.closest(".win");
  if (win.classList.contains("modal-win")) return;

  bar.addEventListener("click", (e) => {
    if (e.target.closest(".dot")) return;
    win.classList.toggle("collapsed");
  });

  bar.querySelectorAll("[data-action='minimize']").forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      win.classList.toggle("collapsed");
    });
  });
});

document.querySelectorAll(".explorer-row").forEach((row) => {
  const btn = row.querySelector(".row-main");
  btn.addEventListener("click", () => {
    const isOpen = row.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});

const PROJECTS = {
  bibliobit: {
    title: "BiblioBit",
    images: [
      "assets/images/BiblioBit.png",
      "assets/images/BiblioBit-LandingPage.png",
    ],
    desc: "Android book-tracking app with reading statistics and ISBN barcode scanning.",
    role: "Fullstack Developer",
    stack: ["Kotlin", "Jetpack Compose", "Laravel", "PostgreSQL", "Firebase Auth", "Postman", "Figma", "GitHub", "REST API", "Barcode Scanning"],
    highlights: "Book management, reading stats, ISBN scanning, REST API integration",
    links: [
      {
        label: "Android Repository",
        url: "https://github.com/elsasinaga/Proyek4_BiblioBit"
      },
      {
        label: "Laravel Repository",
        url: "https://github.com/iisyanap/be-bibliobit"
      },
      {
        label: "Figma Design",
        url: "https://www.figma.com/design/AoW74YvSnSPqklxrbQkzTj/BiblioBit?node-id=0-1&t=FmsqBdD2WU0GOg8c-1"
      }
    ]
  },
  submeet: {
    title: "SubMeet - Topic Relevance Detector",
    images: [
      "assets/images/CMS-SubMeet-Topic-1.png",
      "assets/images/CMS-SubMeet-Topic-2.png"
    ],
    desc: "Topic relevance detection service integrated into the SubMeet CMS.",
    role: "Backend developer",
    stack: ["FastAPI", "Conference Management System", "REST API", "Laravel", "PostgreSQL", "Docker", "GitLab", "REST API", "Machine Learning", "Keras", "Python", "Text Classification"],
    highlights: "Standalone inference service consumed by an existing Laravel CMS",
    links: [
      {
        label: "Repository",
        url: "https://github.com/syahlasals/submeet-topic-relevance-detector"
      }
    ]
  },
  accsys: {
    title: "AccSys",
    images: [
      "assets/images/Accsys.png"
    ],
    desc: "Accounting application with structured backend logic and database integration.",
    role: "Backend developer",
    stack: ["Flask", "Supabase"],
    highlights: "Accounting logic, data modeling, Supabase integration",
    links: [
      {
        label: "Repository",
        url: "https://github.com/iisyanap/akuntansi-kelompok4"
      }
    ]
  },
  ormawa: {
    title: "Pengajuan Ketua ORMAWA",
    images: [
      "assets/images/Pengajuan-Ketua-ORMAWA-1.png",
      "assets/images/Pengajuan-Ketua-ORMAWA-2.png",
      "assets/images/Pengajuan-Ketua-ORMAWA-3.png"
    ],
    desc: "Submission system for student-organization workflows with notifications.",
    role: "Fullstack developer",
    stack: ["Laravel", "PostgreSQL"],
    highlights: "Workflow automation, notifications, relational data modeling, functional testing",
    links: [
      {
        label: "Repository",
        url: "https://github.com/afrizaaa017/Proyek3_PengajuanORMAWA"
      },
      {
        label: "Figma Design",
        url: "https://www.figma.com/design/LiLmbbhXNwzdL6mIcH69pL/Ketua-Ormawa?node-id=0-1&t=3ij1ojLnMqbv7wRP-1"
      }
    ]
  },
  famroots: {
    title: "FamRoots",
    images: [
      "assets/images/FamRoots.png"
    ],
    desc: "Family inheritance simulation exploring recursive data structures.",
    role: "Developer",
    stack: ["C++", "Linked lists", "Non-binary trees", "Recursion"],
    highlights: "Search, insertion, deletion, and dynamic data management",
    links: [
      {
        label: "Repository",
        url: "https://github.com/syahlasals/FamRoots"
      }
    ]
  },
  driver_drowsiness: {
    title: "Driver Drowsiness Detection",
    images: [
      "assets/images/Driver-Drowsiness.png"
    ],
    desc: "Computer-vision experiments in face similarity, ethnicity detection, and drowsiness detection.",
    role: "Developer",
    stack: ["Python", "Model Inference", "Facial Landmark Processing"],
    highlights: "Real-time driver drowsiness detection from landmark tracking",
    links: [
      {
        label: "Repository",
        url: ""
      }
    ]
  },
  posyanduku: {
    title: "PosyanduKu",
    images: [
      "assets/images/PosyanduKu-1.jpg",
      "assets/images/PosyanduKu-2.jpg",
      "assets/images/PosyanduKu-3.jpg"
    ],
    desc: "Information system for community health-post (posyandu) data and operations.",
    role: "Fullstack developer",
    stack: ["PHP", "Laravel", "MySQL"],
    highlights: "Health-service data tracking for community operations",
    links: [
      {
        label: "Repository",
        url: "https://gitlab.com/posyanduku/posyanduku"
      },
      {
        label: "Figma Design",
        url: "https://www.figma.com/design/UGndjYIyUdFbbgPFklfcvy/Posyanduku?node-id=1-2&t=XWrxwp4TnpQaXIdQ-1"
      }
    ]
  },
  pesenin: {
    title: "Pesenin",
    images: [
      "assets/images/Pesenin-1.png",
      "assets/images/Pesenin-2.png",
      "assets/images/Pesenin-3.png",
      "assets/images/Pesenin-4.png",
      "assets/images/Pesenin-5.png",
      "assets/images/Pesenin-6.png"
    ],
    desc: "Café ordering platform digitizing in-store and operational workflows.",
    role: "Software engineer intern",
    stack: ["Microservices", "HTML/CSS/JS frontend", "PostgreSQL", "Docker", "n8n"],
    highlights: "Requirement analysis, API testing, sprint-based delivery",
    links: [
      {
        label: "Repository",
        url: "https://github.com/InfinityCafe/InfinityCafe-Pesenin"
      },
      {
        label: "Figma Design",
        url: "https://www.figma.com/design/bHTrF3Fme2AE4lUXiANrci/Infinity-Cafe?node-id=0-1&t=ZQSnl3ACgJgv1cnm-1"
      }
    ]
  }
};

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

// Carousel Images
let currentProjectImages = [];
let currentImageIndex = 0;

function updateCarouselImage() {
  const imgEl = document.getElementById("modalCarouselImage");
  if (imgEl && currentProjectImages.length > 0) {
    imgEl.src = currentProjectImages[currentImageIndex];
  }
}

function openProjectModal(key) {
  const p = PROJECTS[key];
  if (!p) return;
  modalTitle.textContent = `${p.title}`;

  currentProjectImages = p.images || [];
  currentImageIndex = 0;

  let carouselHTML = '';
  if (currentProjectImages.length > 0) {
    const showArrows = currentProjectImages.length > 1;
    carouselHTML = `
      <div class="modal-carousel">
        ${showArrows ? `<button class="carousel-btn prev" id="carouselPrev" aria-label="Previous image"><i class="fa-solid fa-angle-left"></i></button>` : ''}
        <img src="${currentProjectImages[0]}" alt="${p.title}" id="modalCarouselImage" class="modal-image" loading="lazy">
        ${showArrows ? `<button class="carousel-btn next" id="carouselNext" aria-label="Next image"><i class="fa-solid fa-angle-right"></i></button>` : ''}
      </div>
    `;
  }

  modalBody.innerHTML = `
    ${carouselHTML}
    <p class="modal-desc">${p.desc}</p>
    <div class="modal-stack">
      ${p.stack.map(tech => `<span class="tag">${tech}</span>`).join("")}
    </div>

    <dl class="modal-fields">
      <div><dt>Role</dt><dd>${p.role}</dd></div>
      <div><dt>Highlights</dt><dd>${p.highlights}</dd></div>
      ${p.links && p.links.length > 0 ? `<div><dt>Links</dt><dd>${p.links.map(link => `<a class="modal-link" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}↗</a>`).join(", ")}</dd></div>` : ''}
    </dl>
  `;

  if (currentProjectImages.length > 1) {
    document.getElementById("carouselPrev").addEventListener("click", () => {
      currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
      updateCarouselImage();
    });

    document.getElementById("carouselNext").addEventListener("click", () => {
      currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
      updateCarouselImage();
    });
  }

  modalOverlay.classList.add("open");
}


function closeProjectModal() {
  modalOverlay.classList.remove("open");
}

document.querySelectorAll(".folder").forEach((folder) => {
  folder.addEventListener("click", () => openProjectModal(folder.getAttribute("data-project")));
});
modalClose.addEventListener("click", closeProjectModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeProjectModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProjectModal();
});

const menubarButtons = document.querySelectorAll(".menubar-apps button");
const sections = [
  "about",
  "experience",
  "projects",
  "education",
  "certifications",
  "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

let isAutoScrolling = false;

function setActiveMenu(targetId) {
  menubarButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-target") === `#${targetId}`);
  });
}

menubarButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSelector = btn.getAttribute("data-target");
    const targetId = targetSelector.substring(1);

    isAutoScrolling = true;
    setActiveMenu(targetId);

    scrollToTarget(targetSelector);

    setTimeout(() => {
      isAutoScrolling = false;
    }, 800);
  });
});

document.querySelectorAll("[data-target]").forEach((el) => {
  if (el.closest('.menubar-apps')) return;
  el.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToTarget(el.getAttribute("data-target"));
  });
});

const spy = new IntersectionObserver(
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
sections.forEach((s) => spy.observe(s));

window.addEventListener("scroll", () => {
  if (isAutoScrolling) return;

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
    setActiveMenu("contact");
  }
});