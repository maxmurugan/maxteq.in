/* ============================================
   MAXTEQ ELECTRONICS — script.js

   TO ADD/CHANGE SLIDES:
   → Put images in images/slides/ named 001.jpeg to 031.jpeg

   TO ADD PRODUCT IMAGES:
   → Put images in images/products/
   → Update productImages object below

   TO CHANGE WHATSAPP NUMBER:
   → Find waNumber near bottom of this file
   ============================================ */


// ══════════════════════════════════════════════
// 1. PRODUCT TICKER — scrolling text bar
// ══════════════════════════════════════════════

function buildTicker() {
  const track = document.getElementById("tickerTrack");
  if (!track) return;

  const items = [
    { label: "GPS Clock",             detail: "GPS Synchronized Master Clock — Zero Drift Accuracy — RS485 / NTP Ready" },
    { label: "RGB Module P10",        detail: "High Brightness Outdoor LED Matrix — P10 Pixel Pitch — Waterproof" },
    { label: "RGB Module P4 / P6",    detail: "Full Color Indoor LED Panels — P4 & P6 Pixel Pitch — High Resolution" },
    { label: "Alarm Clock System",    detail: "Industrial Programmable Bell System — Multi Zone Scheduling — Relay Output" },
    { label: "Production Display",    detail: "Real-Time Factory Monitoring Board — Live Target vs Actual Count" },
    { label: "Target & Actual Board", detail: "Large 7-Segment Display — Built-in Clock — Shop Floor Visibility" },
    { label: "Custom Solutions",      detail: "Custom LED Display & Automation — Designed & Built in Chennai" },
    { label: "Maxteq Electronics",    detail: "Industrial LED Display Specialists — Chennai, Tamil Nadu, India" },
  ];

  // Duplicate for seamless infinite loop
  const allItems = [...items, ...items];

  allItems.forEach(item => {
    const el = document.createElement("span");
    el.className = "ticker-item";
    el.innerHTML = `
      <span class="ticker-dot"></span>
      <span class="ticker-label">${item.label}</span>
      <span class="ticker-sep">—</span>
      <span>${item.detail}</span>
    `;
    track.appendChild(el);
  });
}


// ══════════════════════════════════════════════
// 2. HERO SLIDESHOW — 001.jpeg to 031.jpeg
// ══════════════════════════════════════════════

