import React, { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/60 px-5 py-4 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-bold tracking-tight sm:text-2xl"
          >
            <span className="text-pink-300">StyleSync</span>
            <span className="text-white"> AI</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Home
            </a>

            <a
              href="/#features"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="/#how-it-works"
              className="text-sm text-white/70 transition hover:text-white"
            >
              How It Works
            </a>

            <a
              href="/#collections"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Collections
            </a>

            {/* Desktop Get Started */}
            <a
              href="/register"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:bg-pink-100"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl transition hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 space-y-2 border-t border-white/10 pt-4 md:hidden">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/5"
            >
              Home
            </a>

            <a
              href="/#features"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/5"
            >
              Features
            </a>

            <a
              href="/#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/5"
            >
              How It Works
            </a>

            <a
              href="/#collections"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/5"
            >
              Collections
            </a>

            {/* Mobile Get Started */}
            <a
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-pink-100"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;