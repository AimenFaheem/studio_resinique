// ===== Studio Resinique — events data + renderer =====
// Add a new event by pushing an object to EVENTS. Each event keeps the
// same design. status: "past" | "upcoming" | "soon".
// media items: { type: "image", src } OR { type: "video", src: <YouTube EMBED url>, thumb: <image> }
// A "soon" event with empty media[] shows a "coming soon" placeholder.
const EVENTS = [
  {
    title: "Daachi Exhibition",
    location: "Lahore",
    date: "March 2026",
    status: "past",
    description:
      "Our biggest stall yet — three days of handmade joy, live resin pours, and finally meeting so many of you in person.",
    media: [
      { type: "image", src: "images/product-7.jpeg" },
      { type: "image", src: "images/product-6.jpeg" },
      // Replace the embed URL with your real YouTube video link
      { type: "video", src: "https://www.youtube.com/embed/aqz-KE-bpKQ", thumb: "images/product-9.jpeg" },
      { type: "image", src: "images/product-5.jpeg" },
    ],
  },
  {
    title: "Eid Bazaar",
    location: "Islamabad",
    date: "April 2026",
    status: "past",
    description:
      "Festive florals, custom keepsakes, and a whole lot of chai. Thank you to everyone who stopped by our booth.",
    media: [
      { type: "image", src: "images/product-1.jpeg" },
      { type: "image", src: "images/product-2.jpeg" },
      { type: "image", src: "images/product-4.jpeg" },
    ],
  },
  {
    title: "Weekend Pop-up",
    location: "Karachi",
    date: "May 2026",
    status: "past",
    description:
      "A cosy corner by the sea breeze — new drops, a little giveaway, and lots of happy faces.",
    media: [
      { type: "image", src: "images/product-3.jpeg" },
      { type: "video", src: "https://www.youtube.com/embed/aqz-KE-bpKQ", thumb: "images/product-8.jpeg" },
      { type: "image", src: "images/product-5.jpeg" },
    ],
  },
  {
    title: "Spring Artisan Market",
    location: "Lahore",
    date: "February 2026",
    status: "past",
    description:
      "Where our Meadow collection made its debut. So grateful for the warm welcome from the local maker community.",
    media: [
      { type: "image", src: "images/product-9.jpeg" },
      { type: "image", src: "images/product-2.jpeg" },
      { type: "image", src: "images/product-7.jpeg" },
    ],
  },
  {
    title: "Winter Wonders Pop-up",
    location: "Islamabad",
    date: "Coming December 2026",
    status: "soon",
    description:
      "Something magical is in the works for the festive season. Follow along to be the first to know the date and venue.",
    media: [],
  },
];

(function () {
  const list = document.getElementById("eventsList");
  if (!list || typeof EVENTS === "undefined") return;

  const pin = `<svg class="ev-pin" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2"/></svg>`;
  const labels = { past: "Past Event", upcoming: "Upcoming", soon: "Coming Soon" };

  const mediaTile = (m) => {
    if (m.type === "video") {
      return `<button class="ev-media ev-media--video" type="button" data-type="video" data-src="${m.src}">
        <img src="${m.thumb}" alt="Event video" loading="lazy" />
        <span class="ev-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </button>`;
    }
    return `<button class="ev-media" type="button" data-type="image" data-src="${m.src}">
      <img src="${m.src}" alt="Event photo" loading="lazy" />
    </button>`;
  };

  list.innerHTML = EVENTS.map((ev) => {
    const gallery =
      ev.media && ev.media.length
        ? `<div class="ev-gallery">${ev.media.map(mediaTile).join("")}</div>`
        : `<div class="ev-soon"><span class="ev-soon-mark">&#10047;</span><p>Photos &amp; videos coming soon</p></div>`;
    return `<article class="ev-block ev-${ev.status}">
      <header class="ev-head">
        <span class="ev-badge ev-badge--${ev.status}">${labels[ev.status] || ""}</span>
        <h2 class="ev-title">${ev.title}</h2>
        <p class="ev-where">${pin}${ev.location} &middot; ${ev.date}</p>
        <p class="ev-desc">${ev.description}</p>
      </header>
      ${gallery}
    </article>`;
  }).join("");

  // ===== Lightbox (handles both images and videos) =====
  const lb = document.getElementById("eventLightbox");
  const lbContent = document.getElementById("evLbContent");
  const lbClose = document.getElementById("evLbClose");

  const openLb = (type, src) => {
    if (type === "video") {
      const sep = src.indexOf("?") === -1 ? "?" : "&";
      lbContent.innerHTML = `<div class="ev-lb-video"><iframe src="${src}${sep}autoplay=1" title="Event video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    } else {
      lbContent.innerHTML = `<img class="ev-lb-img" src="${src}" alt="Event media" />`;
    }
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeLb = () => {
    if (!lb.classList.contains("open")) return;
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbContent.innerHTML = ""; // stops video playback
    document.body.style.overflow = "";
  };

  list.addEventListener("click", (e) => {
    const tile = e.target.closest(".ev-media");
    if (!tile) return;
    openLb(tile.dataset.type, tile.dataset.src);
  });
  if (lbClose) lbClose.addEventListener("click", closeLb);
  if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });
})();
