import React, { useState } from "react";

export function Collections() {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const collections = [
    {
      id: "elegant",
      emoji: "👗",
      title: "Festive & Elegant",
      description: "Timeless looks and curated silhouettes for special celebrations and weddings.",
      outfits: ["Saree", "Anarkali Suit", "Teal / Blue Dress", "Silk Kurta Set"],
      shoes: ["Embellished Heels", "Traditional Juttis", "Minimal Strappy Sandals"],
      accessories: ["Teardrop Earrings", "Pearl Clutch", "Minimal Bracelet", "Statement Ring"],
      occasions: ["Festive Celebration", "Weddings", "Gala Events", "Dinner Parties"],
    },
    {
      id: "casual",
      emoji: "👚",
      title: "Casual Chic",
      description: "Effortless, modern styles tailored for everyday comfort.",
      outfits: ["Kurti & Denim", "Oversized Knit & Jeans", "Linen Shirt Dress"],
      shoes: ["Clean White Sneakers", "Leather Flats", "Loafers"],
      accessories: ["Canvas Tote Bag", "Minimalist Watch", "Delicate Hoop Earrings"],
      occasions: ["College & Work", "Shopping Trips", "Weekend Brunches"],
    },
    {
      id: "streetwear",
      emoji: "🧥",
      title: "Streetwear Luxe",
      description: "Bold looks with structural silhouettes and a modern edge.",
      outfits: ["Graphic Oversized Tee", "Tailored Cargo Pants", "Cropped Hoodie"],
      shoes: ["Chunky Platform Sneakers", "High-Top Trainers", "Combat Boots"],
      accessories: ["Crossbody Sling", "Structured Cap", "Retro Sunglasses"],
      occasions: ["Casual Outings", "Concerts & Festivals", "City Explorations"],
    },
    {
      id: "party",
      emoji: "👠",
      title: "Glam Party",
      description: "Eye-catching ensembles made to turn heads and stand out.",
      outfits: ["Satin Slip Dress", "Tailored Jumpsuit", "Embellished Lehenga"],
      shoes: ["Stiletto Heels", "Metallic Platform Sandals"],
      accessories: ["Chandelier Earrings", "Crystal Clutch", "Layered Cuff"],
      occasions: ["Night Out", "Birthday Parties", "Cocktail Hours"],
    },
  ];

  const toggleFavorite = (item) => {
    setFavoriteItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <section id="collections" className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-pink-400">
              Explore Your Style
            </p>
            <h2 className="text-4xl font-bold sm:text-5xl">
              Fashion for <span className="text-pink-300">Every Mood.</span>
            </h2>
          </div>
          <p className="max-w-md text-gray-400">
            Discover collections designed for different personalities, occasions, and individual aesthetics.
          </p>
        </div>

        {/* Collection Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => {
            const isSelected = selectedCollection?.id === collection.id;
            return (
              <button
                key={collection.id}
                type="button"
                onClick={() => setSelectedCollection(isSelected ? null : collection)}
                className={`group relative overflow-hidden rounded-3xl border p-8 text-left transition duration-300 hover:-translate-y-2 ${
                  isSelected
                    ? "border-pink-400/80 bg-pink-500/10 shadow-2xl shadow-pink-500/10"
                    : "border-white/10 bg-white/5 hover:border-pink-400/40 hover:bg-white/10"
                }`}
              >
                {/* Decorative Glow */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl transition duration-300 group-hover:bg-pink-500/20" />

                {/* Emoji Icon */}
                <div className="relative mb-12 text-7xl transition duration-300 group-hover:scale-110">
                  {collection.emoji}
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-semibold">{collection.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">{collection.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-pink-300 transition duration-300 group-hover:translate-x-1">
                    {isSelected ? "Hide Breakdown ↑" : "Explore Collection →"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded Collection Drawer */}
        {selectedCollection && (
          <div className="mt-10 rounded-3xl border border-pink-400/20 bg-white/5 p-8 backdrop-blur-xl transition duration-500 md:p-10">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{selectedCollection.emoji}</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-pink-400">
                    Style Collection
                  </p>
                  <h3 className="mt-1 text-3xl font-bold">{selectedCollection.title}</h3>
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

            {/* Categorized Items Grid */}
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {/* Outfits */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  👗 Outfits
                </p>
                <div className="mt-4 space-y-2">
                  {selectedCollection.outfits.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleFavorite(item)}
                      className="flex w-full items-center justify-between text-left text-sm text-gray-300 transition hover:text-pink-200"
                    >
                      <span>• {item}</span>
                      <span className="text-xs">{favoriteItems.includes(item) ? "💖" : "🤍"}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footwear */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  👠 Footwear
                </p>
                <div className="mt-4 space-y-2">
                  {selectedCollection.shoes.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleFavorite(item)}
                      className="flex w-full items-center justify-between text-left text-sm text-gray-300 transition hover:text-pink-200"
                    >
                      <span>• {item}</span>
                      <span className="text-xs">{favoriteItems.includes(item) ? "💖" : "🤍"}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Jewelry & Accessories */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  💎 Accessories
                </p>
                <div className="mt-4 space-y-2">
                  {selectedCollection.accessories.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleFavorite(item)}
                      className="flex w-full items-center justify-between text-left text-sm text-gray-300 transition hover:text-pink-200"
                    >
                      <span>• {item}</span>
                      <span className="text-xs">{favoriteItems.includes(item) ? "💖" : "🤍"}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Occasions */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  ✨ Best For
                </p>
                <div className="mt-4 space-y-2">
                  {selectedCollection.occasions.map((item) => (
                    <p key={item} className="text-sm text-gray-300">
                      • {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Saved Items Summary */}
            {favoriteItems.length > 0 && (
              <div className="mt-8 flex items-center justify-between rounded-xl border border-pink-400/30 bg-pink-500/10 px-5 py-3 text-xs text-pink-200">
                <span>Saved Mix & Match Pieces: <strong>{favoriteItems.join(", ")}</strong></span>
                <button
                  onClick={() => setFavoriteItems([])}
                  className="text-pink-400 underline hover:text-pink-300"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Collections;