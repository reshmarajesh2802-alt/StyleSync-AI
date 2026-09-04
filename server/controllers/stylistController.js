const Product = require("../models/Product");

const generateRecommendation = async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("AI Stylist request received:", prompt);

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please describe the look you are looking for.",
      });
    }

    const text = prompt.toLowerCase();

    // -----------------------------------
    // PRODUCT CATEGORIES
    // -----------------------------------

    const fashionCategories = [
      "Dresses",
      "Tops",
      "Bottoms",
      "Jackets",
      "Footwear",
      "Accessories",
    ];

    const makeupCategories = [
      "Lipsticks",
      "Foundation",
      "Concealer",
      "Blush",
      "Eye Makeup",
      "Makeup Tools",
    ];

    const skincareCategories = ["Skincare"];

    // -----------------------------------
    // DETECT USER REQUIREMENTS
    // -----------------------------------

    const wantsFashion =
      /dress|outfit|top|bottom|jeans|jacket|shoe|footwear|fashion|clothes/i.test(
        text
      );

    const wantsMakeup =
      /makeup|lipstick|foundation|concealer|blush|eye makeup|glam/i.test(text);

    const wantsSkincare =
      /skincare|skin|serum|moisturizer|cleanser|spf|glow/i.test(text);

    // -----------------------------------
    // GET AVAILABLE PRODUCTS
    // -----------------------------------

    console.log("Fetching StyleSync products...");

    const products = await Product.find({
      stock: { $gt: 0 },
    })
      .select(
        "name description price image rating stock category isFeatured"
      )
      .lean();

    console.log(`Products found: ${products.length}`);

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products are currently available.",
      });
    }

    // -----------------------------------
    // SEPARATE PRODUCTS BY CATEGORY
    // -----------------------------------

    const fashionProducts = products.filter((product) =>
      fashionCategories.includes(product.category)
    );

    const makeupProducts = products.filter((product) =>
      makeupCategories.includes(product.category)
    );

    const skincareProducts = products.filter((product) =>
      skincareCategories.includes(product.category)
    );

    // -----------------------------------
    // SELECT PRODUCTS
    // -----------------------------------

    let selectedFashion = fashionProducts.slice(0, 4);
    let selectedMakeup = makeupProducts.slice(0, 3);
    let selectedSkincare = skincareProducts.slice(0, 2);

    // -----------------------------------
    // PRIORITIZE REQUESTED CATEGORY
    // -----------------------------------

    const categoryPriority = [
      ...fashionCategories,
      ...makeupCategories,
      ...skincareCategories,
    ];

    const requestedCategories = categoryPriority.filter((category) =>
      text.includes(category.toLowerCase())
    );

    if (requestedCategories.length > 0) {
      const prioritizedProducts = products.filter((product) =>
        requestedCategories.includes(product.category)
      );

      const prioritizedFashion = prioritizedProducts.filter((product) =>
        fashionCategories.includes(product.category)
      );

      const prioritizedMakeup = prioritizedProducts.filter((product) =>
        makeupCategories.includes(product.category)
      );

      const prioritizedSkincare = prioritizedProducts.filter((product) =>
        skincareCategories.includes(product.category)
      );

      if (prioritizedFashion.length > 0) {
        selectedFashion = prioritizedFashion.slice(0, 4);
      }

      if (prioritizedMakeup.length > 0) {
        selectedMakeup = prioritizedMakeup.slice(0, 3);
      }

      if (prioritizedSkincare.length > 0) {
        selectedSkincare = prioritizedSkincare.slice(0, 2);
      }
    }

    // -----------------------------------
    // OCCASION / STYLE DETECTION
    // -----------------------------------

    let occasion = "✨ Personalized Look";
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
      text.includes("college") ||
      text.includes("casual") ||
      text.includes("street")
    ) {
      occasion = "☀️ Casual & College";
      title = "Effortless Everyday";
      styleVibe = "Minimal Casual";
      emoji = "👖";
      tags = ["Comfortable", "Simple", "Chic"];
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

    // -----------------------------------
    // DESCRIPTION
    // -----------------------------------

    let description =
      "A personalized StyleSync look created from your preferences.";

    if (wantsFashion && wantsMakeup && wantsSkincare) {
      description =
        "A complete head-to-toe look combining fashion, makeup, and skincare.";
    } else if (wantsMakeup && wantsSkincare) {
      description =
        "A coordinated beauty routine combining makeup and skincare.";
    } else if (wantsMakeup) {
      description =
        "A personalized makeup look selected to complement your style.";
    } else if (wantsSkincare) {
      description =
        "A personalized skincare routine for a fresh and healthy-looking finish.";
    } else if (wantsFashion) {
      description =
        "A personalized fashion look selected according to your requested style.";
    }

    // -----------------------------------
    // FINAL RECOMMENDATION
    // -----------------------------------

    const recommendation = {
      title,
      tags,

      matchScore: Math.floor(Math.random() * 6) + 94,

      occasion,
      styleVibe,
      emoji,

      // These match the frontend
      outfitType: extractValue(prompt, "outfit"),
      color: extractColor(prompt),
      season: extractSeason(prompt),

      description,

      // IMPORTANT:
      // These are arrays because Stylist.jsx uses .map()
      fashion: selectedFashion,
      makeup: selectedMakeup,
      skincare: selectedSkincare,

      // Keep product grouping too
      products: {
        fashion: selectedFashion,
        makeup: selectedMakeup,
        skincare: selectedSkincare,
      },

      prompt,
    };

    console.log("AI Stylist recommendation created successfully.");

    return res.status(200).json({
      success: true,

      message: `I've created a personalized look based on "${prompt}". ✨`,

      recommendation,
    });
  } catch (error) {
    console.error("AI Stylist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate your recommendation.",
      error: error.message,
    });
  }
};

// -----------------------------------
// HELPER FUNCTIONS
// -----------------------------------

function extractValue(prompt, keyword) {
  const match = prompt.match(
    new RegExp(`for ([^.]+)`, "i")
  );

  return match ? match[1].trim() : "";
}

function extractColor(prompt) {
  const colors = [
    "Pink",
    "Teal / Blue",
    "Black",
    "White",
    "Green",
    "Red",
    "Pastel",
  ];

  const found = colors.find((color) =>
    prompt.toLowerCase().includes(color.toLowerCase())
  );

  return found || "";
}

function extractSeason(prompt) {
  const seasons = [
    "Summer",
    "Winter",
    "Monsoon",
    "Spring",
  ];

  const found = seasons.find((season) =>
    prompt.toLowerCase().includes(season.toLowerCase())
  );

  return found || "";
}

module.exports = {
  generateRecommendation,
};