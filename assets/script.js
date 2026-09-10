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
    desc: "Aplikasi Android pencatat buku dengan statistik membaca dan pemindaian barcode ISBN.",
    role: "Mobile + backend developer",
    stack: "Kotlin, Jetpack Compose, Laravel, PostgreSQL, Firebase Auth",
    highlights: "Manajemen buku, statistik membaca, pemindaian ISBN, integrasi REST API",
  },
  submeet: {
    title: "Topic_Relevance_Detector",
    desc: "Layanan deteksi relevansi topik yang terintegrasi ke CMS SubMeet.",
    role: "Backend developer",
    stack: "FastAPI, Python, Laravel (CMS), REST API",
    highlights: "Service inferensi mandiri yang dikonsumsi oleh CMS Laravel yang sudah ada",
  },
  accsys: {
    title: "accsys",
    desc: "Aplikasi akuntansi dengan logika backend dan integrasi database yang terstruktur.",
    role: "Backend developer",
    stack: "Flask, Supabase",
    highlights: "Logika akuntansi, pemodelan data, integrasi Supabase",
  },
  ormawa: {
    title: "Pengajuan_Ketua_ORMAWA",
    desc: "Sistem submission untuk alur kerja organisasi mahasiswa dengan notifikasi.",
    role: "Fullstack developer",
    stack: "Laravel, PostgreSQL",
    highlights: "Workflow automation, notifikasi, relasi data, functional testing",
  },
  famroots: {
    title: "FamRoots",
    desc: "Simulasi warisan keluarga yang mengeksplorasi struktur data rekursif.",
    role: "Developer",
    stack: "Linked list, non-binary tree, rekursi",
    highlights: "Pencarian, penyisipan, penghapusan, dan manajemen data dinamis",
  },
  driver_drowsiness: {
    title: "Deteksi Kantuk",
    desc: "Aplikasi untuk deteksi kantuk pengemudi.",
    role: "Developer",
    stack: "Python, model inference, facial landmark processing",
    highlights: "Deteksi kantuk pengemudi real-time dari pelacakan landmark wajah",
  },
  posyandu: {
    title: "PosyanduKu",
    desc: "Sistem informasi untuk data dan operasional layanan kesehatan posyandu.",
    role: "Fullstack developer",
    stack: "PHP Native, Laravel, MySQL",
    highlights: "Pencatatan data layanan kesehatan untuk operasional komunitas",
  },
  pesenin: {
    title: "Pesenin",
    desc: "Platform pemesanan cafe yang mendigitalisasi alur kerja operasional.",
    role: "Software engineer intern",
    stack: "Microservices, frontend HTML/CSS/JS",
    highlights: "Analisis kebutuhan, pengujian API, delivery berbasis sprint",
  }
};

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

function openProjectModal(key) {
  const p = PROJECTS[key];
  if (!p) return;
  modalTitle.textContent = `${p.title}.exe`;
  modalBody.innerHTML = `
    <p class="modal-desc">${p.desc}</p>
    <dl class="modal-fields">
      <div><dt>role</dt><dd>${p.role}</dd></div>
      <div><dt>stack</dt><dd>${p.stack}</dd></div>
      <div><dt>highlights</dt><dd>${p.highlights}</dd></div>
    </dl>
  `;
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
const sections = ["about", "experience", "projects", "education", "contact"]
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