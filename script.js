// ===== Studio Resinique — homepage interactions =====

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
const isMobileNav = () => window.matchMedia("(max-width: 720px)").matches;

if (navToggle && nav) {
  const closeNav = () => {
    nav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    const categoriesItem = nav.querySelector(".nav-item.has-dropdown");
    if (categoriesItem) categoriesItem.classList.remove("open");
  };

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    if (!open) {
      const categoriesItem = nav.querySelector(".nav-item.has-dropdown");
      if (categoriesItem) categoriesItem.classList.remove("open");
    }
  });

  const navClose = document.getElementById("navClose");
  if (navClose) navClose.addEventListener("click", closeNav);

  // On mobile, "Categories" expands an inline accordion instead of navigating.
  // On desktop it behaves as a normal link (the dropdown already opens on hover).
  const categoriesTrigger = nav.querySelector(".nav-link--drop");
  const categoriesItem = nav.querySelector(".nav-item.has-dropdown");
  if (categoriesTrigger && categoriesItem) {
    categoriesTrigger.addEventListener("click", (e) => {
      if (isMobileNav()) {
        e.preventDefault();
        categoriesItem.classList.toggle("open");
      }
    });
  }

  // Close the whole menu after tapping any real navigation link
  nav.querySelectorAll("a").forEach((link) => {
    if (link === categoriesTrigger) return;
    link.addEventListener("click", closeNav);
  });
}

// Wishlist heart toggle
document.querySelectorAll(".wishlist").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const active = btn.classList.toggle("active");
    btn.innerHTML = active ? "♥" : "♡"; // filled vs outline heart
  });
});

// ===== Config =====
const CART_KEY = "resinique_cart";
const CONTACT_KEY = "resinique_customer";
const WHATSAPP_NUMBER = "923159185551";
// Paste your Google Apps Script Web App URL here (see setup notes).
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycby2-CJWSKq3uIGB3RN4gjFjUZ7Tyur_e5Jik60xRCsRU05BjcjZu17hp0X_PwqGCBnw/exec";

