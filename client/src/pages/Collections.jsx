import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Collections() {
  const navigate = useNavigate();
  const [selectedCollection, setSelectedCollection] = useState(null);

  const collections = [
    {
      emoji: "👗",
      title: "Elegant",
      description: "Timeless looks for special occasions.",
      outfits: ["Saree", "Long Dress", "Anarkali"],
      shoes: ["Heels", "Elegant Flats"],
      accessories: ["Pearl Earrings", "Clutch", "Minimal Bracelet"],
      occasions: ["Wedding", "Formal Events", "Dinner"],
    },
    {
      emoji: "👚",
      title: "Casual",
      description: "Effortless styles for everyday life.",
      outfits: ["Kurti & Jeans", "T-Shirt & Jeans", "Casual Dress"],
      shoes: ["Sneakers", "Flats", "Loafers"],
      accessories: ["Tote Bag", "Watch", "Simple Earrings"],
      occasions: ["College", "Shopping", "Everyday"],
    },
    {
      emoji: "🧥",
      title: "Streetwear",
      description: "Bold looks with a modern edge.",
      outfits: ["Oversized T-Shirt", "Cargo Pants", "Oversized Hoodie"],
      shoes: ["Sneakers", "Chunky Shoes"],
      accessories: ["Crossbody Bag", "Cap", "Sunglasses"],
      occasions: ["Casual Outings", "Concerts", "City Trips"],
    },
    {
      emoji: "👠",
      title: "Party",
      description: "Stand out and make every moment memorable.",
      outfits: ["Party Dress", "Stylish Jumpsuit", "Lehenga"],
      shoes: ["Heels", "Platform Sandals"],
      accessories: ["Statement Earrings", "Clutch", "Bracelet"],
      occasions: ["Party", "Birthday", "Night Out"],
    },
  ];

  return (
    <div className="min-h-screen bg-black px-6 py-24 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Navigation Back Link */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-10 text-sm text-gray-400 transition hover:text-white"
        >
          ← Back to Dashboard
        </button>

        {/* Section Header */}
        <div className="mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-400">
            StyleSync AI
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Fashion <span className="text-pink-300">Collections</span>
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-400">
            Discover curated fashion collections designed for different moods,
            occasions, and personal styles.
          </p>
        </div>

        {/* Collection Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <button
              key={collection.title}
              type="button"
              onClick={() => setSelectedCollection(collection)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-pink-400/40 hover:bg-white/10"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl" />

              <div className="relative text-6xl transition duration-300 group-hover:scale-110">
                {collection.emoji}
              </div>

              <h2 className="relative mt-8 text-2xl font-semibold">
                {collection.title}
              </h2>

              <p className="relative mt-3 text-sm leading-6 text-gray-400">
                {collection.description}
              </p>

              <p className="relative mt-6 text-sm font-medium text-pink-300">
                Explore Collection →
              </p>
            </button>
          ))}
        </div>

        {/* Selected Collection Detail Panel */}
        {selectedCollection && (
          <div className="mt-10 rounded-3xl border border-pink-400/20 bg-white/5 p-8 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedCollection.emoji}</span>

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-pink-400">
                      Style Collection
                    </p>

                    <h2 className="mt-1 text-3xl font-bold">
                      {selectedCollection.title}
                    </h2>
                  </div>
                </div>

                <p className="mt-5 text-gray-400">
                  {selectedCollection.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCollection(null)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Close details"
              >
                Close ✕
              </button>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <CollectionDetail
                title="👗 Outfits"
                items={selectedCollection.outfits}
              />

              <CollectionDetail
                title="👠 Shoes"
                items={selectedCollection.shoes}
              />

              <CollectionDetail
                title="💎 Accessories"
                items={selectedCollection.accessories}
              />

              <CollectionDetail
                title="✨ Best For"
                items={selectedCollection.occasions}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CollectionDetail({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <h3 className="text-sm font-medium text-pink-300">{title}</h3>

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <p key={item} className="text-sm text-gray-400">
            • {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Collections;