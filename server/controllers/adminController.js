const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

// =========================
// GET BOUTIQUE METRICS
// =========================
const getBoutiqueMetrics = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    // In the current system, normal registered users have role "user"
    const totalCustomers = await User.countDocuments({
      role: "user",
    });

    // Current Order model uses "total"
    const orders = await Order.find({});

    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    // Products with stock <= 10
    const lowStockProducts = await Product.find({
      stock: { $lte: 10 },
    }).sort({ stock: 1 });

    return res.status(200).json({
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
    });
  } catch (error) {
    console.error("Admin metrics error:", error);

    return res.status(500).json({
      message: "Failed to fetch boutique metrics",
      error: error.message,
    });
  }
};

module.exports = {
  getBoutiqueMetrics,
};