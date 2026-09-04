const mongoose = require("mongoose");

// =========================
// DELIVERY ADDRESS
// =========================
const deliveryAddressSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    house: {
      type: String,
      required: true,
      trim: true,
    },

    street: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

// =========================
// ORDER ITEM
// =========================
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

// =========================
// ORDER
// =========================
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },

    // Snapshot of address used for this order
    deliveryAddress: {
      type: deliveryAddressSchema,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    delivery: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "Order Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Placed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);