const express = require("express");

const {
  signup,
  signin,
  logout,
  profile,
  updateProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  checkUser,
  checkAdmin,
} = require("../controllers/authController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// AUTH
// =========================

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/logout", protect, logout);

// =========================
// PROFILE
// =========================

router.get("/profile", protect, profile);

router.put("/profile", protect, updateProfile);

// =========================
// SAVED ADDRESSES
// =========================

router.get("/addresses", protect, getAddresses);

router.post("/addresses", protect, addAddress);

router.put("/addresses/:addressId", protect, updateAddress);

router.delete("/addresses/:addressId", protect, deleteAddress);

// =========================
// CHECK USER / ADMIN
// =========================

router.get("/check-user", protect, checkUser);

router.get(
  "/check-admin",
  protect,
  adminOnly,
  checkAdmin
);

module.exports = router;