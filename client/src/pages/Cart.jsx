import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  const [orderMessage, setOrderMessage] = useState("");

  // Save Cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Save Wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Update Quantity
  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item._id !== id) return item;

          const newQuantity = item.quantity + change;

          if (newQuantity <= 0) {
            return null;
          }

          return {
            ...item,
            quantity: newQuantity,
          };
        })
        .filter(Boolean)
    );
  };

  // Remove Item
  const removeItem = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item._id !== id));
  };

  // Move to Wishlist
  const moveToWishlist = (product) => {
    const alreadyWishlisted = wishlist.some(
      (item) => item._id === product._id
    );

    if (!alreadyWishlisted) {
      setWishlist((currentWishlist) => [...currentWishlist, product]);
    }

    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== product._id)
    );
  };

  // Calculations
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = Math.round(subtotal * 0.1);
  const delivery = subtotal >= 999 ? 0 : 99;
  const totalPrice = subtotal - discount + delivery;

  // Place Order
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    let existingOrders = [];
    try {
      existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
      existingOrders = [];
    }

    const newOrder = {
      id: `SS${Date.now()}`,
      items: cart,
      subtotal,
      discount,
      delivery,
      total: totalPrice,
      status: "Order Placed",
      date: new Date().toISOString(),
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    setCart([]);
    setOrderMessage("Your order has been placed successfully! 🎉");

    setTimeout(() => {
      navigate("/orders");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-6">
      {/* Background Glow */}
      <div className="pointer-events-none fixed left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-[140px]" />

      {/* Success Notification Banner */}
      {orderMessage && (
        <div className="fixed right-5 top-5 z-50 rounded-2xl border border-green-400/20 bg-black/90 px-6 py-4 shadow-2xl backdrop-blur-xl">
          <p className="text-sm font-medium text-white">✅ {orderMessage}</p>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-left text-sm text-gray-400 transition hover:text-white"
          >
            ← Continue Shopping
          </button>

          <div className="sm:text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-pink-400">
              StyleSync
            </p>
            <h1 className="mt-1 text-3xl font-bold">Shopping Bag 🛍️</h1>

            {cart.length > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your bag
              </p>
            )}
          </div>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center backdrop-blur-xl">
            <div className="text-7xl">🛍️</div>

            <h2 className="mt-6 text-3xl font-semibold">Your bag is empty</h2>

            <p className="mt-3 max-w-md leading-7 text-gray-500">
              Looks like you haven't added anything yet. Discover something
              beautiful and make it yours.
            </p>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="mt-8 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-105"
            >
              Explore Fashion →
            </button>

            {wishlist.length > 0 && (
              <button
                type="button"
                onClick={() => navigate("/wishlist")}
                className="mt-4 text-sm text-pink-400 transition hover:text-pink-300"
              >
                ❤️ View Wishlist
              </button>
            )}
          </div>
        ) : (
          /* Main Cart Content */
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Column — Products */}
            <div>
              {/* Delivery Banner */}
              <div className="mb-6 rounded-2xl border border-green-400/10 bg-green-500/5 p-4">
                <p className="text-sm font-medium text-green-300">
                  🚚 Free delivery on orders above ₹999
                </p>

                {subtotal < 999 && (
                  <p className="mt-1 text-xs text-gray-500">
                    Add ₹{(999 - subtotal).toLocaleString("en-IN")} more to
                    unlock free delivery.
                  </p>
                )}
              </div>

              {/* Product Cards */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:border-pink-400/20"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row">
                      {/* Product Image */}
                      <div className="h-52 w-full overflow-hidden rounded-2xl bg-white/5 sm:h-44 sm:w-32">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500">
                              {item.category}
                            </p>
                            <h3 className="mt-2 text-xl font-semibold">
                              {item.name}
                            </h3>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-yellow-400">★</span>
                              <span className="text-sm text-gray-500">
                                {item.rating}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item._id)}
                            className="text-gray-600 transition hover:text-red-400"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Price */}
                        <div className="mt-5">
                          <p className="text-xl font-semibold">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        {/* Bottom Actions & Quantity Counter */}
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                          {/* Quantity Controls */}
                          <div className="flex items-center rounded-full border border-white/10 bg-white/5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item._id, -1)}
                              className="flex h-9 w-9 items-center justify-center text-gray-400 transition hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>

                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item._id, 1)}
                              className="flex h-9 w-9 items-center justify-center text-gray-400 transition hover:text-white"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={() => moveToWishlist(item)}
                              className="text-xs text-gray-400 transition hover:text-pink-400"
                            >
                              ♡ Move to Wishlist
                            </button>

                            <button
                              type="button"
                              onClick={() => removeItem(item._id)}
                              className="text-xs text-gray-500 transition hover:text-red-400"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Wishlist Shortcut Banner */}
              {wishlist.length > 0 && (
                <button
                  type="button"
                  onClick={() => navigate("/wishlist")}
                  className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm text-gray-400 transition hover:border-pink-400/20 hover:text-pink-300"
                >
                  ❤️ You have {wishlist.length} item
                  {wishlist.length > 1 ? "s" : ""} in your wishlist →
                </button>
              )}
            </div>

            {/* Right Column — Summary Panel */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                  Price Details
                </p>

                <div className="mt-7 space-y-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total MRP</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-green-400">
                      − ₹{discount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery</span>
                    <span
                      className={
                        delivery === 0 ? "text-green-400" : "text-white"
                      }
                    >
                      {delivery === 0 ? "FREE" : `₹${delivery}`}
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-5">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total Amount</span>
                      <span className="text-2xl font-bold">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Savings Callout */}
                <div className="mt-6 rounded-2xl border border-green-400/10 bg-green-500/5 p-4">
                  <p className="text-sm text-green-300">
                    🎉 You save ₹{discount.toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    StyleSync special offer applied.
                  </p>
                </div>

                {/* Primary Actions */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="mt-6 w-full rounded-full bg-pink-500 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-pink-400"
                >
                  Place Order →
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="mt-3 w-full rounded-full border border-white/10 bg-white/5 py-3.5 text-sm text-gray-300 transition hover:bg-white/10"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-xl">🔒</div>
                  <p className="mt-2 text-[10px] text-gray-500">Secure</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-xl">🚚</div>
                  <p className="mt-2 text-[10px] text-gray-500">
                    Fast Delivery
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-xl">✨</div>
                  <p className="mt-2 text-[10px] text-gray-500">AI Curated</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 border-t border-white/10 py-8 text-center text-sm text-gray-600">
          StyleSync AI · Fashion that understands you ✨
        </div>
      </div>
    </div>
  );
}

export default Cart;