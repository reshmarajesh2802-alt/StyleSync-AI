const express = require("express");
const router = express.Router();

const { generateRecommendation } = require("../controllers/stylistController");
// If you are using auth middleware, import protect:
const { protect } = require("../middleware/authMiddleware");

// Debug logging to catch undefined handlers before Express crashes
if (typeof generateRecommendation !== "function") {
  console.error("ERROR: generateRecommendation is not a function!", generateRecommendation);
}

// Option A: If the route requires authentication
router.post("/recommend", protect, generateRecommendation);

// Option B: If the route is public (remove 'protect')
// router.post("/recommend", generateRecommendation);

module.exports = router;