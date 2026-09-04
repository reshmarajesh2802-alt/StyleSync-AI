const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  // =====================================================
  // 👗 WOMEN'S DRESSES
  // =====================================================

  {
    name: "Floral Summer Dress",
    description:
      "Elegant floral midi dress perfect for casual outings and summer occasions.",
    price: 1299,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    rating: 4.6,
    stock: 20,
    isFeatured: true,
  },

  {
    name: "Satin Party Dress",
    description:
      "Sophisticated satin dress designed for evening parties and celebrations.",
    price: 2299,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae",
    rating: 4.8,
    stock: 10,
    isFeatured: true,
  },

  {
    name: "Elegant Black Evening Dress",
    description:
      "Classic black evening dress with a sophisticated silhouette for special occasions.",
    price: 2499,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae",
    rating: 4.7,
    stock: 12,
    isFeatured: true,
  },

  {
    name: "Pastel Midi Dress",
    description:
      "Soft pastel midi dress with a feminine design, perfect for brunches and daytime events.",
    price: 1599,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    rating: 4.5,
    stock: 18,
    isFeatured: false,
  },

  {
    name: "Floral Wrap Dress",
    description:
      "Beautiful floral wrap dress designed for a comfortable and flattering fit.",
    price: 1399,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    rating: 4.6,
    stock: 15,
    isFeatured: true,
  },

  {
    name: "Elegant Red Cocktail Dress",
    description:
      "Stylish red cocktail dress perfect for parties, celebrations and evening occasions.",
    price: 2199,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
    rating: 4.8,
    stock: 9,
    isFeatured: true,
  },

  {
    name: "Lavender Floral Dress",
    description:
      "Charming lavender floral dress with a relaxed feminine silhouette.",
    price: 1499,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3",
    rating: 4.5,
    stock: 16,
    isFeatured: false,
  },

  {
    name: "Chic White Summer Dress",
    description:
      "Minimal white summer dress designed for a fresh and elegant look.",
    price: 1699,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
    rating: 4.6,
    stock: 14,
    isFeatured: true,
  },

  {
    name: "Pleated Maxi Dress",
    description:
      "Elegant pleated maxi dress suitable for dinners, celebrations and special occasions.",
    price: 1999,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    rating: 4.7,
    stock: 11,
    isFeatured: true,
  },

  {
    name: "Floral Casual Maxi Dress",
    description:
      "Comfortable floral maxi dress for relaxed weekends and casual outings.",
    price: 1799,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    rating: 4.5,
    stock: 17,
    isFeatured: false,
  },

  {
    name: "Pink Party Dress",
    description:
      "Feminine pink party dress designed for celebrations and evening events.",
    price: 1899,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
    rating: 4.7,
    stock: 13,
    isFeatured: true,
  },

  {
    name: "Champagne Satin Dress",
    description:
      "Luxurious champagne satin dress with an elegant evening look.",
    price: 2699,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    rating: 4.8,
    stock: 8,
    isFeatured: true,
  },

  // =====================================================
  // 👚 WOMEN'S TOPS
  // =====================================================

  {
    name: "Classic White Top",
    description:
      "Minimal white top designed for effortless everyday styling.",
    price: 799,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    rating: 4.5,
    stock: 25,
    isFeatured: true,
  },

  {
    name: "Beige Casual Shirt",
    description:
      "Versatile beige shirt that works perfectly with jeans, trousers or skirts.",
    price: 899,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab",
    rating: 4.3,
    stock: 22,
    isFeatured: false,
  },

  {
    name: "Satin Blouse",
    description:
      "Elegant satin blouse suitable for both office outfits and evening styling.",
    price: 1099,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
    rating: 4.6,
    stock: 18,
    isFeatured: true,
  },

  {
    name: "Pastel Crop Top",
    description:
      "Trendy pastel crop top designed for casual and youthful outfits.",
    price: 699,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992",
    rating: 4.4,
    stock: 30,
    isFeatured: false,
  },

  {
    name: "Floral Blouse",
    description:
      "Pretty floral blouse that adds a feminine touch to everyday outfits.",
    price: 949,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
    rating: 4.6,
    stock: 20,
    isFeatured: true,
  },

  // =====================================================
  // 👖 WOMEN'S BOTTOMS
  // =====================================================

  {
    name: "Relaxed Fit Jeans",
    description:
      "Comfortable relaxed-fit jeans designed for everyday wear.",
    price: 1499,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    rating: 4.4,
    stock: 30,
    isFeatured: false,
  },

  {
    name: "High Waist Blue Jeans",
    description:
      "Classic high-waisted jeans with a flattering fit for everyday styling.",
    price: 1599,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    rating: 4.6,
    stock: 25,
    isFeatured: true,
  },

  {
    name: "Wide Leg Trousers",
    description:
      "Elegant wide-leg trousers perfect for modern office and casual outfits.",
    price: 1399,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
    rating: 4.5,
    stock: 20,
    isFeatured: false,
  },

  {
    name: "Pleated Midi Skirt",
    description:
      "Elegant pleated skirt that pairs beautifully with tops and blouses.",
    price: 1199,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d27",
    rating: 4.7,
    stock: 16,
    isFeatured: true,
  },

  // =====================================================
  // 🧥 WOMEN'S JACKETS
  // =====================================================

  {
    name: "Oversized Denim Jacket",
    description:
      "Trendy oversized denim jacket that adds a streetwear edge to any outfit.",
    price: 1899,
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2",
    rating: 4.7,
    stock: 15,
    isFeatured: true,
  },

  {
    name: "Cropped Beige Jacket",
    description:
      "Stylish cropped jacket designed for layering over casual and semi-formal outfits.",
    price: 1799,
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1548624313-0396c75ce8f7",
    rating: 4.5,
    stock: 14,
    isFeatured: false,
  },

  // =====================================================
  // 👠 WOMEN'S FOOTWEAR
  // =====================================================

  {
    name: "Elegant Heels",
    description:
      "Classic heels designed for parties, celebrations and special occasions.",
    price: 1799,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
    rating: 4.6,
    stock: 12,
    isFeatured: true,
  },

  {
    name: "Classic Nude Heels",
    description:
      "Timeless nude heels that complement dresses and formal outfits.",
    price: 1699,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f",
    rating: 4.7,
    stock: 15,
    isFeatured: true,
  },

  {
    name: "White Casual Sneakers",
    description:
      "Comfortable white sneakers perfect for everyday casual outfits.",
    price: 1499,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    rating: 4.6,
    stock: 25,
    isFeatured: false,
  },

  // =====================================================
  // 👜 WOMEN'S ACCESSORIES
  // =====================================================

  {
    name: "Minimal Shoulder Bag",
    description:
      "A stylish everyday shoulder bag with a clean and modern design.",
    price: 999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    rating: 4.5,
    stock: 18,
    isFeatured: false,
  },

  {
    name: "Elegant Pearl Necklace",
    description:
      "Delicate pearl necklace designed to complement elegant and formal outfits.",
    price: 799,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    rating: 4.7,
    stock: 20,
    isFeatured: true,
  },

  {
    name: "Classic Sunglasses",
    description:
      "Stylish sunglasses with a timeless design for everyday wear.",
    price: 699,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    rating: 4.5,
    stock: 24,
    isFeatured: false,
  },

  // =====================================================
  // 💄 LIPSTICKS
  // =====================================================

  {
    name: "Velvet Matte Lipstick - Rose",
    description:
      "Long-lasting matte lipstick with a smooth velvet finish in a beautiful rose shade.",
    price: 599,
    category: "Lipsticks",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
    rating: 4.7,
    stock: 25,
    isFeatured: true,
  },

  {
    name: "Nude Glow Lipstick",
    description:
      "Soft nude lipstick perfect for everyday makeup and natural looks.",
    price: 549,
    category: "Lipsticks",
    image:
      "https://images.unsplash.com/photo-1591360236480-4ed861025fa1",
    rating: 4.6,
    stock: 30,
    isFeatured: false,
  },

  {
    name: "Berry Red Lipstick",
    description:
      "Rich berry-red lipstick designed for bold evening and party looks.",
    price: 649,
    category: "Lipsticks",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
    rating: 4.8,
    stock: 20,
    isFeatured: true,
  },

  {
    name: "Soft Pink Lip Gloss",
    description:
      "Glossy pink lip color that adds a soft shine to everyday makeup.",
    price: 499,
    category: "Lipsticks",
    image:
      "https://images.unsplash.com/photo-1591360236480-4ed861025fa1",
    rating: 4.5,
    stock: 28,
    isFeatured: false,
  },

  // =====================================================
  // ✨ FOUNDATION
  // =====================================================

  {
    name: "Hydrating Liquid Foundation",
    description:
      "Lightweight buildable foundation providing smooth coverage with a natural finish.",
    price: 899,
    category: "Foundation",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    rating: 4.5,
    stock: 20,
    isFeatured: true,
  },

  {
    name: "Radiant Skin Foundation",
    description:
      "Medium coverage foundation designed to create a fresh radiant complexion.",
    price: 999,
    category: "Foundation",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    rating: 4.6,
    stock: 18,
    isFeatured: false,
  },

  {
    name: "Natural Finish Foundation",
    description:
      "Buildable foundation with a lightweight natural-looking finish.",
    price: 849,
    category: "Foundation",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    rating: 4.5,
    stock: 22,
    isFeatured: false,
  },

  // =====================================================
  // 🌸 CONCEALER
  // =====================================================

  {
    name: "Brightening Concealer",
    description:
      "Creamy concealer that helps cover dark circles and blemishes while brightening the under-eye area.",
    price: 699,
    category: "Concealer",
    image:
      "https://images.unsplash.com/photo-1590156221820-7e8e3a8e4f8f",
    rating: 4.5,
    stock: 24,
    isFeatured: false,
  },

  {
    name: "Full Coverage Concealer",
    description:
      "Smooth full-coverage concealer for creating an even and polished makeup base.",
    price: 749,
    category: "Concealer",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    rating: 4.6,
    stock: 20,
    isFeatured: true,
  },

  // =====================================================
  // 🌷 BLUSH
  // =====================================================

  {
    name: "Peach Glow Blush",
    description:
      "Soft powder blush that adds a natural peachy glow to the cheeks.",
    price: 649,
    category: "Blush",
    image:
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07",
    rating: 4.7,
    stock: 22,
    isFeatured: true,
  },

  {
    name: "Rose Pink Blush",
    description:
      "Buildable rose-toned blush for a fresh and elegant everyday look.",
    price: 599,
    category: "Blush",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    rating: 4.4,
    stock: 20,
    isFeatured: false,
  },

  // =====================================================
  // 👁️ EYE MAKEUP
  // =====================================================

  {
    name: "Classic Black Eyeliner",
    description:
      "Smooth precision eyeliner for creating sharp everyday and dramatic eye looks.",
    price: 449,
    category: "Eye Makeup",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    rating: 4.6,
    stock: 35,
    isFeatured: true,
  },

  {
    name: "Volume Boost Mascara",
    description:
      "Volumizing mascara designed to define and enhance lashes.",
    price: 549,
    category: "Eye Makeup",
    image:
      "https://images.unsplash.com/photo-1631214524020-7e18dbd2c3c9",
    rating: 4.5,
    stock: 28,
    isFeatured: false,
  },

  {
    name: "Nude Eyeshadow Palette",
    description:
      "Versatile palette featuring neutral shades for everyday and evening eye makeup.",
    price: 899,
    category: "Eye Makeup",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    rating: 4.8,
    stock: 15,
    isFeatured: true,
  },

  {
    name: "Rose Gold Eyeshadow Palette",
    description:
      "Beautiful rose-gold shades for creating soft glam and evening eye looks.",
    price: 999,
    category: "Eye Makeup",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    rating: 4.7,
    stock: 16,
    isFeatured: true,
  },

  // =====================================================
  // 🖌️ MAKEUP TOOLS
  // =====================================================

  {
    name: "Professional Makeup Brush Set",
    description:
      "Complete set of soft makeup brushes for foundation, blush, eyeshadow and blending.",
    price: 799,
    category: "Makeup Tools",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    rating: 4.7,
    stock: 20,
    isFeatured: true,
  },

  {
    name: "Beauty Blender Sponge",
    description:
      "Soft blending sponge designed for smooth and even makeup application.",
    price: 299,
    category: "Makeup Tools",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    rating: 4.4,
    stock: 40,
    isFeatured: false,
  },

  {
    name: "Travel Makeup Brush Kit",
    description:
      "Compact makeup brush kit designed for easy everyday and travel use.",
    price: 599,
    category: "Makeup Tools",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    rating: 4.6,
    stock: 25,
    isFeatured: false,
  },

  // =====================================================
  // 🧴 SKINCARE
  // =====================================================

  {
    name: "Hydrating Face Serum",
    description:
      "Lightweight hydrating serum designed to refresh and moisturize the skin.",
    price: 749,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd",
    rating: 4.6,
    stock: 18,
    isFeatured: true,
  },

  {
    name: "Daily Moisturizing Cream",
    description:
      "Gentle daily moisturizer that helps keep skin soft and hydrated.",
    price: 649,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    rating: 4.5,
    stock: 25,
    isFeatured: false,
  },

  {
    name: "Gentle Face Cleanser",
    description:
      "Mild daily cleanser designed to remove dirt and impurities while leaving skin feeling fresh.",
    price: 499,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8",
    rating: 4.6,
    stock: 30,
    isFeatured: true,
  },

  {
    name: "Daily Sunscreen SPF 50",
    description:
      "Lightweight daily sunscreen designed for comfortable everyday use.",
    price: 699,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    rating: 4.7,
    stock: 24,
    isFeatured: true,
  },

  {
    name: "Overnight Hydrating Mask",
    description:
      "Rich overnight face mask designed to leave skin feeling soft and refreshed.",
    price: 799,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a",
    rating: 4.5,
    stock: 18,
    isFeatured: false,
  },

  {
    name: "Vitamin C Face Serum",
    description:
      "Lightweight facial serum formulated for a fresh and radiant-looking complexion.",
    price: 849,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd",
    rating: 4.7,
    stock: 20,
    isFeatured: true,
  },
];

// =====================================================
// 🌱 SEED DATABASE
// =====================================================

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Remove existing products
    await Product.deleteMany();

    // Insert new products
    await Product.insertMany(products);

    console.log(`${products.length} products inserted successfully`);

    await mongoose.connection.close();

    console.log("MongoDB connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Failed to seed products:", error);

    process.exit(1);
  }
};

seedProducts();