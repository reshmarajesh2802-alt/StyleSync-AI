import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // CART
  // =========================
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  // =========================
  // WISHLIST
  // =========================
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  // =========================
  // CART MESSAGE
  // =========================
  const [cartMessage, setCartMessage] = useState("");

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data.products || []);
      } catch (err) {
        console.error("Product fetch error:", err);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // CATEGORIES
  // =========================
  const categories = [
    "All",
    "Dresses",
    "Tops",
    "Bottoms",
    "Jackets",
    "Footwear",
    "Accessories",
  ];

  // =========================
  // FILTER PRODUCTS
  // =========================
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Show success message
    setCartMessage(`${product.name} added to cart ✓`);

    // Hide message after 2 seconds
    setTimeout(() => {
      setCartMessage("");
    }, 2000);
  };

  // =========================
  // WISHLIST
  // =========================
  const handleWishlist = (product) => {
    const exists = wishlist.some((item) => item._id === product._id);

    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter((item) => item._id !== product._id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  // =========================
  // CART ITEM COUNT
  // =========================
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Cart Success Toast Notification */}
        {cartMessage && (
          <div className="fixed right-6 top-6 z-[100] rounded-2xl border border-pink-400/20 bg-black/90 px-5 py-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500/15 text-lg">
                🛒
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Added to Cart
                </p>
                <p className="mt-0.5 max-w-xs text-xs text-gray-400">
                  {cartMessage.replace(" added to cart ✓", "").trim()}
                </p>
              </div>

              <span className="ml-2 text-pink-400">✓</span>
            </div>
          </div>
        )}

        {/* Navigation Bar */}
        <nav className="mb-14 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-left"
          >
            <p className="text-lg font-bold tracking-wide">
              Style<span className="text-pink-400">Sync</span>
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              AI Fashion
            </p>
          </button>

          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              🔎
            </span>
            <input
              type="text"
              placeholder="Search dresses, tops, jackets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-pink-400/40 focus:bg-white/10"
            />
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-pink-400/30 hover:bg-pink-500/10"
              title="Profile"
              aria-label="Profile"
            >
              👤
            </button>

            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-pink-400/30 hover:bg-pink-500/10"
              title="Cart"
              aria-label="Shopping Cart"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-400">
            StyleSync AI
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            Your style.
            <span className="text-pink-300"> Your wardrobe.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            Discover fashion curated for you, explore new trends, and let AI
            help you find your perfect look.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => navigate("/stylist")}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
            >
              ✨ Style Me
            </button>

            <button
              type="button"
              onClick={() => navigate("/collections")}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium transition hover:bg-white/10"
            >
              👗 Explore Collections
            </button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Shop by Category</h2>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm transition ${
                  selectedCategory === category
                    ? "border-pink-400/50 bg-pink-500/15 text-pink-300"
                    : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section>
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                Discover
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Recommended For You
              </h2>
            </div>

            <p className="hidden text-sm text-gray-500 sm:block">
              {filteredProducts.length} products
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-20 text-center text-gray-500">
              Loading fashion collection...
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-6 text-center text-red-300">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
              <p className="text-4xl">🔎</p>
              <h3 className="mt-4 text-xl font-semibold">No products found</h3>
              <p className="mt-2 text-gray-500">
                Try another search or category.
              </p>
            </div>
          )}

          {/* Product Grid */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.some(
                  (item) => item._id === product._id
                );

                return (
                  <div
                    key={product._id}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-pink-400/30 hover:bg-white/10"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      {/* Wishlist Button */}
                      <button
                        type="button"
                        onClick={() => handleWishlist(product)}
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl backdrop-blur-md transition hover:scale-110"
                        title="Wishlist"
                        aria-label="Add to Wishlist"
                      >
                        {isWishlisted ? "❤️" : "♡"}
                      </button>

                      {/* Featured Badge */}
                      {product.isFeatured && (
                        <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-pink-300 backdrop-blur-md">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Product Information */}
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        {product.category}
                      </p>

                      <h3 className="mt-2 line-clamp-1 text-lg font-semibold">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-yellow-400">★</span>
                        <span className="text-sm text-gray-400">
                          {product.rating}
                        </span>
                      </div>

                      {/* Price & Add to Cart */}
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-lg font-semibold">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:scale-105 hover:bg-pink-100"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* AI Stylist Feature Banner */}
        <section className="mt-20 overflow-hidden rounded-3xl border border-pink-400/10 bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-8 sm:p-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-pink-400">
              StyleSync Intelligence
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Not sure what to wear?
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Tell our AI stylist about your occasion, mood, and preferences.
              We'll help you discover a look that feels uniquely yours.
            </p>

            <button
              type="button"
              onClick={() => navigate("/stylist")}
              className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
            >
              ✨ Ask AI Stylist →
            </button>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate("/collections")}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-purple-400/30 hover:bg-white/10"
          >
            <span className="text-3xl">👗</span>
            <h3 className="mt-4 text-xl font-semibold">Collections</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Explore Elegant, Casual, Streetwear and Party looks.
            </p>
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-pink-400/30 hover:bg-white/10"
          >
            <span className="text-3xl">💗</span>
            <h3 className="mt-4 text-xl font-semibold">My Style</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Manage your profile and personalize your StyleSync experience.
            </p>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-red-400/30 hover:bg-red-500/5"
          >
            <span className="text-3xl">🚪</span>
            <h3 className="mt-4 text-xl font-semibold">Logout</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign out of your StyleSync account securely.
            </p>
          </button>
        </section>

        {/* Footer */}
        <div className="mt-16 border-t border-white/10 py-8 text-center text-sm text-gray-600">
          StyleSync AI · Your personal fashion space ✨
        </div>
      </div>
    </div>
  );
}

export default Dashboard;