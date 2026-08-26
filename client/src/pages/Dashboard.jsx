import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-black px-6 py-24 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none fixed left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="pointer-events-none fixed bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12">

          <p className="text-sm uppercase tracking-[0.3em] text-pink-400">
            StyleSync AI
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Welcome back,
            <span className="text-pink-300">
              {" "}{user?.name || "Fashion Lover"}
            </span>
            👋
          </h1>

          <p className="mt-4 text-gray-400">
            Your personal fashion space is ready.
          </p>

        </div>

        {/* Main Cards */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* AI Stylist */}
          <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-pink-400/40 hover:bg-white/10">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-3xl">
              ✨
            </div>

            <h2 className="text-2xl font-semibold">
              AI Personal Stylist
            </h2>

            <p className="mt-3 leading-7 text-gray-400">
              Get personalized outfit recommendations based on your unique style.
            </p>

            <button
              onClick={() => navigate("/stylist")}
              className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
            >
              Style Me →
            </button>

          </div>

          {/* Collections */}
          <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/10">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-3xl">
              👗
            </div>

            <h2 className="text-2xl font-semibold">
              Collections
            </h2>

            <p className="mt-3 leading-7 text-gray-400">
              Explore curated fashion collections for every mood and occasion.
            </p>

            <button
              onClick={() => navigate("/collections")}
              className="mt-6 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
            >
              Explore →
            </button>

          </div>

          {/* Profile */}
          <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-pink-400/40 hover:bg-white/10">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              💗
            </div>

            <h2 className="text-2xl font-semibold">
              My Style
            </h2>

            <p className="mt-3 leading-7 text-gray-400">
              Build your fashion profile and let StyleSync understand you better.
            </p>

            <button
              onClick={() => navigate("/profile")}
              className="mt-6 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
            >
              View Profile →
            </button>

          </div>

        </div>

        {/* User Information */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">

          <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
            Account
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="mt-1 font-medium">
                {user?.name || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-1 break-all font-medium">
                {user?.email || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Role
              </p>

              <p className="mt-1 font-medium capitalize text-pink-300">
                {user?.role || "user"}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;