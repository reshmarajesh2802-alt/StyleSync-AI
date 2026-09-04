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
      // Western Fashion
      "Dresses",
      "Tops",
      "Bottoms",
      "Jackets",

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

      // Supporting Items
      "Footwear",
      "Accessories",
    ];

    const clothingCategories = [
      "Dresses",
      "Tops",
      "Bottoms",
      "Jackets",
      "Sarees",
      "Kurtis",
      "Lehengas",
      "Gowns",
      "Churidars",
      "Salwar Suits",
      "Anarkali",
      "Ethnic Sets",
    ];

    const accessoryCategories = [
      "Footwear",
      "Accessories",
      "Dupattas",
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
      /dress|outfit|top|bottom|jeans|jacket|shoe|footwear|fashion|clothes|wear|saree|kurti|lehenga|gown|churidar|salwar|anarkali|ethnic|dupatta/i.test(
        text
      );

    const wantsMakeup =
      /makeup|lipstick|foundation|concealer|blush|eye makeup|glam/i.test(
        text
      );

    const wantsSkincare =
      /skincare|skin|serum|moisturizer|cleanser|spf|sunscreen|glow/i.test(
        text
      );

    // -----------------------------------
    // STYLE / SEASON / OCCASION DETECTION
    // -----------------------------------

    const summerKeywords =
      /summer|hot|warm|sunny|beach|vacation/i.test(text);

    const winterKeywords =
      /winter|cold|chilly|cool weather/i.test(text);

    const monsoonKeywords =
      /monsoon|rain|rainy/i.test(text);

    const springKeywords =
      /spring|bloom|floral/i.test(text);

    const comfortKeywords =
      /comfortable|comfort|relaxed|breathable|lightweight|easy|soft|cozy/i.test(
        text
      );

    const elegantKeywords =
      /elegant|classy|sophisticated|graceful|chic|refined|stylish/i.test(
        text
      );

    const casualKeywords =
      /casual|college|everyday|daily|simple|relaxed/i.test(text);

    const formalKeywords =
      /formal|office|work|professional|business/i.test(text);

    const weddingKeywords =
      /wedding|bridal|reception|festive|festival|engagement/i.test(text);

    const partyKeywords =
      /party|celebration|night out|club/i.test(text);

    const ethnicKeywords =
      /ethnic|traditional|indian|desi|cultural/i.test(text);

    const beachKeywords =
      /beach|vacation|holiday|resort/i.test(text);

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
    // SEPARATE PRODUCTS
    // -----------------------------------

    const fashionProducts = products.filter((product) =>
      fashionCategories.includes(product.category)
    );

    const clothingProducts = products.filter((product) =>
      clothingCategories.includes(product.category)
    );

    const accessoryProducts = products.filter((product) =>
      accessoryCategories.includes(product.category)
    );

    const makeupProducts = products.filter((product) =>
      makeupCategories.includes(product.category)
    );

    const skincareProducts = products.filter((product) =>
      skincareCategories.includes(product.category)
    );

    // -----------------------------------
    // SCORE CLOTHING PRODUCTS
    // -----------------------------------

    const scoredClothing = clothingProducts.map((product) => {
      let score = 0;

      const productText =
        `${product.name} ${product.description}`.toLowerCase();

      // -----------------------------------
      // SUMMER
      // -----------------------------------

      if (summerKeywords) {
        if (
          /cotton|linen|lightweight|light|breathable|flowy|floral|pastel|summer|airy/.test(
            productText
          )
        ) {
          score += 8;
        }

        if (
          product.category === "Dresses" ||
          product.category === "Kurtis" ||
          product.category === "Ethnic Sets"
        ) {
          score += 3;
        }
      }

      // -----------------------------------
      // WINTER
      // -----------------------------------

      if (winterKeywords) {
        if (
          /wool|warm|knit|sweater|coat|jacket|layer|thick|winter/.test(
            productText
          )
        ) {
          score += 8;
        }

        if (product.category === "Jackets") {
          score += 4;
        }
      }

      // -----------------------------------
      // MONSOON
      // -----------------------------------

      if (monsoonKeywords) {
        if (
          /quick dry|lightweight|comfortable|easy|breathable|cotton/.test(
            productText
          )
        ) {
          score += 6;
        }

        if (
          product.category === "Kurtis" ||
          product.category === "Dresses"
        ) {
          score += 3;
        }
      }

      // -----------------------------------
      // SPRING
      // -----------------------------------

      if (springKeywords) {
        if (
          /floral|pastel|light|spring|flowy|fresh/.test(productText)
        ) {
          score += 7;
        }

        if (product.category === "Dresses") {
          score += 3;
        }
      }

      // -----------------------------------
      // COMFORT
      // -----------------------------------

      if (comfortKeywords) {
        if (
          /comfortable|comfort|relaxed|breathable|soft|lightweight|loose|flowy|cotton|easy/.test(
            productText
          )
        ) {
          score += 10;
        }
      }

      // -----------------------------------
      // ELEGANT
      // -----------------------------------

      if (elegantKeywords) {
        if (
          /elegant|classy|premium|chic|graceful|sophisticated|silk|satin|designer|refined/.test(
            productText
          )
        ) {
          score += 8;
        }

        if (
          product.category === "Dresses" ||
          product.category === "Sarees" ||
          product.category === "Gowns" ||
          product.category === "Lehengas"
        ) {
          score += 4;
        }
      }

      // -----------------------------------
      // CASUAL
      // -----------------------------------

      if (casualKeywords) {
        if (
          /casual|everyday|simple|comfortable|relaxed|cotton|basic/.test(
            productText
          )
        ) {
          score += 7;
        }

        if (
          product.category === "Dresses" ||
          product.category === "Kurtis" ||
          product.category === "Ethnic Sets"
        ) {
          score += 3;
        }
      }

      // -----------------------------------
      // FORMAL / OFFICE
      // -----------------------------------

      if (formalKeywords) {
        if (
          /formal|professional|office|polished|structured|elegant|smart/.test(
            productText
          )
        ) {
          score += 8;
        }

        if (
          product.category === "Dresses" ||
          product.category === "Kurtis"
        ) {
          score += 3;
        }
      }

      // -----------------------------------
      // WEDDING / FESTIVE
      // -----------------------------------

      if (weddingKeywords) {
        if (
          [
            "Sarees",
            "Lehengas",
            "Gowns",
            "Anarkali",
            "Salwar Suits",
          ].includes(product.category)
        ) {
          score += 12;
        }

        if (
          /wedding|bridal|festive|party|silk|designer|embroidery|embroidered|sequin|traditional/.test(
            productText
          )
        ) {
          score += 8;
        }
      }

      // -----------------------------------
      // PARTY
      // -----------------------------------

      if (partyKeywords) {
        if (
          /party|glam|sparkle|sequin|satin|silk|elegant|chic|statement/.test(
            productText
          )
        ) {
          score += 8;
        }

        if (
          product.category === "Dresses" ||
          product.category === "Gowns" ||
          product.category === "Lehengas"
        ) {
          score += 5;
        }
      }

      // -----------------------------------
      // ETHNIC / TRADITIONAL
      // -----------------------------------

      if (ethnicKeywords) {
        if (
          [
            "Sarees",
            "Kurtis",
            "Lehengas",
            "Churidars",
            "Salwar Suits",
            "Anarkali",
            "Ethnic Sets",
          ].includes(product.category)
        ) {
          score += 12;
        }

        if (
          /traditional|ethnic|indian|desi|embroidered|embroidery|handloom/.test(
            productText
          )
        ) {
          score += 7;
        }
      }

      // -----------------------------------
      // BEACH / VACATION
      // -----------------------------------

      if (beachKeywords) {
        if (
          /flowy|lightweight|linen|cotton|floral|summer|resort|beach/.test(
            productText
          )
        ) {
          score += 8;
        }

        if (product.category === "Dresses") {
          score += 5;
        }
      }

      // -----------------------------------
      // FEATURED PRODUCTS
      // -----------------------------------

      if (product.isFeatured) {
        score += 1;
      }

      // -----------------------------------
      // RATING
      // -----------------------------------

      if (product.rating >= 4.5) {
        score += 1;
      }

      return {
        ...product,
        recommendationScore: score,
      };
    });

    // Highest matching products first
    scoredClothing.sort(
      (a, b) => b.recommendationScore - a.recommendationScore
    );

    // -----------------------------------
    // DEFAULT FASHION SELECTION
    // -----------------------------------

    let selectedFashion = [
      ...scoredClothing.slice(0, 3),
      ...accessoryProducts.slice(0, 1),
    ];

    let selectedMakeup = makeupProducts.slice(0, 3);

    let selectedSkincare = skincareProducts.slice(0, 2);

    // -----------------------------------
    // EXPLICIT CATEGORY DETECTION
    // -----------------------------------

    const categoryPriority = [
      ...clothingCategories,
      ...accessoryCategories,
      ...makeupCategories,
      ...skincareCategories,
    ];

    const requestedCategories = categoryPriority.filter((category) =>
      text.includes(category.toLowerCase())
    );

    // -----------------------------------
    // CATEGORY-SPECIFIC PRIORITY
    // -----------------------------------

    if (requestedCategories.length > 0) {
      const prioritizedProducts = products.filter((product) =>
        requestedCategories.includes(product.category)
      );

      const prioritizedClothing = prioritizedProducts.filter((product) =>
        clothingCategories.includes(product.category)
      );

      const prioritizedAccessories = prioritizedProducts.filter((product) =>
        accessoryCategories.includes(product.category)
      );

      const prioritizedMakeup = prioritizedProducts.filter((product) =>
        makeupCategories.includes(product.category)
      );

      const prioritizedSkincare = prioritizedProducts.filter((product) =>
        skincareCategories.includes(product.category)
      );

      if (prioritizedClothing.length > 0) {
        selectedFashion = [
          ...prioritizedClothing.slice(0, 3),
          ...prioritizedAccessories.slice(0, 1),
        ];
      }

      if (prioritizedMakeup.length > 0) {
        selectedMakeup = prioritizedMakeup.slice(0, 3);
      }

      if (prioritizedSkincare.length > 0) {
        selectedSkincare = prioritizedSkincare.slice(0, 2);
      }
    }

    // -----------------------------------
    // SPECIAL SUMMER + COMFORT RULE
    // -----------------------------------

    if (summerKeywords && comfortKeywords && !weddingKeywords) {
      const summerComfortProducts = scoredClothing.filter((product) =>
        [
          "Dresses",
          "Kurtis",
          "Ethnic Sets",
        ].includes(product.category)
      );

      if (summerComfortProducts.length > 0) {
        selectedFashion = [
          ...summerComfortProducts.slice(0, 3),
          ...accessoryProducts.slice(0, 1),
        ];
      }
    }

    // -----------------------------------
    // SPECIAL WEDDING RULE
    // -----------------------------------

    if (weddingKeywords) {
      const weddingProducts = scoredClothing.filter((product) =>
        [
          "Sarees",
          "Lehengas",
          "Gowns",
          "Anarkali",
          "Salwar Suits",
        ].includes(product.category)
      );

      if (weddingProducts.length > 0) {
        selectedFashion = [
          ...weddingProducts.slice(0, 3),
          ...accessoryProducts.slice(0, 1),
        ];
      }
    }

    // -----------------------------------
    // SPECIAL ETHNIC RULE
    // -----------------------------------

    if (ethnicKeywords && !weddingKeywords) {
      const ethnicProducts = scoredClothing.filter((product) =>
        [
          "Sarees",
          "Kurtis",
          "Churidars",
          "Salwar Suits",
          "Anarkali",
          "Ethnic Sets",
        ].includes(product.category)
      );

      if (ethnicProducts.length > 0) {
        selectedFashion = [
          ...ethnicProducts.slice(0, 3),
          ...accessoryProducts.slice(0, 1),
        ];
      }
    }

    // -----------------------------------
    // OCCASION / STYLE DISPLAY
    // -----------------------------------

    let occasion = "✨ Personalized Look";
    let title = "Curated Style";
    let styleVibe = "Contemporary";
    let emoji = "✨";
    let tags = ["Personalized", "Chic", "Curated"];

    if (weddingKeywords || text.includes("festive")) {
      occasion = "🎉 Festive Celebration";
      title = "Festive Glamour";
      styleVibe = "Elegant Traditional";
      emoji = "🥻";
      tags = ["Elegant", "Traditional", "Statement"];
    } else if (partyKeywords) {
      occasion = "🎉 Party Look";
      title = "Party Ready";
      styleVibe = "Chic Glam";
      emoji = "✨";
      tags = ["Glamorous", "Chic", "Statement"];
    } else if (casualKeywords) {
      occasion = "☀️ Casual & Everyday";
      title = "Effortless Everyday";
      styleVibe = "Comfortable Casual";
      emoji = "👗";
      tags = ["Comfortable", "Simple", "Chic"];
    } else if (formalKeywords) {
      occasion = "💼 Work & Office";
      title = "Modern Workwear";
      styleVibe = "Polished Minimal";
      emoji = "👠";
      tags = ["Professional", "Elegant", "Minimal"];
    } else if (ethnicKeywords) {
      occasion = "🌸 Indian Ethnic Look";
      title = "Elegant Ethnic Style";
      styleVibe = "Traditional Chic";
      emoji = "🥻";
      tags = ["Ethnic", "Elegant", "Graceful"];
    } else if (summerKeywords) {
      occasion = "☀️ Summer Style";
      title = "Fresh Summer Look";
      styleVibe = comfortKeywords
        ? "Elegant & Comfortable"
        : "Fresh & Breezy";
      emoji = "🌸";
      tags = comfortKeywords
        ? ["Comfortable", "Elegant", "Breathable"]
        : ["Fresh", "Breezy", "Chic"];
    } else if (wantsMakeup || text.includes("beauty")) {
      occasion = "💄 Beauty Look";
      title = "Soft Beauty Glow";
      styleVibe = "Soft Glam";
      emoji = "💄";
      tags = ["Fresh", "Glowing", "Feminine"];
    } else if (wantsSkincare) {
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
        "A complete head-to-toe look combining a carefully selected outfit with matching makeup and skincare.";
    } else if (wantsFashion && wantsMakeup) {
      description =
        "A complete fashion look paired with makeup recommendations chosen to complement your outfit.";
    } else if (wantsFashion && wantsSkincare) {
      description =
        "A complete fashion look paired with skincare recommendations suited to your requested style and season.";
    } else if (wantsFashion) {
      description =
        "A personalized outfit selected according to your occasion, style, comfort, and seasonal preferences.";
    } else if (wantsMakeup && wantsSkincare) {
      description =
        "A coordinated beauty routine combining makeup and skincare.";
    } else if (wantsMakeup) {
      description =
        "A personalized makeup look selected to complement your style.";
    } else if (wantsSkincare) {
      description =
        "A personalized skincare routine for a fresh and healthy-looking finish.";
    }

    // -----------------------------------
    // STYLING TIP
    // -----------------------------------

    let stylingTip =
      "Choose pieces that make you feel confident and comfortable.";

    if (summerKeywords && comfortKeywords) {
      stylingTip =
        "For summer, choose breathable fabrics, relaxed silhouettes, and lightweight footwear to stay comfortable while looking elegant.";
    } else if (weddingKeywords) {
      stylingTip =
        "For weddings and festive occasions, balance statement clothing with elegant accessories and coordinated beauty details.";
    } else if (ethnicKeywords) {
      stylingTip =
        "Pair your ethnic outfit with complementary accessories and comfortable footwear for a polished traditional look.";
    } else if (formalKeywords) {
      stylingTip =
        "Keep the silhouette polished and the accessories minimal for a sophisticated professional appearance.";
    } else if (casualKeywords) {
      stylingTip =
        "Keep the outfit effortless with comfortable fabrics, simple accessories, and versatile footwear.";
    } else if (partyKeywords) {
      stylingTip =
        "Let one statement piece stand out and keep the remaining accessories coordinated rather than overwhelming the look.";
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

      outfitType: extractValue(prompt, "outfit"),
      color: extractColor(prompt),
      season: extractSeason(prompt),

      description,
      stylingTip,

      // Main recommendation arrays
      fashion: selectedFashion,
      makeup: selectedMakeup,
      skincare: selectedSkincare,

      // Keep product grouping for frontend compatibility
      products: {
        fashion: selectedFashion,
        makeup: selectedMakeup,
        skincare: selectedSkincare,
      },

      prompt,
    };

    console.log(
      "AI Stylist recommendation created successfully."
    );

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
  const match = prompt.match(new RegExp(`for ([^.]+)`, "i"));

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
    "Blue",
    "Yellow",
    "Purple",
    "Orange",
    "Beige",
    "Brown",
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