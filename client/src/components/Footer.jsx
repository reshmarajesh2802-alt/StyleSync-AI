import React from "react";
import {
  Sparkles,
  Heart,
  ArrowUp,
  ShoppingBag,
  WandSparkles,
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-5 pb-8 pt-20 text-white sm:px-6">
      
      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[32rem] -translate-x-1/2 rounded-full bg-pink-500/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-10 right-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <a
              href="/"
              className="group inline-flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              <span className="relative">
                <span className="bg-gradient-to-r from-pink-300 via-fuchsia-300 to-purple-300 bg-clip-text text-transparent">
                  StyleSync
                </span>

                <Sparkles
                  size={13}
                  className="absolute -right-4 -top-2 text-pink-300 transition duration-300 group-hover:rotate-12"
                />
              </span>

              <span className="text-white">AI</span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-500">
              Your AI-powered fashion and beauty companion. Discover outfits,
              makeup, and skincare recommendations created around your unique
              style.
            </p>

            {/* AI Status */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-pink-400/15 bg-pink-400/[0.06] px-4 py-2.5 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-400" />
              </span>

              <span className="text-xs font-medium text-pink-300">
                AI Stylist Online
              </span>
            </div>

            {/* Mini Identity */}
            <div className="mt-7 flex items-center gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1.5">
                <ShoppingBag size={13} />
                Fashion
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-700" />

              <span className="flex items-center gap-1.5">
                <Sparkles size={13} />
                Beauty
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-700" />

              <span className="flex items-center gap-1.5">
                <Heart size={13} />
                You
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="mb-5 text-sm font-semibold text-white">
              Explore
            </p>

            <div className="space-y-3.5">
              <a
                href="/"
                className="block text-sm text-gray-500 transition duration-300 hover:translate-x-1 hover:text-pink-300"
              >
                Home
              </a>

              <a
                href="#features"
                className="block text-sm text-gray-500 transition duration-300 hover:translate-x-1 hover:text-pink-300"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="block text-sm text-gray-500 transition duration-300 hover:translate-x-1 hover:text-pink-300"
              >
                How It Works
              </a>

              <a
                href="#collections"
                className="block text-sm text-gray-500 transition duration-300 hover:translate-x-1 hover:text-pink-300"
              >
                Collections
              </a>

              <a
                href="#ai-stylist"
                className="flex items-center gap-2 text-sm text-gray-500 transition duration-300 hover:translate-x-1 hover:text-pink-300"
              >
                <WandSparkles size={14} />
                AI Stylist
              </a>
            </div>
          </div>

          {/* Style & Beauty */}
          <div>
            <p className="mb-5 text-sm font-semibold text-white">
              Style & Beauty
            </p>

            <div className="space-y-3.5">
              <span className="block text-sm text-gray-500">
                Dresses & Tops
              </span>

              <span className="block text-sm text-gray-500">
                Footwear & Accessories
              </span>

              <span className="block text-sm text-gray-500">
                Makeup Essentials
              </span>

              <span className="block text-sm text-gray-500">
                Skincare
              </span>

              <span className="block text-sm text-gray-500">
                Personalized Looks
              </span>
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="mb-5 text-sm font-semibold text-white">
              Connect
            </p>

            <p className="max-w-xs text-sm leading-6 text-gray-500">
              Follow StyleSync for fashion inspiration, beauty ideas, and
              styling tips.
            </p>

            <div className="mt-5 flex gap-3">

              {/* Instagram */}
              <button
                type="button"
                aria-label="Instagram"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-pink-400/30 hover:bg-pink-400/10"
              >
                <span className="text-sm font-bold text-gray-400 transition group-hover:text-pink-300">
                  IG
                </span>
              </button>

              {/* LinkedIn */}
              <button
                type="button"
                aria-label="LinkedIn"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-pink-400/30 hover:bg-pink-400/10"
              >
                <span className="text-sm font-bold text-gray-400 transition group-hover:text-pink-300">
                  in
                </span>
              </button>

              {/* Back To Top */}
              <button
                type="button"
                aria-label="Back to top"
                onClick={scrollToTop}
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-pink-400/30 hover:bg-pink-400/10"
              >
                <ArrowUp
                  size={17}
                  className="text-gray-400 transition group-hover:text-pink-300"
                />
              </button>

            </div>
          </div>
        </div>

        {/* Signature Banner */}
        <div className="relative my-16 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-pink-500/[0.06] via-white/[0.03] to-purple-500/[0.06] px-6 py-12 text-center backdrop-blur-xl sm:px-10">

          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-pink-500/10 blur-[90px]" />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-400/20 bg-pink-400/10">
              <Heart
                size={18}
                className="fill-pink-300 text-pink-300"
              />
            </div>

            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-500">
              Fashion • Beauty • Intelligence
            </p>

            <p className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Your Style.
              <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                {" "}Your Story.
              </span>
            </p>

            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
              Let AI help you discover the looks that make you feel
              confident, beautiful, and completely yourself.
            </p>

          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 StyleSync AI.</span>

            <span className="hidden text-gray-800 sm:inline">
              •
            </span>

            <span>
              Made for your style journey.
            </span>
          </div>

          <div className="flex gap-6">
            <button
              type="button"
              className="transition hover:text-gray-300"
            >
              Privacy
            </button>

            <button
              type="button"
              className="transition hover:text-gray-300"
            >
              Terms
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;