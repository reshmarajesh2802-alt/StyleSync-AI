import API_URL from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  WandSparkles,
  Heart,
  Shirt,
  Palette,
  Droplets,
  Gem,
  CalendarDays,
  Sun,
  ArrowLeft,
  Star,
  RefreshCw,
  ShoppingBag,
  Check,
} from "lucide-react";


function Stylist() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    occasion: "",
    style: "",
    color: "",
    outfitType: "",
    season: "",
    preference: "",
  });

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setRecommendation(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setError("Please login to use the AI Personal Stylist.");
      return;
    }

    const prompt = `
I need a ${formData.outfitType} for ${formData.occasion}.
My preferred style is ${formData.style}.
My preferred color is ${formData.color}.
The season is ${formData.season}.
My specific preference is ${formData.preference}.

Please create a complete personalized women's fashion and beauty look.
Include outfit, footwear, accessories, makeup, and skincare recommendations.
Use products available in the StyleSync AI store where possible.
`.trim();

    console.log("Sending AI Stylist request...");
    console.log("Prompt:", prompt);

    try {
      const response = await fetch(
        `${API_URL}/stylist/recommend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            prompt,
          }),
        }
      );

      console.log(
        "AI Stylist response status:",
        response.status
      );

      const data = await response.json();

      console.log("STYLIST API RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to generate recommendation."
        );
      }

      if (!data.recommendation) {
        throw new Error(
          "The AI stylist did not return a recommendation."
        );
      }

      console.log(
        "Recommendation received:",
        data.recommendation
      );

      setRecommendation(data.recommendation);
    } catch (err) {
      console.error("Stylist API Error:", err);

      setError(
        err.message ||
          "Something went wrong while generating your style."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetStylist = () => {
    setRecommendation(null);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getProducts = (items) => {
    if (!Array.isArray(items)) return [];

    return items.filter(
      (item) =>
        item &&
        typeof item === "object"
    );
  };

  const ProductCard = ({
    product,
    accent = "pink",
  }) => {
    if (!product) return null;

    return (
      <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] transition duration-500 hover:-translate-y-1 hover:border-pink-300/20 hover:bg-white/[0.05]">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-pink-500/10 via-black to-purple-500/10">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name || "Recommended product"}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ShoppingBag
                size={42}
                className="text-pink-300/30"
              />
            </div>
          )}

          {/* Image Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Category */}
          {product.category && (
            <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 backdrop-blur-xl">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-pink-200">
                {product.category}
              </span>
            </div>
          )}

          {/* Wishlist visual */}
          <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl">
            <Heart
              size={14}
              className="text-pink-200"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h4 className="line-clamp-2 text-sm font-semibold leading-6 text-white">
            {product.name || "StyleSync Product"}
          </h4>

          {product.description && (
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
              {product.description}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            {product.price !== undefined ? (
              <p className="text-lg font-semibold text-pink-300">
                ₹{product.price}
              </p>
            ) : (
              <span />
            )}

            {product.rating && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Star
                  size={12}
                  className="fill-pink-300 text-pink-300"
                />
                {product.rating}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ProductSection = ({
    title,
    subtitle,
    icon,
    products,
  }) => {
    const items = getProducts(products);

    if (!items.length) return null;

    return (
      <section className="mt-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-pink-300/15 bg-pink-300/10">
                {icon}
              </div>

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-pink-300">
                StyleSync Edit
              </span>
            </div>

            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {title}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {subtitle}
            </p>
          </div>

          <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] uppercase tracking-wider text-gray-500 sm:block">
            {items.length} picks
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((product, index) => (
            <ProductCard
              key={
                product._id ||
                product.name ||
                index
              }
              product={product}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen overflow-hidden bg-black px-5 pb-24 pt-8 text-white sm:px-6 sm:pt-10">

      {/* =========================================================
          BACKGROUND GLOWS
      ========================================================== */}

      <div className="pointer-events-none fixed left-[-10rem] top-20 h-[30rem] w-[30rem] rounded-full bg-pink-500/[0.08] blur-[150px]" />

      <div className="pointer-events-none fixed right-[-10rem] top-1/3 h-[32rem] w-[32rem] rounded-full bg-purple-500/[0.08] blur-[160px]" />

      <div className="pointer-events-none fixed bottom-[-10rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-fuchsia-500/[0.06] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* =========================================================
            TOP NAVIGATION
        ========================================================== */}

        <button
          onClick={() => navigate("/dashboard")}
          className="group mb-12 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs text-gray-400 transition duration-300 hover:border-pink-300/20 hover:bg-pink-300/10 hover:text-pink-200"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          Back to Dashboard
        </button>

        {/* =========================================================
            HERO
        ========================================================== */}

        <div className="mx-auto mb-12 max-w-3xl text-center">

          <div className="relative mx-auto mb-7 flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-pink-400/10 blur-xl" />

            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-pink-300/20 bg-gradient-to-br from-pink-300/15 to-purple-300/15 shadow-[0_0_40px_rgba(244,114,182,0.12)]">
              <WandSparkles
                size={25}
                className="text-pink-200"
              />
            </div>
          </div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/10 px-4 py-2">
            <Sparkles
              size={12}
              className="text-pink-300"
            />

            <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-pink-300">
              StyleSync AI
            </span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Personal
            <br />

            <span className="bg-gradient-to-r from-pink-200 via-fuchsia-300 to-purple-300 bg-clip-text text-transparent">
              Style Curator.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Tell us about your occasion, personal style, and beauty
            preferences. StyleSync AI will create a complete look
            tailored especially for you.
          </p>

          {/* Mini highlights */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[9px] uppercase tracking-wider text-gray-500">
              👗 Fashion
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[9px] uppercase tracking-wider text-gray-500">
              💄 Makeup
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[9px] uppercase tracking-wider text-gray-500">
              ✨ Skincare
            </span>
          </div>
        </div>

        {/* =========================================================
            STYLIST FORM
        ========================================================== */}

        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.065] via-white/[0.025] to-pink-500/[0.04] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:p-3">

          <div className="rounded-[2rem] border border-white/10 bg-black/80 p-6 sm:p-8 lg:p-10">

            {/* Form Heading */}
            <div className="mb-9 flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-300/10">
                    <Sparkles
                      size={16}
                      className="text-pink-300"
                    />
                  </div>

                  <p className="text-sm font-semibold text-white">
                    Create Your Look
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Choose your preferences and let our AI stylist do the rest.
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-pink-300/10 bg-pink-300/5 px-3 py-2 sm:flex">
                <Heart
                  size={12}
                  className="fill-pink-300 text-pink-300"
                />

                <span className="text-[9px] uppercase tracking-wider text-pink-200">
                  Made for you
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="grid gap-x-6 gap-y-7 md:grid-cols-2">

                {/* Occasion */}
                <div>
                  <label className="mb-2.5 flex items-center gap-2 text-xs font-medium text-gray-300">
                    <CalendarDays
                      size={14}
                      className="text-pink-300"
                    />
                    Occasion
                  </label>

                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    required
                    className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition duration-300 hover:border-white/15 focus:border-pink-300/40 focus:bg-pink-300/[0.03]"
                  >
                    <option value="" className="bg-black">
                      Select occasion
                    </option>

                    <option value="College" className="bg-black">
                      College
                    </option>

                    <option value="Casual" className="bg-black">
                      Casual
                    </option>

                    <option value="Office" className="bg-black">
                      Office
                    </option>

                    <option value="Party" className="bg-black">
                      Party
                    </option>

                    <option value="Wedding" className="bg-black">
                      Wedding
                    </option>

                    <option value="Festive" className="bg-black">
                      Festive
                    </option>

                    <option value="Date" className="bg-black">
                      Date
                    </option>
                  </select>
                </div>

                {/* Style */}
                <div>
                  <label className="mb-2.5 flex items-center gap-2 text-xs font-medium text-gray-300">
                    <Sparkles
                      size={14}
                      className="text-fuchsia-300"
                    />
                    Personal Style
                  </label>

                  <select
                    name="style"
                    value={formData.style}
                    onChange={handleChange}
                    required
                    className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition duration-300 hover:border-white/15 focus:border-fuchsia-300/40 focus:bg-fuchsia-300/[0.03]"
                  >
                    <option value="" className="bg-black">
                      Select style
                    </option>

                    <option value="Minimal" className="bg-black">
                      Minimal
                    </option>

                    <option value="Casual" className="bg-black">
                      Casual
                    </option>

                    <option value="Elegant" className="bg-black">
                      Elegant
                    </option>

                    <option value="Trendy" className="bg-black">
                      Trendy
                    </option>

                    <option value="Traditional" className="bg-black">
                      Traditional
                    </option>

                    <option value="Streetwear" className="bg-black">
                      Streetwear
                    </option>
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="mb-2.5 flex items-center gap-2 text-xs font-medium text-gray-300">
                    <Palette
                      size={14}
                      className="text-pink-300"
                    />
                    Preferred Color
                  </label>

                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    required
                    className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition duration-300 hover:border-white/15 focus:border-pink-300/40 focus:bg-pink-300/[0.03]"
                  >
                    <option value="" className="bg-black">
                      Select color
                    </option>

                    <option value="Pink" className="bg-black">
                      Pink
                    </option>

                    <option value="Teal / Blue" className="bg-black">
                      Teal / Blue
                    </option>

                    <option value="Black" className="bg-black">
                      Black
                    </option>

                    <option value="White" className="bg-black">
                      White
                    </option>

                    <option value="Green" className="bg-black">
                      Green
                    </option>

                    <option value="Red" className="bg-black">
                      Red
                    </option>

                    <option value="Pastel" className="bg-black">
                      Pastel
                    </option>
                  </select>
                </div>

                {/* Outfit Type */}
                <div>
                  <label className="mb-2.5 flex items-center gap-2 text-xs font-medium text-gray-300">
                    <Shirt
                      size={14}
                      className="text-purple-300"
                    />
                    Outfit Type
                  </label>

                  <select
                    name="outfitType"
                    value={formData.outfitType}
                    onChange={handleChange}
                    required
                    className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition duration-300 hover:border-white/15 focus:border-purple-300/40 focus:bg-purple-300/[0.03]"
                  >
                    <option value="" className="bg-black">
                      Select outfit
                    </option>

                    <option value="Kurti" className="bg-black">
                      Kurti
                    </option>

                    <option value="Saree" className="bg-black">
                      Saree
                    </option>

                    <option value="Jeans and Top" className="bg-black">
                      Jeans & Top
                    </option>

                    <option value="Dress" className="bg-black">
                      Dress
                    </option>

                    <option value="Shirt and Pants" className="bg-black">
                      Shirt & Pants
                    </option>

                    <option value="Lehenga" className="bg-black">
                      Lehenga
                    </option>
                  </select>
                </div>

                {/* Season */}
                <div>
                  <label className="mb-2.5 flex items-center gap-2 text-xs font-medium text-gray-300">
                    <Sun
                      size={14}
                      className="text-pink-300"
                    />
                    Season
                  </label>

                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    required
                    className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition duration-300 hover:border-white/15 focus:border-pink-300/40 focus:bg-pink-300/[0.03]"
                  >
                    <option value="" className="bg-black">
                      Select season
                    </option>

                    <option value="Summer" className="bg-black">
                      Summer
                    </option>

                    <option value="Winter" className="bg-black">
                      Winter
                    </option>

                    <option value="Monsoon" className="bg-black">
                      Monsoon
                    </option>

                    <option value="Spring" className="bg-black">
                      Spring
                    </option>
                  </select>
                </div>

                {/* Preference */}
                <div>
                  <label className="mb-2.5 flex items-center gap-2 text-xs font-medium text-gray-300">
                    <Heart
                      size={14}
                      className="text-pink-300"
                    />
                    Specific Preference
                  </label>

                  <input
                    type="text"
                    name="preference"
                    value={formData.preference}
                    onChange={handleChange}
                    required
                    placeholder="Soft glam makeup, comfortable fit..."
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-gray-600 hover:border-white/15 focus:border-pink-300/40 focus:bg-pink-300/[0.03]"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-9 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 px-6 py-4 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(236,72,153,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_45px_rgba(236,72,153,0.28)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 transition duration-300 group-hover:opacity-100" />

                {loading ? (
                  <>
                    <RefreshCw
                      size={17}
                      className="animate-spin"
                    />
                    Creating Your Personalized Look...
                  </>
                ) : (
                  <>
                    <WandSparkles size={17} />
                    Create My Style
                    <Sparkles
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                  </>
                )}
              </button>

            </form>

            {/* Small note */}
            <div className="mt-5 flex items-center justify-center gap-2 text-center text-[9px] uppercase tracking-[0.16em] text-gray-600">
              <Sparkles
                size={10}
                className="text-pink-400"
              />
              AI-powered fashion & beauty recommendations
              <Sparkles
                size={10}
                className="text-purple-400"
              />
            </div>

          </div>
        </div>

        {/* =========================================================
            ERROR
        ========================================================== */}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-4 text-center">
            <p className="text-sm text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* =========================================================
            LOADING EXPERIENCE
        ========================================================== */}

        {loading && (
          <div className="mt-10 rounded-[2rem] border border-pink-300/10 bg-white/[0.025] p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-pink-300/20 bg-pink-300/10">
              <WandSparkles
                size={24}
                className="animate-pulse text-pink-200"
              />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              Curating your look...
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-gray-500">
              StyleSync AI is matching your occasion, colors,
              fashion preferences, and beauty choices.
            </p>

            <div className="mx-auto mt-5 flex max-w-xs gap-1">
              <div className="h-1 flex-1 animate-pulse rounded-full bg-pink-400/60" />
              <div className="h-1 flex-1 animate-pulse rounded-full bg-fuchsia-400/40 [animation-delay:150ms]" />
              <div className="h-1 flex-1 animate-pulse rounded-full bg-purple-400/40 [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {/* =========================================================
            RECOMMENDATION
        ========================================================== */}

        {recommendation && !loading && (
          <div className="mt-12">

            {/* Recommendation Hero */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-pink-300/15 bg-gradient-to-br from-pink-500/[0.08] via-white/[0.025] to-purple-500/[0.08] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/80 px-6 py-10 text-center sm:px-10">

                {/* Decorative glow */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-500/10 blur-[100px]" />

                <div className="relative">

                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-300/20 bg-gradient-to-br from-pink-300/10 to-purple-300/10 text-4xl shadow-[0_0_50px_rgba(244,114,182,0.1)]">
                    {recommendation.emoji || "✨"}
                  </div>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-pink-300">
                    Your StyleSync Recommendation
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {recommendation.title ||
                      "Your Personalized Look"}
                  </h2>

                  {recommendation.styleVibe && (
                    <p className="mt-3 text-sm text-gray-400">
                      Style Vibe ·{" "}
                      <span className="text-pink-300">
                        {recommendation.styleVibe}
                      </span>
                    </p>
                  )}

                  {/* Tags */}
                  {Array.isArray(recommendation.tags) &&
                    recommendation.tags.length > 0 && (
                      <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {recommendation.tags.map(
                          (tag, index) => (
                            <span
                              key={index}
                              className="rounded-full border border-pink-300/15 bg-pink-300/10 px-3 py-1.5 text-[10px] text-pink-200"
                            >
                              {tag}
                            </span>
                          )
                        )}
                      </div>
                    )}

                  {/* Match Score */}
                  {recommendation.matchScore && (
                    <div className="mx-auto mt-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-300/10">
                        <Star
                          size={13}
                          className="fill-pink-300 text-pink-300"
                        />
                      </div>

                      <div className="text-left">
                        <p className="text-[8px] uppercase tracking-wider text-gray-600">
                          Style Match
                        </p>

                        <p className="text-sm font-semibold text-pink-200">
                          {recommendation.matchScore}%
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* =====================================================
                SELECTED PREFERENCES
            ====================================================== */}

            <div className="mt-8">
              <div className="mb-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-pink-300">
                  Your Style Profile
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-white">
                  What we styled around
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {[
                  {
                    label: "Occasion",
                    value: formData.occasion,
                    icon: <CalendarDays size={15} />,
                  },
                  {
                    label: "Style",
                    value: formData.style,
                    icon: <Sparkles size={15} />,
                  },
                  {
                    label: "Outfit",
                    value: formData.outfitType,
                    icon: <Shirt size={15} />,
                  },
                  {
                    label: "Color",
                    value: formData.color,
                    icon: <Palette size={15} />,
                  },
                  {
                    label: "Season",
                    value: formData.season,
                    icon: <Sun size={15} />,
                  },
                  {
                    label: "Preference",
                    value: formData.preference,
                    icon: <Heart size={15} />,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                  >
                    <div className="flex items-center gap-2 text-pink-300">
                      {item.icon}

                      <span className="text-[8px] font-semibold uppercase tracking-[0.18em]">
                        {item.label}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-medium text-white">
                      {item.value}
                    </p>
                  </div>
                ))}

              </div>
            </div>

            {/* =====================================================
                COMPLETE LOOK
            ====================================================== */}

            {recommendation.pieces && (
              <section className="mt-12">

                <div className="mb-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-pink-300">
                    The Complete Look
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    Everything comes together
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Your outfit, footwear, and finishing details.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  {[
                    {
                      label: "Top",
                      value: recommendation.pieces.top,
                      icon: <Shirt size={17} />,
                    },
                    {
                      label: "Bottom",
                      value: recommendation.pieces.bottom,
                      icon: <Shirt size={17} />,
                    },
                    {
                      label: "Shoes",
                      value: recommendation.pieces.shoes,
                      icon: <ShoppingBag size={17} />,
                    },
                    {
                      label: "Accessory & Jewelry",
                      value: recommendation.pieces.accessory,
                      icon: <Gem size={17} />,
                    },
                  ]
                    .filter((item) => item.value)
                    .map((item) => (
                      <div
                        key={item.label}
                        className="group rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:border-pink-300/20 hover:bg-pink-300/[0.035]"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-300/10 text-pink-300">
                            {item.icon}
                          </div>

                          <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-pink-300">
                              {item.label}
                            </p>

                            <p className="mt-2 text-sm leading-6 text-gray-300">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* =====================================================
                PRODUCT RECOMMENDATIONS
            ====================================================== */}

            <ProductSection
              title="Fashion Picks"
              subtitle="Pieces selected to complete your outfit."
              icon={
                <Shirt
                  size={16}
                  className="text-pink-300"
                />
              }
              products={recommendation.fashion}
            />

            <ProductSection
              title="Makeup Picks"
              subtitle="Beauty products chosen to complement your look."
              icon={
                <Palette
                  size={16}
                  className="text-fuchsia-300"
                />
              }
              products={recommendation.makeup}
            />

            <ProductSection
              title="Skincare Picks"
              subtitle="A beauty-prep routine to finish your look."
              icon={
                <Droplets
                  size={16}
                  className="text-purple-300"
                />
              }
              products={recommendation.skincare}
            />

            {/* =====================================================
                DESCRIPTION
            ====================================================== */}

            {recommendation.description && (
              <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-300/10">
                    <Sparkles
                      size={17}
                      className="text-pink-300"
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-pink-300">
                      Style Analysis
                    </p>

                    <p className="mt-3 text-sm leading-7 text-gray-300">
                      {recommendation.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* =====================================================
                STYLING TIP
            ====================================================== */}

            {recommendation.stylingTip && (
              <div className="mt-4 rounded-[2rem] border border-pink-300/10 bg-gradient-to-r from-pink-500/[0.06] to-purple-500/[0.06] p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-300/10">
                    <Heart
                      size={17}
                      className="fill-pink-300 text-pink-300"
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-pink-300">
                      Styling Tip
                    </p>

                    <p className="mt-3 text-sm leading-7 text-gray-300">
                      {recommendation.stylingTip}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* =====================================================
                AI MESSAGE
            ====================================================== */}

            {recommendation.message && (
              <div className="mt-4 rounded-[2rem] border border-purple-300/10 bg-purple-500/[0.05] p-6 text-center sm:p-8">
                <Sparkles
                  size={18}
                  className="mx-auto text-purple-300"
                />

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-300">
                  {recommendation.message}
                </p>
              </div>
            )}

            {/* =====================================================
                ACTIONS
            ====================================================== */}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <button
                type="button"
                onClick={resetStylist}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-gray-300 transition duration-300 hover:border-pink-300/20 hover:bg-pink-300/10 hover:text-pink-200"
              >
                <RefreshCw size={15} />
                Create Another Look
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-300 to-purple-300 px-6 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5"
              >
                <ShoppingBag size={15} />
                Explore The Collection
              </button>

            </div>

            {/* Final line */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-pink-400/30 sm:w-20" />

              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-gray-600">
                <Check
                  size={10}
                  className="text-pink-400"
                />
                Styled by StyleSync AI
              </div>

              <div className="h-px w-10 bg-gradient-to-l from-transparent to-purple-400/30 sm:w-20" />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Stylist;