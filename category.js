// ===== Category page renderer =====
// Reads ?cat=<slug> from the URL and renders that category's products.
// Runs BEFORE script.js, so the cart/wishlist handlers bind to these cards.
(function () {
  const slug = (new URLSearchParams(location.search).get("cat") || "").toLowerCase();
  const data = typeof CATALOG !== "undefined" ? CATALOG[slug] : null;

  const grid = document.getElementById("categoryGrid");
  const titleEl = document.getElementById("catTitle");
  const blurbEl = document.getElementById("catBlurb");
  const crumbEl = document.getElementById("catCrumb");
  const countEl = document.getElementById("catCount");

  if (!data) {
    document.title = "Collection — Studio Resinique";
    if (titleEl) titleEl.textContent = "Collection not found";
    if (blurbEl) blurbEl.textContent = "We couldn't find that collection.";
    if (countEl) countEl.textContent = "";
    if (grid) {
      grid.innerHTML =
        '<p class="cat-empty">Nothing here yet — <a href="index.html#categories">browse all categories</a>.</p>';
    }
    return;
  }

  document.title = data.title + " — Studio Resinique";
  if (titleEl) titleEl.textContent = data.title;
  if (blurbEl) blurbEl.textContent = data.blurb;
  if (crumbEl) crumbEl.textContent = data.title;
  if (countEl) {
    countEl.textContent =
      data.items.length + (data.items.length === 1 ? " piece" : " pieces");
  }

  const fmt = (n) => "Rs " + n.toLocaleString("en-US");

  grid.innerHTML = data.items
    .map(
      (it) => `
      <article class="product">
        <div class="product-media">
          <img src="${it.image}" alt="${it.name}" loading="lazy" />
          ${it.badge ? `<span class="product-badge">${it.badge}</span>` : ""}
          <button class="wishlist" aria-label="Add to wishlist">&#9825;</button>
        </div>
        <div class="product-info">
          <h3>${it.name}</h3>
          <p class="product-meta">${it.meta}</p>
          <p class="product-price">${fmt(it.price)}</p>
          <button class="add-cart" type="button">Order Now</button>
        </div>
      </article>`
    )
    .join("");
})();
