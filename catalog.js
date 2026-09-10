// ===== Studio Resinique — product catalog (per category) =====
// Add / edit products here. Each category page (category.html?cat=slug)
// reads from this object. Prices are plain numbers in PKR.
const CATALOG = {
  earrings: {
    title: "Earrings",
    blurb:
      "Hand-poured resin earrings — pressed petals, swirls of colour, and skin-friendly findings made to wear every day.",
    items: [
      { name: "Daisy Heart Drops", image: "images/earrings-1.png", price: 1200, meta: "Pressed daisy · silver bells" },
      { name: "Meadow Heart Drops", image: "images/earrings-2.png", price: 1650, meta: "Pressed wildflower · silver bells", badge: "New" },
      { name: "Sunlit Heart Danglers", image: "images/earrings-3.png", price: 1500, meta: "Pressed sunflower · silver bells" },
      { name: "Dainty Bloom Drops", image: "images/earrings-4.png", price: 1800, meta: "Single pressed bloom · silver bells" },
      { name: "Rose Heart Drops", image: "images/product-1.jpeg", price: 1350, meta: "Pressed rose · silver bells" },
      { name: "Marigold Halo Drops", image: "images/product-2.jpeg", price: 1100, meta: "Pressed marigold · silver bells" },
      { name: "Mini Flutter Earrings", image: "images/product-4.jpeg", price: 450, meta: "Resin butterfly · silver post" },
    ],
  },
  pendants: {
    title: "Pendants",
    blurb:
      "Little wearable worlds — flowers and pigment set in glassy resin, hung on tarnish-resistant chains.",
    items: [
      { name: "Tide Pool Pendant", image: "images/product-6.jpeg", price: 1800, meta: "Ocean swirl · sterling chain", badge: "Bestseller" },
      { name: "Goldleaf Pendant", image: "images/product-3.jpeg", price: 1500, meta: "Real gold leaf · sterling" },
      { name: "Meadow Locket", image: "images/product-1.jpeg", price: 1950, meta: "Pressed wildflowers · sterling" },
      { name: "Petal & Gold Pendant", image: "images/product-8.jpeg", price: 1800, meta: "Pressed petal · gold-fill" },
      { name: "Dusk Halo Pendant", image: "images/product-7.jpeg", price: 2100, meta: "Midnight resin · silver" },
      { name: "Rosewater Drop", image: "images/product-5.jpeg", price: 1600, meta: "Blush bloom · gold leaf" },
    ],
  },
  rings: {
    title: "Rings",
    blurb:
      "Adjustable resin rings with pearl flecks, petals, and pigment — one-of-a-kind little statements.",
    items: [
      { name: "Lilac Haze Ring", image: "images/product-2.jpeg", price: 900, meta: "Adjustable · pearl fleck" },
      { name: "Petal & Gold Ring", image: "images/product-8.jpeg", price: 1100, meta: "Pressed petal · gold-fill" },
      { name: "Rosewater Ring", image: "images/product-5.jpeg", price: 1000, meta: "Blush bloom · adjustable" },
      { name: "Aurora Ring", image: "images/product-9.jpeg", price: 1250, meta: "Iridescent swirl", badge: "New" },
      { name: "Meadow Ring", image: "images/product-1.jpeg", price: 1050, meta: "Wildflower · adjustable" },
      { name: "Honey Glow Ring", image: "images/product-4.jpeg", price: 980, meta: "Marigold fleck · gold-fill" },
    ],
  },
  keychains: {
    title: "Keychains",
    blurb:
      "Carry a little colour everywhere — sturdy resin keychains with florals, glitter, and gold accents.",
    items: [
      { name: "Blush Initial Keychain", image: "images/keychain.png", price: 850, meta: "Pressed petals · gold leaf · initial letter" },
      { name: "Meadow Keychain", image: "images/product-1.jpeg", price: 950, meta: "Pressed wildflowers" },
      { name: "Rosewater Charm", image: "images/product-5.jpeg", price: 800, meta: "Blush bloom · gold leaf" },
      { name: "Goldleaf Keychain", image: "images/product-3.jpeg", price: 900, meta: "Real gold leaf" },
      { name: "Tide Pool Charm", image: "images/product-6.jpeg", price: 880, meta: "Ocean swirl", badge: "New" },
      { name: "Petal Keychain", image: "images/product-2.jpeg", price: 820, meta: "Pressed petal · gold ring" },
    ],
  },
  bangles: {
    title: "Bangles",
    blurb:
      "Statement resin bangles — blossoms and gold leaf suspended in glossy, durable resin.",
    items: [
      { name: "Rosewater Bangle", image: "images/product-5.jpeg", price: 1750, meta: "Blush bloom · gold leaf", badge: "New" },
      { name: "Meadow Bangle", image: "images/product-2.jpeg", price: 1850, meta: "Pressed wildflowers" },
      { name: "Honey Glow Bangle", image: "images/product-4.jpeg", price: 1700, meta: "Marigold · gold leaf" },
      { name: "Celestia Bangle", image: "images/product-7.jpeg", price: 2200, meta: "Midnight resin · silver" },
      { name: "Petal Cuff", image: "images/product-8.jpeg", price: 1900, meta: "Pressed petal · gold-fill" },
      { name: "Meadow Locket Bangle", image: "images/product-1.jpeg", price: 1950, meta: "Wildflower · adjustable" },
    ],
  },
  jhumka: {
    title: "Jhumka",
    blurb:
      "Resin jhumkas with traditional silver bells and a modern floral twist — festive and feather-light.",
    items: [
      { name: "Meadow Jhumka", image: "images/jhumka-1.png", price: 2200, meta: "Pressed flowers · silver bells" },
      { name: "Celestia Jhumka", image: "images/jhumka-2.png", price: 2400, meta: "Midnight resin · silver bells", badge: "Bestseller" },
      { name: "Aurora Jhumka", image: "images/jhumka-3.png", price: 2300, meta: "Iridescent swirl · silver" },
      { name: "Tide Pool Jhumka", image: "images/jhumka-4.jpeg", price: 2150, meta: "Ocean swirl · silver bells" },
      { name: "Goldleaf Jhumka", image: "images/jhumka-5.png", price: 2250, meta: "Real gold leaf · silver" },
      { name: "Petal Jhumka", image: "images/jhumka-6.png", price: 2000, meta: "Pressed petal · silver bells" },
    ],
  },
  "mini-jhumka": {
    title: "Mini Jhumka",
    blurb:
      "Everyday-sized jhumkas — the same resin blooms and silver bells, scaled down for daily wear.",
    items: [
      { name: "Mini Meadow Jhumka", image: "images/product-7.jpeg", price: 1450, meta: "Pressed flowers · silver bells" },
      { name: "Mini Petal Jhumka", image: "images/product-2.jpeg", price: 1300, meta: "Pressed petal · silver bells" },
      { name: "Mini Goldleaf Jhumka", image: "images/product-3.jpeg", price: 1400, meta: "Real gold leaf · silver" },
      { name: "Mini Tide Pool Jhumka", image: "images/product-6.jpeg", price: 1350, meta: "Ocean swirl · silver bells", badge: "New" },
      { name: "Mini Aurora Jhumka", image: "images/product-9.jpeg", price: 1400, meta: "Iridescent swirl · silver" },
      { name: "Mini Rosewater Jhumka", image: "images/product-5.jpeg", price: 1250, meta: "Blush bloom · silver bells" },
    ],
  },
  accessories: {
    title: "Other Accessories",
    blurb:
      "The little extras — hair clips, brooches, and trinkets, each poured and finished by hand.",
    items: [
      { name: "Petal Hair Clip", image: "images/product-8.jpeg", price: 1100, meta: "Pressed petal · gold-tone" },
      { name: "Honey Glow Brooch", image: "images/product-4.jpeg", price: 1250, meta: "Marigold · gold-fill" },
      { name: "Goldleaf Pin", image: "images/product-3.jpeg", price: 1050, meta: "Real gold leaf" },
      { name: "Rosewater Clip", image: "images/product-5.jpeg", price: 1150, meta: "Blush bloom · gold leaf", badge: "New" },
      { name: "Aurora Trinket", image: "images/product-9.jpeg", price: 1300, meta: "Iridescent swirl" },
      { name: "Celestia Brooch", image: "images/product-7.jpeg", price: 1400, meta: "Midnight resin · silver" },
    ],
  },
};
