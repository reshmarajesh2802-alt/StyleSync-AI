const mongoose = require('mongoose');

const stylingPreferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    primaryAesthetic: {
      type: String,
      default: 'Minimalist Elegance',
    },
    preferredOccasion: {
      type: String,
      default: 'Smart Casual / Cocktail',
    },
    colorPalette: [String], // e.g. ['Monochrome', 'Earth Tones', 'Pastels']
    fitPreference: {
      type: String,
      default: 'Tailored / Slim',
    },
    budgetTier: {
      type: String,
      default: 'Luxury Premium',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StylingPreference', stylingPreferenceSchema);
