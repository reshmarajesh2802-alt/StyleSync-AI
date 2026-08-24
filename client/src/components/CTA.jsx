function CTA() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-6 sm:py-32">

      {/* ================= BACKGROUND GLOWS ================= */}

      <div className="animate-pulse-glow pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-[150px]" />

      <div className="animate-pulse-glow pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* ================= CTA CARD ================= */}

        <div className="glass glow-pink relative overflow-hidden rounded-[3rem] px-6 py-20 text-center shadow-2xl sm:px-12 sm:py-24">

          {/* Decorative circles */}

          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full border border-pink-400/10" />

          <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full border border-purple-400/10" />

          {/* Small Badge */}

          <div className="animate-fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 backdrop-blur-xl">

            <span className="text-sm">
              ✨
            </span>

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-pink-300">
              Your Style Awaits
            </span>

          </div>

          {/* Heading */}

          <h2 className="animate-fade-up mx-auto max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">

            Your Style Has
            <br />

            <span className="text-pink-300">
              No Limits.
            </span>

          </h2>

          {/* Description */}

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Discover new looks, express your personality, and let
            StyleSync AI help you create a wardrobe that feels like you.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">

            <button className="rounded-full bg-white px-8 py-4 font-semibold text-black shadow-xl transition duration-300 hover:scale-105 hover:bg-pink-100 hover:shadow-pink-500/20">
              ✨ Start Styling with AI
            </button>

            <button className="glass rounded-full px-8 py-4 font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10">
              Explore Style →
            </button>

          </div>

          {/* Bottom Trust */}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-xs text-gray-500">

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              AI Powered
            </span>

            <span className="h-1 w-1 rounded-full bg-white/20" />

            <span>
              Personalized
            </span>

            <span className="h-1 w-1 rounded-full bg-white/20" />

            <span>
              Made For You
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTA;