// ===== Category page renderer =====
// Reads ?cat=<slug> from the URL and renders that category's products.
// Runs BEFORE script.js, so the cart/zoom handlers bind to these cards.
(function () {
  const slug = (new URLSearchParams(location.search).get("cat") || "").toLowerCase();
  const data = typeof CATALOG !== "undefined" ? CATALOG[slug] : null;

  const grid = document.getElementById("categoryGrid");
  const titleEl = document.getElementById("catTitle");
  const blurbEl = document.getElementById("catBlurb");
  const crumbEl = document.getElementById("catCrumb");
  const countEl = document.getElementById("catCount");
  const descMetaEl = document.querySelector('meta[name="description"]');
  const canonicalEl = document.getElementById("canonicalLink");
  const ogTitleEl = document.getElementById("ogTitle");
  const ogDescEl = document.getElementById("ogDescription");
  const ogUrlEl = document.getElementById("ogUrl");
  const ogImageEl = document.getElementById("ogImage");
  const pageUrl = "https://studioresinique.com/category.html" + (slug ? "?cat=" + encodeURIComponent(slug) : "");

  if (canonicalEl) canonicalEl.href = pageUrl;
  if (ogUrlEl) ogUrlEl.content = pageUrl;

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
  if (descMetaEl) descMetaEl.content = data.blurb;
  if (ogTitleEl) ogTitleEl.content = data.title + " — Studio Resinique";
  if (ogDescEl) ogDescEl.content = data.blurb;
  if (ogImageEl && data.items[0]) {
    ogImageEl.content = "https://studioresinique.com/" + data.items[0].image;
  }
  if (countEl) {
    countEl.textContent =
      data.items.length + (data.items.length === 1 ? " piece" : " pieces");
  }

  const fmt = (n) => "Rs " + n.toLocaleString("en-US");

  if (!data.items.length) {
    grid.innerHTML = '<p class="cat-empty">New pieces are on their way — check back soon!</p>';
    return;
  }

  grid.innerHTML = data.items
    .map(
      (it) => `
      <article class="product">
        <div class="product-media">
          <img src="${it.image}" alt="${it.name}" loading="lazy" />
          ${it.badge ? `<span class="product-badge">${it.badge}</span>` : ""}
        </div>
        <div class="product-info">
          <h3>${it.name}</h3>
          <p class="product-meta">${it.meta}</p>
          <p class="product-price">${fmt(it.price)}</p>
          ${
            it.tiers
              ? `<div class="product-tiers" role="group" aria-label="Choose quantity">
                  ${it.tiers
                    .map(
                      (t, i) =>
                        `<button type="button" class="tier-btn${i === 0 ? " active" : ""}" data-price="${t.price}" data-label="${t.label}">${t.label}</button>`
                    )
                    .join("")}
                </div>`
              : ""
          }
          <button class="add-cart" type="button">Add to Cart</button>
        </div>
      </article>`
    )
    .join("");
})();
