const express = require("express");

const {
  signup,
  signin,
  logout,
  profile,
  checkUser,
  checkAdmin,
} = require("../controllers/authController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/signin", signin);

// Protected routes
router.post("/logout", protect, logout);
router.get("/profile", protect, profile);
router.get("/check-user", protect, checkUser);
router.get("/check-admin", protect, adminOnly, checkAdmin);

module.exports = router;