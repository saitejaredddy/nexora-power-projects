const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function initNavigation() {
  const toggle = $(".nav-toggle");
  const nav = $(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$(".main-nav a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("open")));
}

function initReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
  );
  $$(".reveal").forEach((item) => observer.observe(item));
}

function initAmbientGrid() {
  const canvas = $("#gridCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let dpr = 1;
  const sparks = Array.from({ length: 42 }, (_, index) => ({
    x: Math.random(),
    y: Math.random(),
    s: 0.3 + Math.random() * 0.7,
    p: index * 0.37
  }));

  function resize() {
    const box = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, box.width);
    height = Math.max(1, box.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawTower(x, y, scale) {
    const steel = "rgba(203,213,225,0.48)";
    const dim = "rgba(148,163,184,0.24)";
    ctx.lineCap = "round";
    ctx.lineWidth = 2 * scale;
    ctx.strokeStyle = steel;
    ctx.beginPath();
    ctx.moveTo(x - 52 * scale, y + 190 * scale);
    ctx.lineTo(x, y);
    ctx.lineTo(x + 52 * scale, y + 190 * scale);
    ctx.moveTo(x - 92 * scale, y + 70 * scale);
    ctx.lineTo(x + 92 * scale, y + 70 * scale);
    ctx.moveTo(x - 54 * scale, y + 112 * scale);
    ctx.lineTo(x + 54 * scale, y + 112 * scale);
    ctx.stroke();
    ctx.strokeStyle = dim;
    ctx.lineWidth = 1.2 * scale;
    for (let i = 0; i < 4; i += 1) {
      const yy = y + 38 * scale + i * 34 * scale;
      ctx.beginPath();
      ctx.moveTo(x - 44 * scale, yy);
      ctx.lineTo(x + 44 * scale, yy + 26 * scale);
      ctx.moveTo(x + 44 * scale, yy);
      ctx.lineTo(x - 44 * scale, yy + 26 * scale);
      ctx.stroke();
    }
  }

  function draw(time = 0) {
    if (!width || !height) resize();
    ctx.clearRect(0, 0, width, height);
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#0f172a");
    g.addColorStop(0.58, "#111827");
    g.addColorStop(1, "rgba(16,185,129,0.28)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(16,185,129,0.1)";
    ctx.lineWidth = 1;
    for (let i = -8; i < 18; i += 1) {
      const y = height * 0.54 + i * 36 + (reduced ? 0 : (time * 0.015) % 36);
      ctx.beginPath();
      ctx.moveTo(width * 0.1, y);
      ctx.lineTo(width * 1.1, y + i * 3);
      ctx.stroke();
    }

    drawTower(width * 0.62, height * 0.16, 1.08);
    drawTower(width * 0.84, height * 0.2, 0.82);

    ctx.strokeStyle = "rgba(16,185,129,0.56)";
    ctx.shadowColor = "rgba(16,185,129,0.85)";
    ctx.shadowBlur = 18;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      const y = height * (0.22 + i * 0.055);
      ctx.moveTo(width * 0.42, y);
      ctx.bezierCurveTo(width * 0.57, y + 70, width * 0.76, y + 70, width, y + 18);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    sparks.forEach((spark) => {
      const drift = reduced ? 0 : Math.sin(time * 0.001 + spark.p) * 20;
      const x = spark.x * width + drift;
      const y = height * (0.46 + spark.y * 0.42);
      ctx.beginPath();
      ctx.arc(x, y, spark.s * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16,185,129,${0.18 + spark.s * 0.34})`;
      ctx.fill();
    });

    if (!reduced) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  requestAnimationFrame(draw);
}

function initPortfolioWorkspace() {
  const button = $("#portfolioPreview");
  const workspace = $("#portfolioWorkspace");
  if (!button || !workspace) return;
  button.addEventListener("click", () => {
    workspace.dataset.empty = "false";
    workspace.innerHTML = `
      <div>
        <strong>Example Verified Project Card</strong>
        <span>Client-approved records will show project name, scope, location, capacity, year, execution role, media and verification status.</span>
      </div>
      <button class="button button-dark" type="button" id="clearPreview">Clear Preview</button>
    `;
    $("#clearPreview").addEventListener("click", initPortfolioWorkspaceReset, { once: true });
  });
}

function initPortfolioWorkspaceReset() {
  const workspace = $("#portfolioWorkspace");
  if (!workspace) return;
  workspace.dataset.empty = "true";
  workspace.innerHTML = `
    <div>
      <strong>No public project records loaded yet.</strong>
      <span>Approved project entries can be injected here without redesigning the website.</span>
    </div>
    <button class="button button-dark" type="button" id="portfolioPreview">Preview Project Card Format</button>
  `;
  initPortfolioWorkspace();
}

function initLeadForm() {
  const form = $("#leadForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const message = encodeURIComponent(
      `Nexora website enquiry\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nType: ${data.get("type")}\nDetails: ${data.get("details")}`
    );
    window.location.href = `https://wa.me/919963103060?text=${message}`;
  });
}

function initViewportHydration() {
  const lazyItems = $$("[data-hydrate]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.ready = "true";
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "180px 0px" }
  );
  lazyItems.forEach((item) => observer.observe(item));
}

initNavigation();
initReveals();
initAmbientGrid();
initPortfolioWorkspace();
initLeadForm();
initViewportHydration();
