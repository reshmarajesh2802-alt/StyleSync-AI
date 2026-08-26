import { useNavigate } from "react-router-dom";

function Collections() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black px-6 py-24 text-white">

      <div className="pointer-events-none fixed bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-5xl">

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-10 text-sm text-gray-400 transition hover:text-white"
        >
          ← Back to Dashboard
        </button>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">

          <div className="mb-6 text-5xl">
            👗
          </div>

          <p className="text-sm uppercase tracking-[0.3em] text-purple-400">
            StyleSync AI
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Fashion Collections
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
            Discover curated fashion collections designed for different
            moods, occasions, and personal styles.
          </p>

          <div className="mt-8 rounded-2xl border border-purple-400/10 bg-purple-500/5 p-6">
            <p className="text-gray-400">
              👗 Collections feature coming next.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Collections;