const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Tops', 'Bottoms', 'Outerwear', 'Dresses', 'Footwear', 'Accessories'],
    },
    aesthetic: {
      type: String,
      enum: ['Minimalist Elegance', 'Urban Streetwear', 'Parisian Chic', 'Cyberpunk Luxury', 'Silent Luxury', 'Bohemian Glam'],
      default: 'Minimalist Elegance',
    },
    color: {
      type: String,
      required: true,
    },
    colorHex: {
      type: String,
      default: '#000000',
    },
    stock: {
      type: Number,
      required: true,
      default: 10,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    sizes: [
      {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'],
        default: 'M',
      },
    ],
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewCount: {
      type: Number,
      default: 12,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    brand: {
      type: String,
      default: 'StyleSync Atelier',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
