import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function Register() {
  const navigate = useNavigate();
  const isMounted = useRef(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name.trim()) {
      return "Full Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (isMounted.current) {
        navigate("/dashboard");
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message || "An unexpected error occurred.");
      }
    } fontFinally: {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 py-12 text-white">
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/20 blur-[140px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="mb-8 text-center">
          <Link to="/" className="text-3xl font-bold">
            <span className="text-pink-300">StyleSync</span>
            <span className="text-white"> AI</span>
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Create your personal style profile ✨
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-2xl sm:p-9">
          <div className="mb-8">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-pink-400">
              Welcome
            </p>
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="mt-2 text-sm text-gray-500">
              Start your StyleSync journey.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name Input */}
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
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-pink-400/50 focus:bg-white/10"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-pink-400/50 focus:bg-white/10"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 pr-12 text-white outline-none transition placeholder:text-gray-600 focus:border-pink-400/50 focus:bg-white/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-pink-400/50 focus:bg-white/10"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-white px-6 py-4 font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-pink-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account ✨"}
            </button>
          </form>

          {/* Login Link */}
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

        {/* Back Link */}
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