// src/productsData.js

// Import all existing images from assets folder
import galaxyImage from "./assets/Samsung-Galaxy-S24-FE.jpg";
import mixer from "./assets/612C-F6hKCL._AC_SL1500_.jpg";
import sunglassesImage from "./assets/a-pair-of-sunglasses-on-a-towel-photo.jpeg";
import roseHairOilImage from "./assets/rose-hair-oil-natural-products-french-girl-848.webp";
import cookwareSetImage from "./assets/the-best-cookware-sets-for-busy-kitchens-hero.jpg";
import modernSofaImage from "./assets/2_c32d5f1a-ea18-4ef7-90bc-e96f0a58366a.jpg";
import shoesImage from "./assets/cb96364a-28d1-418d-80e9-e81eea291e70.jpg";
import smartwatchImage from "./assets/g6cEh4MumgB8V7qrZwi5Nc.jpg";
import wirelessChargerImage from "./assets/20W-Wireless-Charger-_2_1080x.jpg";

// Note: For id 7 (bag) and id 10 (jacket), we reuse existing images temporarily.
// You can replace them later when you add the real bag and jacket photos.

const products = [
  {
    id: 1,
    title: "Samsung Galaxy S24 FE",
    price: 18999,
    rating: 4.7,
    image: galaxyImage,
    category: "Electronics",
    description: "Experience the perfect blend of premium performance and elegant design with the Samsung Galaxy S24 FE. Featuring a stunning Dynamic AMOLED display, professional-grade camera system, and powerful Snapdragon processor.",
    stock: 15,
    sku: "SKU-001-2025",
    specifications: ["6.7\" Dynamic AMOLED Display", "50MP Main Camera", "Snapdragon Processor", "4700mAh Battery"]
  },
  {
    id: 2,
    title: "Electric Hand Mixer 7-Speed",
    price: 1249,
    rating: 4.5,
    image: mixer,
    category: "Electronics",
    description: "Compact and powerful 7-speed electric hand mixer with stainless steel beaters and dough hooks. Ideal for whipping, mixing, and beating ingredients quickly and effortlessly.",
  },
  {
    id: 3,
    title: "Stylish Sunglasses",
    price: 299,
    rating: 4.3,
    image: sunglassesImage,
    category: "Fashion",
    description: "Trendy and elegant sunglasses that offer full UV400 protection while making a sophisticated fashion statement. Lightweight frame and polarized lenses for maximum comfort and style.",
    stock: 45,
    sku: "SKU-003-2025",
    specifications: ["UV400 Protection", "Polarized Lenses", "Lightweight Frame"]
  },
  {
    id: 4,
    title: "Rose Hair Oil 100ml",
    price: 189,
    rating: 4.8,
    image: roseHairOilImage,
    category: "Beauty",
    description: "Luxurious natural rose hair oil that deeply nourishes and repairs hair, adding natural shine, reducing frizz, and helping prevent hair fall. Ideal for all hair types.",
    stock: 60,
    sku: "SKU-004-2025",
    specifications: ["100% Natural Ingredients", "Paraben-Free", "100ml Bottle"]
  },
  {
    id: 5,
    title: "Non-Stick Cookware Set",
    price: 899,
    rating: 4.6,
    image: cookwareSetImage,
    category: "Home & Kitchen",
    description: "High-quality non-stick cookware set designed for healthy everyday cooking. Easy to clean, durable, and perfect for busy kitchens.",
    stock: 12,
    sku: "SKU-005-2025",
    specifications: ["5-Piece Set", "Non-Stick Coating", "Oven Safe up to 180°C"]
  },
  {
    id: 6,
    title: "Modern 3-Seater Sofa",
    price: 2499,
    rating: 4.4,
    image: modernSofaImage,
    category: "Home & Kitchen",
    description: "Stylish and comfortable 3-seater sofa with a modern minimalist design. Perfect for living rooms, offering both elegance and everyday practicality.",
    stock: 8,
    sku: "SKU-006-2025",
    specifications: ["Premium Fabric Upholstery", "Sturdy Wooden Frame", "Modern Design"]
  },
  {
  id: 7,
  title: "Casual Men's Sneakers",
  price: 749,
  rating: 4.5,
  image: shoesImage,
  category: "Fashion",
  description: "Comfortable and stylish casual men's sneakers designed for all-day wear. Featuring a modern sporty look, breathable upper material, excellent cushioning, and a durable rubber sole for superior grip and comfort.",
  stock: 35,
  sku: "SKU-007-2025",
  specifications: [
    "Breathable mesh and synthetic upper",
    "Soft cushioned insole",
    "Durable anti-slip rubber sole",
    "Lightweight and flexible design"
  ]
},
  {
    id: 8,
    title: "Smart Watch Ultra",
    price: 2499,
    rating: 4.4,
    image: smartwatchImage,
    category: "Electronics",
    description: "Advanced smartwatch with comprehensive health and fitness tracking, vibrant AMOLED display, and long battery life. The perfect companion for an active lifestyle.",
    stock: 22,
    sku: "SKU-008-2025",
    specifications: ["AMOLED Display", "Fitness & Health Tracking", "Water Resistant", "Long Battery Life"]
  },
  {
    id: 9,
    title: "Wireless Charger 20W",
    price: 24,
    rating: 4.3,
    image: wirelessChargerImage,
    category: "Electronics",
    description: "Fast 20W wireless charger with a sleek and compact design. Compatible with iPhone, Samsung, and other Qi-enabled devices for convenient cable-free charging.",
    stock: 40,
    sku: "SKU-009-2025",
    specifications: ["20W Fast Charging", "Qi Compatible", "Sleek Minimal Design"]
  },
  {
    id: 10,
    title: "Men's Denim Jacket",
    price: 899,
    rating: 4.6,
    image: shoesImage,           // ← Temporary (replace with real jacket image later)
    category: "Fashion",
    description: "Classic men's denim jacket that delivers timeless style and all-day comfort. Made from durable high-quality denim with multiple functional pockets.",
    stock: 25,
    sku: "SKU-010-2025",
    specifications: ["Premium Denim Fabric", "Classic Fit", "Multiple Pockets"]
  },
  {
    id: 11,
    title: "Organic Face Serum",
    price: 329,
    rating: 4.7,
    image: roseHairOilImage,
    category: "Beauty",
    description: "100% organic face serum that deeply hydrates the skin, improves elasticity, and helps reduce fine lines and signs of aging for a radiant, youthful glow.",
    stock: 30,
    sku: "SKU-011-2025",
    specifications: ["100% Organic Ingredients", "Chemical-Free", "30ml Bottle"]
  },
  {
    id: 12,
    title: "Stainless Steel Pan Set",
    price: 649,
    rating: 4.4,
    image: cookwareSetImage,
    category: "Home & Kitchen",
    description: "Professional-grade stainless steel pan set that delivers even heat distribution and excellent cooking performance. Easy to clean and built to last.",
    stock: 20,
    sku: "SKU-012-2025",
    specifications: ["3-Piece Set", "Thick Base", "Even Heat Distribution"]
  }
];

export default products;