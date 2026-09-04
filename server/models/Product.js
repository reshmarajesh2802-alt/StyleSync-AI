const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: [
        // Western Fashion
        "Dresses",
        "Tops",
        "Bottoms",
        "Jackets",
        "Footwear",
        "Accessories",

        // Indian / Ethnic Fashion
        "Sarees",
        "Kurtis",
        "Lehengas",
        "Gowns",
        "Churidars",
        "Salwar Suits",
        "Anarkali",
        "Ethnic Sets",
        "Dupattas",

        // Beauty
        "Lipsticks",
        "Foundation",
        "Concealer",
        "Blush",
        "Eye Makeup",
        "Makeup Tools",
        "Skincare",
      ],
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },

    stock: {
      type: Number,
      default: 10,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);