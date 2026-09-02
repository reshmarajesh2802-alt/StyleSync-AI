const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'stylesync_jwt_super_secret_key_2026', {
    expiresIn: '7d',
  });
};

// @desc    Register a new user (Customer or Admin)
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === 'admin' ? 'admin' : 'customer',
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/signin
// @access  Public
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: 'Sign in successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Protected
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Check User Token Status
// @route   GET /api/auth/check-user
// @access  Protected
const checkUser = async (req, res) => {
  return res.status(200).json({
    status: 'authenticated',
    user: req.user,
  });
};

// @desc    Check Admin Status
// @route   GET /api/auth/check-admin
// @access  Admin Only
const checkAdmin = async (req, res) => {
  return res.status(200).json({
    status: 'authorized',
    message: 'Admin Access Granted',
    user: req.user,
  });
};

// @desc    Logout User
// @route   POST /api/auth/logout
// @access  Public
const logout = async (req, res) => {
  return res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { signup, signin, getProfile, checkUser, checkAdmin, logout };
