const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Get Admin Boutique metrics
// @route   GET /api/admin/metrics
// @access  Admin Only
const getBoutiqueMetrics = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    const orders = await Order.find({});
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const lowStockProducts = await Product.find({ stock: { $lte: 10 } });

    return res.status(200).json({
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getBoutiqueMetrics };
