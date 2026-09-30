// ===== Studio Resinique — product catalog (per category) =====
// Add / edit products here. Each category page (category.html?cat=slug)
// reads from this object. Prices are plain numbers in PKR.
const CATALOG = {
  earrings: {
    title: "Earrings",
    blurb:
      "Hand-poured resin earrings — pressed petals, swirls of colour, and skin-friendly findings made to wear every day.",
    items: [
      { name: "Blush Rose Heart Drops", image: "images/earring-1.jpeg", price: 850, meta: "Earrings", badge: "New" },
      { name: "Garnet Heart Drops", image: "images/earring-2.jpeg", price: 850, meta: "Earrings" },
      { name: "Ivory Lace Heart Drops", image: "images/earring-3.jpeg", price: 850, meta: "Earrings" },
      { name: "Sky Daisy Heart Drops", image: "images/earring-4.jpeg", price: 850, meta: "Earrings" },
      { name: "Ruby Petal Heart Drops", image: "images/earring-5.jpeg", price: 850, meta: "Earrings" },
      { name: "Pink Lace Heart Drops", image: "images/earring-6.jpeg", price: 850, meta: "Earrings" },
      { name: "Teal Lace Heart Drops", image: "images/earring-7.jpeg", price: 850, meta: "Earrings" },
      { name: "Golden Lace Heart Drops", image: "images/earring-8.jpeg", price: 850, meta: "Earrings" },
      { name: "Sunny Daisy Heart Drops", image: "images/earring-9.jpeg", price: 850, meta: "Earrings" },
      { name: "Sage Lace Heart Drops", image: "images/earring-10.jpeg", price: 850, meta: "Earrings" },
      { name: "Rosewater Heart Drops", image: "images/earring-11.jpeg", price: 850, meta: "Earrings" },
      { name: "Blue Daisy Heart Drops", image: "images/earring-12.jpeg", price: 850, meta: "Earrings" },
      { name: "Midnight Heart Drops", image: "images/earring-13.jpeg", price: 850, meta: "Earrings" },
      { name: "Olive Daisy Heart Drops", image: "images/earring-14.jpeg", price: 850, meta: "Earrings" },
      { name: "Blush Teardrop Drops", image: "images/earring-15.jpeg", price: 550, meta: "Earrings" },
      { name: "Forget-Me-Not Drops", image: "images/earring-16.jpeg", price: 550, meta: "Earrings" },
      { name: "Rosy Round Drops", image: "images/earring-17.jpeg", price: 550, meta: "Earrings" },
      { name: "Emerald Round Drops", image: "images/earring-18.jpeg", price: 550, meta: "Earrings" },
      { name: "Midnight Daisy Drops", image: "images/earring-19.jpeg", price: 650, meta: "Earrings" },
    ],
  },
  pendants: {
    title: "Pendants",
    blurb:
      "Little wearable worlds — flowers and pigment set in glassy resin, hung on tarnish-resistant chains.",
    items: [
      { name: "Ruby Gold Pendant", image: "images/pendant-1.png", price: 1000, meta: "Stainless steel chain", badge: "Bestseller" },
      { name: "Sage Blossom Pendant", image: "images/pendant-2.png", price: 1000, meta: "Stainless steel chain" },
      { name: "Magenta Blossom Pendant", image: "images/pendant-3.png", price: 1000, meta: "Stainless steel chain" },
      { name: "Violet Ring Pendant", image: "images/pendant-4.png", price: 1000, meta: "Stainless steel chain" },
      { name: "Golden Daisy Pendant", image: "images/pendant-5.png", price: 1000, meta: "Stainless steel chain" },
    ],
  },
  rings: {
    title: "Rings",
    blurb:
      "Adjustable resin rings with pearl flecks, petals, and pigment — one-of-a-kind little statements.",
    items: [
      { name: "Wildflower Gold Ring", image: "images/ring-1.jpeg", price: 480, meta: "Ring" },
      { name: "Garden Leaf Ring", image: "images/ring-2.jpeg", price: 480, meta: "Ring" },
      { name: "Baby's Breath Ring", image: "images/ring-3.jpeg", price: 480, meta: "Ring" },
      { name: "Midnight Rose Ring", image: "images/ring-4.jpeg", price: 480, meta: "Ring" },
    ],
  },
  keychains: {
    title: "Keychains",
    blurb:
      "Carry a little colour everywhere — sturdy resin keychains with florals, glitter, and gold accents.",
    items: [
      { name: "Blush Initial Keychain", image: "images/keychain.png", price: 500, meta: "Keychain" },
    ],
  },
  bangles: {
    title: "Bangles",
    blurb:
      "Statement resin bangles — blossoms and gold leaf suspended in glossy, durable resin.",
    items: [
      {
        name: "Plum Blossom Bangle",
        image: "images/bangles-1.png",
        price: 800,
        meta: "Bangle",
        badge: "New",
        tiers: [
          { qty: 1, price: 800, label: "1 Bangle" },
          { qty: 2, price: 1450, label: "2 Bangles" },
          { qty: 4, price: 2800, label: "4 Bangles" },
        ],
      },
      {
        name: "Crimson Rose Gold Bangle",
        image: "images/bangles-2.jpeg",
        price: 800,
        meta: "Bangle",
        tiers: [
          { qty: 1, price: 800, label: "1 Bangle" },
          { qty: 2, price: 1450, label: "2 Bangles" },
          { qty: 4, price: 2800, label: "4 Bangles" },
        ],
      },
      {
        name: "Onyx Gold Leaf Bangle",
        image: "images/bangles-3.jpeg",
        price: 800,
        meta: "Bangle",
        tiers: [
          { qty: 1, price: 800, label: "1 Bangle" },
          { qty: 2, price: 1450, label: "2 Bangles" },
          { qty: 4, price: 2800, label: "4 Bangles" },
        ],
      },
      {
        name: "Golden Meadow Bangle",
        image: "images/bangles-4.jpeg",
        price: 800,
        meta: "Bangle",
        tiers: [
          { qty: 1, price: 800, label: "1 Bangle" },
          { qty: 2, price: 1450, label: "2 Bangles" },
          { qty: 4, price: 2800, label: "4 Bangles" },
        ],
      },
    ],
  },
  jhumka: {
    title: "Jhumka",
    blurb:
      "Resin jhumkas with traditional silver bells and a modern floral twist — festive and feather-light.",
    items: [
      { name: "Meadow Jhumka", image: "images/jhumka-1.png", price: 2500, meta: "Jhumka" },
      { name: "Celestia Jhumka", image: "images/jhumka-2.png", price: 2500, meta: "Jhumka", badge: "Bestseller" },
      { name: "Aurora Jhumka", image: "images/jhumka-3.png", price: 2500, meta: "Jhumka" },
      { name: "Tide Pool Jhumka", image: "images/jhumka-4.jpeg", price: 2500, meta: "Jhumka" },
      { name: "Goldleaf Jhumka", image: "images/jhumka-5.png", price: 2500, meta: "Jhumka" },
      { name: "Petal Jhumka", image: "images/jhumka-6.png", price: 2500, meta: "Jhumka" },
      { name: "Midnight Rose Jhumka", image: "images/jhumka-7.png", price: 2500, meta: "Jhumka" },
      { name: "Sunny Daisy Jhumka", image: "images/Jhumka-8.jpeg", price: 2500, meta: "Jhumka" },
      { name: "Mosaic Bloom Jhumka", image: "images/Jhumka-9.jpeg", price: 2500, meta: "Jhumka" },
      { name: "Blush Daisy Jhumka", image: "images/jhumka-10.jpeg", price: 2500, meta: "Jhumka" },
    ],
  },
  "mini-jhumka": {
    title: "Mini Jhumka",
    blurb:
      "Everyday-sized jhumkas — the same resin blooms and silver bells, scaled down for daily wear.",
    items: [
      { name: "Mini Daisy Bloom Jhumka", image: "images/mini-2.png", price: 1250, meta: "Mini Jhumka" },
      { name: "Mini Sky Daisy Jhumka", image: "images/mini-3.jpeg", price: 1250, meta: "Mini Jhumka" },
      { name: "Mini Ruby Bloom Jhumka", image: "images/mini-1.png", price: 1500, meta: "Mini Jhumka" },
      { name: "Mini Blossom Jhumka", image: "images/mini-4.png", price: 1250, meta: "Mini Jhumka", badge: "New" },
      { name: "Mini Garnet Jhumka", image: "images/mini-5.png", price: 1250, meta: "Mini Jhumka" },
      { name: "Blush Bloom Mini Jhumka", image: "images/mini-6.png", price: 1250, meta: "Mini Jhumka" },
      { name: "Coral Bloom Mini Jhumka", image: "images/mini-7.png", price: 1250, meta: "Mini Jhumka" },
      { name: "Midnight Bloom Mini Jhumka", image: "images/mini-8.png", price: 1250, meta: "Mini Jhumka" },
      { name: "Teal Stone Mini Jhumka", image: "images/mini-9.jpeg", price: 1250, meta: "Mini Jhumka" },
      { name: "Lilac Bloom Mini Jhumka", image: "images/mini-10.jpeg", price: 1250, meta: "Mini Jhumka" },
    ],
  },
  accessories: {
    title: "Other Accessories",
    blurb:
      "The little extras — hair clips, brooches, and trinkets, each poured and finished by hand.",
    items: [
      { name: "Stardust Glitter Pen", image: "images/accessory-1.jpeg", price: 550, meta: "Accessory" },
      { name: "Blossom Hair Clip Duo", image: "images/accessory-2.png", price: 380, meta: "Set of 2", badge: "New" },
    ],
  },
};
