import { useNavigate } from "react-router-dom";

function Stylist() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black px-6 py-24 text-white">

      <div className="pointer-events-none fixed left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl">

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-10 text-sm text-gray-400 transition hover:text-white"
        >
          ← Back to Dashboard
        </button>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">

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
            personality to receive personalized outfit recommendations.
          </p>

          <div className="mt-8 rounded-2xl border border-pink-400/10 bg-pink-500/5 p-6">
            <p className="text-gray-400">
              🤖 AI Stylist feature coming next.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Stylist;