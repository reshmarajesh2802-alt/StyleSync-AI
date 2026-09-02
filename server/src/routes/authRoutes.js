const express = require('express');
const router = express.Router();
const { signup, signin, getProfile, checkUser, checkAdmin, logout } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', protect, getProfile);
router.get('/check-user', protect, checkUser);
router.get('/check-admin', protect, adminOnly, checkAdmin);
router.post('/logout', logout);

module.exports = router;
