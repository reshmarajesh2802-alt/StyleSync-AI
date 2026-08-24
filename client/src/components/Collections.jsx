function Collections() {
  const collections = [
    {
      emoji: "👗",
      title: "Elegant",
      description: "Timeless looks for special occasions.",
    },
    {
      emoji: "👚",
      title: "Casual",
      description: "Effortless styles for everyday life.",
    },
    {
      emoji: "🧥",
      title: "Streetwear",
      description: "Bold looks with a modern edge.",
    },
    {
      emoji: "👠",
      title: "Party",
      description: "Stand out and make every moment memorable.",
    },
  ];

  return (
    <section
     id="collections"
         className="bg-black px-6 py-24"
>
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-pink-400">
              Explore Your Style
            </p>

            <h2 className="text-4xl font-bold sm:text-5xl">
              Fashion for{" "}
              <span className="text-pink-300">
                Every Mood.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-gray-400">
            Discover collections designed for different personalities,
            occasions, and moments.
          </p>
        </div>

        {/* Collection Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <div
              key={collection.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-pink-400/40 hover:bg-white/10"
            >
              {/* Decorative glow */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl transition duration-300 group-hover:bg-pink-500/20" />

              {/* Emoji */}
              <div className="relative mb-12 text-7xl transition duration-300 group-hover:scale-110">
                {collection.emoji}
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-semibold">
                  {collection.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {collection.description}
                </p>

                <div className="mt-6 text-sm font-medium text-pink-300 transition duration-300 group-hover:translate-x-2">
                  Explore Collection →
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Collections;