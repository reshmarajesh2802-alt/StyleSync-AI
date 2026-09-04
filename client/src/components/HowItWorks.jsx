import React from "react";
import {
  Sparkles,
  Brain,
  Shirt,
  ArrowRight,
  Heart,
} from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Sparkles,
      title: "Tell Us Your Style",
      description:
        "Choose your preferences, favorite colors, occasions, and fashion personality so StyleSync can understand your unique taste.",
    },
    {
      number: "02",
      icon: Brain,
      title: "AI Understands You",
      description:
        "StyleSync AI analyzes your preferences and creates personalized recommendations across fashion, makeup, and skincare.",
    },
    {
      number: "03",
      icon: Shirt,
      title: "Discover Your Look",
      description:
        "Explore personalized outfit ideas and beauty suggestions designed around your personality, occasion, and style.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-black px-5 py-24 text-white sm:px-6 sm:py-28"
    >
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="animate-fade-up mx-auto mb-16 max-w-3xl text-center">

          {/* Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/10 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-pink-300" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-pink-200">
              Simple. Smart. Personal.
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Your Style Journey,
            <br />
            <span className="bg-gradient-to-r from-pink-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Simplified.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
            Tell us what you love, let AI understand your style, and discover
            looks that feel completely you.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-6 md:grid-cols-3">

          {/* Connecting Line */}
          <div className="pointer-events-none absolute left-[17%] right-[17%] top-[5.5rem] hidden h-px bg-gradient-to-r from-transparent via-pink-300/30 to-transparent md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative"
              >
                {/* Step Card */}
                <div className="relative flex h-full min-h-[370px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 hover:border-pink-300/30 hover:bg-pink-300/[0.04] hover:shadow-[0_20px_60px_rgba(236,72,153,0.10)] sm:p-8"
                >

                  {/* Decorative Glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-pink-400/10 blur-3xl transition duration-500 group-hover:bg-pink-400/20" />

                  {/* Top Row */}
                  <div className="relative mb-8 flex items-center justify-between">

                    {/* Icon */}
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-300/20 bg-gradient-to-br from-pink-300/10 to-purple-300/10 shadow-lg shadow-pink-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-pink-300/40">
                      <Icon className="h-7 w-7 text-pink-200" />
                    </div>

                    {/* Number */}
                    <span className="text-6xl font-bold text-white/[0.035] transition duration-500 group-hover:text-pink-300/[0.08]">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Label */}
                  <div className="relative mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-300/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-300" />
                    Step {index + 1}
                  </div>

                  {/* Title */}
                  <h3 className="relative text-2xl font-semibold tracking-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="relative mt-4 text-sm leading-7 text-white/40 sm:text-base">
                    {step.description}
                  </p>

                  {/* Bottom */}
                  <div className="relative mt-auto pt-8">

                    <div className="flex items-center justify-between border-t border-white/10 pt-5">

                      <span className="text-xs text-white/30">
                        StyleSync AI
                      </span>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-pink-200 transition-all duration-300 group-hover:translate-x-1 group-hover:border-pink-300/30 group-hover:bg-pink-300/10">
                        <ArrowRight className="h-4 w-4" />
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="animate-fade-up mt-14 text-center">

          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300/40" />

            <Heart className="h-4 w-4 fill-pink-300/20 text-pink-300" />

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300/40" />
          </div>

          <p className="text-sm text-white/30">
            Your preferences. Your personality. Your style.
          </p>

          <p className="mt-2 text-lg font-medium text-white sm:text-xl">
            Let AI do the styling magic{" "}
            <span className="text-pink-300">✨</span>
          </p>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;