/* ------------------------------------------------------------------ */
/*  VELOUR — static site logic (vanilla JS, no build step required)   */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  {
    id: 1,
    name: "Velour No. 07",
    desc: "Rose, oud & amber",
    price: 128,
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1630344360804-acaab8f80b99?fm=jpg&q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Velour Bloom",
    desc: "Jasmine & white musk",
    price: 118,
    tag: "New",
    img: "https://images.unsplash.com/photo-1602928261664-bfcf023fbc23?fm=jpg&q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Velour Noir",
    desc: "Bergamot & sandalwood",
    price: 132,
    tag: "Limited",
    img: "https://images.unsplash.com/photo-1618436917143-548beebc58e5?fm=jpg&q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Velour Soleil",
    desc: "Neroli & vanilla bean",
    price: 118,
    tag: "",
    img: "https://images.unsplash.com/photo-1709662369957-0cbf9f8452fc?fm=jpg&q=80&w=700&auto=format&fit=crop",
  },
];

let cart = [];

/* ---------- render product grid ---------- */
function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = PRODUCTS.map(
    (p) => `
    <div class="card reveal in">
      <div class="card-img-wrap">
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ""}
        <button class="wish-btn" aria-label="Wishlist"><i data-lucide="heart"></i></button>
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="card-body">
        <h3 class="serif">${p.name}</h3>
        <div class="desc">${p.desc}</div>
        <div class="card-footer">
          <span class="price">$${p.price}</span>
          <button class="add-btn" data-id="${p.id}" aria-label="Add to cart"><i data-lucide="plus"></i></button>
        </div>
      </div>
    </div>
  `
  ).join("");

  grid.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });

  if (window.lucide) lucide.createIcons();
}

/* ---------- cart logic ---------- */
function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
  showToast(`${product.name} added to cart`);
}

function changeQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  cart = cart.filter((c) => c.qty > 0);
  renderCart();
}

function renderCart() {
  const itemsEl = document.getElementById("drawer-items");
  const emptyEl = document.getElementById("drawer-empty");
  const footerEl = document.getElementById("drawer-footer");
  const totalEl = document.getElementById("drawer-total");
  const countEl = document.getElementById("cart-count");

  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => s + c.qty * c.price, 0);

  countEl.textContent = count;
  countEl.style.display = count > 0 ? "flex" : "none";

  if (cart.length === 0) {
    itemsEl.innerHTML = "";
    itemsEl.appendChild(emptyEl);
    footerEl.style.display = "none";
    return;
  }

  footerEl.style.display = "block";
  totalEl.textContent = `$${total}`;

  itemsEl.innerHTML = cart
    .map(
      (c) => `
    <div class="drawer-item">
      <img src="${c.img}" alt="${c.name}" />
      <div class="info">
        <h4 class="serif">${c.name}</h4>
        <div class="qty-row">
          <button data-id="${c.id}" data-delta="-1"><i data-lucide="minus"></i></button>
          <span>${c.qty}</span>
          <button data-id="${c.id}" data-delta="1"><i data-lucide="plus"></i></button>
        </div>
      </div>
      <span class="price" style="font-size:15px;">$${c.qty * c.price}</span>
    </div>
  `
    )
    .join("");

  itemsEl.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () =>
      changeQty(Number(btn.dataset.id), Number(btn.dataset.delta))
    );
  });

  if (window.lucide) lucide.createIcons();
}

/* ---------- toast ---------- */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- drawer open/close ---------- */
function setupDrawer() {
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("cart-toggle");
  const closeBtn = document.getElementById("drawer-close");

  const open = () => {
    drawer.classList.add("open");
    overlay.classList.add("open");
  };
  const close = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);
}

/* ---------- mobile nav ---------- */
function setupMobileNav() {
  const burger = document.getElementById("burger-toggle");
  const links = document.querySelector(".nav-links");
  burger.addEventListener("click", () => {
    const isOpen = links.style.display === "flex";
    links.style.display = isOpen ? "none" : "flex";
    links.style.flexDirection = "column";
    links.style.position = "absolute";
    links.style.top = "64px";
    links.style.left = "0";
    links.style.right = "0";
    links.style.background = "#F8F2E7";
    links.style.padding = "20px 5vw";
    links.style.gap = "16px";
  });
}

/* ---------- scroll reveal ---------- */
function setupReveal() {
  const els = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      }),
    { threshold: 0.15 }
  );
  els.forEach((el) => obs.observe(el));
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  setupDrawer();
  setupMobileNav();
  setupReveal();
  if (window.lucide) lucide.createIcons();
});
