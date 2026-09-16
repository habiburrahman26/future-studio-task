// generate-products.js
const fs = require("fs");
const path = require("path");

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Sports & Outdoors",
  "Beauty & Personal Care",
  "Books",
  "Toys & Games",
  "Automotive",
  "Health",
  "Jewelry",
];

const BRANDS = [
  "Apple", "Samsung", "Nike", "Adidas", "Sony", "LG", "Dell", "HP",
  "Canon", "Bose", "Puma", "Under Armour", "Xiaomi", "OnePlus", "Lenovo",
  "Asus", "Microsoft", "Google", "Amazon Basics", "IKEA",
];

const ADJECTIVES = [
  "Premium", "Ultra", "Pro", "Smart", "Wireless", "Portable", "Ergonomic",
  "Lightweight", "Durable", "Compact", "High-Performance", "Eco-Friendly",
  "Luxury", "Classic", "Modern", "Advanced", "Professional", "Essential",
];

const PRODUCT_TYPES = {
  Electronics: ["Smartphone", "Laptop", "Headphones", "Tablet", "Smartwatch", "Camera", "Speaker", "Monitor", "Keyboard", "Mouse"],
  Clothing: ["T-Shirt", "Jeans", "Hoodie", "Jacket", "Sneakers", "Dress", "Shorts", "Sweater", "Cap", "Socks"],
  "Home & Kitchen": ["Blender", "Coffee Maker", "Air Fryer", "Vacuum Cleaner", "Cookware Set", "Lamp", "Pillow", "Towel Set", "Storage Box", "Knife Set"],
  "Sports & Outdoors": ["Yoga Mat", "Dumbbells", "Running Shoes", "Bicycle", "Tent", "Backpack", "Water Bottle", "Fitness Tracker", "Resistance Bands", "Camping Chair"],
  "Beauty & Personal Care": ["Face Cream", "Shampoo", "Perfume", "Hair Dryer", "Electric Toothbrush", "Makeup Kit", "Serum", "Body Lotion", "Razor", "Sunscreen"],
  Books: ["Fiction Novel", "Self-Help Book", "Cookbook", "Biography", "Science Book", "History Book", "Children's Book", "Poetry Collection", "Business Book", "Travel Guide"],
  "Toys & Games": ["Action Figure", "Board Game", "Puzzle", "Building Blocks", "Remote Control Car", "Doll", "Educational Toy", "Card Game", "Plush Toy", "STEM Kit"],
  Automotive: ["Car Phone Mount", "Dash Cam", "Car Vacuum", "Tire Inflator", "Jump Starter", "Seat Cover", "Air Freshener", "Car Charger", "Floor Mats", "LED Lights"],
  Health: ["Vitamin Supplement", "Protein Powder", "Massage Gun", "Blood Pressure Monitor", "Thermometer", "First Aid Kit", "Resistance Band Set", "Foam Roller", "Sleep Mask", "Essential Oil Diffuser"],
  Jewelry: ["Necklace", "Bracelet", "Earrings", "Ring", "Watch", "Anklet", "Cufflinks", "Brooch", "Pendant", "Chain"],
};

const IMAGE_BASE = "https://picsum.photos/seed"; // free placeholder images

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 2) {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

function generateProduct(id) {
  const category = randomItem(CATEGORIES);
  const type = randomItem(PRODUCT_TYPES[category]);
  const brand = randomItem(BRANDS);
  const adjective = randomItem(ADJECTIVES);

  const name = `${adjective} ${brand} ${type}`;
  const price = randomFloat(9.99, 1299.99);
  const rating = randomFloat(3.0, 5.0, 1);
  const stock = randomInt(0, 250);
  const reviewCount = randomInt(5, 850);

  // Generate 3 images with unique seeds
  const images = [
    `${IMAGE_BASE}/${id}-1/600/600`,
    `${IMAGE_BASE}/${id}-2/600/600`,
    `${IMAGE_BASE}/${id}-3/600/600`,
  ];

  const description = `Experience the ${adjective.toLowerCase()} quality of the ${name}. Designed for everyday use with excellent performance and style. Perfect for anyone looking for a reliable ${type.toLowerCase()} in the ${category} category.`;

  return {
    id: String(id),
    name,
    description,
    price,
    category,
    brand,
    rating,
    reviewCount,
    stock,
    images,
    tags: [category.toLowerCase(), type.toLowerCase(), brand.toLowerCase()],
    createdAt: new Date(Date.now() - randomInt(0, 365 * 24 * 60 * 60 * 1000)).toISOString(),
  };
}

function generateProducts(count = 520) {
  const products = [];
  for (let i = 1; i <= count; i++) {
    products.push(generateProduct(i));
  }
  return products;
}

// ========== RUN ==========
const products = generateProducts(520);

const outputDir = path.join(__dirname, "data");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, "products.json");
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));

console.log(`✅ Successfully generated ${products.length} products`);
console.log(`📁 Saved to: ${outputPath}`);