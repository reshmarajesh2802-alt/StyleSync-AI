const express = require('express');
const router = express.Router();
const { getBoutiqueMetrics } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/metrics', protect, adminOnly, getBoutiqueMetrics);

module.exports = router;
