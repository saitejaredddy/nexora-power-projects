const services = [
  {
    icon: "▦",
    title: "Ground Mount Solar",
    summary: "Utility-scale EPC execution for multi-megawatt solar parks and industrial energy assets.",
    detail:
      "End-to-end ground mount delivery across civil, mechanical, electrical, evacuation, testing, commissioning and project controls."
  },
  {
    icon: "≈",
    title: "Floating Solar",
    summary: "Reservoir and water-body solar systems engineered for durability and access.",
    detail:
      "Floating solar packages covering anchoring, floats, electrical routing, O&M access planning and water-body safety compliance."
  },
  {
    icon: "⌂",
    title: "Rooftop Solar",
    summary: "Commercial and institutional rooftop systems with clean integration and fast commissioning.",
    detail:
      "Rooftop solar for factories, campuses and commercial assets with structural review, optimized layouts and grid-ready execution."
  },
  {
    icon: "↻",
    title: "Tracker Systems",
    summary: "Single-axis tracker projects for higher yield and precise field installation.",
    detail:
      "Tracker deployment with alignment control, drive system coordination, commissioning checks and performance-driven installation."
  },
  {
    icon: "◌",
    title: "O&M Services",
    summary: "Operational maintenance programs focused on uptime, safety and generation performance.",
    detail:
      "Preventive maintenance, corrective maintenance, thermography, vegetation control, safety audits and generation reporting."
  },
  {
    icon: "▤",
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

const locations = {
  india: [
    ["Kudligi, Karnataka", "262.5MW"],
    ["Jhansi, Uttar Pradesh", "105MW"],
    ["Atharga, Karnataka", "75MW"],
    ["Kombu, Tamil Nadu", "45MW"],
    ["Auriya, Uttar Pradesh", "27.5MW Floating"],
    ["Maharashtra", "23.75MW Tracker"],
    ["Tadipatri, Andhra Pradesh", "20.42MW"]
  ],
  international: [
    ["Bhutan", "22.5MW"],
    ["Saudi Arabia", "4.4MW"],
    ["Bahrain", "Active"],
    ["UAE", "Active"],
    ["Indonesia", "Pipeline"],
    ["Vietnam", "Pipeline"]
  ]
};

const verticals = [
  ["01", "🔋", "Storage", "BESS pipeline for round-the-clock clean energy delivery."],
  ["02", "🌿", "Bio-Energy", "Compressed bio-gas and bio-waste value-chain opportunities."],
  ["03", "⚡", "Mobility", "EV charging infrastructure for fleet and commercial deployments."],
  ["04", "💧", "Hydrogen", "Hydrogen-enabled microgrids and decarbonisation pathways."],
  ["05", "🌾", "Agri-Solar", "Agrivoltaics combining agricultural productivity with solar generation."]
];

const serviceGrid = document.querySelector("#serviceGrid");
const projectGrid = document.querySelector("#projectGrid");
const clientTicker = document.querySelector("#clientTicker");
const locationList = document.querySelector("#locationList");
const verticalGrid = document.querySelector("#verticalGrid");
const modal = document.querySelector("#serviceModal");

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

function renderLocations(type = "india") {
  locationList.innerHTML = locations[type]
    .map(([place, capacity]) => `<article><strong>${place}</strong><span>${capacity}</span></article>`)
    .join("");
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
renderLocations();
renderVerticals();

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

document.querySelectorAll(".switcher button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".switcher button").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderLocations(button.dataset.location);
  });
});

document.querySelectorAll(".map-canvas button").forEach((marker) => {
  marker.addEventListener("click", () => {
    document.querySelector("#mapTooltip").textContent = marker.dataset.map;
  });
});

document.querySelector(".lead-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = encodeURIComponent(
    `New enquiry for Nexora Power Projects\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\nDetails: ${data.get("details")}`
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
