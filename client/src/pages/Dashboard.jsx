import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

const FALLBACK_IMAGES = {
  fashion:
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85",

  Dresses:
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85",

  Tops:
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=85",

  Bottoms:
    "https://images.unsplash.com/photo-1506629905607-d9c297d2a4b7?auto=format&fit=crop&w=800&q=85",

  Jackets:
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85",

  Footwear:
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85",

  Accessories:
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=85",

  Sarees:
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",

  Kurtis:
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=85",

  Lehengas:
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=85",

  Gowns:
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85",

  Churidars:
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85",

  "Salwar Suits":
    "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85",

  Anarkali:
    "https://images.unsplash.com/photo-1583391733981-5f3f9e6f3b0c?auto=format&fit=crop&w=800&q=85",

  "Ethnic Sets":
    "https://images.unsplash.com/photo-1610189012906-4c5c6f7b0e6d?auto=format&fit=crop&w=800&q=85",

  Dupattas:
    "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=85",

  Lipsticks:
    "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=85",

  Foundation:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85",

  Concealer:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=85",

  Blush:
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=85",

  "Eye Makeup":
    "https://images.unsplash.com/photo-1512207846876-bb54ef5056e7?auto=format&fit=crop&w=800&q=85",

  "Makeup Tools":
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85",

  Skincare:
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85",
};

const getFallbackImage = (category) => {
  return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.fashion;
};

