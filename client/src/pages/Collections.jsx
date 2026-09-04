import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Shirt,
  Heart,
  ShoppingBag,
  ArrowRight,
  X,
} from "lucide-react";

export function Collections() {
  const navigate = useNavigate();
  const [selectedCollection, setSelectedCollection] = useState(null);

  const collections = [
    {
      icon: Shirt,
      label: "FASHION",
      title: "Elegant",
      description: "Timeless feminine looks for special occasions.",
      accent: "from-pink-300/20 to-rose-400/5",
      outfits: ["Saree", "Long Dress", "Anarkali"],
      shoes: ["Heels", "Elegant Flats"],
      accessories: ["Pearl Earrings", "Clutch", "Minimal Bracelet"],
      occasions: ["Wedding", "Formal Events", "Dinner"],
    },
    {
      icon: Sparkles,
      label: "EVERYDAY",
      title: "Casual Chic",
      description: "Effortless everyday styles with a feminine touch.",
      accent: "from-purple-300/20 to-pink-400/5",
      outfits: ["Kurti & Jeans", "T-Shirt & Jeans", "Casual Dress"],
      shoes: ["Sneakers", "Flats", "Loafers"],
      accessories: ["Tote Bag", "Watch", "Simple Earrings"],
      occasions: ["College", "Shopping", "Everyday"],
    },
    {
      icon: Heart,
      label: "GLAM",
      title: "Party Edit",
      description: "Statement looks made for unforgettable moments.",
      accent: "from-fuchsia-300/20 to-purple-400/5",
      outfits: ["Party Dress", "Stylish Jumpsuit", "Lehenga"],
      shoes: ["Heels", "Platform Sandals"],
      accessories: ["Statement Earrings", "Clutch", "Bracelet"],
      occasions: ["Party", "Birthday", "Night Out"],
    },
    {
      icon: Sparkles,
      label: "BEAUTY",
      title: "Beauty Essentials",
      description: "Makeup and skincare favourites for your everyday glow.",
      accent: "from-rose-300/20 to-pink-400/5",
      outfits: ["Lipstick", "Foundation", "Blush"],
      shoes: ["—"],
      accessories: ["Makeup Tools", "Beauty Essentials"],
      occasions: ["Everyday", "Date Night", "Special Events"],
    },
  ];

  return (
    <section
      id="collections"
      className="relative overflow-hidden bg-black px-5 py-24 text-white sm:px-6 sm:py-28"
    >
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute left-[10%] top-20 h-80 w-80 rounded-full bg-pink-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-[5%] h-80 w-80 rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-10 flex items-center gap-2 text-sm text-white/40 transition hover:text-pink-200"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/10 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-pink-300" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-pink-200">
              Curated For You
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find Your{" "}
            <span className="bg-gradient-to-r from-pink-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Signature Style
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/40 sm:text-lg">
            Explore curated fashion, beauty, and lifestyle collections
            designed to inspire your next look.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {collections.map((collection) => {
            const Icon = collection.icon;

            return (
              <button
                key={collection.title}
                type="button"
                onClick={() => setSelectedCollection(collection)}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 text-left backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 hover:border-pink-300/30 hover:shadow-[0_20px_60px_rgba(236,72,153,0.12)]"
              >

                {/* Card Glow */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${collection.accent} blur-3xl transition duration-500 group-hover:scale-150`}
                />

                {/* Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-300/20 bg-gradient-to-br from-pink-300/10 to-purple-300/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="h-7 w-7 text-pink-200" />
                </div>

                {/* Label */}
                <p className="relative mt-8 text-[10px] font-semibold tracking-[0.25em] text-pink-300/70">
                  {collection.label}
                </p>

                {/* Title */}
                <h2 className="relative mt-2 text-2xl font-semibold">
                  {collection.title}
                </h2>

                {/* Description */}
                <p className="relative mt-3 min-h-[72px] text-sm leading-6 text-white/40">
                  {collection.description}
                </p>

                {/* Explore */}
                <div className="relative mt-7 flex items-center gap-2 text-sm font-medium text-pink-200">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-2" />
                </div>

              </button>
            );
          })}

        </div>

        {/* Beauty Banner */}
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-pink-300/15 bg-gradient-to-r from-pink-300/[0.08] via-white/[0.03] to-purple-300/[0.08] p-8 backdrop-blur-2xl sm:p-10">

          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">

            <div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <Sparkles className="h-4 w-4 text-pink-300" />

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300">
                  Fashion + Beauty
                </p>
              </div>

              <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Complete your look.
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                Pair your favourite outfit with makeup and skincare
                recommendations from your AI stylist.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/stylist")}
              className="flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-pink-500/10 transition duration-300 hover:-translate-y-1 hover:shadow-pink-500/20"
            >
              <Sparkles className="h-4 w-4" />
              Try AI Stylist
            </button>

          </div>
        </div>

        {/* Selected Collection */}
        {selectedCollection && (
          <div className="mt-10 rounded-[2rem] border border-pink-300/20 bg-white/[0.035] p-7 shadow-2xl backdrop-blur-2xl sm:p-9">

            {/* Detail Header */}
            <div className="flex items-start justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-pink-300/20 bg-pink-300/10">
                  {React.createElement(selectedCollection.icon, {
                    className: "h-6 w-6 text-pink-200",
                  })}
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-pink-300">
                    {selectedCollection.label}
                  </p>

                  <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                    {selectedCollection.title}
                  </h2>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedCollection(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-pink-300/30 hover:bg-pink-300/10 hover:text-pink-200"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>

            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
              {selectedCollection.description}
            </p>

            {/* Details */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <CollectionDetail
                title="👗 Looks"
                items={selectedCollection.outfits}
              />

              <CollectionDetail
                title="👠 Footwear"
                items={selectedCollection.shoes}
              />

              <CollectionDetail
                title="💎 Accessories"
                items={selectedCollection.accessories}
              />

              <CollectionDetail
                title="✨ Perfect For"
                items={selectedCollection.occasions}
              />

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

function CollectionDetail({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5 transition hover:border-pink-300/20">

      <h3 className="text-sm font-medium text-pink-200">
        {title}
      </h3>

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <p
            key={item}
            className="text-sm text-white/40"
          >
            • {item}
          </p>
        ))}
      </div>

    </div>
  );
}

export default Collections;