const slideImages = [
  { src: "images/slides/001.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/002.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/003.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/004.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/005.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/006.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/007.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/008.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/009.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/010.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/011.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/012.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/013.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/014.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/015.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/016.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/017.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/018.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/019.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/020.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/021.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/022.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/023.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/024.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/025.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/026.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/027.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/028.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/029.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/030.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
  { src: "images/slides/031.jpeg", title: "Maxteq Product", sub: "Industrial LED Display" },
];

const TRANSITION_EFFECTS = ["fade", "slide-left", "slide-right", "zoom-in", "zoom-out"];
const SLIDE_INTERVAL     = 4000;
let currentSlide = 0;
let slideTimer   = null;

function buildSlideshow() {
  const container  = document.getElementById("slideshowContainer");
  const dotsEl     = document.getElementById("slideDots");
  const progressEl = document.getElementById("slideProgress");
  if (!container || slideImages.length === 0) return;

  slideImages.forEach((img, i) => {
    const slide = document.createElement("div");
    slide.className = "slide" + (i === 0 ? " active" : "");
    slide.innerHTML = `
      <img src="${img.src}" alt="${img.title}" loading="${i === 0 ? 'eager' : 'lazy'}" />
      <div class="slide-caption">
        <p>${img.title}</p>
        <small>${img.sub}</small>
      </div>`;
    container.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "sdot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => { clearAutoSlide(); goToSlide(i); startAutoSlide(); });
    dotsEl.appendChild(dot);
  });

  startProgress(progressEl);
  startAutoSlide();
}

function goToSlide(n) {
  const slides   = document.querySelectorAll(".slide");
  const dots     = document.querySelectorAll(".sdot");
  const progress = document.getElementById("slideProgress");

  TRANSITION_EFFECTS.forEach(e => slides[currentSlide].classList.remove("effect-" + e));
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");

  currentSlide = (n + slides.length) % slides.length;

  const fx = TRANSITION_EFFECTS[Math.floor(Math.random() * TRANSITION_EFFECTS.length)];
  slides[currentSlide].classList.add("effect-" + fx);
  requestAnimationFrame(() => slides[currentSlide].classList.add("active"));

  dots[currentSlide].classList.add("active");
  resetProgress(progress);
}

function changeSlide(dir) {
  clearAutoSlide();
  goToSlide(currentSlide + dir);
  startAutoSlide();
}
window.changeSlide = changeSlide;

function startAutoSlide() {
  clearAutoSlide();
  slideTimer = setInterval(() => goToSlide(currentSlide + 1), SLIDE_INTERVAL);
}
function clearAutoSlide() {
  if (slideTimer) clearInterval(slideTimer);
}
function startProgress(el) {
  if (!el) return;
  el.style.transition = "none"; el.style.width = "0%";
  setTimeout(() => { el.style.transition = `width ${SLIDE_INTERVAL}ms linear`; el.style.width = "100%"; }, 30);
}
function resetProgress(el) {
  if (!el) return;
  el.style.transition = "none"; el.style.width = "0%";
  setTimeout(() => { el.style.transition = `width ${SLIDE_INTERVAL}ms linear`; el.style.width = "100%"; }, 30);
}


// ══════════════════════════════════════════════
// 3. PRODUCT IMAGES
// ══════════════════════════════════════════════

const productImages = {
  "gps-clock":          "",    // → "images/products/gps-clock.jpg"
  "rgb-module":         "",    // → "images/products/rgb-module.jpg"
  "alarm-clock":        "",    // → "images/products/alarm-clock.jpg"
  "production-display": "images/products/production-display.jpg",
  "target-display":     "images/products/target-display.jpg",
};

function loadProductImages() {
  document.querySelectorAll("[data-product-id]").forEach(card => {
    const id  = card.getAttribute("data-product-id");
    const src = productImages[id];
    const box = card.querySelector(".product-img");
    if (!box) return;

    if (src) {
      box.innerHTML = `<img src="${src}" alt="${id}" loading="lazy" />`;
    } else {
      const icon = box.getAttribute("data-icon") || "📦";
      box.innerHTML = `
        <div class="product-img-placeholder">
          <div class="ph-icon">${icon}</div>
          <div class="ph-text">Photo Coming Soon</div>
        </div>`;
    }
  });
}


// ══════════════════════════════════════════════
// 4. SCROLL REVEAL
// ══════════════════════════════════════════════

function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}


// ══════════════════════════════════════════════
// 5. MOBILE MENU
// ══════════════════════════════════════════════

function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}
window.toggleMenu = toggleMenu;


// ══════════════════════════════════════════════
// 6. WHATSAPP ENQUIRY
//    ↓ CHANGE YOUR NUMBER HERE ↓
// ══════════════════════════════════════════════

function sendEnquiry() {
  const name    = document.getElementById("fName").value;
  const phone   = document.getElementById("fPhone").value;
  const product = document.getElementById("fProduct").value;
  const msg     = document.getElementById("fMessage").value;

  let text = "Hi Maxteq Electronics! I am interested in your products.";
  if (name)    text += `\n\nName: ${name}`;
  if (phone)   text += `\nPhone: ${phone}`;
  if (product) text += `\nProduct: ${product}`;
  if (msg)     text += `\nMessage: ${msg}`;

  const waNumber = "919876543210"; // ← CHANGE THIS TO YOUR NUMBER
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank");
}
window.sendEnquiry = sendEnquiry;


// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  buildTicker();
  buildSlideshow();
  loadProductImages();
  initScrollReveal();
});
