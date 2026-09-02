const mongoose = require('mongoose');

const aiRecommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userQuery: {
      type: String,
      required: true,
    },
    occasion: {
      type: String,
    },
    matchScore: {
      type: Number,
      default: 96,
    },
    recommendationTitle: {
      type: String,
      required: true,
    },
    stylistNotes: {
      type: String,
      required: true,
    },
    outfitItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        role: String, // e.g. 'Top', 'Bottom', 'Footwear', 'Outerwear', 'Accessory'
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('AIRecommendation', aiRecommendationSchema);
