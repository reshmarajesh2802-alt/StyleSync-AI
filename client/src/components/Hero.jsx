import React from "react";
import { Sparkles, ArrowRight, Heart, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-5 pb-16 pt-32 text-white sm:px-6 sm:pt-36 lg:pb-24">

      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute left-[5%] top-[15%] h-72 w-72 rounded-full bg-pink-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[0%] right-[5%] h-80 w-80 rounded-full bg-purple-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute left-[45%] top-[30%] h-40 w-40 rounded-full bg-fuchsia-400/10 blur-[100px]" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-12">

        {/* LEFT CONTENT */}
        <div className="animate-fade-up text-center lg:text-left">

          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/10 px-4 py-2 shadow-lg shadow-pink-500/5 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-pink-300" />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-pink-200 sm:text-sm">
              AI • Fashion • Beauty
            </p>
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:mx-0 lg:text-7xl">

            <span className="text-white">
              Discover
            </span>

            <br />

            <span className="bg-gradient-to-r from-pink-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Your Style.
            </span>

            <br />

            <span className="text-white/90">
              Your Way.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/50 sm:text-lg sm:leading-relaxed lg:mx-0">
            Meet your personal AI stylist. Discover fashion, makeup, and
            skincare curated around your personality, preferences, and
            lifestyle.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">

            {/* Primary */}
            <a
              href="/register"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 px-7 py-3.5 font-semibold text-black shadow-xl shadow-pink-500/10 transition duration-300 hover:-translate-y-1 hover:shadow-pink-500/25 sm:w-auto"
            >
              <Sparkles className="h-4 w-4" />
              Style Me with AI
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Secondary */}
            <a
              href="/#collections"
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 font-medium text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-pink-300/30 hover:bg-pink-300/10 sm:w-auto"
            >
              Explore Collections
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

          </div>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 border-t border-white/10 pt-7 lg:mx-0">

            <div className="text-center lg:text-left">
              <p className="bg-gradient-to-r from-pink-200 to-purple-300 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                10K+
              </p>

              <p className="mt-1 text-xs text-white/40 sm:text-sm">
                Styles
              </p>
            </div>

            <div className="border-x border-white/10 text-center">
              <p className="bg-gradient-to-r from-pink-200 to-purple-300 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                AI
              </p>

              <p className="mt-1 text-xs text-white/40 sm:text-sm">
                Personal Stylist
              </p>
            </div>

            <div className="text-center lg:text-left lg:pl-6">
              <p className="bg-gradient-to-r from-pink-200 to-purple-300 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                24/7
              </p>

              <p className="mt-1 text-xs text-white/40 sm:text-sm">
                Inspiration
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="animate-fade-up relative flex items-center justify-center">

          {/* Main Glow */}
          <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-pink-500/20 blur-[110px] sm:h-[28rem] sm:w-[28rem]" />

          {/* Editorial Card */}
          <div className="relative h-[31rem] w-[min(82vw,22rem)] rotate-2 overflow-hidden rounded-[2.8rem] border border-pink-200/15 bg-gradient-to-br from-pink-200/10 via-white/[0.04] to-purple-300/10 p-3 shadow-2xl shadow-pink-500/10 transition duration-700 hover:rotate-0 hover:scale-[1.02]">

            {/* Inner Card */}
            <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[2.3rem] border border-white/10 bg-black/60 backdrop-blur-xl">

              {/* Decorative Glow */}
              <div className="pointer-events-none absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-pink-400/20 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-20 right-0 h-48 w-48 rounded-full bg-purple-400/15 blur-3xl" />

              {/* Fashion Icon */}
              <div className="relative z-10 text-center">

                <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-pink-200/20 bg-gradient-to-br from-pink-300/15 to-purple-300/10 shadow-2xl shadow-pink-500/10">
                  <span className="text-7xl drop-shadow-2xl">
                    👗
                  </span>
                </div>

                <p className="text-2xl font-semibold tracking-tight">
                  Your Style
                </p>

                <p className="mt-2 text-sm text-white/40">
                  Curated just for you
                </p>

                {/* AI Match */}
                <div className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/10 px-4 py-2.5">
                  <Sparkles className="h-4 w-4 text-pink-300" />

                  <span className="text-xs font-medium text-pink-200">
                    AI Style Match
                  </span>
                </div>

                {/* Tags */}
                <div className="mt-5 flex justify-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-white/50">
                    Fashion
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-white/50">
                    Beauty
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-white/50">
                    Skincare
                  </span>
                </div>

              </div>

              {/* Match Badge */}
              <div className="absolute right-4 top-5 rounded-2xl border border-pink-200/10 bg-black/70 px-4 py-3 shadow-xl backdrop-blur-xl">

                <div className="flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 fill-pink-300 text-pink-300" />

                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    Match
                  </p>
                </div>

                <p className="mt-1 text-sm font-bold text-pink-200">
                  96%
                </p>

              </div>

              {/* Style Badge */}
              <div className="absolute bottom-5 left-4 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 shadow-xl backdrop-blur-xl">

                <div className="flex items-center gap-2">
                  <Heart className="h-3.5 w-3.5 text-pink-300" />

                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    Style
                  </p>
                </div>

                <p className="mt-1 text-sm font-semibold text-white">
                  Minimal Chic
                </p>

              </div>

            </div>
          </div>

          {/* Floating Sparkles */}
          <div className="absolute -right-2 top-16 text-2xl text-pink-300/60">
            ✦
          </div>

          <div className="absolute -left-3 bottom-24 text-xl text-purple-300/60">
            ✧
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;