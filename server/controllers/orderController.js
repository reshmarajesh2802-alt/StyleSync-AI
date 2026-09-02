const Order = require("../models/Order");
const Product = require("../models/Product");

// =========================
// CREATE ORDER
// =========================
const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // =========================
    // VALIDATE ITEMS
    // =========================
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item",
      });
    }

    // =========================
    // FETCH PRODUCTS FROM DB
    // =========================
    const productIds = items.map((item) => item.product);

    const products = await Product.find({
      _id: { $in: productIds },
    });

    // =========================
    // CHECK PRODUCTS
    // =========================
    if (products.length !== items.length) {
      return res.status(400).json({
        message: "One or more products are invalid",
      });
    }

    // =========================
    // PREPARE ORDER ITEMS
    // =========================
    const orderItems = [];

    for (const item of items) {
      const product = products.find(
        (product) =>
          product._id.toString() === item.product
      );

      if (!product) {
        return res.status(400).json({
          message: "Product not found",
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          message: `Invalid quantity for ${product.name}`,
        });
      }

      // =========================
      // CHECK STOCK
      // =========================
      if (product.stock < quantity) {
        return res.status(400).json({
          message: `${product.name} has only ${product.stock} item(s) in stock`,
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        category: product.category,
        price: product.price,
        quantity,
      });
    }

    // =========================
    // CALCULATE SUBTOTAL
    // =========================
    const subtotal = orderItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    // =========================
    // DISCOUNT
    // =========================
    const discount = Math.round(subtotal * 0.1);

    // =========================
    // DELIVERY
    // =========================
    const delivery = subtotal >= 999 ? 0 : 99;

    // =========================
    // FINAL TOTAL
    // =========================
    const total = subtotal - discount + delivery;

    // =========================
    // GENERATE ORDER ID
    // =========================
    const orderId = `SS${Date.now()}`;

    // =========================
    // CREATE ORDER
    // =========================
    const order = await Order.create({
      user: req.user.id,
      orderId,
      items: orderItems,
      subtotal,
      discount,
      delivery,
      total,
      status: "Order Placed",
    });

    // =========================
    // UPDATE STOCK
    // =========================
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );
    }

    // =========================
    // RESPONSE
    // =========================
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
};

// =========================
// GET MY ORDERS
// =========================
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// =========================
// GET SINGLE ORDER
// =========================
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
      user: req.user.id,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// =========================
// EXPORT
// =========================
module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
};