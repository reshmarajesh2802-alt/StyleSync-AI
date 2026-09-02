import React, { useState } from "react";

export function AIStylist() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 Tell me what kind of look you're looking for and I'll create something that fits your style.",
    },
  ]);

  const [currentLook, setCurrentLook] = useState({
    title: "Chic Evening Look",
    tags: ["Elegant", "Modern", "Confident"],
    matchScore: 96,
    occasion: "🌙 Evening",
    styleVibe: "Minimal Chic",
    emoji: "👗",
  });

  const handleSend = () => {
    if (!prompt.trim() || isGenerating) return;

    const userText = prompt;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setPrompt("");
    setIsGenerating(true);

    setTimeout(() => {
      let newLook = {
        title: "Curated Style",
        tags: ["Trendy", "Chic", "Sleek"],
        matchScore: 98,
        occasion: "✨ Special Event",
        styleVibe: "Contemporary",
        emoji: "✨",
      };

      const lower = userText.toLowerCase();
      if (lower.includes("festive") || lower.includes("wedding") || lower.includes("party")) {
        newLook = {
          title: "Festive Glamour",
          tags: ["Statement", "Teardrop Accents", "Vibrant"],
          matchScore: 99,
          occasion: "🎉 Festive Celebration",
          styleVibe: "Side-Swept Waves & Elegance",
          emoji: "🥻",
        };
      } else if (lower.includes("casual") || lower.includes("day") || lower.includes("street")) {
        newLook = {
          title: "Urban Casual",
          tags: ["Relaxed", "Effortless", "Clean"],
          matchScore: 94,
          occasion: "☀️ Daytime Outing",
          styleVibe: "Streetwear Luxe",
          emoji: "🧥",
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `I've put together a specialized look matching "${userText}". Check out your personalized style card!`,
        },
      ]);
      setCurrentLook(newLook);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-6 sm:py-32">
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute left-[10%] top-1/4 h-80 w-80 rounded-full bg-pink-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-[5%] h-96 w-96 rounded-full bg-purple-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-pink-300">
              Your AI Stylist
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Meet Your <br />
            <span className="text-pink-300">Personal Stylist.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Describe the look you're imagining. StyleSync AI transforms your idea into a personalized fashion experience.
          </p>
        </div>

        {/* AI Interface */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-2xl sm:p-3">
          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 lg:grid-cols-2">
            
            {/* Left Column: AI Chat */}
            <div className="flex min-h-[540px] flex-col justify-between p-6 sm:p-8 lg:p-10">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-500/10 text-xl">
                    ✨
                  </div>
                  <div>
                    <p className="font-semibold text-white">StyleSync AI</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      <span className="text-xs text-gray-400">Online • Ready to style</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-gray-400">
                  AI
                </div>
              </div>

              {/* Chat Message Stream */}
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
                    StyleSync is curating your personalized look...
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your target outfit or vibe..."
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-black transition duration-300 hover:scale-105 hover:bg-pink-100 disabled:opacity-50"
                  >
                    →
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Generated Look Card */}
            <div className="relative flex min-h-[540px] items-center justify-center overflow-hidden border-t border-white/10 bg-white/[0.02] p-6 lg:border-l lg:border-t-0">
              <div className="absolute h-80 w-80 rounded-full bg-pink-500/20 blur-[100px]" />

              <div className="relative w-[min(78vw,20rem)] rotate-[-2deg] rounded-[2.5rem] border border-white/20 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-2xl transition duration-500 hover:rotate-0">
                <div className="flex h-[300px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black/40">
                  <div className="text-[6.5rem] transition duration-500 hover:scale-110">
                    {currentLook.emoji}
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white">{currentLook.title}</p>
                  <p className="mt-1 text-xs text-gray-400">{currentLook.tags.join(" • ")}</p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">Style Match</p>
                    <p className="mt-1 text-xl font-bold text-pink-300">{currentLook.matchScore}%</p>
                  </div>
                  <div className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-xs text-pink-300">
                    ✨ AI Pick
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute left-4 top-8 rounded-2xl border border-white/10 bg-black/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:left-8">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">Occasion</p>
                <p className="mt-1 text-xs font-semibold text-white">{currentLook.occasion}</p>
              </div>

              <div className="absolute bottom-8 right-4 rounded-2xl border border-white/10 bg-black/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:right-8">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">Personal Style</p>
                <p className="mt-1 text-xs font-semibold text-pink-300">{currentLook.styleVibe}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1">
            <p className="text-xl">🧠</p>
            <p className="mt-2 text-sm font-medium text-white">Understands You</p>
            <p className="mt-1 text-xs text-gray-400">Learns your preferences</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1">
            <p className="text-xl">✨</p>
            <p className="mt-2 text-sm font-medium text-white">Creates Looks</p>
            <p className="mt-1 text-xs text-gray-400">Personalized outfit ideas</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1">
            <p className="text-xl">💗</p>
            <p className="mt-2 text-sm font-medium text-white">Made For You</p>
            <p className="mt-1 text-xs text-gray-400">Your style, your identity</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AIStylist;