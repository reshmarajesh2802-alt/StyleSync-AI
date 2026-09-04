import React, { useState } from "react";
import API_URL from "../api";
import {
  Sparkles,
  Heart,
  Send,
  WandSparkles,
  Brain,
  Shirt,
  ShoppingBag,
  Star,
  Palette,
  Droplets,
  ArrowUpRight,
} from "lucide-react";

function AIStylist() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! ✨ Tell me what kind of fashion, makeup, or skincare look you're looking for and I'll create a personalized style recommendation.",
    },
  ]);

  const [currentLook, setCurrentLook] = useState({
    title: "Chic Evening Look",
    tags: ["Elegant", "Modern", "Confident"],
    matchScore: 96,
    occasion: "Evening",
    styleVibe: "Minimal Chic",
    emoji: "👗",
    description:
      "A polished evening combination with elegant fashion, subtle makeup, and a refined beauty finish.",
    fashion: "Elegant dress with minimal accessories",
    makeup: "Soft glam with a nude lip",
    skincare: "Hydrating skincare routine",
  });

  const formatRecommendation = (value, fallback) => {
    if (!value) return fallback;

    if (Array.isArray(value)) {
      if (value.length === 0) return fallback;

      return value
        .map((item) => {
          if (typeof item === "string") return item;

          if (item && typeof item === "object") {
            return item.name || item.description || "Recommended product";
          }

          return "";
        })
        .filter(Boolean)
        .join(" • ");
    }

    if (typeof value === "object") {
      return value.name || value.description || fallback;
    }

    return value;
  };

  const handleSend = async () => {
    if (!prompt.trim() || isGenerating) return;

    const userText = prompt.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
      },
    ]);

    setPrompt("");
    setIsGenerating(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/stylist/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
        body: JSON.stringify({
          prompt: userText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to generate recommendation"
        );
      }

      const recommendation =
        data.recommendation || data.result || data.data || data;

      const newLook = {
        title:
          recommendation.title ||
          recommendation.look ||
          "Personalized Style",

        tags:
          recommendation.tags ||
          recommendation.styles ||
          ["Personalized", "Chic", "Curated"],

        matchScore:
          recommendation.matchScore ||
          recommendation.score ||
          95,

        occasion:
          recommendation.occasion ||
          "Personalized Occasion",

        styleVibe:
          recommendation.styleVibe ||
          recommendation.vibe ||
          "Personal Style",

        emoji:
          recommendation.emoji ||
          "✨",

        description:
          recommendation.description ||
          recommendation.message ||
          "A personalized look created based on your preferences.",

        fashion: formatRecommendation(
          recommendation.fashion ||
            recommendation.outfit ||
            recommendation.fashionRecommendation,
          "Curated fashion pieces based on your request."
        ),

        makeup: formatRecommendation(
          recommendation.makeup ||
            recommendation.makeupRecommendation,
          "Makeup recommendations selected to complement your look."
        ),

        skincare: formatRecommendation(
          recommendation.skincare ||
            recommendation.skincareRecommendation,
          "Skincare suggestions selected to complete your beauty routine."
        ),
      };

      setCurrentLook(newLook);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            recommendation.message ||
            `I've created a personalized look based on "${userText}". Your fashion, makeup, and skincare recommendations are ready! ✨`,
        },
      ]);
    } catch (error) {
      console.error("AI Stylist Error:", error);

      const lower = userText.toLowerCase();

      let fallbackLook = {
        title: "Curated Style",
        tags: ["Trendy", "Chic", "Sleek"],
        matchScore: 96,
        occasion: "Special Event",
        styleVibe: "Contemporary",
        emoji: "✨",
        description:
          "A balanced fashion and beauty look curated around your request.",
        fashion: "Modern outfit with coordinated accessories",
        makeup: "Soft glam makeup with a natural finish",
        skincare: "Hydrating skincare routine before makeup",
      };

      if (
        lower.includes("wedding") ||
        lower.includes("festive") ||
        lower.includes("party") ||
        lower.includes("reception")
      ) {
        fallbackLook = {
          title: "Festive Glamour",
          tags: ["Elegant", "Statement", "Glam"],
          matchScore: 99,
          occasion: "Festive Celebration",
          styleVibe: "Elegant Glam",
          emoji: "🥻",
          description:
            "A sophisticated festive look combining statement fashion with glamorous beauty.",
          fashion:
            "Elegant festive dress with statement accessories",
          makeup:
            "Glowing base, defined eyes, and a vibrant lip",
          skincare:
            "Hydrating and brightening skincare preparation",
        };
      } else if (
        lower.includes("casual") ||
        lower.includes("day") ||
        lower.includes("college") ||
        lower.includes("street")
      ) {
        fallbackLook = {
          title: "Urban Casual",
          tags: ["Relaxed", "Effortless", "Clean"],
          matchScore: 94,
          occasion: "Daytime Outing",
          styleVibe: "Streetwear Luxe",
          emoji: "🧥",
          description:
            "A comfortable everyday look with effortless fashion and natural beauty.",
          fashion:
            "Casual top with coordinated bottoms and sneakers",
          makeup:
            "Natural base, soft blush, and tinted lip",
          skincare:
            "Lightweight moisturizer and daily SPF",
        };
      } else if (
        lower.includes("makeup") ||
        lower.includes("make up") ||
        lower.includes("beauty")
      ) {
        fallbackLook = {
          title: "Soft Beauty Glow",
          tags: ["Fresh", "Glowing", "Feminine"],
          matchScore: 97,
          occasion: "Beauty Look",
          styleVibe: "Soft Glam",
          emoji: "💄",
          description:
            "A beauty-focused look combining flattering makeup with skincare preparation.",
          fashion:
            "Minimal elegant outfit to complement the makeup",
          makeup:
            "Soft foundation, blush, defined eyes, and a flattering lipstick",
          skincare:
            "Cleanser, moisturizer, and SPF for a smooth base",
        };
      } else if (
        lower.includes("skincare") ||
        lower.includes("skin") ||
        lower.includes("glow")
      ) {
        fallbackLook = {
          title: "Healthy Glow",
          tags: ["Fresh", "Natural", "Radiant"],
          matchScore: 95,
          occasion: "Everyday Beauty",
          styleVibe: "Natural Glow",
          emoji: "🧴",
          description:
            "A fresh beauty routine focused on healthy-looking skin and natural elegance.",
          fashion:
            "Light and comfortable everyday styling",
          makeup:
            "Minimal makeup with a natural finish",
          skincare:
            "Cleanser, moisturizer, serum, and SPF",
        };
      }

      setCurrentLook(fallbackLook);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `I've created a personalized recommendation for "${userText}". ✨`,
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const quickPrompts = [
    {
      label: "Wedding Look",
      icon: "👗",
    },
    {
      label: "Casual College",
      icon: "🌸",
    },
    {
      label: "Party Makeup",
      icon: "💄",
    },
    {
      label: "Skincare Glow",
      icon: "✨",
    },
  ];

  return (
    <section
      id="ai-stylist"
      className="relative overflow-hidden bg-black px-5 py-24 sm:px-6 sm:py-32"
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-[-8rem] top-24 h-96 w-96 rounded-full bg-pink-500/10 blur-[150px]" />

      <div className="pointer-events-none absolute right-[-8rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-purple-500/10 blur-[160px]" />

      <div className="pointer-events-none absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* =========================================================
            HEADER
        ========================================================== */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/10 px-4 py-2">
            <Sparkles
              size={14}
              className="text-pink-300"
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-pink-300 sm:text-xs">
              AI Personal Stylist
            </span>
          </div>

          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Style.
            <br />

            <span className="bg-gradient-to-r from-pink-200 via-fuchsia-300 to-purple-300 bg-clip-text text-transparent">
              Reimagined by AI.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base lg:text-lg">
            Tell StyleSync what you're looking for and discover a complete
            fashion and beauty look made around you.
          </p>
        </div>

        {/* =========================================================
            MAIN STYLIST STUDIO
        ========================================================== */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-pink-500/[0.04] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:p-3">
          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-black lg:grid-cols-[0.95fr_1.05fr]">

            {/* =====================================================
                LEFT - AI CHAT
            ====================================================== */}
            <div className="flex min-h-[650px] flex-col p-6 sm:p-8 lg:p-10">

              {/* AI Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-300/20 bg-gradient-to-br from-pink-400/20 to-purple-400/20 shadow-lg shadow-pink-500/5">
                    <WandSparkles
                      size={21}
                      className="text-pink-200"
                    />

                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-pink-400 shadow-[0_0_14px_rgba(244,114,182,0.9)]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold tracking-wide text-white">
                      StyleSync AI
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

                      <span className="text-[11px] text-gray-500">
                        Online · Ready to style
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-full border border-pink-300/20 bg-pink-300/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-pink-300">
                  AI
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex max-h-[350px] flex-1 flex-col gap-4 overflow-y-auto py-7 pr-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[90%] rounded-2xl p-4 sm:max-w-sm ${
                      msg.sender === "ai"
                        ? "rounded-tl-md border border-white/10 bg-white/[0.045] text-gray-300"
                        : "ml-auto rounded-tr-md border border-pink-300/20 bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-purple-500/20 text-pink-100"
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <div className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-pink-300">
                        <Sparkles size={10} />
                        StyleSync AI
                      </div>
                    )}

                    <p className="text-xs leading-6 sm:text-sm">
                      {msg.text}
                    </p>
                  </div>
                ))}

                {isGenerating && (
                  <div className="flex items-center gap-3 text-xs text-pink-300">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400 [animation-delay:100ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400 [animation-delay:200ms]" />
                    </div>

                    Curating your perfect look...
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div className="mb-4">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-600">
                  Try a style
                </p>

                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((suggestion) => (
                    <button
                      key={suggestion.label}
                      type="button"
                      onClick={() => setPrompt(suggestion.label)}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-[11px] text-gray-400 transition duration-300 hover:-translate-y-0.5 hover:border-pink-300/30 hover:bg-pink-300/10 hover:text-pink-200"
                    >
                      <span className="text-xs transition-transform duration-300 group-hover:scale-110">
                        {suggestion.icon}
                      </span>

                      {suggestion.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 transition duration-300 focus-within:border-pink-300/30 focus-within:bg-white/[0.055]"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your dream look..."
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"
                  />

                  <button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-200 via-fuchsia-200 to-purple-200 text-black shadow-lg shadow-pink-500/10 transition duration-300 hover:scale-105 hover:shadow-pink-500/30 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Send
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
              </form>

              <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.15em] text-gray-600">
                <Heart size={10} className="text-pink-400" />
                Personal styling powered by StyleSync AI
              </div>
            </div>

            {/* =====================================================
                RIGHT - AI LOOK
            ====================================================== */}
            <div className="relative flex min-h-[650px] items-center justify-center overflow-hidden border-t border-white/10 bg-gradient-to-br from-pink-500/[0.045] via-transparent to-purple-500/[0.07] p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">

              {/* Glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/[0.08] blur-[130px]" />

              {/* Decorative dots */}
              <div className="pointer-events-none absolute left-8 top-12 h-1 w-1 rounded-full bg-pink-300/70 shadow-[0_0_10px_rgba(244,114,182,0.8)]" />

              <div className="pointer-events-none absolute right-20 bottom-20 h-1.5 w-1.5 rounded-full bg-purple-300/60 shadow-[0_0_12px_rgba(192,132,252,0.8)]" />

              {/* Occasion Badge */}
              <div className="absolute left-4 top-7 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 shadow-xl backdrop-blur-xl sm:left-8 sm:top-10">
                <p className="text-[8px] uppercase tracking-[0.2em] text-gray-600">
                  Occasion
                </p>

                <p className="mt-1 text-xs font-medium text-white">
                  {currentLook.occasion}
                </p>
              </div>

              {/* Heart */}
              <div className="absolute right-5 top-7 flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-300/20 bg-black/70 shadow-xl backdrop-blur-xl sm:right-8 sm:top-10">
                <Heart
                  size={17}
                  className="fill-pink-300 text-pink-300"
                />
              </div>

              {/* =================================================
                  EDITORIAL CARD
              ================================================== */}
              <div className="relative w-full max-w-[25rem] rotate-[-1deg] rounded-[2.5rem] border border-white/15 bg-white/[0.055] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition duration-500 hover:rotate-0 hover:scale-[1.015]">

                <div className="overflow-hidden rounded-[2.1rem] border border-white/10 bg-black/80">

                  {/* Visual Area */}
                  <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-pink-500/10 via-fuchsia-500/[0.03] to-purple-500/10 sm:h-64">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.12),transparent_60%)]" />

                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-pink-300/10 bg-gradient-to-br from-pink-300/10 to-purple-300/10 shadow-[0_0_80px_rgba(244,114,182,0.12)] sm:h-36 sm:w-36">
                      <span className="text-[5.5rem] leading-none drop-shadow-2xl transition duration-500 hover:scale-110">
                        {currentLook.emoji}
                      </span>
                    </div>

                    <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-xl">
                      <div className="flex items-center gap-1.5">
                        <Sparkles
                          size={10}
                          className="text-pink-300"
                        />

                        <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-pink-300">
                          AI Curated
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl">
                      <ArrowUpRight
                        size={14}
                        className="text-gray-300"
                      />
                    </div>
                  </div>

                  {/* Look Details */}
                  <div className="p-6 text-center">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-pink-300">
                      Your AI Look
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                      {currentLook.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {(Array.isArray(currentLook.tags)
                        ? currentLook.tags
                        : [currentLook.tags]
                      ).map((tag, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-pink-300/15 bg-pink-300/10 px-3 py-1.5 text-[9px] text-pink-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mx-auto mt-5 max-w-sm text-xs leading-6 text-gray-400">
                      {currentLook.description}
                    </p>
                  </div>
                </div>

                {/* Match Score */}
                <div className="flex items-center justify-between px-3 py-4">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-gray-600">
                      Style Match
                    </p>

                    <div className="mt-1 flex items-baseline gap-1">
                      <p className="text-2xl font-bold text-pink-200">
                        {currentLook.matchScore}%
                      </p>

                      <span className="text-[9px] text-gray-600">
                        match
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full border border-pink-300/20 bg-pink-300/10 px-3 py-2">
                    <Star
                      size={11}
                      className="fill-pink-300 text-pink-300"
                    />

                    <span className="text-[9px] font-medium text-pink-200">
                      AI Pick
                    </span>
                  </div>
                </div>

                {/* =================================================
                    RECOMMENDATION CATEGORIES
                ================================================== */}
                <div className="space-y-2 px-1 pb-2">

                  {/* Fashion */}
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 transition duration-300 hover:border-pink-300/20 hover:bg-pink-300/[0.04]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-300/10">
                        <Shirt
                          size={14}
                          className="text-pink-300"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-pink-300">
                          Fashion
                        </p>

                        <p className="mt-1.5 text-[11px] leading-5 text-gray-300">
                          {currentLook.fashion}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Makeup */}
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 transition duration-300 hover:border-pink-300/20 hover:bg-pink-300/[0.04]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-fuchsia-300/10">
                        <Palette
                          size={14}
                          className="text-fuchsia-300"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300">
                          Makeup
                        </p>

                        <p className="mt-1.5 text-[11px] leading-5 text-gray-300">
                          {currentLook.makeup}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skincare */}
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 transition duration-300 hover:border-pink-300/20 hover:bg-pink-300/[0.04]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-300/10">
                        <Droplets
                          size={14}
                          className="text-purple-300"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-purple-300">
                          Skincare
                        </p>

                        <p className="mt-1.5 text-[11px] leading-5 text-gray-300">
                          {currentLook.skincare}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Style Badge */}
              <div className="absolute bottom-6 right-4 rounded-2xl border border-pink-300/15 bg-black/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:bottom-8 sm:right-8">
                <p className="text-[8px] uppercase tracking-[0.2em] text-gray-600">
                  Personal Style
                </p>

                <p className="mt-1 text-xs font-semibold text-pink-200">
                  {currentLook.styleVibe}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM FEATURES
        ========================================================== */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          {/* Understands You */}
          <div className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-pink-300/20 hover:bg-pink-300/[0.035]">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-300/10 bg-pink-300/10 transition duration-300 group-hover:scale-105">
              <Brain
                size={18}
                className="text-pink-300"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-white">
              Understands You
            </p>

            <p className="mt-1.5 text-xs leading-5 text-gray-500">
              Personalized recommendations built around your style.
            </p>
          </div>

          {/* Complete Looks */}
          <div className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/20 hover:bg-fuchsia-300/[0.035]">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-fuchsia-300/10 bg-fuchsia-300/10 transition duration-300 group-hover:scale-105">
              <Sparkles
                size={18}
                className="text-fuchsia-300"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-white">
              Complete Looks
            </p>

            <p className="mt-1.5 text-xs leading-5 text-gray-500">
              Fashion, makeup, and skincare styled together.
            </p>
          </div>

          {/* Shop Your Look */}
          <div className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-300/20 hover:bg-purple-300/[0.035]">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-300/10 bg-purple-300/10 transition duration-300 group-hover:scale-105">
              <ShoppingBag
                size={18}
                className="text-purple-300"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-white">
              Shop Your Look
            </p>

            <p className="mt-1.5 text-xs leading-5 text-gray-500">
              Discover products selected to complement your style.
            </p>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mt-12 flex items-center justify-center gap-3 text-center">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-pink-400/30 sm:w-20" />

          <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-gray-600 sm:text-[10px]">
            Your style is personal · Let AI make it effortless
          </p>

          <div className="h-px w-10 bg-gradient-to-l from-transparent to-pink-400/30 sm:w-20" />
        </div>
      </div>
    </section>
  );
}

export default AIStylist;