// Saves an order row to the Google Sheet via the Apps Script web app.
// Uses no-cors + text/plain so it works from a static site without CORS setup.
async function saveOrderToSheet(payload) {
  if (!SHEET_ENDPOINT || SHEET_ENDPOINT.indexOf("PASTE_YOUR") === 0) {
    console.warn("[Resinique] Sheet endpoint not set — skipping cloud save.");
    return { skipped: true };
  }
  await fetch(SHEET_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  return { ok: true };
}

// ===== Cart =====

const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const navCartBtn = document.getElementById("navCartBtn");
const navCartCount = document.getElementById("navCartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartClose = document.getElementById("cartClose");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCheckout = document.getElementById("cartCheckout");

let cart = [];
try {
  cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
} catch {
  cart = [];
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
const formatRs = (n) => "Rs " + n.toLocaleString("en-US");
const saveCart = () => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const cartTotals = () =>
  cart.reduce(
    (acc, it) => ({ qty: acc.qty + it.qty, sum: acc.sum + it.price * it.qty }),
    { qty: 0, sum: 0 }
  );

const openCart = () => {
  cartDrawer.classList.add("open");
  cartBackdrop.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};
const closeCart = () => {
  cartDrawer.classList.remove("open");
  cartBackdrop.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

const buildWhatsAppLink = () => {
  if (!cart.length) return "#";
  const lines = cart.map(
    (it) => `• ${it.name} ×${it.qty} (${formatRs(it.price * it.qty)})`
  );
  const { sum } = cartTotals();
  const msg = `Hi Studio Resinique, I'd like to order:\n${lines.join("\n")}\n\nTotal: ${formatRs(sum)}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

const renderCart = () => {
  const { qty, sum } = cartTotals();

  cartCount.textContent = qty;
  cartCount.hidden = qty === 0;
  if (navCartCount) {
    navCartCount.textContent = qty;
    navCartCount.hidden = qty === 0;
  }

  if (!cart.length) {
    cartDrawer.classList.add("empty");
    cartItemsEl.innerHTML =
      '<div class="cart-empty"><p>Your cart is empty</p><p class="cart-empty-sub">Add a piece you love to get started.</p></div>';
  } else {
    cartDrawer.classList.remove("empty");
    cartItemsEl.innerHTML = cart
      .map(
        (it) => `
      <div class="cart-item" data-id="${escapeHtml(it.name)}">
        <div class="cart-item-thumb"><img src="${escapeHtml(it.image)}" alt="${escapeHtml(it.name)}" /></div>
        <div class="cart-item-info">
          <p class="cart-item-name">${escapeHtml(it.name)}</p>
          <p class="cart-item-price">${formatRs(it.price)}</p>
          <div class="cart-qty">
            <button type="button" data-action="dec" aria-label="Decrease quantity">&minus;</button>
            <span>${it.qty}</span>
            <button type="button" data-action="inc" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove" data-action="remove">Remove</button>
      </div>`
      )
      .join("");
  }

  cartTotalEl.textContent = formatRs(sum);
  cartCheckout.href = buildWhatsAppLink();
};

const addToCart = (item) => {
  const existing = cart.find((it) => it.name === item.name);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  saveCart();
  renderCart();
};

// "Order Now" buttons → read the product's name, image, price and store it
document.querySelectorAll(".add-cart").forEach((btn) => {
  const original = btn.textContent;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = btn.closest(".product");
    if (!card) return;

    const name = card.querySelector("h3")?.textContent.trim() || "Item";
    const image = card.querySelector("img")?.getAttribute("src") || "";
    const priceText = card.querySelector(".product-price")?.textContent || "0";
    const price = parseInt(priceText.replace(/[^\d]/g, ""), 10) || 0;

    addToCart({ name, image, price });

    btn.classList.add("added");
    btn.textContent = "Added ✓";
    setTimeout(() => {
      btn.classList.remove("added");
      btn.textContent = original;
    }, 1400);

    openCart();
  });
});

// Cart item controls (delegated: qty +/- and remove)
if (cartItemsEl) {
  cartItemsEl.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action) return;
    const row = e.target.closest(".cart-item");
    const item = cart.find((it) => it.name === row?.dataset.id);
    if (!item) return;

    if (action === "inc") item.qty += 1;
    else if (action === "dec") {
      item.qty -= 1;
      if (item.qty <= 0) cart = cart.filter((it) => it !== item);
    } else if (action === "remove") {
      cart = cart.filter((it) => it !== item);
    }
    saveCart();
    renderCart();
  });
}

// Open / close the drawer
if (cartBtn) cartBtn.addEventListener("click", openCart);
if (cartClose) cartClose.addEventListener("click", closeCart);
if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);
if (navCartBtn) {
  navCartBtn.addEventListener("click", () => {
    if (nav && navToggle) {
      nav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
    openCart();
  });
}

renderCart();

// ===== Checkout modal =====
const checkoutBtn = document.getElementById("cartCheckoutBtn");
const checkoutBackdrop = document.getElementById("checkoutBackdrop");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutClose = document.getElementById("checkoutClose");
const checkoutSummary = document.getElementById("checkoutSummary");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutError = document.getElementById("checkoutError");
const checkoutMain = document.getElementById("checkoutMain");
const checkoutSuccess = document.getElementById("checkoutSuccess");
const checkoutSuccessName = document.getElementById("checkoutSuccessName");
const checkoutDone = document.getElementById("checkoutDone");

const renderCheckoutSummary = () => {
  const { sum } = cartTotals();
  checkoutSummary.innerHTML =
    cart
      .map(
        (it) =>
          `<div class="co-line"><span>${escapeHtml(it.name)} ×${it.qty}</span><span>${formatRs(it.price * it.qty)}</span></div>`
      )
      .join("") +
    `<div class="co-line co-total"><span>Total</span><span>${formatRs(sum)}</span></div>`;
};

// Contact details persistence — so returning buyers don't re-type the form
const saveContact = (c) => {
  try { localStorage.setItem(CONTACT_KEY, JSON.stringify(c)); } catch {}
};
const loadContact = () => {
  try { return JSON.parse(localStorage.getItem(CONTACT_KEY)) || null; } catch { return null; }
};
const prefillCheckout = () => {
  const c = loadContact();
  if (!c) return;
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.value = val;
  };
  set("coName", c.name);
  set("coPhone", c.phone);
  set("coCity", c.city);
  set("coEmail", c.email);
  set("coAddress", c.address);
};

const openCheckout = () => {
  if (!cart.length) return;
  renderCheckoutSummary();
  checkoutForm.reset(); // always start with a clean, empty form for a new order
  checkoutMain.hidden = false;
  checkoutSuccess.hidden = true;
  checkoutError.textContent = "";
  checkoutBackdrop.classList.add("open");
  checkoutModal.classList.add("open");
  checkoutModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};
const closeCheckout = () => {
  checkoutBackdrop.classList.remove("open");
  checkoutModal.classList.remove("open");
  checkoutModal.setAttribute("aria-hidden", "true");
  if (!cartDrawer.classList.contains("open")) document.body.style.overflow = "";
};

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openCheckout();
  });
}
if (checkoutClose) checkoutClose.addEventListener("click", closeCheckout);
if (checkoutBackdrop) checkoutBackdrop.addEventListener("click", closeCheckout);
if (checkoutDone) {
  checkoutDone.addEventListener("click", () => {
    closeCheckout();
    closeCart();
  });
}

if (checkoutForm) {
  const submitBtn = checkoutForm.querySelector(".checkout-submit");
  const submitLabel = submitBtn ? submitBtn.textContent : "Place Order";

  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(checkoutForm);
    const customer = {
      name: (data.get("name") || "").trim(),
      phone: (data.get("phone") || "").trim(),
      city: (data.get("city") || "").trim(),
      email: (data.get("email") || "").trim(),
      address: (data.get("address") || "").trim(),
    };
    const notes = (data.get("notes") || "").trim();
    const payment = (data.get("payment") || "Bank Transfer").trim();

    if (!customer.name || !customer.phone || !customer.address || !customer.city) {
      checkoutError.textContent = "Please fill in your name, phone, address, and city.";
      return;
    }
    if (!/^[\d+\-\s()]{7,}$/.test(customer.phone)) {
      checkoutError.textContent = "Please enter a valid phone number.";
      return;
    }
    checkoutError.textContent = "";

    // Remember contact details for next time
    saveContact(customer);

    const { sum } = cartTotals();
    const itemsText = cart
      .map((it) => `${it.name} x${it.qty} (${formatRs(it.price * it.qty)})`)
      .join("; ");

    // Payload for the Google Sheet
    const payload = {
      ...customer,
      notes,
      payment,
      items: itemsText,
      itemsDetail: cart.map((it) => ({ name: it.name, qty: it.qty, price: it.price })),
      total: sum,
      totalText: formatRs(sum),
      orderedAt: new Date().toISOString(),
    };

    // Pre-build a WhatsApp link for this order (success + fallback)
    const waLines = cart.map((it) => `• ${it.name} ×${it.qty} (${formatRs(it.price * it.qty)})`);
    const waParts = [
      `New order from ${customer.name}`,
      `Phone: ${customer.phone}`,
      customer.email ? `Email: ${customer.email}` : null,
      `City: ${customer.city}`,
      `Address: ${customer.address}`,
      "",
      "Items:",
      ...waLines,
      `Total: ${formatRs(sum)}`,
      `Payment: ${payment}`,
      notes ? `\nNotes: ${notes}` : null,
    ].filter((x) => x !== null);
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waParts.join("\n"))}`;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Placing order…";
    }

    try {
      await saveOrderToSheet(payload);

      if (checkoutSuccessName) checkoutSuccessName.textContent = customer.name;
      const waEl = document.getElementById("checkoutWa");
      if (waEl) waEl.href = waLink;

      checkoutMain.hidden = true;
      checkoutSuccess.hidden = false;
      checkoutForm.reset();

      // Order is saved — clear the cart and the stored customer details
      cart = [];
      saveCart();
      renderCart();
      try { localStorage.removeItem(CONTACT_KEY); } catch {}
    } catch (err) {
      console.error("[Resinique] Order save failed:", err);
      checkoutError.textContent =
        "Sorry, we couldn't place your order just now. Please try again, or send it to us on WhatsApp.";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      }
    }
  });
}

