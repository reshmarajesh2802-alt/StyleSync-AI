import React from "react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-32 text-white sm:px-6 sm:pt-36 lg:pb-24">
      {/* Ambient Background Glows */}
      <div className="animate-pulse-glow pointer-events-none absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-pink-500/20 blur-[120px] sm:h-72 sm:w-72" />
      <div className="animate-pulse-glow pointer-events-none absolute bottom-[5%] right-[10%] h-72 w-72 rounded-full bg-purple-500/20 blur-[140px] sm:h-80 sm:w-80" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* Left Content */}
        <div className="animate-fade-up text-center lg:text-left">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-pink-300 sm:text-sm">
              AI • Fashion • You
            </p>
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:mx-0 lg:text-7xl">
            Discover
            <br />
            <span className="text-pink-300">Your Style.</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-relaxed lg:mx-0">
            StyleSync AI brings fashion and intelligence together. Discover
            outfits that match your personality, explore collections, and let
            AI help you create your perfect look.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <button
              type="button"
              className="w-full rounded-full bg-white px-7 py-3.5 font-semibold text-black shadow-lg transition duration-300 hover:scale-105 hover:shadow-pink-500/20 sm:w-auto"
            >
              ✨ Style Me with AI
            </button>

            <button
              type="button"
              className="glass w-full rounded-full px-7 py-3.5 font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10 sm:w-auto"
            >
              Explore Collections →
            </button>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 border-t border-white/10 pt-7 lg:mx-0">
            <div className="text-center lg:text-left">
              <p className="text-xl font-bold sm:text-2xl">10K+</p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">Styles</p>
            </div>

            <div className="border-x border-white/10 text-center">
              <p className="text-xl font-bold sm:text-2xl">AI</p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Personal Stylist
              </p>
            </div>

            <div className="text-center lg:text-left lg:pl-6">
              <p className="text-xl font-bold sm:text-2xl">24/7</p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Inspiration
              </p>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="animate-fade-up relative flex items-center justify-center">
          {/* Large Glow */}
          <div className="animate-pulse-glow pointer-events-none absolute h-72 w-72 rounded-full bg-pink-500/20 blur-[100px] sm:h-96 sm:w-96" />

          {/* Floating Card */}
          <div className="animate-float relative h-[28rem] w-[min(80vw,20rem)] overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/[0.06] p-3 shadow-2xl backdrop-blur-2xl transition duration-500 hover:rotate-0 hover:border-pink-400/30 hover:shadow-pink-500/10 sm:h-[32rem] sm:w-80">
            {/* Inner Glass */}
            <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black/30">
              {/* Decorative Glow */}
              <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl" />

              {/* Fashion Content */}
              <div className="relative z-10 text-center">
                <div className="mb-6 text-7xl drop-shadow-2xl transition duration-500 hover:scale-110 sm:text-8xl">
                  👗
                </div>

                <p className="text-xl font-semibold">Your Style</p>
                <p className="mt-2 text-sm text-gray-400">Powered by AI</p>

                {/* AI Match Badge */}
                <div className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2">
                  <span className="text-sm">✨</span>
                  <span className="text-xs font-medium text-pink-300">
                    AI Style Match
                  </span>
                </div>
              </div>

              {/* Floating Badge - Top */}
              <div className="absolute right-4 top-5 rounded-2xl border border-white/10 bg-black/60 px-4 py-3 shadow-xl backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Match
                </p>
                <p className="mt-1 text-sm font-bold text-pink-300">96%</p>
              </div>

              {/* Floating Badge - Bottom */}
              <div className="absolute bottom-5 left-4 rounded-2xl border border-white/10 bg-black/60 px-4 py-3 shadow-xl backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Style
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Minimal Chic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;