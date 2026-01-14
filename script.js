// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu (fixed + clean)
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  const closeMenu = () => {
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  };

  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
  });

  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  // Close menu if user taps outside
  document.addEventListener("click", (e) => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;
    const clickedInside = mobileMenu.contains(e.target) || menuBtn.contains(e.target);
    if (!clickedInside) closeMenu();
  });
}

// Boost meter
const boostBtn = document.getElementById("boostBtn");
const meterFill = document.getElementById("meterFill");
const meterLabel = document.getElementById("meterLabel");
if (boostBtn && meterFill && meterLabel) {
  boostBtn.addEventListener("click", () => {
    const cur = parseInt(meterLabel.textContent.replace("%",""), 10);
    const next = Math.min(cur + 5, 100);
    meterLabel.textContent = `${next}%`;
    meterFill.style.width = `${next}%`;
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Parallax (disabled on small screens to prevent weird mobile behavior)
const root = document.getElementById("parallaxRoot");
let mouseX = 0, mouseY = 0;
const isMobile = window.matchMedia("(max-width: 980px)").matches;

if (root && !isMobile) {
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  });

  const tick = () => {
    root.style.transform = `translate3d(${mouseX * -6}px, ${mouseY * -4}px, 0)`;
    requestAnimationFrame(tick);
  };
  tick();
}

// 3D tilt (disabled on touch devices)
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
    const onLeave = () => { rect = null; el.style.transform = ""; };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  });
}

// Particles canvas (lightweight)
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let w, h, particles;

function resize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  w = canvas.width = window.innerWidth * dpr;
  h = canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  particles = makeParticles(isMobile ? 36 : 70, dpr);
}
window.addEventListener("resize", resize);

function makeParticles(n, dpr) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.6 + 0.6) * dpr,
      vx: (Math.random() - 0.5) * 0.20 * dpr,
      vy: (Math.random() - 0.5) * 0.16 * dpr,
      a: Math.random() * 0.22 + 0.08
    });
  }
  return arr;
}

function draw() {
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

  // lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = (isMobile ? 120 : 140) * (devicePixelRatio || 1);
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

resize();
draw();

// FX toggle (optional)
const themeBtn = document.getElementById("themeBtn");
const fxRoot = document.getElementById("fxRoot");
if (themeBtn && fxRoot) {
  themeBtn.addEventListener("click", () => {
    fxRoot.style.opacity = fxRoot.style.opacity === "0.35" ? "1" : "0.35";
  });
}