function Dashboard() {
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

  const [cartMessage, setCartMessage] = useState("");

  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch products"
          );
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

    // Western Fashion
    "Dresses",
    "Tops",
    "Bottoms",
    "Jackets",
    "Footwear",
    "Accessories",

    // Indian / Ethnic Fashion
    "Sarees",
    "Kurtis",
    "Lehengas",
    "Gowns",
    "Churidars",
    "Salwar Suits",
    "Anarkali",
    "Ethnic Sets",
    "Dupattas",

    // Beauty
    "Lipsticks",
    "Foundation",
    "Concealer",
    "Blush",
    "Eye Makeup",
    "Makeup Tools",
    "Skincare",
  ];

  const beautyCategories = [
    "Lipsticks",
    "Foundation",
    "Concealer",
    "Blush",
    "Eye Makeup",
    "Makeup Tools",
    "Skincare",
  ];

  // =========================
  // FILTER
  // =========================

  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return products.filter((product) => {
      const productName = product.name || "";
      const description = product.description || "";
      const category = product.category || "";

      const matchesSearch =
        productName.toLowerCase().includes(searchText) ||
        description.toLowerCase().includes(searchText) ||
        category.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCartMessage(`${product.name} added to cart ✓`);

    setTimeout(() => {
      setCartMessage("");
    }, 2000);
  };

  // =========================
  // WISHLIST
  // =========================

  const handleWishlist = (product) => {
    const exists = wishlist.some(
      (item) => item._id === product._id
    );

    const updatedWishlist = exists
      ? wishlist.filter(
          (item) => item._id !== product._id
        )
      : [...wishlist, product];

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  // =========================
  // CART COUNT
  // =========================

  const cartCount = cart.reduce(
    (total, item) =>
      total + (item.quantity || 0),
    0
  );

  // =========================
  // USER
  // =========================

  const firstName =
    user?.name?.split(" ")[0] || "Beautiful";

  return (
    <div className="min-h-screen overflow-hidden bg-[#fff8fb] text-[#30242b]">

      {/* Background decoration */}

      <div className="pointer-events-none fixed left-[-120px] top-[120px] h-80 w-80 rounded-full bg-pink-200/40 blur-[120px]" />

      <div className="pointer-events-none fixed right-[-100px] top-[420px] h-96 w-96 rounded-full bg-purple-200/30 blur-[140px]" />

      <div className="pointer-events-none fixed bottom-[-150px] left-1/3 h-96 w-96 rounded-full bg-rose-200/30 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">

        {/* =========================
            CART TOAST
        ========================= */}

        {cartMessage && (
          <div className="fixed right-5 top-5 z-[100] rounded-2xl border border-pink-200 bg-white/95 px-5 py-4 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-lg">
                🛍️
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Added to your bag
                </p>

                <p className="mt-0.5 max-w-xs text-xs text-gray-500">
                  {cartMessage
                    .replace(" added to cart ✓", "")
                    .trim()}
                </p>
              </div>

              <span className="ml-2 text-pink-500">
                ✓
              </span>

            </div>
          </div>
        )}

        {/* =========================
            NAVBAR
        ========================= */}

        <nav className="sticky top-0 z-50 mb-10 border-b border-pink-100/80 bg-[#fff8fb]/90 py-5 backdrop-blur-xl">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-left"
            >
              <p className="text-2xl font-bold tracking-tight">
                Style
                <span className="text-pink-500">
                  Sync
                </span>

                <span className="ml-1 text-sm font-medium text-purple-400">
                  AI
                </span>
              </p>

              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                Fashion · Beauty · You
              </p>
            </button>

            {/* Search */}

            <div className="relative w-full lg:max-w-xl">

              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search sarees, kurtis, dresses, makeup..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-full border border-pink-100 bg-white px-5 py-3.5 pl-12 text-sm shadow-sm outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
              />

            </div>

            {/* Actions */}

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={() => navigate("/stylist")}
                className="hidden rounded-full bg-[#30242b] px-5 py-3 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-pink-500 sm:block"
              >
                ✨ AI Stylist
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-pink-100 bg-white shadow-sm transition hover:border-pink-300 hover:bg-pink-50"
                title="Profile"
              >
                👤
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-pink-100 bg-white shadow-sm transition hover:border-pink-300 hover:bg-pink-50"
                title="Shopping Bag"
              >
                🛍️

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </nav>

        {/* =========================
            HERO
        ========================= */}

        <section className="relative mb-14 overflow-hidden rounded-[2rem] border border-pink-100 bg-gradient-to-br from-white via-pink-50 to-purple-50 px-7 py-10 shadow-sm sm:px-10 sm:py-14 lg:px-14">

          <div className="absolute right-[-80px] top-[-80px] text-[180px] opacity-[0.07]">
            🌸
          </div>

          <div className="absolute bottom-[-70px] right-20 text-[150px] opacity-[0.05]">
            💄
          </div>

          <div className="relative max-w-3xl">

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-500">
              ✨ StyleSync AI
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">

              Hello, {firstName} 💗

              <br />

              <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent">
                Your style, your story.
              </span>

            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              Discover Western fashion, beautiful Indian ethnic wear,
              makeup, skincare, and personalized looks curated for you.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() => navigate("/stylist")}
                className="rounded-full bg-[#30242b] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-pink-500"
              >
                ✨ Style Me with AI
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/collections")
                }
                className="rounded-full border border-pink-200 bg-white px-6 py-3.5 text-sm font-semibold shadow-sm transition hover:-translate-y-1 hover:bg-pink-50"
              >
                👗 Explore Collections
              </button>

            </div>

          </div>
        </section>

        {/* =========================
            SHOP YOUR WAY
        ========================= */}

        <section className="mb-14">

          <div className="mb-6">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-500">
              Discover
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Shop Your Way
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Western fashion, Indian ethnic wear and beauty essentials —
              all in one place.
            </p>

          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">

            <button
              type="button"
              onClick={() =>
                setSelectedCategory("Sarees")
              }
              className="group rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg"
            >

              <span className="text-4xl">
                👗
              </span>

              <h3 className="mt-4 text-xl font-bold">
                Fashion & Ethnic Wear
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Sarees, kurtis, churidars, lehengas,
                gowns, dresses & more.
              </p>

              <span className="mt-4 inline-block text-xs font-bold text-pink-500">
                Explore Fashion →
              </span>

            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedCategory("Skincare")
              }
              className="group rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg"
            >

              <span className="text-4xl">
                💄
              </span>

              <h3 className="mt-4 text-xl font-bold">
                Beauty
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Makeup, skincare and beauty essentials.
              </p>

              <span className="mt-4 inline-block text-xs font-bold text-purple-500">
                Explore Beauty →
              </span>

            </button>

          </div>

          {/* Category pills */}

          <div className="flex gap-2 overflow-x-auto pb-3">

            {categories.map((category) => (

              <button
                key={category}
                type="button"
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
                  selectedCategory === category
                    ? "border-pink-400 bg-pink-500 text-white shadow-md"
                    : "border-pink-100 bg-white text-gray-500 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
                }`}
              >
                {category}
              </button>

            ))}

          </div>

        </section>

        {/* =========================
            PRODUCTS
        ========================= */}

        <section>

          <div className="mb-7 flex items-end justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-500">
                {selectedCategory === "All"
                  ? "Curated For You"
                  : selectedCategory}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {selectedCategory === "All"
                  ? "Trending Now"
                  : `Shop ${selectedCategory}`}
              </h2>

            </div>

            <p className="hidden text-sm text-gray-400 sm:block">
              {filteredProducts.length} products
            </p>

          </div>

          {/* Loading */}

          {loading && (
            <div className="rounded-3xl border border-pink-100 bg-white p-20 text-center">
              <div className="text-4xl">
                🌸
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Curating your collection...
              </p>
            </div>
          )}

          {/* Error */}

          {error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-500">
              {error}
            </div>
          )}

          {/* Empty */}

          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div className="rounded-3xl border border-pink-100 bg-white p-12 text-center">

                <p className="text-5xl">
                  🌷
                </p>

                <h3 className="mt-4 text-xl font-bold">
                  Nothing found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try another search or category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                  className="mt-5 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Browse Everything
                </button>

              </div>
            )}

          {/* Product Grid */}

          {!loading &&
            !error &&
            filteredProducts.length > 0 && (

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {filteredProducts.map((product) => {

                  const isWishlisted =
                    wishlist.some(
                      (item) =>
                        item._id === product._id
                    );

                  const isBeauty =
                    beautyCategories.includes(
                      product.category
                    );

                  return (

                    <div
                      key={product._id}
                      className="group overflow-hidden rounded-[1.7rem] border border-pink-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-pink-200 hover:shadow-xl"
                    >

                      {/* IMAGE */}

                      <div className="relative aspect-[4/5] overflow-hidden bg-pink-50">

                        <img
                          src={
                            product.image ||
                            getFallbackImage(
                              product.category
                            )
                          }
                          alt={product.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                              getFallbackImage(
                                product.category
                              );
                          }}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />

                        {/* Wishlist */}

                        <button
                          type="button"
                          onClick={() =>
                            handleWishlist(product)
                          }
                          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow-md backdrop-blur-md transition hover:scale-110 ${
                            isWishlisted
                              ? "text-pink-500"
                              : "text-gray-500"
                          }`}
                          title="Wishlist"
                        >
                          {isWishlisted
                            ? "♥"
                            : "♡"}
                        </button>

                        {/* Category */}

                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-pink-500 shadow-sm backdrop-blur-md">
                          {isBeauty
                            ? "Beauty"
                            : "Fashion"}
                        </span>

                        {/* Featured */}

                        {product.isFeatured && (
                          <span className="absolute bottom-4 left-4 rounded-full bg-[#30242b]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                            ✨ Featured
                          </span>
                        )}

                      </div>

                      {/* INFO */}

                      <div className="p-5">

                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pink-400">
                          {product.category}
                        </p>

                        <h3 className="mt-2 line-clamp-1 text-base font-bold">
                          {product.name}
                        </h3>

                        <div className="mt-2 flex items-center gap-2">

                          <span className="text-sm text-amber-400">
                            ★
                          </span>

                          <span className="text-xs text-gray-500">
                            {product.rating}
                          </span>

                        </div>

                        <div className="mt-5 flex items-center justify-between">

                          <p className="text-lg font-bold">
                            ₹
                            {Number(
                              product.price || 0
                            ).toLocaleString("en-IN")}
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              handleAddToCart(product)
                            }
                            className="rounded-full bg-[#30242b] px-4 py-2.5 text-xs font-semibold text-white transition hover:scale-105 hover:bg-pink-500"
                          >
                            Add to Bag
                          </button>

                        </div>

                      </div>

                    </div>

                  );
                })}

              </div>

            )}

        </section>

        {/* =========================
            COMPLETE LOOK
        ========================= */}

        <section className="mt-20 rounded-[2rem] border border-pink-100 bg-gradient-to-r from-pink-50 via-white to-purple-50 p-8 text-center sm:p-12">

          <p className="text-4xl">
            👗 💄 ✨
          </p>

          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Fashion meets beauty.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Build your complete look with StyleSync AI.
            Find the perfect outfit, matching accessories,
            makeup and skincare for every occasion.
          </p>

          <button
            type="button"
            onClick={() => navigate("/stylist")}
            className="mt-7 rounded-full bg-pink-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-pink-600"
          >
            ✨ Create My Complete Look
          </button>

        </section>

        {/* =========================
            AI STYLIST
        ========================= */}

        <section className="relative mt-10 overflow-hidden rounded-[2rem] bg-[#30242b] p-8 text-white shadow-xl sm:p-12">

          <div className="absolute right-[-40px] top-[-60px] text-[170px] opacity-[0.06]">
            ✨
          </div>

          <div className="absolute bottom-[-60px] left-[-20px] text-[160px] opacity-[0.05]">
            🌸
          </div>

          <div className="relative max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-300">
              StyleSync Intelligence
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Your personal stylist is always here. ✨
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">
              Tell our AI stylist your occasion, preferred
              colors, outfit type or beauty goals. Get a
              complete personalized look including Indian
              ethnic wear, Western fashion and beauty.
            </p>

            <button
              type="button"
              onClick={() => navigate("/stylist")}
              className="mt-6 rounded-full bg-pink-100 px-6 py-3.5 text-sm font-bold text-[#30242b] transition hover:-translate-y-1 hover:bg-pink-200"
            >
              ✨ Ask AI Stylist →
            </button>

          </div>

        </section>

        {/* =========================
            QUICK LINKS
        ========================= */}

        <section className="mt-10 grid gap-5 md:grid-cols-3">

          <button
            type="button"
            onClick={() =>
              navigate("/collections")
            }
            className="group rounded-[1.7rem] border border-pink-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            <span className="text-3xl">
              👗
            </span>

            <h3 className="mt-4 text-xl font-bold">
              Collections
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Explore elegant, casual, party,
              ethnic and beauty collections.
            </p>

            <span className="mt-4 inline-block text-xs font-bold text-pink-500">
              Explore →
            </span>

          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/profile")
            }
            className="group rounded-[1.7rem] border border-pink-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            <span className="text-3xl">
              💗
            </span>

            <h3 className="mt-4 text-xl font-bold">
              My Style
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Manage your profile, addresses and
              StyleSync preferences.
            </p>

            <span className="mt-4 inline-block text-xs font-bold text-pink-500">
              View Profile →
            </span>

          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="group rounded-[1.7rem] border border-pink-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:bg-red-50 hover:shadow-lg"
          >

            <span className="text-3xl">
              🌷
            </span>

            <h3 className="mt-4 text-xl font-bold">
              See You Soon
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign out of your StyleSync account securely.
            </p>

            <span className="mt-4 inline-block text-xs font-bold text-red-400">
              Logout →
            </span>

          </button>

        </section>

        {/* =========================
            FOOTER
        ========================= */}

        <footer className="mt-16 border-t border-pink-100 py-8 text-center">

          <p className="text-sm font-semibold">
            StyleSync{" "}
            <span className="text-pink-500">
              AI
            </span>
          </p>

          <p className="mt-2 text-xs text-gray-400">
            Your personal fashion & beauty space ✨
          </p>

        </footer>

      </div>
    </div>
  );
}

export default Dashboard;