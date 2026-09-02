const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Protected
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalAmount, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress: shippingAddress || {
        fullName: req.user.name,
        street: '100 Haute Couture Blvd',
        city: 'New York',
        postalCode: '10001',
        country: 'United States',
      },
      totalAmount,
      paymentMethod: paymentMethod || 'Credit Card',
      isPaid: true,
      status: 'Processing',
    });

    return res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Protected
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ count: orders.length, orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin
// @access  Admin Only
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    return res.status(200).json({ count: orders.length, orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Admin Only
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus };
