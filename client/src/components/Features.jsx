function Features() {
  const features = [
    {
      icon: "🤖",
      number: "01",
      title: "AI Personal Stylist",
      description:
        "Get personalized fashion recommendations based on your style, preferences, and personality.",
      tag: "SMART STYLING",
    },
    {
      icon: "👗",
      number: "02",
      title: "Smart Outfit Suggestions",
      description:
        "Discover outfit combinations that help you look confident for every occasion.",
      tag: "OUTFIT AI",
    },
    {
      icon: "✨",
      number: "03",
      title: "Virtual Styling",
      description:
        "Experiment with different styles and create looks that match your unique identity.",
      tag: "YOUR LOOK",
    },
    {
      icon: "🛍️",
      number: "04",
      title: "Boutique Management",
      description:
        "Manage collections, products, customers, and fashion inventory in one place.",
      tag: "BOUTIQUE",
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-black px-5 py-24 sm:px-6 sm:py-28"
    >
      {/* Background Glow */}
      <div className="animate-pulse-glow pointer-events-none absolute left-1/4 top-20 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="animate-pulse-glow pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* ================= HEADING ================= */}
        <div className="animate-fade-up mx-auto mb-16 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-300">
              The StyleSync Experience
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Fashion Meets{" "}
            <span className="text-pink-300">
              Intelligence.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            From discovering your personal style to managing your boutique,
            StyleSync brings everything together in one intelligent experience.
          </p>

        </div>

        {/* ================= FEATURE GRID ================= */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
            >

              {/* Card */}
              <div className="glass relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[2rem] p-7 shadow-2xl transition duration-500 hover:-translate-y-3 hover:border-pink-400/40 hover:shadow-pink-500/10 sm:p-8">

                {/* Shine */}
                <div className="pointer-events-none absolute -left-24 top-0 h-full w-20 rotate-12 bg-white/10 blur-xl transition duration-700 group-hover:translate-x-[450px]" />

                {/* Number */}
                <div className="absolute right-6 top-5 text-6xl font-bold text-white/[0.04] transition duration-500 group-hover:text-pink-300/10">
                  {feature.number}
                </div>

                {/* Icon */}
                <div className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-3xl shadow-lg shadow-pink-500/10 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                </div>

                {/* Tag */}
                <div className="relative mb-4 text-[10px] font-semibold tracking-[0.2em] text-pink-300/70">
                  {feature.tag}
                </div>

                {/* Title */}
                <h3 className="relative text-xl font-semibold leading-snug sm:text-2xl">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="relative mt-4 text-sm leading-7 text-gray-400">
                  {feature.description}
                </p>

                {/* Bottom */}
                <div className="relative mt-auto pt-8">

                  <div className="flex items-center justify-between border-t border-white/10 pt-5">

                    <span className="text-xs text-gray-500">
                      Explore feature
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-pink-300 transition duration-300 group-hover:translate-x-1 group-hover:border-pink-400/30 group-hover:bg-pink-400/10">
                      →
                    </span>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* ================= BOTTOM STATEMENT ================= */}
        <div className="animate-fade-up mt-16 text-center">

          <p className="text-sm text-gray-500">
            One platform. Endless possibilities.
          </p>

          <p className="mt-2 text-lg font-medium text-white sm:text-xl">
            Your fashion journey starts here. ✨
          </p>

        </div>

      </div>
    </section>
  );
}

export default Features;