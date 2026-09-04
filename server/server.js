const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const stylistRoutes = require("./routes/stylistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// DEBUG REQUEST
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/stylist", stylistRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// =========================
// DATABASE
// =========================

connectDB();

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "StyleSync AI API is running",
  });
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});