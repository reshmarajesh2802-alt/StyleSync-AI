import React from "react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-5 pb-8 pt-20 text-white sm:px-6">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Top Brand & Links Area */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand Info */}
          <div>
            <a
              href="#"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              <span className="text-pink-300">StyleSync</span>
              <span className="text-white"> AI</span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-500">
              Where fashion meets intelligence. Discover your personal
              style and let AI help you create looks that feel uniquely you.
            </p>

            {/* Status Indicator */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span className="text-xs text-gray-400">
                AI Stylist Online
              </span>
            </div>
          </div>

          {/* Product Navigation */}
          <div>
            <p className="mb-5 text-sm font-semibold text-white">
              Product
            </p>
            <div className="space-y-3">
              <a
                href="#features"
                className="block text-sm text-gray-500 transition hover:translate-x-1 hover:text-white"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-sm text-gray-500 transition hover:translate-x-1 hover:text-white"
              >
                How It Works
              </a>
              <a
                href="#collections"
                className="block text-sm text-gray-500 transition hover:translate-x-1 hover:text-white"
              >
                Collections
              </a>
              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:translate-x-1 hover:text-white"
              >
                AI Stylist
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <p className="mb-5 text-sm font-semibold text-white">
              Company
            </p>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:translate-x-1 hover:text-white"
              >
                About
              </a>
              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:translate-x-1 hover:text-white"
              >
                Our Vision
              </a>
              <a
                href="#"
                className="block text-sm text-gray-500 transition hover:translate-x-1 hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <p className="mb-5 text-sm font-semibold text-white">
              Connect
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg transition duration-300 hover:-translate-y-1 hover:border-pink-400/30 hover:bg-pink-400/10"
              >
                ◎
              </button>

              <button
                type="button"
                aria-label="Twitter"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold transition duration-300 hover:-translate-y-1 hover:border-pink-400/30 hover:bg-pink-400/10"
              >
                𝕏
              </button>

              <button
                type="button"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold transition duration-300 hover:-translate-y-1 hover:border-pink-400/30 hover:bg-pink-400/10"
              >
                in
              </button>
            </div>
          </div>
        </div>

        {/* Brand Statement Banner */}
        <div className="relative my-16 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-10 text-center backdrop-blur-xl sm:px-10">
          <div className="absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-pink-500/10 blur-[80px]" />

          <p className="relative text-xs uppercase tracking-[0.3em] text-gray-500">
            Style is personal
          </p>

          <p className="relative mt-3 text-2xl font-bold sm:text-3xl">
            Your Style.
            <span className="text-pink-300"> Your Story.</span>
          </p>
        </div>

        {/* Bottom Legal Section */}
        <div className="flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 StyleSync AI. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="transition hover:text-gray-300">
              Privacy
            </a>
            <a href="#" className="transition hover:text-gray-300">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;