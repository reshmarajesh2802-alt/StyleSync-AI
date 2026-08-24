function AIStylist() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-6 sm:py-32">

      {/* ================= AMBIENT GLOWS ================= */}

      <div className="animate-pulse-glow pointer-events-none absolute left-[10%] top-1/4 h-80 w-80 rounded-full bg-pink-500/10 blur-[140px]" />

      <div className="animate-pulse-glow pointer-events-none absolute bottom-0 right-[5%] h-96 w-96 rounded-full bg-purple-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* ================= HEADING ================= */}

        <div className="animate-fade-up mx-auto mb-14 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-pink-300">
              Your AI Stylist
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Meet Your
            <br />

            <span className="text-pink-300">
              Personal Stylist.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Describe the look you're imagining. StyleSync AI transforms
            your idea into a personalized fashion experience.
          </p>

        </div>

        {/* ================= AI INTERFACE ================= */}

        <div className="glass glow-pink relative overflow-hidden rounded-[2.5rem] p-2 shadow-2xl sm:p-3">

          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 lg:grid-cols-2">

            {/* ================================================= */}
            {/* LEFT - AI CHAT */}
            {/* ================================================= */}

            <div className="flex min-h-[540px] flex-col p-6 sm:p-8 lg:p-10">

              {/* Header */}

              <div className="flex items-center justify-between border-b border-white/10 pb-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-500/10 text-xl">
                    ✨
                  </div>

                  <div>
                    <p className="font-semibold">
                      StyleSync AI
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                      <span className="text-xs text-gray-500">
                        Online • Ready to style
                      </span>
                    </div>
                  </div>

                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-gray-400">
                  AI
                </div>

              </div>

              {/* Chat Area */}

              <div className="flex flex-1 flex-col justify-center gap-5 py-8">

                {/* AI Message */}

                <div className="max-w-sm rounded-2xl rounded-tl-md border border-white/10 bg-white/5 p-4 backdrop-blur-xl">

                  <p className="text-sm leading-6 text-gray-300">
                    Hi! 👋 Tell me what kind of look you're looking for
                    and I'll create something that fits your style.
                  </p>

                </div>

                {/* User Message */}

                <div className="ml-auto max-w-sm rounded-2xl rounded-tr-md bg-pink-500/10 p-4">

                  <p className="text-sm leading-6 text-pink-100">
                    Create a chic evening look for me ✨
                  </p>

                </div>

                {/* AI Thinking */}

                <div className="flex items-center gap-2 text-xs text-gray-500">

                  <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />
                  StyleSync is creating your look...
                </div>

              </div>

              {/* Prompt Box */}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">

                <div className="flex items-center gap-2">

                  <div className="flex-1 px-3 py-3 text-sm text-gray-500">
                    Describe your perfect outfit...
                  </div>

                  <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-black transition duration-300 hover:scale-105 hover:bg-pink-100">
                    →
                  </button>

                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* RIGHT - GENERATED LOOK */}
            {/* ================================================= */}

            <div className="relative flex min-h-[540px] items-center justify-center overflow-hidden border-t border-white/10 bg-white/[0.02] lg:border-l lg:border-t-0">

              {/* Glow */}

              <div className="animate-pulse-glow absolute h-80 w-80 rounded-full bg-pink-500/20 blur-[100px]" />

              {/* Floating Card */}

              <div className="animate-float relative w-[min(78vw,19rem)] rotate-[-3deg] rounded-[2.5rem] border border-white/20 bg-white/[0.07] p-4 shadow-2xl backdrop-blur-2xl transition duration-500 hover:rotate-0">

                {/* Fashion Image Area */}

                <div className="flex h-[330px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black/40">

                  <div className="text-center">

                    <div className="text-[7rem] transition duration-500 hover:scale-110">
                      👗
                    </div>

                    <p className="mt-6 text-lg font-semibold">
                      AI Curated Look
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Elegant • Modern • Confident
                    </p>

                  </div>

                </div>

                {/* Card Information */}

                <div className="mt-5 flex items-center justify-between">

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Style Match
                    </p>

                    <p className="mt-1 text-xl font-bold text-pink-300">
                      96%
                    </p>
                  </div>

                  <div className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-xs text-pink-300">
                    ✨ AI Pick
                  </div>

                </div>

              </div>

              {/* Floating Badge */}

              <div className="absolute left-5 top-20 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 shadow-xl backdrop-blur-xl sm:left-10">

                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Occasion
                </p>

                <p className="mt-1 text-sm font-semibold">
                  🌙 Evening
                </p>

              </div>

              {/* Floating Badge */}

              <div className="absolute bottom-20 right-5 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 shadow-xl backdrop-blur-xl sm:right-10">

                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Personal Style
                </p>

                <p className="mt-1 text-sm font-semibold text-pink-300">
                  Minimal Chic
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= BOTTOM FEATURES ================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="glass rounded-2xl p-5 text-center transition duration-300 hover:-translate-y-1">
            <p className="text-xl">🧠</p>
            <p className="mt-2 text-sm font-medium">
              Understands You
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Learns your preferences
            </p>
          </div>

          <div className="glass rounded-2xl p-5 text-center transition duration-300 hover:-translate-y-1">
            <p className="text-xl">✨</p>
            <p className="mt-2 text-sm font-medium">
              Creates Looks
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Personalized outfit ideas
            </p>
          </div>

          <div className="glass rounded-2xl p-5 text-center transition duration-300 hover:-translate-y-1">
            <p className="text-xl">💗</p>
            <p className="mt-2 text-sm font-medium">
              Made For You
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Your style, your identity
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AIStylist;