function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "✨",
      title: "Tell Us Your Style",
      description:
        "Choose your preferences, favorite colors, occasions, and fashion personality.",
    },
    {
      number: "02",
      icon: "🧠",
      title: "AI Understands You",
      description:
        "StyleSync AI analyzes your preferences and learns what works best for you.",
    },
    {
      number: "03",
      icon: "👗",
      title: "Discover Your Look",
      description:
        "Get personalized outfit ideas and styling suggestions created around you.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-black px-5 py-24 sm:px-6 sm:py-28"
    >
      {/* Ambient Glow */}
      <div className="animate-pulse-glow pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="animate-pulse-glow pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* ================= HEADING ================= */}
        <div className="animate-fade-up mx-auto mb-16 max-w-2xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <span className="text-sm">💫</span>

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-300">
              Simple. Smart. Personal.
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Your Style Journey,
            <br />

            <span className="text-pink-300">
              Simplified.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            From your personality to your perfect outfit —
            StyleSync makes finding your style effortless.
          </p>

        </div>

        {/* ================= STEPS ================= */}
        <div className="relative grid gap-6 md:grid-cols-3">

          {/* Connecting Line - Desktop */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-20 hidden h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent md:block" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative"
            >

              {/* Step Card */}
              <div className="glass glow-pink relative h-full overflow-hidden rounded-[2rem] p-7 transition duration-500 hover:-translate-y-3 hover:border-pink-400/40 sm:p-8">

                {/* Hover Shine */}
                <div className="pointer-events-none absolute -left-24 top-0 h-full w-20 rotate-12 bg-white/10 blur-xl transition duration-700 group-hover:translate-x-[450px]" />

                {/* Number + Icon */}
                <div className="relative mb-8 flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-2xl shadow-lg shadow-pink-500/10 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {step.icon}
                  </div>

                  <span className="text-5xl font-bold text-white/[0.06] transition duration-500 group-hover:text-pink-300/10">
                    {step.number}
                  </span>

                </div>

                {/* Title */}
                <h3 className="relative text-2xl font-semibold">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="relative mt-4 leading-7 text-gray-400">
                  {step.description}
                </p>

                {/* Bottom Accent */}
                <div className="relative mt-7 flex items-center gap-2 text-sm font-medium text-pink-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />

                  Step {index + 1}

                  <span className="transition duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* ================= BOTTOM MESSAGE ================= */}
        <div className="animate-fade-up mt-12 text-center">

          <p className="text-sm text-gray-500">
            Your preferences. Your personality. Your style.
          </p>

          <p className="mt-2 text-lg font-medium text-white">
            Let AI do the styling magic. ✨
          </p>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;