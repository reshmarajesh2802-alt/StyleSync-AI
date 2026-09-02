import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(savedOrders);
    } catch {
      setOrders([]);
    }
  }, []);

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
            <h1 className="mt-1 text-3xl font-bold">My Orders 📦</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your StyleSync purchases
            </p>
          </div>
        </div>

        {/* Empty Orders */}
        {orders.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center backdrop-blur-xl">
            <div className="text-7xl">📦</div>
            <h2 className="mt-6 text-2xl font-semibold">No orders yet</h2>
            <p className="mt-3 max-w-md text-gray-500">
              Once you place an order, your fashion purchases will appear here.
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
                key={order.id || index}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Order ID
                    </p>
                    <p className="mt-1 font-semibold">
                      #{order.id || `ORD-${index + 1}`}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs text-gray-500">Ordered on</p>
                    <p className="mt-1 text-sm">{formatDate(order.date)}</p>
                  </div>

                  <div>
                    <span className="inline-flex items-center rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-medium text-green-300">
                      ● {order.status || "Placed"}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-white/10">
                  {(order.items || []).map((item, itemIdx) => (
                    <div
                      key={item._id || itemIdx}
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
                          ₹{item.price?.toLocaleString("en-IN")} × {item.quantity}
                        </p>
                      </div>

                      {/* Item Total */}
                      <div className="sm:text-right">
                        <p className="text-lg font-semibold">
                          ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="border-t border-white/10 bg-white/[0.02] p-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-gray-500">Subtotal</p>
                      <p className="mt-1 font-medium">
                        ₹{(order.subtotal || 0).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Savings</p>
                      <p className="mt-1 font-medium text-green-400">
                        ₹{(order.discount || 0).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Total Paid</p>
                      <p className="mt-1 text-xl font-bold">
                        ₹{(order.total || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping Action */}
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