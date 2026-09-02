const { generateStylistRecommendation } = require('../services/geminiStylistService');
const AIRecommendation = require('../models/AIRecommendation');
const StylingPreference = require('../models/StylingPreference');
const Product = require('../models/Product');

// @desc    Generate AI virtual stylist recommendation
// @route   POST /api/stylist/recommend
// @access  Public / Protected
const getAIRecommendation = async (req, res) => {
  try {
    const { prompt, occasion, aesthetic } = req.body;

    const allProducts = await Product.find({});
    const recommendation = await generateStylistRecommendation({
      prompt: prompt || 'Curate a luxury outfit for tonight',
      occasion,
      aesthetic,
      products: allProducts,
    });

    if (req.user) {
      await AIRecommendation.create({
        user: req.user._id,
        userQuery: prompt || occasion || 'General Stylist Advice',
        occasion,
        matchScore: recommendation.matchScore,
        recommendationTitle: recommendation.title,
        stylistNotes: recommendation.stylistNotes,
        outfitItems: recommendation.outfitItems.map((item) => ({
          product: item._id,
          role: item.category,
        })),
      });
    }

    return res.status(200).json(recommendation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Save user style preferences from questionnaire
// @route   POST /api/stylist/preferences
// @access  Protected
const saveUserStylingPreferences = async (req, res) => {
  try {
    const { primaryAesthetic, preferredOccasion, colorPalette, fitPreference, budgetTier } = req.body;

    let pref = await StylingPreference.findOne({ user: req.user.id });
    if (pref) {
      pref.primaryAesthetic = primaryAesthetic || pref.primaryAesthetic;
      pref.preferredOccasion = preferredOccasion || pref.preferredOccasion;
      pref.colorPalette = colorPalette || pref.colorPalette;
      pref.fitPreference = fitPreference || pref.fitPreference;
      pref.budgetTier = budgetTier || pref.budgetTier;
      await pref.save();
    } else {
      pref = await StylingPreference.create({
        user: req.user.id,
        primaryAesthetic,
        preferredOccasion,
        colorPalette,
        fitPreference,
        budgetTier,
      });
    }

    return res.status(200).json({ message: 'Style preference updated successfully', preferences: pref });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get user style preferences
// @route   GET /api/stylist/preferences
// @access  Protected
const getUserStylingPreferences = async (req, res) => {
  try {
    const pref = await StylingPreference.findOne({ user: req.user.id });
    return res.status(200).json({ preferences: pref || null });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAIRecommendation, saveUserStylingPreferences, getUserStylingPreferences };
