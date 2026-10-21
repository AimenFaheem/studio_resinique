// ===== Category page renderer =====
// Reads ?cat=<slug> from the URL and renders that category's products.
// ?cat=all is a special combined view across every category, with a
// search box and pagination since it can span 100+ items.
// Runs BEFORE script.js, so the cart/zoom handlers bind to these cards.
(function () {
  const slug = (new URLSearchParams(location.search).get("cat") || "").toLowerCase();
  const isAll = slug === "all";

  let data;
  if (isAll) {
    const allItems =
      typeof CATALOG !== "undefined"
        ? Object.values(CATALOG).flatMap((cat) =>
            cat.items.map((it) => ({ ...it, category: cat.title }))
          )
        : [];
    data = {
      title: "All Jewelry",
      blurb: "Every handmade piece in one place — search or browse by page.",
      items: allItems,
    };
  } else {
    data = typeof CATALOG !== "undefined" ? CATALOG[slug] : null;
  }

  const grid = document.getElementById("categoryGrid");
  const titleEl = document.getElementById("catTitle");
  const blurbEl = document.getElementById("catBlurb");
  const crumbEl = document.getElementById("catCrumb");
  const countEl = document.getElementById("catCount");
  const searchWrap = document.getElementById("catSearchBar");
  const searchInput = document.getElementById("catSearchInput");
  const paginationEl = document.getElementById("catPagination");
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

  const fmt = (n) => "Rs " + n.toLocaleString("en-US");

  const cardHtml = (it) => `
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
      </article>`;

  if (!isAll) {
    // Regular category page: render the whole list, no search/pagination.
    if (countEl) {
      countEl.textContent = data.items.length + (data.items.length === 1 ? " piece" : " pieces");
    }
    grid.innerHTML = data.items.length
      ? data.items.map(cardHtml).join("")
      : '<p class="cat-empty">New pieces are on their way — check back soon!</p>';
    return;
  }

  // ===== All Jewelry: search + pagination =====
  const PAGE_SIZE = 12;
  let currentPage = 1;
  let filteredItems = data.items;

  const renderPagination = (totalPages) => {
    if (!paginationEl) return;
    if (totalPages <= 1) {
      paginationEl.innerHTML = "";
      return;
    }
    const pageBtn = (page, label, disabled, active) =>
      `<button type="button" class="page-btn${active ? " active" : ""}" data-page="${page}" ${disabled ? "disabled" : ""}>${label}</button>`;
    let html = pageBtn(currentPage - 1, "Prev", currentPage === 1, false);
    for (let p = 1; p <= totalPages; p++) {
      html += pageBtn(p, String(p), false, p === currentPage);
    }
    html += pageBtn(currentPage + 1, "Next", currentPage === totalPages, false);
    paginationEl.innerHTML = html;
  };

  const renderPage = () => {
    const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
    currentPage = Math.min(currentPage, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filteredItems.slice(start, start + PAGE_SIZE);

    grid.innerHTML = pageItems.length
      ? pageItems.map(cardHtml).join("")
      : '<p class="cat-empty">No products match your search.</p>';

    if (countEl) {
      countEl.textContent = filteredItems.length + (filteredItems.length === 1 ? " piece" : " pieces");
    }
    renderPagination(totalPages);
    // script.js has already loaded by the time a visitor can type or
    // click a page button, so its shared card-binding helper is ready.
    if (window.ResiniqueUI) {
      window.ResiniqueUI.initProductCards(grid);
      window.ResiniqueUI.initImageLoaders(grid);
    }
  };

  // Tokenized word-prefix matching, so searching "ring" matches items
  // whose name/meta/category contains a word starting with "ring"
  // (e.g. "Ring", "Rings") without also matching "Earrings" — a plain
  // substring search would wrongly match "ring" inside "earrings".
  const tokenize = (s) => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

  if (searchWrap) searchWrap.hidden = false;
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const terms = tokenize(searchInput.value);
      filteredItems = !terms.length
        ? data.items
        : data.items.filter((it) => {
            const words = tokenize(`${it.name} ${it.meta} ${it.category || ""}`);
            return terms.every((term) => words.some((w) => w.startsWith(term)));
          });
      currentPage = 1;
      renderPage();
    });
  }
  if (paginationEl) {
    paginationEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".page-btn");
      if (!btn || btn.disabled) return;
      currentPage = Number(btn.dataset.page);
      renderPage();
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  renderPage();
})();
