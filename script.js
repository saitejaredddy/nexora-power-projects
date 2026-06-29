const services = [
  {
    icon: "GM",
    title: "Ground Mount Solar",
    summary: "Utility-scale EPC execution for multi-megawatt solar parks and industrial energy assets.",
    detail:
      "End-to-end ground mount delivery across civil, mechanical, electrical, evacuation, testing, commissioning and project controls."
  },
  {
    icon: "FL",
    title: "Floating Solar",
    summary: "Reservoir and water-body solar systems engineered for durability and access.",
    detail:
      "Floating solar packages covering anchoring, floats, electrical routing, O&M access planning and water-body safety compliance."
  },
  {
    icon: "RT",
    title: "Rooftop Solar",
    summary: "Commercial and institutional rooftop systems with clean integration and fast commissioning.",
    detail:
      "Rooftop solar for factories, campuses and commercial assets with structural review, optimized layouts and grid-ready execution."
  },
  {
    icon: "TR",
    title: "Tracker Systems",
    summary: "Single-axis tracker projects for higher yield and precise field installation.",
    detail:
      "Tracker deployment with alignment control, drive system coordination, commissioning checks and performance-driven installation."
  },
  {
    icon: "OM",
    title: "O&M Services",
    summary: "Operational maintenance programs focused on uptime, safety and generation performance.",
    detail:
      "Preventive maintenance, corrective maintenance, thermography, vegetation control, safety audits and generation reporting."
  },
  {
    icon: "MF",
    title: "Panel Manufacturing",
    summary: "Certified panel and HT/LT infrastructure support for integrated project delivery.",
    detail:
      "Manufacturing-backed supply control for panels and electrical equipment, reducing execution risk on large-scale deployments."
  }
];

const projects = [
  { capacity: "262.5MW", type: "Ground Mount", location: "Kudligi, Karnataka" },
  { capacity: "105MW", type: "Ground Mount", location: "Jhansi, Uttar Pradesh" },
  { capacity: "75MW", type: "Ground Mount", location: "Atharga, Karnataka" },
  { capacity: "40MW+", type: "Floating", location: "Auriya, UP & AP" },
  { capacity: "23.75MW", type: "Tracker", location: "Maharashtra" },
  { capacity: "21MW", type: "Ground Mount", location: "Kovilpatti, Tamil Nadu" },
  { capacity: "6MW", type: "Rooftop", location: "Jadcherla, Telangana" },
  { capacity: "22.5MW", type: "International", location: "Sephu, Bhutan" },
  { capacity: "4.4MW", type: "International", location: "Saudi Arabia" }
];

const clients = [
  "Fourth Partner Energy",
  "L&T Limited",
  "Vibrant Energy",
  "Godrej",
  "Sembcorp",
  "Vikram Solar",
  "Amplus Solar",
  "Virchow Group",
  "Panasonic Carbon",
  "Novus Green",
  "Bharat Dynamics",
  "IISER Behrampur"
];

const verticals = [
  ["01", "BESS", "Storage", "BESS pipeline for round-the-clock clean energy delivery."],
  ["02", "CBG", "Bio-Energy", "Compressed bio-gas and bio-waste value-chain opportunities."],
  ["03", "EV", "Mobility", "EV charging infrastructure for fleet and commercial deployments."],
  ["04", "H2", "Hydrogen", "Hydrogen-enabled microgrids and decarbonisation pathways."],
  ["05", "AG", "Agri-Solar", "Agrivoltaics combining agricultural productivity with solar generation."]
];

const serviceGrid = document.querySelector("#serviceGrid");
const projectGrid = document.querySelector("#projectGrid");
const clientTicker = document.querySelector("#clientTicker");
const verticalGrid = document.querySelector("#verticalGrid");
const modal = document.querySelector("#serviceModal");

