const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menuBtn.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

const boostBtn = document.getElementById("boostBtn");
const bar = document.getElementById("consistencyBar");
const label = document.getElementById("consistencyLabel");

if (boostBtn && bar && label) {
  boostBtn.addEventListener("click", () => {
    const current = parseInt(label.textContent.replace("%",""), 10);
    const next = Math.min(current + 5, 100);
    label.textContent = `${next}%`;
    bar.style.width = `${next}%`;
  });
}
