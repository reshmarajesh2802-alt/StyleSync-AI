import React, { useEffect, useState } from 'react';
import { Package, Clock, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { orderAPI } from '../services/api';
import { Link } from 'react-router-dom';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderAPI.getUserOrders();
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Account Dashboard</span>
        <h1 className="font-serif-luxury text-3xl font-bold text-slate-100">My Orders & Purchases</h1>
        <p className="text-xs text-slate-400">Track order processing, shipments, and haute couture receipts.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs animate-pulse">Loading order history...</div>
      ) : orders.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="font-serif-luxury text-slate-200 font-bold text-lg">No Orders Placed Yet</h3>
          <p className="text-xs text-slate-400">Explore our boutique catalog or ask SyncStylist AI to curate your first outfit capsule.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
            Shop Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Order ID: #{order._id.substring(0, 10)}</span>
                  <span className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {order.status}
                  </span>
                  <span className="font-serif-luxury text-lg font-bold text-slate-100">${order.totalAmount}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1548624149-f1e944f86d8a?auto=format&fit=crop&w=200&q=80'}
                      alt={item.title}
                      className="w-12 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-200 block truncate">{item.title}</span>
                      <span className="text-xs text-slate-400">Size: {item.size} • Qty: {item.quantity}</span>
                      <span className="text-xs text-amber-400 font-semibold block">${item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default CustomerOrders;
