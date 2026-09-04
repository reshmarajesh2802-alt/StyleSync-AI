import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";
export function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from MongoDB
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch orders"
          );
        }

        setOrders(data.orders || []);
      } catch (err) {
        console.error("Fetch orders error:", err);
        setError(
          err.message || "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6">
      {/* Background glow */}
      <div className="pointer-events-none fixed left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-left text-sm text-gray-400 transition hover:text-white"
          >
            ← Back to Shopping
          </button>

          <div className="sm:text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-pink-400">
              StyleSync
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              My Orders 📦
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Track your StyleSync purchases
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center backdrop-blur-xl">
            <div className="text-6xl">📦</div>

            <h2 className="mt-6 text-2xl font-semibold">
              Loading your orders...
            </h2>

            <p className="mt-3 text-gray-500">
              Fetching your latest StyleSync purchases ✨
            </p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-red-400/10 bg-red-500/5 px-6 text-center backdrop-blur-xl">
            <div className="text-6xl">⚠️</div>

            <h2 className="mt-6 text-2xl font-semibold">
              Couldn't load orders
            </h2>

            <p className="mt-3 max-w-md text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-7 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-105"
            >
              Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          /* Empty Orders */
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center backdrop-blur-xl">
            <div className="text-7xl">📦</div>

            <h2 className="mt-6 text-2xl font-semibold">
              No orders yet
            </h2>

            <p className="mt-3 max-w-md text-gray-500">
              Once you place an order, your fashion and beauty
              purchases will appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="mt-7 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-105"
            >
              Start Shopping →
            </button>
          </div>
        ) : (
          <div className="space-y-6">

            {/* Order Count */}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-sm text-gray-400">
                You have{" "}
                <span className="font-semibold text-white">
                  {orders.length}
                </span>{" "}
                {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>

            {/* Order List */}
            {orders.map((order, index) => (
              <div
                key={order._id || order.orderId || index}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >

                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Order ID
                    </p>

                    <p className="mt-1 font-semibold">
                      #{order.orderId || `ORD-${index + 1}`}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs text-gray-500">
                      Ordered on
                    </p>

                    <p className="mt-1 text-sm">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div>
                    <span className="inline-flex items-center rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-medium text-green-300">
                      ● {order.status || "Order Placed"}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-white/10">
                  {(order.items || []).map((item, itemIdx) => (
                    <div
                      key={item._id || item.product?._id || itemIdx}
                      className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center"
                    >

                      {/* Item Image */}
                      <div className="h-32 w-full overflow-hidden rounded-2xl bg-white/5 sm:h-32 sm:w-24">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                          {item.category}
                        </p>

                        <h3 className="mt-2 text-lg font-semibold">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                          ₹
                          {(item.price || 0).toLocaleString(
                            "en-IN"
                          )}{" "}
                          × {item.quantity}
                        </p>
                      </div>

                      {/* Item Total */}
                      <div className="sm:text-right">
                        <p className="text-lg font-semibold">
                          ₹
                          {(
                            (item.price || 0) *
                            (item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="border-t border-white/10 bg-white/[0.02] p-6">
                  <div className="grid gap-4 sm:grid-cols-4">

                    <div>
                      <p className="text-xs text-gray-500">
                        Subtotal
                      </p>

                      <p className="mt-1 font-medium">
                        ₹
                        {(order.subtotal || 0).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Savings
                      </p>

                      <p className="mt-1 font-medium text-green-400">
                        − ₹
                        {(order.discount || 0).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Delivery
                      </p>

                      <p className="mt-1 font-medium">
                        {order.delivery === 0
                          ? "FREE"
                          : `₹${order.delivery}`}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Total Paid
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        ₹
                        {(order.total || 0).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-105"
              >
                Continue Shopping →
              </button>
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

export default Orders;