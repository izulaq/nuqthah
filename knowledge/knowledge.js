/* ==========================================================
   KNOWLEDGE BASE
   Nuqthah Learning Center
========================================================== */

/* ==========================================================
SIDEBAR
========================================================== */

const sidebar = document.getElementById("sidebar");

const sidebarToggle = document.getElementById("sidebarToggle");

const sidebarOverlay = document.getElementById("sidebarOverlay");
const searchInput = document.getElementById("searchInput");

if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("show");

    sidebarOverlay.classList.toggle("show");
  });
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("show");

    sidebarOverlay.classList.remove("show");
  });
}

/* ==========================================================
CLOSE SIDEBAR AFTER CLICK
========================================================== */

document.querySelectorAll(".sidebar-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 767) {
      sidebar.classList.remove("show");

      sidebarOverlay.classList.remove("show");
    }
  });
});

/* ==========================================================
SMOOTH SCROLL
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",

      block: "start",
    });
  });
});

/* ==========================================================
OPEN TARGET DETAILS
========================================================== */

window.addEventListener("load", () => {
  if (location.hash) {
    const target = document.querySelector(location.hash);

    if (target) {
      const details = target.querySelector("details");

      if (details) {
        details.open = true;
      }
    }
  }
});

/* ==========================================================
SEARCH
========================================================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
/* ==========================================================
SCROLL SPY
========================================================== */

const sections = document.querySelectorAll("main section[id]");

const navLinks = document.querySelectorAll(".sidebar-menu a");

function activateMenu() {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 140;

    const height = section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", activateMenu);

window.addEventListener("load", activateMenu);

/* ==========================================================
DETAILS ACCORDION
========================================================== */

document.querySelectorAll("summary").forEach((summary) => {

    summary.addEventListener("click", function (e) {

        e.preventDefault();

        const current = this.parentElement;

        const isOpen = current.hasAttribute("open");

        // Tutup semua details lainnya
        document.querySelectorAll("details").forEach((item) => {

            if (item !== current) {
                item.removeAttribute("open");
            }

        });

        // Toggle current
        if (isOpen) {

            current.removeAttribute("open");

        } else {

            current.setAttribute("open", "");

            // Tunggu animasi layout selesai
            requestAnimationFrame(() => {

                const top =
                    current.getBoundingClientRect().top +
                    window.pageYOffset -
                    90;

                window.scrollTo({

                    top: top,

                    behavior: "smooth"

                });

            });

        }

    });

});

/* ==========================================================
SEARCH OPEN DETAILS
========================================================== */

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();

    const allDetails = document.querySelectorAll("details");

    allDetails.forEach((details) => {
      const summary = details.querySelector("summary");

      if (!summary) return;

      const title = summary.textContent.toLowerCase();

      if (title.includes(keyword)) {
        details.open = true;
      }
    });
  });
}

/* ==========================================================
CTRL + K
========================================================== */

window.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();

    searchInput.focus();

    searchInput.select();
  }
});

/* ==========================================================
ESC
========================================================== */

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    sidebar.classList.remove("show");

    sidebarOverlay.classList.remove("show");

    searchInput.blur();
  }
});

/* ==========================================================
CURRENT YEAR
========================================================== */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
