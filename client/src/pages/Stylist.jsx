import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

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
        `${API_BASE_URL}/stylist/recommend`,
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

      console.log("AI Stylist response status:", response.status);

      const data = await response.json();

      console.log("STYLIST API RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to generate recommendation."
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

  return (
    <div className="min-h-screen bg-black px-6 py-24 text-white">

      {/* Background Glows */}
      <div className="pointer-events-none fixed left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="pointer-events-none fixed bottom-10 right-1/4 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* Navigation */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-10 text-sm text-gray-400 transition hover:text-white"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-10 text-center">

          <div className="mb-6 text-5xl">
            ✨
          </div>

          <p className="text-sm uppercase tracking-[0.3em] text-pink-400">
            StyleSync AI
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            AI Personal Stylist
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
            Tell StyleSync about your occasion, preferences, and fashion
            personality to receive personalized outfit and beauty
            recommendations.
          </p>

        </div>

        {/* Form Container */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">

          <form onSubmit={handleSubmit}>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Occasion */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Occasion
                </label>

                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-pink-400"
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
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Style
                </label>

                <select
                  name="style"
                  value={formData.style}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-pink-400"
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
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Preferred Color
                </label>

                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-pink-400"
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
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Outfit Type
                </label>

                <select
                  name="outfitType"
                  value={formData.outfitType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-pink-400"
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
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Season
                </label>

                <select
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-pink-400"
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
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Specific Preference
                </label>

                <input
                  type="text"
                  name="preference"
                  value={formData.preference}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Soft glam makeup, comfortable fit"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-pink-400"
                />
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4 font-semibold transition hover:scale-[1.01] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "✨ Creating Your Look..."
                : "✨ Get My Style Recommendation"}
            </button>

          </form>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-center text-sm text-red-300">
              {error}
            </div>
          )}

        </div>

        {/* Recommendation */}
        {recommendation && (
          <div className="mt-10 rounded-3xl border border-pink-400/20 bg-white/5 p-8 backdrop-blur-xl md:p-10">

            {/* Recommendation Header */}
            <div className="mb-8 text-center">

              <div className="mb-4 text-4xl">
                {recommendation.emoji || "✨"}
              </div>

              <p className="text-sm uppercase tracking-[0.3em] text-pink-400">
                Your StyleSync Recommendation
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {recommendation.title || "Your Personalized Look"}
              </h2>

              {recommendation.styleVibe && (
                <p className="mt-3 text-gray-400">
                  Style Vibe: {recommendation.styleVibe}
                </p>
              )}

            </div>

            {/* Tags */}
            {Array.isArray(recommendation.tags) &&
              recommendation.tags.length > 0 && (
                <div className="mb-8 flex flex-wrap justify-center gap-2">

                  {recommendation.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-pink-400/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-300"
                    >
                      {tag}
                    </span>
                  ))}

                </div>
              )}

            {/* Metadata */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Occasion
                </p>

                <p className="mt-2 font-medium">
                  {formData.occasion}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Style
                </p>

                <p className="mt-2 font-medium">
                  {formData.style}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Outfit Type
                </p>

                <p className="mt-2 font-medium">
                  {formData.outfitType}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Color Palette
                </p>

                <p className="mt-2 font-medium">
                  {formData.color}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Season
                </p>

                <p className="mt-2 font-medium">
                  {formData.season}
                </p>
              </div>

              {recommendation.matchScore && (
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Match Score
                  </p>

                  <p className="mt-2 font-medium text-pink-400">
                    {recommendation.matchScore}%
                  </p>
                </div>
              )}

            </div>

            {/* Complete Look */}
            {recommendation.pieces && (
              <div className="mt-8">

                <h3 className="mb-4 text-xl font-semibold">
                  👗 Complete Look
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">

                  {recommendation.pieces.top && (
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Top
                      </p>

                      <p className="mt-2">
                        {recommendation.pieces.top}
                      </p>
                    </div>
                  )}

                  {recommendation.pieces.bottom && (
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Bottom
                      </p>

                      <p className="mt-2">
                        {recommendation.pieces.bottom}
                      </p>
                    </div>
                  )}

                  {recommendation.pieces.shoes && (
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Shoes
                      </p>

                      <p className="mt-2">
                        {recommendation.pieces.shoes}
                      </p>
                    </div>
                  )}

                  {recommendation.pieces.accessory && (
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Accessory & Jewelry
                      </p>

                      <p className="mt-2">
                        {recommendation.pieces.accessory}
                      </p>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* Fashion Recommendations */}
            {Array.isArray(recommendation.fashion) &&
              recommendation.fashion.length > 0 && (
                <div className="mt-8">

                  <h3 className="mb-4 text-xl font-semibold">
                    👗 Fashion Recommendations
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">

                    {recommendation.fashion.map((product) => (
                      <div
                        key={product._id || product.name}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-black/30"
                      >

                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-56 w-full object-cover"
                          />
                        )}

                        <div className="p-5">

                          <p className="font-semibold">
                            {product.name}
                          </p>

                          {product.category && (
                            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                              {product.category}
                            </p>
                          )}

                          {product.price !== undefined && (
                            <p className="mt-2 text-lg font-semibold text-pink-400">
                              ₹{product.price}
                            </p>
                          )}

                          {product.description && (
                            <p className="mt-2 text-sm leading-6 text-gray-400">
                              {product.description}
                            </p>
                          )}

                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              )}

            {/* Makeup Recommendations */}
            {Array.isArray(recommendation.makeup) &&
              recommendation.makeup.length > 0 && (
                <div className="mt-8">

                  <h3 className="mb-4 text-xl font-semibold">
                    💄 Makeup Recommendations
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">

                    {recommendation.makeup.map((product) => (
                      <div
                        key={product._id || product.name}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-black/30"
                      >

                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-56 w-full object-cover"
                          />
                        )}

                        <div className="p-5">

                          <p className="font-semibold">
                            {product.name}
                          </p>

                          {product.category && (
                            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                              {product.category}
                            </p>
                          )}

                          {product.price !== undefined && (
                            <p className="mt-2 text-lg font-semibold text-pink-400">
                              ₹{product.price}
                            </p>
                          )}

                          {product.description && (
                            <p className="mt-2 text-sm leading-6 text-gray-400">
                              {product.description}
                            </p>
                          )}

                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              )}

            {/* Skincare Recommendations */}
            {Array.isArray(recommendation.skincare) &&
              recommendation.skincare.length > 0 && (
                <div className="mt-8">

                  <h3 className="mb-4 text-xl font-semibold">
                    🧴 Skincare Recommendations
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">

                    {recommendation.skincare.map((product) => (
                      <div
                        key={product._id || product.name}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-black/30"
                      >

                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-56 w-full object-cover"
                          />
                        )}

                        <div className="p-5">

                          <p className="font-semibold">
                            {product.name}
                          </p>

                          {product.category && (
                            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                              {product.category}
                            </p>
                          )}

                          {product.price !== undefined && (
                            <p className="mt-2 text-lg font-semibold text-pink-400">
                              ₹{product.price}
                            </p>
                          )}

                          {product.description && (
                            <p className="mt-2 text-sm leading-6 text-gray-400">
                              {product.description}
                            </p>
                          )}

                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              )}

            {/* Description */}
            {recommendation.description && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6">

                <p className="text-xs uppercase tracking-wider text-pink-400">
                  ✨ Style Analysis
                </p>

                <p className="mt-3 leading-7 text-gray-300">
                  {recommendation.description}
                </p>

              </div>
            )}

            {/* Styling Tip */}
            {recommendation.stylingTip && (
              <div className="mt-8 rounded-2xl border border-pink-400/10 bg-pink-500/5 p-6">

                <p className="text-xs uppercase tracking-wider text-pink-400">
                  💡 Styling & Hair Tip
                </p>

                <p className="mt-3 leading-7 text-gray-300">
                  {recommendation.stylingTip}
                </p>

              </div>
            )}

            {/* Message */}
            {recommendation.message && (
              <div className="mt-8 rounded-2xl border border-purple-400/10 bg-purple-500/5 p-6 text-center">

                <p className="leading-7 text-gray-300">
                  {recommendation.message}
                </p>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Stylist;