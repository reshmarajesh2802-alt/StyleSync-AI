import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/60 px-5 py-4 shadow-2xl backdrop-blur-2xl">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-tight sm:text-2xl"
          >
            <span className="text-pink-300">
              StyleSync
            </span>

            <span className="text-white">
              {" "}AI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">

            <a
              href="#"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Home
            </a>

            <a
              href="#features"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-white/70 transition hover:text-white"
            >
              How It Works
            </a>

            <a
              href="#collections"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Collections
            </a>

            <button className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:bg-pink-100">
              Get Started
            </button>

          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "×" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 space-y-2 border-t border-white/10 pt-4 md:hidden">

            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/5"
            >
              Home
            </a>

            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/5"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/5"
            >
              How It Works
            </a>

            <a
              href="#collections"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/5"
            >
              Collections
            </a>

            <button className="mt-2 w-full rounded-xl bg-white py-3 font-semibold text-black">
              Get Started
            </button>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;