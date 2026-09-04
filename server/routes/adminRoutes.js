const express = require("express");

const {
  getBoutiqueMetrics,
} = require("../controllers/adminController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// BOUTIQUE METRICS
// =========================
router.get(
  "/metrics",
  protect,
  adminOnly,
  getBoutiqueMetrics
);

module.exports = router;