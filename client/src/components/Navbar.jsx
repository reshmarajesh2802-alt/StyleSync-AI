import React, { useState } from "react";
import { Sparkles, UserRound } from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-pink-300/15 bg-black/70 px-5 py-4 shadow-[0_10px_50px_rgba(236,72,153,0.12)] backdrop-blur-2xl">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <a
            href="/"
            className="group flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-300 to-purple-400 shadow-lg shadow-pink-500/20 transition duration-300 group-hover:scale-110">
              <Sparkles className="h-4 w-4 text-black" />
            </div>

            <div className="leading-none">
              <div className="text-xl font-bold tracking-tight sm:text-2xl">
                <span className="bg-gradient-to-r from-pink-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  StyleSync
                </span>
                <span className="text-white"> AI</span>
              </div>

              <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.25em] text-white/40">
                Your Personal Stylist
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 md:flex">

            {/* Home */}
            <a
              href="/"
              className="group relative text-sm text-white/65 transition duration-300 hover:text-pink-200"
            >
              Home
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-pink-300 transition-all duration-300 group-hover:w-full" />
            </a>

            {/* Features */}
            <a
              href="/#features"
              className="group relative text-sm text-white/65 transition duration-300 hover:text-pink-200"
            >
              Features
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-pink-300 transition-all duration-300 group-hover:w-full" />
            </a>

            {/* How It Works */}
            <a
              href="/#how-it-works"
              className="group relative text-sm text-white/65 transition duration-300 hover:text-pink-200"
            >
              How It Works
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-pink-300 transition-all duration-300 group-hover:w-full" />
            </a>

            {/* Collections */}
            <a
              href="/#collections"
              className="group relative text-sm text-white/65 transition duration-300 hover:text-pink-200"
            >
              Collections
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-pink-300 transition-all duration-300 group-hover:w-full" />
            </a>

           

            {/* Get Started */}
            <a
              href="/register"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-300 to-purple-300 px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-pink-500/20 transition duration-300 hover:scale-105 hover:shadow-pink-400/30"
            >
              <span className="relative z-10">
                Get Started ✨
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-pink-300/20 bg-pink-300/5 text-lg text-pink-200 transition duration-300 hover:bg-pink-300/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 space-y-2 border-t border-pink-300/10 pt-4 md:hidden">

            {/* Mobile Navigation Links */}
            {[
              ["Home", "/"],
              ["Features", "/#features"],
              ["How It Works", "/#how-it-works"],
              ["Collections", "/#collections"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-white/75 transition duration-300 hover:bg-pink-300/10 hover:text-pink-200"
              >
                {label}
              </a>
            ))}

            {/* Mobile Login + Get Started */}
            <div className="flex gap-2 px-1 pt-2">

              <a
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-white/70 transition duration-300 hover:border-pink-300/20 hover:bg-pink-300/5 hover:text-pink-200"
              >
                <UserRound className="h-4 w-4" />
                Login
              </a>

              <a
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-pink-300 to-purple-300 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-[1.02]"
              >
                Get Started ✨
              </a>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;