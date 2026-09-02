const express = require('express');
const router = express.Router();
const { getAIRecommendation, saveUserStylingPreferences, getUserStylingPreferences } = require('../controllers/stylistController');
const { protect } = require('../middleware/authMiddleware');

router.post('/recommend', getAIRecommendation);
router.post('/preferences', protect, saveUserStylingPreferences);
router.get('/preferences', protect, getUserStylingPreferences);

module.exports = router;
