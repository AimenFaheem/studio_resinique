// ===== Studio Resinique — product catalog (per category) =====
// Add / edit products here. Each category page (category.html?cat=slug)
// reads from this object. Prices are plain numbers in PKR.
const CATALOG = {
  earrings: {
    title: "Earrings",
    blurb:
      "Hand-poured resin earrings — pressed petals, swirls of colour, and skin-friendly findings made to wear every day.",
    items: [
      { name: "Daisy Heart Drops", image: "images/earrings-1.png", price: 1200, meta: "Earrings" },
      { name: "Meadow Hearts", image: "images/earrings-2.png", price: 1650, meta: "Earrings", badge: "New" },
      { name: "Sunlit Danglers", image: "images/earrings-3.png", price: 1500, meta: "Earrings" },
      { name: "Dainty Drops", image: "images/earrings-4.png", price: 1800, meta: "Earrings" },
      { name: "Rose Heart Drops", image: "images/product-1.jpeg", price: 1350, meta: "Earrings" },
      { name: "Marigold Drops", image: "images/product-2.jpeg", price: 1100, meta: "Earrings" },
      { name: "Flutter Studs", image: "images/product-4.jpeg", price: 450, meta: "Earrings" },
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
      { name: "Blush Initial Keychain", image: "images/keychain.png", price: 850, meta: "Keychain" },
      { name: "Meadow Keychain", image: "images/product-1.jpeg", price: 950, meta: "Keychain" },
      { name: "Rosewater Charm", image: "images/product-5.jpeg", price: 800, meta: "Keychain" },
      { name: "Goldleaf Keychain", image: "images/jhumka-4.jpeg", price: 900, meta: "Keychain" },
      { name: "Tide Pool Charm", image: "images/product-6.jpeg", price: 880, meta: "Keychain", badge: "New" },
      { name: "Petal Keychain", image: "images/product-2.jpeg", price: 820, meta: "Keychain" },
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
      { name: "Petal Hair Clip", image: "images/product-8.jpeg", price: 1100, meta: "Accessory" },
      { name: "Honey Glow Brooch", image: "images/product-4.jpeg", price: 1250, meta: "Accessory" },
      { name: "Goldleaf Pin", image: "images/jhumka-4.jpeg", price: 1050, meta: "Accessory" },
      { name: "Rosewater Clip", image: "images/product-5.jpeg", price: 1150, meta: "Accessory", badge: "New" },
      { name: "Aurora Trinket", image: "images/product-9.jpeg", price: 1300, meta: "Accessory" },
      { name: "Celestia Brooch", image: "images/jhumka-5.png", price: 1400, meta: "Accessory" },
    ],
  },
};
