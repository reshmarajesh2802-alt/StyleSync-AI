import React, { useState } from "react";

export function Collections() {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const collections = [
    // =====================================================
    // 1. FESTIVE & ELEGANT
    // =====================================================
    {
      id: "elegant",
      emoji: "👗",
      title: "Festive & Elegant",
      description:
        "Timeless women's dresses, elegant accessories and beauty essentials for celebrations, weddings and special occasions.",

      outfits: [
        "Floral Summer Dress",
        "Satin Party Dress",
        "Elegant Black Evening Dress",
        "Pastel Midi Dress",
        "Floral Wrap Dress",
        "Lavender Floral Dress",
        "Chic White Summer Dress",
        "Pleated Maxi Dress",
        "Champagne Satin Dress",
      ],

      shoes: [
        "Elegant Heels",
        "Classic Nude Heels",
        "Minimal Strappy Sandals",
        "Embellished Heels",
      ],

      accessories: [
        "Elegant Pearl Necklace",
        "Minimal Shoulder Bag",
        "Classic Sunglasses",
        "Statement Earrings",
        "Pearl Clutch",
      ],

      beauty: [
        "Berry Red Lipstick",
        "Velvet Matte Lipstick - Rose",
        "Radiant Skin Foundation",
        "Full Coverage Concealer",
        "Rose Pink Blush",
        "Rose Gold Eyeshadow Palette",
        "Volume Boost Mascara",
        "Hydrating Face Serum",
        "Daily Sunscreen SPF 50",
      ],

      occasions: [
        "Festive Celebrations",
        "Weddings",
        "Engagements",
        "Gala Events",
        "Dinner Parties",
      ],
    },

    // =====================================================
    // 2. CASUAL CHIC
    // =====================================================
    {
      id: "casual",
      emoji: "👚",
      title: "Casual Chic",
      description:
        "Effortless women's fashion and everyday beauty essentials designed for comfortable and stylish daily looks.",

      outfits: [
        "Floral Summer Dress",
        "Pastel Midi Dress",
        "Floral Wrap Dress",
        "Chic White Summer Dress",
        "Floral Casual Maxi Dress",
        "Classic White Top",
        "Beige Casual Shirt",
        "Pastel Crop Top",
        "Floral Blouse",
        "Relaxed Fit Jeans",
        "High Waist Blue Jeans",
        "Pleated Midi Skirt",
      ],

      shoes: [
        "White Casual Sneakers",
        "Leather Flats",
        "Minimal Strappy Sandals",
        "Casual Slip-On Shoes",
      ],

      accessories: [
        "Minimal Shoulder Bag",
        "Classic Sunglasses",
        "Canvas Tote Bag",
        "Delicate Hoop Earrings",
        "Minimal Bracelet",
      ],

      beauty: [
        "Nude Glow Lipstick",
        "Soft Pink Lip Gloss",
        "Natural Finish Foundation",
        "Brightening Concealer",
        "Peach Glow Blush",
        "Classic Black Eyeliner",
        "Volume Boost Mascara",
        "Gentle Face Cleanser",
        "Daily Moisturizing Cream",
        "Daily Sunscreen SPF 50",
      ],

      occasions: [
        "College & Work",
        "Shopping Trips",
        "Coffee Dates",
        "Weekend Brunches",
        "Everyday Wear",
      ],
    },

    // =====================================================
    // 3. STREETWEAR LUXE
    // =====================================================
    {
      id: "streetwear",
      emoji: "🧥",
      title: "Streetwear Luxe",
      description:
        "Modern women's fashion with relaxed silhouettes, statement pieces and effortless beauty essentials.",

      outfits: [
        "Oversized Denim Jacket",
        "Cropped Beige Jacket",
        "Pastel Crop Top",
        "Classic White Top",
        "Beige Casual Shirt",
        "Relaxed Fit Jeans",
        "High Waist Blue Jeans",
        "Wide Leg Trousers",
        "Floral Casual Maxi Dress",
      ],

      shoes: [
        "White Casual Sneakers",
        "Chunky Platform Sneakers",
        "High-Top Trainers",
        "Casual Boots",
      ],

      accessories: [
        "Classic Sunglasses",
        "Minimal Shoulder Bag",
        "Crossbody Sling Bag",
        "Structured Cap",
        "Layered Necklace",
      ],

      beauty: [
        "Velvet Matte Lipstick - Rose",
        "Classic Black Eyeliner",
        "Nude Eyeshadow Palette",
        "Volume Boost Mascara",
        "Rose Pink Blush",
        "Beauty Blender Sponge",
        "Professional Makeup Brush Set",
        "Vitamin C Face Serum",
      ],

      occasions: [
        "Casual Outings",
        "Concerts & Festivals",
        "City Explorations",
        "Shopping",
        "Weekend Hangouts",
      ],
    },

    // =====================================================
    // 4. GLAM PARTY
    // =====================================================
    {
      id: "party",
      emoji: "👠",
      title: "Glam Party",
      description:
        "Statement women's dresses, glamorous footwear, accessories and makeup designed for unforgettable nights.",

      outfits: [
        "Satin Party Dress",
        "Elegant Red Cocktail Dress",
        "Pink Party Dress",
        "Champagne Satin Dress",
        "Elegant Black Evening Dress",
        "Pleated Maxi Dress",
        "Floral Wrap Dress",
        "Chic White Summer Dress",
      ],

      shoes: [
        "Elegant Heels",
        "Classic Nude Heels",
        "Embellished Heels",
        "Metallic Platform Sandals",
        "Stiletto Heels",
      ],

      accessories: [
        "Elegant Pearl Necklace",
        "Pearl Clutch",
        "Minimal Shoulder Bag",
        "Statement Earrings",
        "Crystal Clutch",
        "Layered Cuff",
      ],

      beauty: [
        "Berry Red Lipstick",
        "Velvet Matte Lipstick - Rose",
        "Radiant Skin Foundation",
        "Full Coverage Concealer",
        "Peach Glow Blush",
        "Rose Pink Blush",
        "Rose Gold Eyeshadow Palette",
        "Nude Eyeshadow Palette",
        "Classic Black Eyeliner",
        "Volume Boost Mascara",
      ],

      occasions: [
        "Night Out",
        "Birthday Parties",
        "Cocktail Hours",
        "Date Nights",
        "Celebrations",
      ],
    },

    // =====================================================
    // 5. SUMMER BLOOM
    // =====================================================
    {
      id: "summer",
      emoji: "🌸",
      title: "Summer Bloom",
      description:
        "Fresh floral dresses, lightweight outfits and soft beauty essentials for bright and relaxed summer days.",

      outfits: [
        "Floral Summer Dress",
        "Floral Wrap Dress",
        "Chic White Summer Dress",
        "Pastel Midi Dress",
        "Floral Casual Maxi Dress",
        "Lavender Floral Dress",
        "Floral Blouse",
        "Pastel Crop Top",
      ],

      shoes: [
        "White Casual Sneakers",
        "Minimal Strappy Sandals",
        "Leather Flats",
      ],

      accessories: [
        "Classic Sunglasses",
        "Minimal Shoulder Bag",
        "Elegant Pearl Necklace",
        "Delicate Hoop Earrings",
      ],

      beauty: [
        "Soft Pink Lip Gloss",
        "Nude Glow Lipstick",
        "Peach Glow Blush",
        "Natural Finish Foundation",
        "Brightening Concealer",
        "Hydrating Face Serum",
        "Gentle Face Cleanser",
        "Daily Moisturizing Cream",
        "Daily Sunscreen SPF 50",
      ],

      occasions: [
        "Beach Trips",
        "Summer Brunches",
        "Day Outings",
        "Vacations",
        "Casual Dates",
      ],
    },

    // =====================================================
    // 6. MODERN WORKWEAR
    // =====================================================
    {
      id: "office",
      emoji: "💼",
      title: "Modern Workwear",
      description:
        "Polished women's outfits, sophisticated accessories and subtle beauty essentials for professional looks.",

      outfits: [
        "Satin Blouse",
        "Beige Casual Shirt",
        "Classic White Top",
        "Wide Leg Trousers",
        "High Waist Blue Jeans",
        "Pleated Midi Skirt",
        "Pastel Midi Dress",
        "Elegant Black Evening Dress",
      ],

      shoes: [
        "Classic Nude Heels",
        "Leather Flats",
        "White Casual Sneakers",
      ],

      accessories: [
        "Minimal Shoulder Bag",
        "Classic Sunglasses",
        "Minimal Bracelet",
        "Elegant Pearl Necklace",
      ],

      beauty: [
        "Nude Glow Lipstick",
        "Natural Finish Foundation",
        "Brightening Concealer",
        "Peach Glow Blush",
        "Classic Black Eyeliner",
        "Volume Boost Mascara",
        "Daily Moisturizing Cream",
        "Daily Sunscreen SPF 50",
      ],

      occasions: [
        "Office",
        "Meetings",
        "Presentations",
        "Business Events",
        "Professional Gatherings",
      ],
    },

    // =====================================================
    // 7. BEAUTY ESSENTIALS
    // =====================================================
    {
      id: "beauty",
      emoji: "💄",
      title: "Beauty Essentials",
      description:
        "A complete collection of makeup and skincare essentials for everyday beauty, soft glam and special occasions.",

      outfits: [
        "Natural Everyday Look",
        "Soft Glam Look",
        "Fresh Summer Look",
        "Party Ready Look",
      ],

      shoes: [
        "Classic Nude Heels",
        "Minimal Strappy Sandals",
      ],

      accessories: [
        "Minimal Shoulder Bag",
        "Classic Sunglasses",
      ],

      beauty: [
        "Velvet Matte Lipstick - Rose",
        "Nude Glow Lipstick",
        "Berry Red Lipstick",
        "Soft Pink Lip Gloss",

        "Hydrating Liquid Foundation",
        "Radiant Skin Foundation",
        "Natural Finish Foundation",

        "Brightening Concealer",
        "Full Coverage Concealer",

        "Peach Glow Blush",
        "Rose Pink Blush",

        "Classic Black Eyeliner",
        "Volume Boost Mascara",
        "Nude Eyeshadow Palette",
        "Rose Gold Eyeshadow Palette",

        "Professional Makeup Brush Set",
        "Beauty Blender Sponge",
        "Travel Makeup Brush Kit",

        "Hydrating Face Serum",
        "Daily Moisturizing Cream",
        "Gentle Face Cleanser",
        "Daily Sunscreen SPF 50",
        "Overnight Hydrating Mask",
        "Vitamin C Face Serum",
      ],

      occasions: [
        "Everyday Makeup",
        "Soft Glam",
        "Party Makeup",
        "Skincare Routine",
        "Special Occasions",
      ],
    },
  ];

  // =====================================================
  // FAVORITES
  // =====================================================

  const toggleFavorite = (item) => {
    setFavoriteItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <section
      id="collections"
      className="min-h-screen bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-pink-400">
              Explore Your Style
            </p>

            <h2 className="text-4xl font-bold sm:text-5xl">
              Fashion &{" "}
              <span className="text-pink-300">
                Beauty for Every Mood.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-gray-400">
            Discover curated women's fashion, makeup and skincare
            collections designed for different personalities,
            occasions and individual aesthetics.
          </p>
        </div>

        {/* =================================================
            COLLECTION CARDS
        ================================================= */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => {
            const isSelected =
              selectedCollection?.id === collection.id;

            return (
              <button
                key={collection.id}
                type="button"
                onClick={() =>
                  setSelectedCollection(
                    isSelected ? null : collection
                  )
                }
                className={`group relative overflow-hidden rounded-3xl border p-8 text-left transition duration-300 hover:-translate-y-2 ${
                  isSelected
                    ? "border-pink-400/80 bg-pink-500/10 shadow-2xl shadow-pink-500/10"
                    : "border-white/10 bg-white/5 hover:border-pink-400/40 hover:bg-white/10"
                }`}
              >
                {/* Glow */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl transition duration-300 group-hover:bg-pink-500/20" />

                {/* Icon */}
                <div className="relative mb-12 text-7xl transition duration-300 group-hover:scale-110">
                  {collection.emoji}
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-semibold">
                    {collection.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {collection.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-pink-300 transition duration-300 group-hover:translate-x-1">
                    {isSelected
                      ? "Hide Breakdown ↑"
                      : "Explore Collection →"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* =================================================
            EXPANDED COLLECTION
        ================================================= */}

        {selectedCollection && (
          <div className="mt-10 rounded-3xl border border-pink-400/20 bg-white/5 p-8 backdrop-blur-xl md:p-10">

            {/* Collection Header */}

            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div className="flex items-center gap-4">
                <span className="text-5xl">
                  {selectedCollection.emoji}
                </span>

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-pink-400">
                    Style Collection
                  </p>

                  <h3 className="mt-1 text-3xl font-bold">
                    {selectedCollection.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCollection(null)}
                className="self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Close ✕
              </button>
            </div>

            {/* =================================================
                CATEGORY GRID
            ================================================= */}

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {/* =================================================
                  OUTFITS
              ================================================= */}

              <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  👗 Women's Fashion
                </p>

                <div className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-2">
                  {selectedCollection.outfits.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleFavorite(item)}
                      className="flex w-full items-center justify-between text-left text-sm text-gray-300 transition hover:text-pink-200"
                    >
                      <span>• {item}</span>

                      <span className="text-xs">
                        {favoriteItems.includes(item)
                          ? "💖"
                          : "🤍"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* =================================================
                  FOOTWEAR
              ================================================= */}

              <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  👠 Footwear
                </p>

                <div className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-2">
                  {selectedCollection.shoes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleFavorite(item)}
                      className="flex w-full items-center justify-between text-left text-sm text-gray-300 transition hover:text-pink-200"
                    >
                      <span>• {item}</span>

                      <span className="text-xs">
                        {favoriteItems.includes(item)
                          ? "💖"
                          : "🤍"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* =================================================
                  ACCESSORIES
              ================================================= */}

              <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  💎 Accessories
                </p>

                <div className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-2">
                  {selectedCollection.accessories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleFavorite(item)}
                      className="flex w-full items-center justify-between text-left text-sm text-gray-300 transition hover:text-pink-200"
                    >
                      <span>• {item}</span>

                      <span className="text-xs">
                        {favoriteItems.includes(item)
                          ? "💖"
                          : "🤍"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* =================================================
                  BEAUTY
              ================================================= */}

              <div className="rounded-2xl border border-pink-400/20 bg-pink-500/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  💄 Beauty
                </p>

                <div className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-2">
                  {selectedCollection.beauty.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleFavorite(item)}
                      className="flex w-full items-center justify-between text-left text-sm text-gray-300 transition hover:text-pink-200"
                    >
                      <span>• {item}</span>

                      <span className="text-xs">
                        {favoriteItems.includes(item)
                          ? "💖"
                          : "🤍"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* =================================================
                  OCCASIONS
              ================================================= */}

              <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  ✨ Best For
                </p>

                <div className="mt-4 space-y-2">
                  {selectedCollection.occasions.map((item) => (
                    <p
                      key={item}
                      className="text-sm text-gray-300"
                    >
                      • {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* =================================================
                  BEAUTY ROUTINE
              ================================================= */}

              <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  ✨ Complete the Look
                </p>

                <div className="mt-4 space-y-3 text-sm text-gray-300">
                  <p>💄 Choose your makeup shade</p>
                  <p>🌸 Add a natural blush</p>
                  <p>👁️ Complete your eye look</p>
                  <p>🧴 Follow your skincare routine</p>
                  <p>👗 Match your outfit</p>
                </div>
              </div>
            </div>

            {/* =================================================
                SAVED ITEMS
            ================================================= */}

            {favoriteItems.length > 0 && (
              <div className="mt-8 rounded-2xl border border-pink-400/30 bg-pink-500/10 p-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-pink-400">
                      Your Style Picks
                    </p>

                    <p className="mt-2 text-sm text-pink-100">
                      <strong>
                        {favoriteItems.length}
                      </strong>{" "}
                      items saved to your collection.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFavoriteItems([])}
                    className="rounded-full border border-pink-400/30 px-4 py-2 text-xs text-pink-300 transition hover:bg-pink-500/10"
                  >
                    Clear Selection
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {favoriteItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-gray-300"
                    >
                      💖 {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================
            BOTTOM BEAUTY BANNER
        ================================================= */}

        <div className="mt-16 overflow-hidden rounded-3xl border border-pink-400/10 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent p-8 sm:p-10">

          <div className="max-w-3xl">

            <p className="text-sm uppercase tracking-[0.3em] text-pink-400">
              StyleSync Beauty
            </p>

            <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
              Your outfit is only{" "}
              <span className="text-pink-300">
                half the look.
              </span>
            </h3>

            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              Complete your style with makeup and skincare essentials.
              Discover lip colors, foundation, blush, eye makeup,
              beauty tools and skincare products curated to complement
              your fashion choices.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "💄 Makeup",
                "💋 Lipsticks",
                "✨ Foundation",
                "🌸 Blush",
                "👁️ Eye Makeup",
                "🧴 Skincare",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Collections;