const express = require("express");

const {
  signup,
  signin,
  logout,
  profile,
  updateProfile,
  checkUser,
  checkAdmin,
} = require("../controllers/authController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// PUBLIC ROUTES
// =========================

router.post("/signup", signup);

router.post("/signin", signin);

// =========================
// PROTECTED ROUTES
// =========================

// Logout
router.post("/logout", protect, logout);

// Get profile
router.get("/profile", protect, profile);

// Update profile
router.put("/profile", protect, updateProfile);

// Check user
router.get("/check-user", protect, checkUser);

// Check admin
router.get(
  "/check-admin",
  protect,
  adminOnly,
  checkAdmin
);

module.exports = router;