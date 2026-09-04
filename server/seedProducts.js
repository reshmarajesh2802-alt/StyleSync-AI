const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const mongoose = require("mongoose");
const Product = require("./models/Product");

// =====================================================
// 🛍️ STYLESYNC AI — PRODUCT CATALOGUE
// Women's Fashion + Indian Ethnic Wear + Makeup + Skincare
// =====================================================

const products = [

  // =====================================================
  // 👗 WESTERN FASHION — DRESSES
  // =====================================================

  {
    name: "Floral Summer Dress",
    description:
      "Elegant floral midi dress perfect for casual outings and summer occasions.",
    price: 1299,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 10,
    isFeatured: true,
  },
  {
    name: "Floral Wrap Dress",
    description:
      "Beautiful floral wrap dress designed for a comfortable and flattering fit.",
    price: 1399,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 15,
    isFeatured: true,
  },
  {
    name: "Elegant Red Cocktail Dress",
    description:
      "Stylish red cocktail dress perfect for parties and evening occasions.",
    price: 2199,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 16,
    isFeatured: false,
  },
  {
    name: "Pink Party Dress",
    description:
      "Feminine pink party dress designed for celebrations and evening events.",
    price: 1899,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 8,
    isFeatured: true,
  },
  {
    name: "Blush Pink Wrap Dress",
    description:
      "Flattering blush wrap dress with a soft feminine finish.",
    price: 1699,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 20,
    isFeatured: false,
  },

  // =====================================================
  // 👚 WESTERN FASHION — TOPS
  // =====================================================

  {
    name: "Classic White Top",
    description:
      "Minimal white top designed for effortless everyday styling.",
    price: 799,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=800&q=80",
    rating: 4.3,
    stock: 22,
    isFeatured: false,
  },
  {
    name: "Satin Blouse",
    description:
      "Elegant satin blouse suitable for office outfits and evening styling.",
    price: 1099,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 30,
    isFeatured: false,
  },
  {
    name: "Elegant Bow Blouse",
    description:
      "Feminine blouse with a delicate bow detail for polished styling.",
    price: 1099,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 16,
    isFeatured: true,
  },
  {
    name: "Rose Pink Knit Top",
    description:
      "Soft rose-pink knit top designed for comfortable everyday styling.",
    price: 899,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 24,
    isFeatured: false,
  },

  // =====================================================
  // 👖 WESTERN FASHION — BOTTOMS
  // =====================================================

  {
    name: "Relaxed Fit Jeans",
    description:
      "Comfortable relaxed-fit jeans designed for everyday wear.",
    price: 1499,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 30,
    isFeatured: false,
  },
  {
    name: "Wide Leg Trousers",
    description:
      "Elegant wide-leg trousers perfect for modern office and casual outfits.",
    price: 1399,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 16,
    isFeatured: true,
  },
  {
    name: "Cream Wide Leg Pants",
    description:
      "Elegant cream wide-leg pants designed for modern feminine styling.",
    price: 1499,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 19,
    isFeatured: false,
  },

  // =====================================================
  // 🧥 WESTERN FASHION — JACKETS
  // =====================================================

  {
    name: "Oversized Denim Jacket",
    description:
      "Trendy oversized denim jacket that adds a streetwear edge to any outfit.",
    price: 1899,
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 15,
    isFeatured: true,
  },
  {
    name: "Cropped Beige Jacket",
    description:
      "Stylish cropped jacket designed for layering over casual outfits.",
    price: 1799,
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1548624313-0396c75ce8f7?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 14,
    isFeatured: false,
  },
  {
    name: "Cream Teddy Jacket",
    description:
      "Cozy cream jacket with a soft texture for stylish cooler-day outfits.",
    price: 1999,
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 12,
    isFeatured: false,
  },

  // =====================================================
  // 👠 WESTERN FASHION — FOOTWEAR
  // =====================================================

  {
    name: "Elegant Heels",
    description:
      "Classic heels designed for parties and special occasions.",
    price: 1799,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 25,
    isFeatured: false,
  },
  {
    name: "Elegant Strappy Sandals",
    description:
      "Minimal strappy sandals designed for dresses, skirts and evening looks.",
    price: 1199,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1534653299134-96a171b61581?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 20,
    isFeatured: false,
  },

  // =====================================================
  // 👜 WESTERN FASHION — ACCESSORIES
  // =====================================================

  {
    name: "Minimal Shoulder Bag",
    description:
      "A stylish everyday shoulder bag with a clean modern design.",
    price: 999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 18,
    isFeatured: false,
  },
  {
    name: "Elegant Pearl Necklace",
    description:
      "Delicate pearl necklace designed to complement elegant outfits.",
    price: 799,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 24,
    isFeatured: false,
  },
  {
    name: "Delicate Gold Bracelet",
    description:
      "Minimal gold-toned bracelet designed for subtle everyday elegance.",
    price: 599,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 30,
    isFeatured: false,
  },

  // =====================================================
  // 🇮🇳 INDIAN / ETHNIC FASHION — SAREES
  // =====================================================

  {
    name: "Royal Blue Banarasi Saree",
    description:
      "Rich royal blue Banarasi-inspired saree perfect for weddings and festive occasions.",
    price: 2899,
    category: "Sarees",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 10,
    isFeatured: true,
  },
  {
    name: "Peach Georgette Saree",
    description:
      "Lightweight peach georgette saree designed for graceful festive styling.",
    price: 2399,
    category: "Sarees",
    image:
      "https://images.unsplash.com/photo-1610030469668-8e9f641aaf5c?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 14,
    isFeatured: true,
  },
  {
    name: "Wine Party Wear Saree",
    description:
      "Elegant wine-toned party wear saree for receptions and evening events.",
    price: 2599,
    category: "Sarees",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 12,
    isFeatured: true,
  },
  {
    name: "Mint Green Festive Saree",
    description:
      "Fresh mint green saree with a graceful feminine appearance.",
    price: 2199,
    category: "Sarees",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 16,
    isFeatured: false,
  },
  {
    name: "Golden Tissue Saree",
    description:
      "Elegant golden tissue-inspired saree designed for weddings and festivals.",
    price: 2999,
    category: "Sarees",
    image:
      "https://images.unsplash.com/photo-1583391733981-8498403f6e4c?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    stock: 8,
    isFeatured: true,
  },
  {
    name: "Emerald Green Silk Saree",
    description:
      "Elegant emerald green silk saree suitable for weddings and celebrations.",
    price: 2799,
    category: "Sarees",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 9,
    isFeatured: true,
  },

  // =====================================================
  // 🌸 INDIAN / ETHNIC FASHION — KURTIS
  // =====================================================

  {
    name: "Yellow Printed Cotton Kurti",
    description:
      "Bright printed cotton kurti perfect for college and everyday ethnic wear.",
    price: 799,
    category: "Kurtis",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 28,
    isFeatured: false,
  },
  {
    name: "Maroon Embroidered Kurti",
    description:
      "Elegant maroon kurti featuring traditional-inspired embroidery.",
    price: 1299,
    category: "Kurtis",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 17,
    isFeatured: true,
  },
  {
    name: "Sky Blue Straight Kurti",
    description:
      "Comfortable sky blue straight-cut kurti for everyday ethnic styling.",
    price: 899,
    category: "Kurtis",
    image:
      "https://images.unsplash.com/photo-1610030469668-8e9f641aaf5c?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 24,
    isFeatured: false,
  },
  {
    name: "Pink Floral Long Kurti",
    description:
      "Feminine long kurti with a floral-inspired design for casual and festive occasions.",
    price: 1099,
    category: "Kurtis",
    image:
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 20,
    isFeatured: true,
  },
  {
    name: "Ivory Embroidered Kurti",
    description:
      "Elegant ivory kurti with delicate embroidery for sophisticated ethnic styling.",
    price: 1199,
    category: "Kurtis",
    image:
      "https://images.unsplash.com/photo-1583391733981-8498403f6e4c?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 18,
    isFeatured: false,
  },
  {
    name: "Indigo Block Print Kurti",
    description:
      "Indigo block-print inspired kurti designed for comfortable everyday wear.",
    price: 999,
    category: "Kurtis",
    image:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93c9?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 21,
    isFeatured: true,
  },

  // =====================================================
  // ✨ INDIAN / ETHNIC FASHION — LEHENGAS
  // =====================================================

  {
    name: "Royal Blue Bridal Lehenga",
    description:
      "Statement royal blue lehenga designed for weddings and grand celebrations.",
    price: 5299,
    category: "Lehengas",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    stock: 7,
    isFeatured: true,
  },
  {
    name: "Peach Floral Lehenga",
    description:
      "Soft peach floral-inspired lehenga perfect for engagements and weddings.",
    price: 3999,
    category: "Lehengas",
    image:
      "https://images.unsplash.com/photo-1610030469668-8e9f641aaf5c?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 10,
    isFeatured: true,
  },
  {
    name: "Wine Velvet Lehenga",
    description:
      "Luxurious wine-toned lehenga designed for evening celebrations.",
    price: 4799,
    category: "Lehengas",
    image:
      "https://images.unsplash.com/photo-1583391733981-8498403f6e4c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 8,
    isFeatured: true,
  },
  {
    name: "Mint Green Party Lehenga",
    description:
      "Fresh mint green lehenga with a graceful silhouette for receptions.",
    price: 4199,
    category: "Lehengas",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 11,
    isFeatured: false,
  },
  {
    name: "Blush Pink Bridal Lehenga",
    description:
      "Beautiful blush pink lehenga with an elegant bridal-inspired aesthetic.",
    price: 4999,
    category: "Lehengas",
    image:
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    stock: 8,
    isFeatured: true,
  },

  // =====================================================
  // 👑 INDIAN / ETHNIC FASHION — GOWNS
  // =====================================================

  {
    name: "Royal Blue Evening Gown",
    description:
      "Elegant floor-length royal blue gown designed for receptions and parties.",
    price: 3499,
    category: "Gowns",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 9,
    isFeatured: true,
  },
  {
    name: "Emerald Green Party Gown",
    description:
      "Sophisticated emerald green gown perfect for evening celebrations.",
    price: 3599,
    category: "Gowns",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    stock: 8,
    isFeatured: true,
  },
  {
    name: "Rose Gold Reception Gown",
    description:
      "Glamorous rose-gold gown designed for receptions and elegant events.",
    price: 3799,
    category: "Gowns",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 7,
    isFeatured: true,
  },
  {
    name: "Lavender Ball Gown",
    description:
      "Elegant lavender gown designed for formal events and special occasions.",
    price: 3499,
    category: "Gowns",
    image:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 10,
    isFeatured: false,
  },

  // =====================================================
  // 🌷 INDIAN / ETHNIC FASHION — CHURIDARS
  // =====================================================

  {
    name: "Royal Blue Embroidered Churidar",
    description:
      "Traditional royal blue churidar with elegant detailing for festive celebrations.",
    price: 1799,
    category: "Churidars",
    image:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93c9?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 15,
    isFeatured: true,
  },
  {
    name: "Peach Churidar Set",
    description:
      "Graceful peach churidar set suitable for family gatherings and festivals.",
    price: 1499,
    category: "Churidars",
    image:
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 19,
    isFeatured: false,
  },
  {
    name: "Lavender Churidar Set",
    description:
      "Soft lavender churidar set designed for comfortable ethnic styling.",
    price: 1599,
    category: "Churidars",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 16,
    isFeatured: true,
  },
  {
    name: "Maroon Festive Churidar",
    description:
      "Rich maroon churidar outfit suitable for festivals and traditional events.",
    price: 1699,
    category: "Churidars",
    image:
      "https://images.unsplash.com/photo-1610030469668-8e9f641aaf5c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 14,
    isFeatured: true,
  },

  // =====================================================
  // 💕 INDIAN / ETHNIC FASHION — SALWAR SUITS
  // =====================================================

  {
    name: "Elegant Peach Salwar Suit",
    description:
      "Graceful peach salwar suit designed for festive gatherings.",
    price: 1799,
    category: "Salwar Suits",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 16,
    isFeatured: true,
  },
  {
    name: "Royal Blue Salwar Suit",
    description:
      "Elegant royal blue salwar suit suitable for celebrations and festivals.",
    price: 1899,
    category: "Salwar Suits",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 13,
    isFeatured: true,
  },
  {
    name: "Floral Cotton Salwar Set",
    description:
      "Lightweight floral salwar set designed for comfortable everyday ethnic wear.",
    price: 1299,
    category: "Salwar Suits",
    image:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93c9?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 22,
    isFeatured: false,
  },
  {
    name: "Wine Embroidered Salwar Suit",
    description:
      "Rich wine-toned salwar suit featuring elegant embroidery.",
    price: 2199,
    category: "Salwar Suits",
    image:
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 12,
    isFeatured: true,
  },

  // =====================================================
  // 🌺 INDIAN / ETHNIC FASHION — ANARKALI
  // =====================================================

  {
    name: "Pink Embroidered Anarkali",
    description:
      "Graceful pink Anarkali with elegant embroidery for weddings and festivals.",
    price: 2399,
    category: "Anarkali",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    stock: 10,
    isFeatured: true,
  },
  {
    name: "Emerald Green Anarkali",
    description:
      "Rich emerald green Anarkali designed for weddings and evening celebrations.",
    price: 2499,
    category: "Anarkali",
    image:
      "https://images.unsplash.com/photo-1583391733981-8498403f6e4c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 9,
    isFeatured: true,
  },
  {
    name: "Peach Festive Anarkali",
    description:
      "Soft peach Anarkali with a feminine silhouette for festive occasions.",
    price: 2099,
    category: "Anarkali",
    image:
      "https://images.unsplash.com/photo-1610030469668-8e9f641aaf5c?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 13,
    isFeatured: false,
  },
  {
    name: "Royal Maroon Anarkali",
    description:
      "Rich maroon Anarkali designed for weddings and traditional celebrations.",
    price: 2299,
    category: "Anarkali",
    image:
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 11,
    isFeatured: true,
  },

  // =====================================================
  // 🪷 INDIAN / ETHNIC FASHION — ETHNIC SETS
  // =====================================================

  {
    name: "Rose Pink Ethnic Set",
    description:
      "Elegant rose-pink ethnic set combining traditional styling with a modern silhouette.",
    price: 1899,
    category: "Ethnic Sets",
    image:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93c9?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 18,
    isFeatured: true,
  },
  {
    name: "Royal Blue Ethnic Set",
    description:
      "Sophisticated royal blue ethnic set suitable for festivals and family gatherings.",
    price: 1999,
    category: "Ethnic Sets",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 15,
    isFeatured: true,
  },
  {
    name: "Ivory Festive Ethnic Set",
    description:
      "Elegant ivory ethnic set designed for subtle festive styling.",
    price: 1799,
    category: "Ethnic Sets",
    image:
      "https://images.unsplash.com/photo-1583391733981-8498403f6e4c?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 17,
    isFeatured: false,
  },
  {
    name: "Pastel Ethnic Co-ord Set",
    description:
      "Modern pastel ethnic set combining traditional details with contemporary styling.",
    price: 1899,
    category: "Ethnic Sets",
    image:
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 17,
    isFeatured: true,
  },

  // =====================================================
  // 🧣 INDIAN / ETHNIC FASHION — DUPATTAS
  // =====================================================

  {
    name: "Royal Blue Embroidered Dupatta",
    description:
      "Elegant royal blue dupatta with festive detailing.",
    price: 699,
    category: "Dupattas",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 22,
    isFeatured: true,
  },
  {
    name: "Peach Festive Dupatta",
    description:
      "Lightweight peach dupatta designed to complement ethnic outfits.",
    price: 599,
    category: "Dupattas",
    image:
      "https://images.unsplash.com/photo-1610030469668-8e9f641aaf5c?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 25,
    isFeatured: false,
  },
  {
    name: "Wine Chiffon Dupatta",
    description:
      "Elegant wine-toned chiffon dupatta perfect for festive outfits.",
    price: 649,
    category: "Dupattas",
    image:
      "https://images.unsplash.com/photo-1583391733981-8498403f6e4c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 20,
    isFeatured: true,
  },
  {
    name: "Rose Pink Chiffon Dupatta",
    description:
      "Lightweight rose pink chiffon dupatta that pairs beautifully with kurtis.",
    price: 499,
    category: "Dupattas",
    image:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93c9?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 25,
    isFeatured: false,
  },

  // =====================================================
  // 💄 BEAUTY — LIPSTICKS
  // =====================================================

  {
    name: "Velvet Matte Lipstick - Rose",
    description:
      "Long-lasting matte lipstick with a smooth velvet finish in a beautiful rose shade.",
    price: 599,
    category: "Lipsticks",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 30,
    isFeatured: false,
  },
  {
    name: "Berry Red Lipstick",
    description:
      "Rich berry-red lipstick designed for bold evening looks.",
    price: 649,
    category: "Lipsticks",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 20,
    isFeatured: true,
  },
  {
    name: "Mauve Nude Lipstick",
    description:
      "Sophisticated mauve nude shade for elegant everyday makeup.",
    price: 599,
    category: "Lipsticks",
    image:
      "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 28,
    isFeatured: false,
  },

  // =====================================================
  // ✨ BEAUTY — FOUNDATION
  // =====================================================

  {
    name: "Hydrating Liquid Foundation",
    description:
      "Lightweight buildable foundation providing smooth natural-looking coverage.",
    price: 899,
    category: "Foundation",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 18,
    isFeatured: false,
  },
  {
    name: "Velvet Finish Foundation",
    description:
      "Buildable foundation with a soft velvet finish for polished makeup looks.",
    price: 1099,
    category: "Foundation",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 18,
    isFeatured: true,
  },

  // =====================================================
  // 🌸 BEAUTY — CONCEALER
  // =====================================================

  {
    name: "Brightening Concealer",
    description:
      "Creamy concealer designed to brighten the under-eye area and cover blemishes.",
    price: 699,
    category: "Concealer",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 24,
    isFeatured: false,
  },
  {
    name: "Full Coverage Concealer",
    description:
      "Smooth full-coverage concealer for an even polished makeup base.",
    price: 749,
    category: "Concealer",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 20,
    isFeatured: true,
  },

  // =====================================================
  // 🌷 BEAUTY — BLUSH
  // =====================================================

  {
    name: "Peach Glow Blush",
    description:
      "Soft powder blush that adds a natural peachy glow to the cheeks.",
    price: 649,
    category: "Blush",
    image:
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 22,
    isFeatured: true,
  },
  {
    name: "Rose Pink Blush",
    description:
      "Buildable rose-toned blush for a fresh everyday look.",
    price: 599,
    category: "Blush",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 20,
    isFeatured: false,
  },
  {
    name: "Peachy Cream Blush",
    description:
      "Cream blush that gives cheeks a soft natural peach flush.",
    price: 699,
    category: "Blush",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 24,
    isFeatured: true,
  },

  // =====================================================
  // 👁️ BEAUTY — EYE MAKEUP
  // =====================================================

  {
    name: "Classic Black Eyeliner",
    description:
      "Smooth precision eyeliner for everyday and dramatic eye looks.",
    price: 449,
    category: "Eye Makeup",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 28,
    isFeatured: false,
  },
  {
    name: "Nude Eyeshadow Palette",
    description:
      "Versatile neutral eyeshadow palette for everyday and evening looks.",
    price: 899,
    category: "Eye Makeup",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 15,
    isFeatured: true,
  },
  {
    name: "Rose Gold Eyeshadow Palette",
    description:
      "Beautiful rose-gold shades for soft glam and evening eye looks.",
    price: 999,
    category: "Eye Makeup",
    image:
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 16,
    isFeatured: true,
  },

  // =====================================================
  // 🖌️ BEAUTY — MAKEUP TOOLS
  // =====================================================

  {
    name: "Professional Makeup Brush Set",
    description:
      "Complete set of soft makeup brushes for foundation, blush and eyeshadow.",
    price: 799,
    category: "Makeup Tools",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 40,
    isFeatured: false,
  },
  {
    name: "Travel Makeup Brush Kit",
    description:
      "Compact makeup brush kit designed for everyday and travel use.",
    price: 599,
    category: "Makeup Tools",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 25,
    isFeatured: false,
  },

  // =====================================================
  // 🧴 BEAUTY — SKINCARE
  // =====================================================

  {
    name: "Hydrating Face Serum",
    description:
      "Lightweight hydrating serum designed to refresh and moisturize the skin.",
    price: 749,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 25,
    isFeatured: false,
  },
  {
    name: "Gentle Face Cleanser",
    description:
      "Mild daily cleanser designed to remove dirt and impurities.",
    price: 499,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 18,
    isFeatured: false,
  },
  {
    name: "Vitamin C Face Serum",
    description:
      "Lightweight facial serum formulated for a fresh radiant-looking complexion.",
    price: 849,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 20,
    isFeatured: true,
  },
  {
    name: "Rose Hydrating Face Mist",
    description:
      "Refreshing facial mist for a hydrated and fresh-looking complexion.",
    price: 499,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 25,
    isFeatured: true,
  },
  {
    name: "Glow Boost Moisturizer",
    description:
      "Lightweight moisturizer designed to leave skin feeling soft and hydrated.",
    price: 749,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 22,
    isFeatured: true,
  },

];

// =====================================================
// 🌱 SEED DATABASE
// =====================================================

const seedProducts = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from server/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // ⚠️ This replaces the existing product catalogue.
    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log(`${products.length} products inserted successfully`);

    await mongoose.connection.close();

    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed products:", error);

    try {
      await mongoose.connection.close();
    } catch (closeError) {
      // Ignore connection close errors
    }

    process.exit(1);
  }
};

seedProducts();