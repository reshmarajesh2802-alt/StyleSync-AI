import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem("user", JSON.stringify(data.user));

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 py-12 text-white">

      {/* Background glows */}

      <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-500/20 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/20 blur-[140px]" />

      {/* Register Card */}

      <div className="relative z-10 w-full max-w-md">

        {/* Brand */}

        <div className="mb-8 text-center">

          <Link
            to="/"
            className="text-3xl font-bold"
          >
            <span className="text-pink-300">
              StyleSync
            </span>

            <span className="text-white">
              {" "}AI
            </span>
          </Link>

          <p className="mt-3 text-sm text-gray-500">
            Create your personal style profile ✨
          </p>

        </div>

        {/* Glass Card */}

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-2xl sm:p-9">

          <div className="mb-8">

            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-pink-400">
              Welcome
            </p>

            <h1 className="text-3xl font-bold">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Start your StyleSync journey.
            </p>

          </div>

          {/* Error */}

          {error && (
            <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}

            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm text-gray-300"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-pink-400/50 focus:bg-white/10"
              />

            </div>

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm text-gray-300"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-pink-400/50 focus:bg-white/10"
              />

            </div>

            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm text-gray-300"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-pink-400/50 focus:bg-white/10"
              />

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-white px-6 py-4 font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-pink-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account ✨"}
            </button>

          </form>

          {/* Login */}

          <p className="mt-7 text-center text-sm text-gray-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-medium text-pink-300 transition hover:text-pink-200"
            >
              Sign in
            </Link>

          </p>

        </div>

        {/* Back */}

        <div className="mt-6 text-center">

          <Link
            to="/"
            className="text-sm text-gray-600 transition hover:text-gray-300"
          >
            ← Back to StyleSync
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;