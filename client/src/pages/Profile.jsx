import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

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

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <div className="mb-8">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500/10 text-3xl">
              💗
            </div>

            <p className="text-sm uppercase tracking-[0.3em] text-pink-400">
              My Style
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Fashion Profile
            </h1>

            <p className="mt-3 text-gray-400">
              Manage your personal style preferences.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="mt-2 font-medium">
                {user?.name || "—"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-2 break-all font-medium">
                {user?.email || "—"}
              </p>
            </div>

          </div>

          <div className="mt-6 rounded-2xl border border-pink-400/10 bg-pink-500/5 p-6">
            <p className="text-gray-400">
              💗 Your personalized fashion preferences will appear here.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;