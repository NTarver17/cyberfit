// year
document.getElementById("year").textContent = new Date().getFullYear();

// intro loading
const intro = document.getElementById("intro");
setTimeout(() => {
  intro?.classList.add("is-done");
}, 1200);

// mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
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

  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  document.addEventListener("click", (e) => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;
    const clickedInside = mobileMenu.contains(e.target) || menuBtn.contains(e.target);
    if (!clickedInside) close();
  });
}

// meter boost
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

// reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// tilt (hover devices only)
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

// FX toggle
const fxBtn = document.getElementById("fxBtn");
const fxRoot = document.getElementById("fxRoot");
if (fxBtn && fxRoot) {
  fxBtn.addEventListener("click", () => {
    fxRoot.style.opacity = fxRoot.style.opacity === "0.35" ? "1" : "0.35";
  });
}

// particles
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let w, h, particles;

function resize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  w = canvas.width = window.innerWidth * dpr;
  h = canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  particles = makeParticles(mobile ? 34 : 70, dpr);
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

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = (window.matchMedia("(max-width: 900px)").matches ? 120 : 140) * (devicePixelRatio || 1);
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