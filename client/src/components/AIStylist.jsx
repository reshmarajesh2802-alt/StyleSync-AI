import React, { useState } from "react";

function AIStylist() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 Tell me what kind of fashion, makeup, or skincare look you're looking for and I'll create a personalized style recommendation.",
    },
  ]);

  const [currentLook, setCurrentLook] = useState({
    title: "Chic Evening Look",
    tags: ["Elegant", "Modern", "Confident"],
    matchScore: 96,
    occasion: "🌙 Evening",
    styleVibe: "Minimal Chic",
    emoji: "👗",
    description:
      "A polished evening combination with elegant fashion, subtle makeup, and a refined beauty finish.",
    fashion: "Elegant dress with minimal accessories",
    makeup: "Soft glam with a nude lip",
    skincare: "Hydrating skincare routine",
  });

  // Converts backend product objects/arrays into text that React can render
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

      const response = await fetch("/api/stylist/recommend", {
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
        throw new Error(data.message || "Unable to generate recommendation");
      }

      const recommendation =
        data.recommendation ||
        data.result ||
        data.data ||
        data;

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
          "✨ Personalized Occasion",

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
        occasion: "✨ Special Event",
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
          occasion: "🎉 Festive Celebration",
          styleVibe: "Elegant Glam",
          emoji: "🥻",
          description:
            "A sophisticated festive look combining statement fashion with glamorous beauty.",
          fashion: "Elegant festive dress with statement accessories",
          makeup: "Glowing base, defined eyes, and a vibrant lip",
          skincare: "Hydrating and brightening skincare preparation",
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
          occasion: "☀️ Daytime Outing",
          styleVibe: "Streetwear Luxe",
          emoji: "🧥",
          description:
            "A comfortable everyday look with effortless fashion and natural beauty.",
          fashion: "Casual top with coordinated bottoms and sneakers",
          makeup: "Natural base, soft blush, and tinted lip",
          skincare: "Lightweight moisturizer and daily SPF",
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
          occasion: "💄 Beauty Look",
          styleVibe: "Soft Glam",
          emoji: "💄",
          description:
            "A beauty-focused look combining flattering makeup with skincare preparation.",
          fashion: "Minimal elegant outfit to complement the makeup",
          makeup:
            "Soft foundation, blush, defined eyes, and a flattering lipstick",
          skincare: "Cleanser, moisturizer, and SPF for a smooth base",
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
          occasion: "🌿 Everyday Beauty",
          styleVibe: "Natural Glow",
          emoji: "🧴",
          description:
            "A fresh beauty routine focused on healthy-looking skin and natural elegance.",
          fashion: "Light and comfortable everyday styling",
          makeup: "Minimal makeup with a natural finish",
          skincare: "Cleanser, moisturizer, serum, and SPF",
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

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-6 sm:py-32">
      <div className="pointer-events-none absolute left-[10%] top-1/4 h-80 w-80 rounded-full bg-pink-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 right-[5%] h-96 w-96 rounded-full bg-purple-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-pink-300">
              Your AI Stylist
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Meet Your
            <br />
            <span className="text-pink-300">Personal Stylist.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Tell StyleSync AI about your occasion, fashion preferences,
            makeup, or skincare needs and get a personalized beauty and style
            recommendation.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-2xl sm:p-3">
          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 lg:grid-cols-2">
            <div className="flex min-h-[540px] flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-500/10 text-xl">
                    ✨
                  </div>

                  <div>
                    <p className="font-semibold text-white">StyleSync AI</p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                      <span className="text-xs text-gray-400">
                        Online • Ready to style
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-gray-400">
                  AI
                </div>
              </div>

              <div className="flex max-h-[340px] flex-1 flex-col gap-4 overflow-y-auto py-6 pr-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-sm rounded-2xl p-4 backdrop-blur-xl ${
                      msg.sender === "ai"
                        ? "rounded-tl-md border border-white/10 bg-white/5 text-gray-300"
                        : "ml-auto rounded-tr-md border border-pink-500/30 bg-pink-500/20 text-pink-100"
                    }`}
                  >
                    <p className="text-sm leading-6">{msg.text}</p>
                  </div>
                ))}

                {isGenerating && (
                  <div className="flex items-center gap-2 text-xs text-pink-400">
                    <span className="h-2 w-2 animate-ping rounded-full bg-pink-400" />

                    StyleSync is curating your fashion & beauty look...
                  </div>
                )}
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {[
                  "Wedding look",
                  "Casual college outfit",
                  "Party makeup",
                  "Skincare glow",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setPrompt(suggestion)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400 transition hover:border-pink-400/30 hover:bg-pink-400/10 hover:text-pink-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Try: wedding outfit with soft glam makeup..."
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
                  />

                  <button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-black transition duration-300 hover:scale-105 hover:bg-pink-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    →
                  </button>
                </div>
              </form>
            </div>

            <div className="relative flex min-h-[540px] items-center justify-center overflow-hidden border-t border-white/10 bg-white/[0.02] p-6 lg:border-l lg:border-t-0">
              <div className="absolute h-80 w-80 rounded-full bg-pink-500/20 blur-[100px]" />

              <div className="relative w-[min(78vw,21rem)] rotate-[-2deg] rounded-[2.5rem] border border-white/20 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-2xl transition duration-500 hover:rotate-0">
                <div className="flex min-h-[250px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-6 text-center">
                  <div className="text-[5.5rem] transition duration-500 hover:scale-110">
                    {currentLook.emoji}
                  </div>

                  <p className="mt-4 text-lg font-semibold text-white">
                    {currentLook.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {Array.isArray(currentLook.tags)
                      ? currentLook.tags.join(" • ")
                      : currentLook.tags}
                  </p>

                  <p className="mt-4 text-xs leading-5 text-gray-400">
                    {currentLook.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Style Match
                    </p>

                    <p className="mt-1 text-xl font-bold text-pink-300">
                      {currentLook.matchScore}%
                    </p>
                  </div>

                  <div className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-xs text-pink-300">
                    ✨ AI Pick
                  </div>
                </div>

                <div className="mt-5 grid gap-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[9px] uppercase tracking-wider text-pink-300">
                      👗 Fashion
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-300">
                      {currentLook.fashion}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[9px] uppercase tracking-wider text-pink-300">
                      💄 Makeup
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-300">
                      {currentLook.makeup}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[9px] uppercase tracking-wider text-pink-300">
                      🧴 Skincare
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-300">
                      {currentLook.skincare}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute left-4 top-8 rounded-2xl border border-white/10 bg-black/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:left-8">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Occasion
                </p>

                <p className="mt-1 text-xs font-semibold text-white">
                  {currentLook.occasion}
                </p>
              </div>

              <div className="absolute bottom-8 right-4 rounded-2xl border border-white/10 bg-black/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:right-8">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Personal Style
                </p>

                <p className="mt-1 text-xs font-semibold text-pink-300">
                  {currentLook.styleVibe}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1">
            <p className="text-xl">🧠</p>

            <p className="mt-2 text-sm font-medium text-white">
              Understands You
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Personalized recommendations
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1">
            <p className="text-xl">✨</p>

            <p className="mt-2 text-sm font-medium text-white">
              Creates Complete Looks
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Fashion + makeup + skincare
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1">
            <p className="text-xl">💗</p>

            <p className="mt-2 text-sm font-medium text-white">
              Made For You
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Your style, your identity
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIStylist;