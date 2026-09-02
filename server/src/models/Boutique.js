const mongoose = require('mongoose');

const boutiqueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'StyleSync Haute Couture Atelier',
    },
    description: {
      type: String,
      default: 'Curated luxury fashion & AI personalized styling boutique.',
    },
    ownerAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    location: {
      type: String,
      default: 'Paris • New York • Tokyo • Online',
    },
    establishedYear: {
      type: Number,
      default: 2026,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Boutique', boutiqueSchema);
