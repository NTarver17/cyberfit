// ==============================
// UTIL
// ==============================
const $ = (id) => document.getElementById(id);
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

console.log("CyberFit JS loaded ✅");

// ==============================
// YEAR
// ==============================
const yearEl = $("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ==============================
// INTRO LOADING
// ==============================
const intro = $("intro");
setTimeout(() => {
  intro?.classList.add("is-done");
}, 1200);

// ==============================
// MOBILE MENU
// ==============================
const menuBtn = $("menuBtn");
const mobileMenu = $("mobileMenu");

if (menuBtn && mobileMenu) {
  const close = () => {
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  };

  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
  });

  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

  document.addEventListener("click", (e) => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;
    const clickedInside = mobileMenu.contains(e.target) || menuBtn.contains(e.target);
    if (!clickedInside) close();
  });
}

// ==============================
// REVEAL ON SCROLL
// ==============================
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => io.observe(el));

// ==============================
// TILT (HOVER DEVICES ONLY)
// ==============================
const canTilt = window.matchMedia("(hover: hover)").matches;
if (canTilt) {
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    const strength = 10;
    let rect;

    const onMove = (e) => {
      rect = rect || el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (y - 0.5) * -strength;
      const ry = (x - 0.5) * strength;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-1px)`;
    };

    const onLeave = () => {
      rect = null;
      el.style.transform = "";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  });
}

// ==============================
// PARTICLES (CANVAS)
// ==============================
const canvas = $("particles");
const ctx = canvas?.getContext("2d");
let w, h, particles;

function makeParticles(n, dpr) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.6 + 0.6) * dpr,
      vx: (Math.random() - 0.5) * 0.20 * dpr,
      vy: (Math.random() - 0.5) * 0.16 * dpr,
      a: Math.random() * 0.22 + 0.08,
    });
  }
  return arr;
}

function resize() {
  if (!canvas || !ctx) return;

  const dpr = Math.min(devicePixelRatio || 1, 2);
  w = canvas.width = window.innerWidth * dpr;
  h = canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  const mobile = window.matchMedia("(max-width: 900px)").matches;
  particles = makeParticles(mobile ? 34 : 70, dpr);
}

function draw() {
  if (!canvas || !ctx || !particles) return;

  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -20) p.x = w + 20;
    if (p.x > w + 20) p.x = -20;
    if (p.y < -20) p.y = h + 20;
    if (p.y > h + 20) p.y = -20;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.a})`;
    ctx.fill();
  }

  const max =
    (window.matchMedia("(max-width: 900px)").matches ? 120 : 140) * (devicePixelRatio || 1);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < max) {
        const alpha = (1 - dist / max) * 0.10;
        ctx.strokeStyle = `rgba(24,242,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

if (canvas && ctx) {
  window.addEventListener("resize", resize);
  resize();
  draw();
}

// ==============================
// HUD METER (PROGRESS + LEVEL + CHIPS)
// ==============================
const meterFill = $("meterFill");
const meterLabel = $("meterLabel");
const boostBtn = $("boostBtn");
const meterGlow = document.querySelector(".meter__glow");

const levelValue = $("levelValue");
const energyVal = $("energyVal");
const focusVal = $("focusVal");
const confVal = $("confVal");

const progressKey = "cyberfit_progress";
let progress = clamp(parseInt(localStorage.getItem(progressKey) || "0", 10), 0, 100);

let animFrame = null;
function animateTo(target) {
  if (!meterFill || !meterLabel) return;

  cancelAnimationFrame(animFrame);
  const start = parseInt(meterLabel.textContent.replace("%", "") || "0", 10);
  const end = clamp(target, 0, 100);
  const duration = 420;
  const t0 = performance.now();

  const step = (t) => {
    const p = clamp((t - t0) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(start + (end - start) * eased);

    meterFill.style.width = `${val}%`;
    meterLabel.textContent = `${val}%`;

    meterFill.parentElement?.setAttribute("aria-valuenow", String(val));

    const lvl = Math.floor(val / 10);
    if (levelValue) levelValue.textContent = String(lvl);

    const energy = Math.min(100, Math.round(val * 1.08));
    const focus = Math.min(100, Math.round(val * 0.92));
    const conf = Math.min(100, Math.round(val * 1.0));

    if (energyVal) energyVal.textContent = String(energy);
    if (focusVal) focusVal.textContent = String(focus);
    if (confVal) confVal.textContent = String(conf);

    // move the glow so you SEE it change
    if (meterGlow) {
      const shift = (val / 100) * 80; // 0..80
      meterGlow.style.transform = `translateX(${shift - 40}%)`;
    }

    if (p < 1) animFrame = requestAnimationFrame(step);
  };

  animFrame = requestAnimationFrame(step);
}

function renderProgress() {
  animateTo(progress);
}

if (boostBtn && meterFill && meterLabel) {
  boostBtn.addEventListener("click", () => {
    progress = clamp(progress + 5, 0, 100);
    localStorage.setItem(progressKey, String(progress));
    renderProgress();

    boostBtn.classList.add("is-boosted");
    setTimeout(() => boostBtn.classList.remove("is-boosted"), 220);
  });
}

// Initial render
if (meterFill && meterLabel) renderProgress();