function initElectricalFallback(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const particles = Array.from({ length: 54 }, (_, index) => ({
    x: Math.random(),
    y: Math.random(),
    z: Math.random(),
    speed: 0.0009 + Math.random() * 0.0019,
    phase: index * 0.47
  }));

  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function project(point, time) {
    const depth = point.z + 5.8;
    const sway = Math.sin(time * 0.00035 + point.x * 0.3) * 10;
    return {
      x: width * 0.66 + ((point.x + sway * 0.02) / depth) * width * 0.38,
      y: height * 0.56 - (point.y / depth) * height * 0.62 + (point.z / 7) * height * 0.34,
      scale: 1 / depth
    };
  }

  function line(a, b, color, size = 1.5) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.stroke();
  }

  function tower(cx, cz, scale, time) {
    const baseL = project({ x: cx - 1.15 * scale, y: -1.05, z: cz }, time);
    const baseR = project({ x: cx + 1.15 * scale, y: -1.05, z: cz }, time);
    const top = project({ x: cx, y: 6.5 * scale, z: cz }, time);
    const midL = project({ x: cx - 0.54 * scale, y: 3.2 * scale, z: cz }, time);
    const midR = project({ x: cx + 0.54 * scale, y: 3.2 * scale, z: cz }, time);
    const armL = project({ x: cx - 2.2 * scale, y: 5.05 * scale, z: cz }, time);
    const armR = project({ x: cx + 2.2 * scale, y: 5.05 * scale, z: cz }, time);
    const capL = project({ x: cx - 1.05 * scale, y: 6.12 * scale, z: cz }, time);
    const capR = project({ x: cx + 1.05 * scale, y: 6.12 * scale, z: cz }, time);
    const steel = "rgba(203,213,225,0.58)";
    const dim = "rgba(148,163,184,0.32)";

    line(baseL, top, steel, 2.2 * scale);
    line(baseR, top, steel, 2.2 * scale);
    line(baseL, midR, dim, 1.25 * scale);
    line(baseR, midL, dim, 1.25 * scale);
    line(midL, midR, steel, 1.4 * scale);
    line(armL, armR, steel, 2.1 * scale);
    line(capL, capR, steel, 1.7 * scale);
    line(armL, top, dim, 1.1 * scale);
    line(armR, top, dim, 1.1 * scale);

    return { armL, armR, top };
  }

  function cable(points, time, offset) {
    ctx.beginPath();
    points.forEach((point, index) => {
      const p = project({ x: point.x, y: point.y + Math.sin(time * 0.0012 + index + offset) * 0.1, z: point.z }, time);
      if (index === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = "rgba(16,185,129,0.52)";
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(16,185,129,0.8)";
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function draw(time) {
    if (!width || !height) resize();
    ctx.clearRect(0, 0, width, height);

    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, "rgba(15,23,42,0.94)");
    bg.addColorStop(0.65, "rgba(17,24,39,0.82)");
    bg.addColorStop(1, "rgba(16,185,129,0.22)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(0, height * 0.16);
    for (let i = 0; i < 18; i += 1) {
      const y = height * 0.48 + i * 34;
      ctx.beginPath();
      ctx.moveTo(width * 0.18 - i * 12, y);
      ctx.lineTo(width * 1.08, y + i * 3);
      ctx.strokeStyle = `rgba(16,185,129,${0.1 - i * 0.003})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    for (let i = 0; i < 18; i += 1) {
      const x = width * 0.2 + i * 56;
      ctx.beginPath();
      ctx.moveTo(x, height * 0.48);
      ctx.lineTo(width * 0.58 + (x - width * 0.2) * 1.6, height * 1.15);
      ctx.strokeStyle = "rgba(148,163,184,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();

    const t1 = tower(-4.8, 0.4, 0.95, time);
    const t2 = tower(0.2, -1.4, 1.2, time);
    const t3 = tower(5.2, 0.2, 0.95, time);

    cable([
      { x: -7.0, y: 4.9, z: 0.4 },
      { x: -3.2, y: 4.2, z: -0.5 },
      { x: 0.2, y: 5.0, z: -1.4 },
      { x: 3.4, y: 4.2, z: -0.5 },
      { x: 7.0, y: 4.9, z: 0.2 }
    ], time, 0);

    cable([
      { x: -7.0, y: 4.15, z: 0.4 },
      { x: -3.2, y: 3.52, z: -0.5 },
      { x: 0.2, y: 4.28, z: -1.4 },
      { x: 3.4, y: 3.52, z: -0.5 },
      { x: 7.0, y: 4.15, z: 0.2 }
    ], time, 1.4);

    const pulseProgress = (time * 0.00018) % 1;
    const pulseX = -7 + pulseProgress * 14;
    const pulseY = 4.45 - Math.sin(pulseProgress * Math.PI) * 0.55;
    const pulse = project({ x: pulseX, y: pulseY, z: -0.5 + Math.sin(pulseProgress * Math.PI) * -0.9 }, time);
    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, 8 + Math.sin(time * 0.008) * 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(16,185,129,0.9)";
    ctx.shadowColor = "rgba(16,185,129,0.95)";
    ctx.shadowBlur = 24;
    ctx.fill();
    ctx.shadowBlur = 0;

    particles.forEach((particle) => {
      particle.z -= particle.speed * 24;
      if (particle.z < -1) particle.z = 1;
      const p = project({
        x: (particle.x - 0.5) * 16,
        y: -0.45 + particle.y * 0.8,
        z: particle.z * 7
      }, time);
      const opacity = 0.14 + Math.abs(Math.sin(time * 0.002 + particle.phase)) * 0.38;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(1, 8 * p.scale), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16,185,129,${opacity})`;
      ctx.fill();
    });

    const reelX = width * 0.82;
    const reelY = height * 0.72;
    ctx.save();
    ctx.translate(reelX, reelY);
    ctx.rotate(time * 0.0012);
    ctx.strokeStyle = "rgba(203,213,225,0.55)";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, 52, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(16,185,129,0.62)";
    ctx.lineWidth = 4;
    for (let i = 0; i < 6; i += 1) {
      ctx.rotate(Math.PI / 3);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(52, 0);
      ctx.stroke();
    }
    ctx.restore();

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  requestAnimationFrame(draw);
}

function initElectricalScene() {
  const canvas = document.querySelector("#electricalScene");
  if (!canvas) return;
  if (!window.THREE) {
    initElectricalFallback(canvas);
    return;
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0f172a, 12, 42);

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.set(0, 5.2, 15);
  camera.lookAt(0, 1.4, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setClearColor(0x0f172a, 0);

  const group = new THREE.Group();
  scene.add(group);

  const green = new THREE.Color(0x10b981);
  const steelMaterial = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.55,
    roughness: 0.38
  });
  const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x111827,
    metalness: 0.7,
    roughness: 0.32
  });
  const glowMaterial = new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0.78 });
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.62 });
  const gridMaterial = new THREE.LineBasicMaterial({ color: 0x1e3a5f, transparent: true, opacity: 0.36 });

  const ambient = new THREE.AmbientLight(0x94a3b8, 0.72);
  const key = new THREE.DirectionalLight(0xffffff, 1.25);
  key.position.set(-7, 10, 8);
  const rim = new THREE.PointLight(0x10b981, 2.3, 28);
  rim.position.set(6, 4, 3);
  scene.add(ambient, key, rim);

  const grid = new THREE.GridHelper(48, 36, 0x10b981, 0x334155);
  grid.position.y = -1.08;
  grid.material.opacity = 0.22;
  grid.material.transparent = true;
  group.add(grid);

  function addBeam(parent, x, y, z, length, radius, rotation) {
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 10), steelMaterial);
    beam.position.set(x, y, z);
    beam.rotation.set(rotation.x, rotation.y, rotation.z);
    parent.add(beam);
    return beam;
  }

  function makeTower(x, z, scale = 1) {
    const tower = new THREE.Group();
    tower.position.set(x, -1, z);
    const height = 6.8 * scale;
    addBeam(tower, -0.75 * scale, height / 2, 0, height, 0.035 * scale, { x: 0, y: 0, z: 0.14 });
    addBeam(tower, 0.75 * scale, height / 2, 0, height, 0.035 * scale, { x: 0, y: 0, z: -0.14 });
    addBeam(tower, 0, height * 0.63, 0, 1.9 * scale, 0.03 * scale, { x: 0, y: 0, z: Math.PI / 2 });
    addBeam(tower, 0, height * 0.82, 0, 3.25 * scale, 0.03 * scale, { x: 0, y: 0, z: Math.PI / 2 });
    addBeam(tower, 0, height * 0.96, 0, 1.2 * scale, 0.028 * scale, { x: 0, y: 0, z: Math.PI / 2 });

    for (let i = 0; i < 5; i += 1) {
      const y = 0.9 * scale + i * 1.08 * scale;
      addBeam(tower, 0, y, 0, 1.8 * scale, 0.018 * scale, { x: 0, y: 0, z: 0.86 });
      addBeam(tower, 0, y, 0, 1.8 * scale, 0.018 * scale, { x: 0, y: 0, z: -0.86 });
    }

    group.add(tower);
    return tower;
  }

  const towers = [makeTower(-6, -2, 0.92), makeTower(0, -5.5, 1.15), makeTower(6.2, -2.3, 0.94)];

  function sagLine(yOffset, zOffset) {
    const points = [];
    for (let i = 0; i <= 80; i += 1) {
      const t = i / 80;
      const x = -8.2 + t * 16.4;
      const sag = Math.sin(t * Math.PI) * -0.85;
      points.push(new THREE.Vector3(x, yOffset + sag, zOffset));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, lineMaterial);
    group.add(line);
    return { line, geometry, yOffset, zOffset };
  }

  const powerLines = [sagLine(5.15, -2.2), sagLine(4.55, -2.16), sagLine(3.95, -2.12)];
  const pulseGeometry = new THREE.SphereGeometry(0.105, 18, 18);
  const pulses = powerLines.map((wire, index) => {
    const pulse = new THREE.Mesh(pulseGeometry, glowMaterial.clone());
    pulse.userData = { wire, offset: index * 0.31 };
    group.add(pulse);
    return pulse;
  });

  const reels = new THREE.Group();
  reels.position.set(5.2, -0.32, 2.3);
  const reelMaterial = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.76, roughness: 0.26 });
  const reel = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.8, 42), reelMaterial);
  reel.rotation.z = Math.PI / 2;
  const reelCore = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.95, 32), glowMaterial);
  reelCore.rotation.z = Math.PI / 2;
  reels.add(reel, reelCore);
  group.add(reels);

  const cablePoints = [
    new THREE.Vector3(4.4, -0.52, 2.3),
    new THREE.Vector3(2.4, -0.72, 1.2),
    new THREE.Vector3(0.1, -0.86, 0.6),
    new THREE.Vector3(-2.6, -0.92, 0.8)
  ];
  const cable = new THREE.Line(new THREE.BufferGeometry().setFromPoints(cablePoints), new THREE.LineBasicMaterial({
    color: 0x10b981,
    transparent: true,
    opacity: 0.72,
    linewidth: 2
  }));
  group.add(cable);

  const workerLights = [];
  for (let i = 0; i < 34; i += 1) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035 + Math.random() * 0.035, 8, 8), glowMaterial.clone());
    dot.position.set(-8 + Math.random() * 16, -0.78 + Math.random() * 0.25, -0.5 + Math.random() * 6.2);
    dot.material.opacity = 0.18 + Math.random() * 0.42;
    group.add(dot);
    workerLights.push(dot);
  }

  const clock = new THREE.Clock();
  let width = 0;
  let height = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    if (rect.width === width && rect.height === height) return;
    width = rect.width;
    height = rect.height;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function animate() {
    const t = clock.getElapsedTime();
    resize();
    group.rotation.y = Math.sin(t * 0.18) * 0.08;
    grid.position.z = ((t * 0.55) % 1) - 1.08;
    reels.rotation.x = t * 0.9;
    rim.intensity = 1.8 + Math.sin(t * 2.2) * 0.45;
    towers.forEach((tower, index) => {
      tower.rotation.y = Math.sin(t * 0.3 + index) * 0.025;
    });
    pulses.forEach((pulse) => {
      const progress = (t * 0.16 + pulse.userData.offset) % 1;
      const x = -8.2 + progress * 16.4;
      const sag = Math.sin(progress * Math.PI) * -0.85;
      pulse.position.set(x, pulse.userData.wire.yOffset + sag, pulse.userData.wire.zOffset);
      pulse.material.opacity = 0.36 + Math.sin(t * 5 + progress) * 0.22;
    });
    workerLights.forEach((dot, index) => {
      dot.material.opacity = 0.16 + Math.abs(Math.sin(t * 1.3 + index)) * 0.38;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}

function renderServices() {
  serviceGrid.innerHTML = services
    .map(
      (service, index) => `
        <button class="service-card" type="button" data-service="${index}">
          <i>${service.icon}</i>
          <h3>${service.title}</h3>
          <p>${service.summary}</p>
        </button>
      `
    )
    .join("");
}

function renderProjects(filter = "All") {
  const filtered = filter === "All" ? projects : projects.filter((project) => project.type === filter);
  projectGrid.innerHTML = filtered
    .map(
      (project) => `
        <article class="project-card">
          <strong>${project.capacity}</strong>
          <span>${project.type}</span>
          <p>${project.location}</p>
        </article>
      `
    )
    .join("");
}

function renderClients() {
  const logoSet = [...clients, ...clients];
  clientTicker.innerHTML = logoSet.map((client) => `<span class="client-logo">${client}</span>`).join("");
}

function renderVerticals() {
  verticalGrid.innerHTML = verticals
    .map(
      ([number, icon, title, text]) => `
        <article class="vertical-card">
          <span>${number}</span>
          <i>${icon}</i>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `
    )
    .join("");
}

renderServices();
renderProjects();
renderClients();
renderVerticals();
initElectricalScene();

document.querySelector(".nav-toggle").addEventListener("click", (event) => {
  const nav = document.querySelector(".main-nav");
  const open = nav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => document.querySelector(".main-nav").classList.remove("open"));
});

serviceGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-service]");
  if (!card) return;
  const service = services[Number(card.dataset.service)];
  document.querySelector("#modalTitle").textContent = service.title;
  document.querySelector("#modalText").textContent = service.detail;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
});

document.querySelector(".modal-close").addEventListener("click", () => {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
});

document.querySelectorAll(".tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tabs button").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = encodeURIComponent(
    `New enquiry for Nexora Power Projects\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\nDetails: ${data.get("details")}`
  );
  window.location.href = `https://wa.me/919963103060?text=${message}`;
});

document.querySelector("#vendorForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = encodeURIComponent(
    `Vendor interest for Nexora Power Projects\nCompany: ${data.get("company")}\nContact: ${data.get("person")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nCategory: ${data.get("category")}\nStates: ${data.get("states")}`
  );
  window.location.href = `https://wa.me/919963103060?text=${message}`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
