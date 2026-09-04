const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
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
// SIGN UP
// =========================
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        addresses: user.addresses,
      },
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// SIGN IN
// =========================
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        addresses: user.addresses,
      },
    });
  } catch (error) {
    console.error("SIGNIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// LOGOUT
// =========================
const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
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
      success: true,
      user,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// UPDATE PROFILE
// =========================
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    // Keep existing single-address system working
    if (address !== undefined) {
      user.address = {
        ...(user.address?.toObject
          ? user.address.toObject()
          : user.address || {}),
        ...address,
      };
    }

    await user.save();

    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// SAVED ADDRESSES
// =====================================================

// =========================
// GET ALL ADDRESSES
// =========================
const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("addresses");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      addresses: user.addresses || [],
    });
  } catch (error) {
    console.error("GET ADDRESSES ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// ADD NEW ADDRESS
// =========================
const addAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      phone,
      house,
      street,
      city,
      state,
      pincode,
      isDefault,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !house ||
      !street ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        message: "Please fill all required address fields",
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number must contain 10 digits",
      });
    }

    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        message: "Pincode must contain 6 digits",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // If this address is default, remove default from others
    if (isDefault === true) {
      user.addresses.forEach((address) => {
        address.isDefault = false;
      });
    }

    // First address automatically becomes default
    const shouldBeDefault =
      user.addresses.length === 0 ? true : isDefault === true;

    user.addresses.push({
      label: label || "Home",
      fullName,
      phone,
      house,
      street,
      city,
      state,
      pincode,
      isDefault: shouldBeDefault,
    });

    await user.save();

    const newAddress =
      user.addresses[user.addresses.length - 1];

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("ADD ADDRESS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// UPDATE ADDRESS
// =========================
const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const {
      label,
      fullName,
      phone,
      house,
      street,
      city,
      state,
      pincode,
      isDefault,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    if (phone !== undefined && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number must contain 10 digits",
      });
    }

    if (pincode !== undefined && !/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        message: "Pincode must contain 6 digits",
      });
    }

    // If setting this address as default,
    // make all other addresses non-default
    if (isDefault === true) {
      user.addresses.forEach((item) => {
        item.isDefault = false;
      });
    }

    if (label !== undefined) address.label = label;
    if (fullName !== undefined) address.fullName = fullName;
    if (phone !== undefined) address.phone = phone;
    if (house !== undefined) address.house = house;
    if (street !== undefined) address.street = street;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (pincode !== undefined) address.pincode = pincode;
    if (isDefault !== undefined) {
      address.isDefault = isDefault;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("UPDATE ADDRESS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// DELETE ADDRESS
// =========================
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    const wasDefault = address.isDefault;

    address.deleteOne();

    // If default address was deleted,
    // make the first remaining address default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// CHECK USER
// =========================
const checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// CHECK ADMIN
// =========================
const checkAdmin = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin access verified",
    user: req.user,
  });
};

module.exports = {
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
};