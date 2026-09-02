const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "Floral Summer Dress",
    description: "Elegant floral midi dress perfect for casual outings and summer occasions.",
    price: 1299,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    rating: 4.6,
    stock: 20,
    isFeatured: true,
  },

  {
    name: "Classic White Top",
    description: "Minimal white top designed for effortless everyday styling.",
    price: 799,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    rating: 4.5,
    stock: 25,
    isFeatured: true,
  },

  {
    name: "Oversized Denim Jacket",
    description: "Trendy oversized denim jacket that adds a streetwear edge to any outfit.",
    price: 1899,
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2",
    rating: 4.7,
    stock: 15,
    isFeatured: true,
  },

  {
    name: "Relaxed Fit Jeans",
    description: "Comfortable relaxed-fit jeans designed for everyday wear.",
    price: 1499,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    rating: 4.4,
    stock: 30,
    isFeatured: false,
  },

  {
    name: "Elegant Heels",
    description: "Classic heels designed for parties, celebrations and special occasions.",
    price: 1799,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
    rating: 4.6,
    stock: 12,
    isFeatured: true,
  },

  {
    name: "Minimal Shoulder Bag",
    description: "A stylish everyday shoulder bag with a clean and modern design.",
    price: 999,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    rating: 4.5,
    stock: 18,
    isFeatured: false,
  },

  {
    name: "Satin Party Dress",
    description: "Sophisticated satin dress designed for evening parties and celebrations.",
    price: 2299,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae",
    rating: 4.8,
    stock: 10,
    isFeatured: true,
  },

  {
    name: "Beige Casual Shirt",
    description: "Versatile beige shirt that works perfectly with jeans, trousers or skirts.",
    price: 899,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab",
    rating: 4.3,
    stock: 22,
    isFeatured: false,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

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