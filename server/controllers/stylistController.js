const Product = require("../models/Product");

const generateRecommendation = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please describe the look you are looking for.",
      });
    }

    const text = prompt.toLowerCase();

    // Detect requested areas
    const wantsFashion =
      text.includes("dress") ||
      text.includes("outfit") ||
      text.includes("top") ||
      text.includes("bottom") ||
      text.includes("jacket") ||
      text.includes("shoe") ||
      text.includes("footwear") ||
      text.includes("fashion") ||
      text.includes("clothes");

    const wantsMakeup =
      text.includes("makeup") ||
      text.includes("lipstick") ||
      text.includes("foundation") ||
      text.includes("concealer") ||
      text.includes("blush") ||
      text.includes("eye makeup");

    const wantsSkincare =
      text.includes("skincare") ||
      text.includes("skin") ||
      text.includes("serum") ||
      text.includes("moisturizer") ||
      text.includes("cleanser") ||
      text.includes("spf");

    // Find products from the actual StyleSync catalogue
    const products = await Product.find({ stock: { $gt: 0 } })
      .limit(53)
      .lean();

    const fashionProducts = products.filter((product) =>
      [
        "Dresses",
        "Tops",
        "Bottoms",
        "Jackets",
        "Footwear",
        "Accessories",
      ].includes(product.category)
    );

    const makeupProducts = products.filter((product) =>
      [
        "Lipsticks",
        "Foundation",
        "Concealer",
        "Blush",
        "Eye Makeup",
        "Makeup Tools",
      ].includes(product.category)
    );

    const skincareProducts = products.filter(
      (product) => product.category === "Skincare"
    );

    // Select products based on the user's request
    let selectedFashion = fashionProducts.slice(0, 4);
    let selectedMakeup = makeupProducts.slice(0, 3);
    let selectedSkincare = skincareProducts.slice(0, 2);

    // If the user specifically requests a category,
    // prioritize products from that category.
    const categoryPriority = [
      "Dresses",
      "Tops",
      "Bottoms",
      "Jackets",
      "Footwear",
      "Accessories",
      "Lipsticks",
      "Foundation",
      "Concealer",
      "Blush",
      "Eye Makeup",
      "Makeup Tools",
      "Skincare",
    ];

    const requestedCategories = categoryPriority.filter((category) =>
      text.includes(category.toLowerCase())
    );

    if (requestedCategories.length > 0) {
      const prioritized = products.filter((product) =>
        requestedCategories.includes(product.category)
      );

      if (prioritized.length > 0) {
        if (
          prioritized.some((product) =>
            [
              "Dresses",
              "Tops",
              "Bottoms",
              "Jackets",
              "Footwear",
              "Accessories",
            ].includes(product.category)
          )
        ) {
          selectedFashion = prioritized.slice(0, 4);
        }

        if (
          prioritized.some((product) =>
            [
              "Lipsticks",
              "Foundation",
              "Concealer",
              "Blush",
              "Eye Makeup",
              "Makeup Tools",
            ].includes(product.category)
          )
        ) {
          selectedMakeup = prioritized.slice(0, 3);
        }

        if (
          prioritized.some((product) => product.category === "Skincare")
        ) {
          selectedSkincare = prioritized.slice(0, 2);
        }
      }
    }

    // Occasion detection
    let occasion = "✨ Personalized Occasion";
    let title = "Curated Style";
    let styleVibe = "Contemporary";
    let emoji = "✨";
    let tags = ["Personalized", "Chic", "Curated"];

    if (
      text.includes("wedding") ||
      text.includes("festive") ||
      text.includes("party") ||
      text.includes("reception")
    ) {
      occasion = "🎉 Festive Celebration";
      title = "Festive Glamour";
      styleVibe = "Elegant Glam";
      emoji = "🥻";
      tags = ["Elegant", "Statement", "Glam"];
    } else if (
      text.includes("casual") ||
      text.includes("college") ||
      text.includes("day") ||
      text.includes("street")
    ) {
      occasion = "☀️ Daytime Outing";
      title = "Urban Casual";
      styleVibe = "Streetwear Luxe";
      emoji = "🧥";
      tags = ["Relaxed", "Effortless", "Clean"];
    } else if (
      text.includes("office") ||
      text.includes("work") ||
      text.includes("professional")
    ) {
      occasion = "💼 Work & Office";
      title = "Modern Workwear";
      styleVibe = "Polished Minimal";
      emoji = "👠";
      tags = ["Professional", "Elegant", "Minimal"];
    } else if (
      text.includes("makeup") ||
      text.includes("beauty") ||
      text.includes("glam")
    ) {
      occasion = "💄 Beauty Look";
      title = "Soft Beauty Glow";
      styleVibe = "Soft Glam";
      emoji = "💄";
      tags = ["Fresh", "Glowing", "Feminine"];
    } else if (
      text.includes("skincare") ||
      text.includes("skin") ||
      text.includes("glow")
    ) {
      occasion = "🌿 Everyday Beauty";
      title = "Healthy Glow";
      styleVibe = "Natural Glow";
      emoji = "🧴";
      tags = ["Fresh", "Natural", "Radiant"];
    }

    // Build recommendation text
    const fashionText =
      selectedFashion.length > 0
        ? selectedFashion
            .map((product) => product.name)
            .slice(0, 3)
            .join(", ")
        : "Curated fashion pieces based on your request.";

    const makeupText =
      selectedMakeup.length > 0
        ? selectedMakeup
            .map((product) => product.name)
            .slice(0, 3)
            .join(", ")
        : "Makeup recommendations selected to complement your look.";

    const skincareText =
      selectedSkincare.length > 0
        ? selectedSkincare
            .map((product) => product.name)
            .slice(0, 2)
            .join(", ")
        : "Skincare products selected to complete your beauty routine.";

    // Decide what to emphasize
    let description =
      "A personalized StyleSync look combining fashion and beauty recommendations.";

    if (wantsFashion && wantsMakeup && wantsSkincare) {
      description =
        "A complete head-to-toe look combining fashion, makeup, and skincare.";
    } else if (wantsMakeup && wantsSkincare) {
      description =
        "A coordinated beauty routine combining makeup and skincare recommendations.";
    } else if (wantsMakeup) {
      description =
        "A personalized makeup look selected to complement your style.";
    } else if (wantsSkincare) {
      description =
        "A personalized skincare routine selected for a fresh and healthy-looking finish.";
    } else if (wantsFashion) {
      description =
        "A personalized fashion look selected according to your requested style.";
    }

    const recommendation = {
      title,
      tags,
      matchScore: Math.floor(Math.random() * 6) + 94,
      occasion,
      styleVibe,
      emoji,
      description,

      fashion: fashionText,
      makeup: makeupText,
      skincare: skincareText,

      products: {
        fashion: selectedFashion,
        makeup: selectedMakeup,
        skincare: selectedSkincare,
      },

      prompt,
    };

    return res.status(200).json({
      success: true,
      message: `I've created a personalized look based on "${prompt}". ✨`,
      recommendation,
    });
  } catch (error) {
    console.error("AI Stylist Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateRecommendation,
};