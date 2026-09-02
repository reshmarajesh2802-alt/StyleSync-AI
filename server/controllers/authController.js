const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// GENERATE JWT
// =========================
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// =========================
// USER SIGNUP
// =========================
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || "",
        address: user.address || {},
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
};

// =========================
// SIGNIN
// =========================
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || "",
        address: user.address || {},
      },
    });
  } catch (error) {
    console.error("Signin error:", error);

    res.status(500).json({
      message: "Signin failed",
      error: error.message,
    });
  }
};

// =========================
// LOGOUT
// =========================
const logout = async (req, res) => {
  res.status(200).json({
    message: "Logout successful",
  });
};

// =========================
// GET PROFILE
// =========================
const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

// =========================
// UPDATE PROFILE
// =========================
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // =========================
    // UPDATE NAME
    // =========================
    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          message: "Name cannot be empty",
        });
      }

      user.name = name.trim();
    }

    // =========================
    // UPDATE PHONE
    // =========================
    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    // =========================
    // UPDATE ADDRESS
    // =========================
    if (address !== undefined) {
      user.address = {
        ...(user.address?.toObject
          ? user.address.toObject()
          : user.address || {}),
        ...address,
      };
    }

    await user.save();

    // Get updated user without password
    const updatedUser = await User.findById(
      user._id
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// =========================
// CHECK USER
// =========================
const checkUser = async (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user,
  });
};

// =========================
// CHECK ADMIN
// =========================
const checkAdmin = async (req, res) => {
  res.status(200).json({
    authenticated: true,
    authorized: true,
    message: "Admin access granted",
    user: req.user,
  });
};

// =========================
// EXPORT
// =========================
module.exports = {
  signup,
  signin,
  logout,
  profile,
  updateProfile,
  checkUser,
  checkAdmin,
};