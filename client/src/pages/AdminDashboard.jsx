import { useEffect, useState } from "react";

function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/admin/metrics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch admin metrics");
        }

        setMetrics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading admin dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Boutique Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">Products</p>
          <h2 className="text-3xl font-bold">{metrics.totalProducts}</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">Orders</p>
          <h2 className="text-3xl font-bold">{metrics.totalOrders}</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">Customers</p>
          <h2 className="text-3xl font-bold">{metrics.totalCustomers}</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">Revenue</p>
          <h2 className="text-3xl font-bold">
            ₹{metrics.totalRevenue}
          </h2>
        </div>
      </div>

      <div className="mt-8 bg-slate-900 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Inventory</h2>

        <p>
          Low Stock Products:{" "}
          <span className="text-yellow-400">
            {metrics.lowStockCount}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;