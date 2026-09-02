const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrderById,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// CREATE ORDER
// =========================
router.post("/", protect, createOrder);

// =========================
// GET MY ORDERS
// =========================
router.get("/", protect, getMyOrders);

// =========================
// GET SINGLE ORDER
// =========================
router.get("/:orderId", protect, getOrderById);

module.exports = router;