// Esc closes the modal first, otherwise the cart drawer
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (checkoutModal && checkoutModal.classList.contains("open")) closeCheckout();
  else closeCart();
});

// ===== Contact form (sends via WhatsApp) =====
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(contactForm);
    const name = (d.get("name") || "").trim();
    const contact = (d.get("contact") || "").trim();
    const message = (d.get("message") || "").trim();
    const note = document.getElementById("contactNote");

    if (!name || !message) {
      if (note) {
        note.textContent = "Please add your name and a message.";
        note.classList.add("error");
      }
      return;
    }

    const parts = [
      `Hi Studio Resinique, I'm ${name}.`,
      contact ? `Reach me at: ${contact}` : null,
      "",
      message,
    ].filter((x) => x !== null);
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join("\n"))}`;
    window.open(link, "_blank");

    if (note) {
      note.classList.remove("error");
      note.textContent = "Opening WhatsApp — we'll reply as soon as we can!";
    }
    contactForm.reset();
  });
}

// New collection carousel
const track = document.getElementById("collectionTrack");
if (track) {
  const buttons = document.querySelectorAll(".carousel-btn");

  const stepSize = () => {
    const card = track.querySelector(".collection-card");
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 24;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
  };

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 2;
    buttons.forEach((btn) => {
      const dir = Number(btn.dataset.dir);
      btn.disabled = dir < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= maxScroll;
    });
  };

  // ----- Auto-slide -----
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const AUTO_MS = 2600;
  let autoTimer = null;

  const autoAdvance = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 2;
    if (track.scrollLeft >= maxScroll) {
      track.scrollTo({ left: 0, behavior: "smooth" }); // loop back to start
    } else {
      track.scrollBy({ left: stepSize(), behavior: "smooth" });
    }
  };
  const startAuto = () => {
    if (reduceMotion || autoTimer) return;
    autoTimer = setInterval(autoAdvance, AUTO_MS);
  };
  const stopAuto = () => {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      track.scrollBy({ left: stepSize() * Number(btn.dataset.dir), behavior: "smooth" });
      stopAuto();
      startAuto(); // reset the timer after a manual click
    });
  });

  // Pause auto-slide while the user is interacting, resume after
  track.addEventListener("mouseenter", stopAuto);
  track.addEventListener("mouseleave", startAuto);
  track.addEventListener("focusin", stopAuto);
  track.addEventListener("focusout", startAuto);
  track.addEventListener("touchstart", stopAuto, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();
  startAuto();
}

// Reveal sections on scroll
const revealEls = document.querySelectorAll(
  ".section-head, .category, .product, .custom-content, .story-copy, .story-art, .step, .event, .review, .social"
);
revealEls.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // gentle stagger for grouped items
          setTimeout(() => entry.target.classList.add("in"), (i % 4) * 80);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}
