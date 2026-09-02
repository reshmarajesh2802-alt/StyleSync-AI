import React, { useEffect, useState } from 'react';
import { Package, DollarSign, ShoppingCart, ShieldAlert, Plus, Trash2, Edit3, Check, X, Store } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import { adminAPI, productAPI, orderAPI } from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // New product form modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState(290);
  const [newCategory, setNewCategory] = useState('Outerwear');
  const [newAesthetic, setNewAesthetic] = useState('Minimalist Elegance');
  const [newColor, setNewColor] = useState('Obsidian Black');
  const [newStock, setNewStock] = useState(12);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1548624149-f1e944f86d8a?auto=format&fit=crop&w=800&q=80');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [metRes, prodRes, ordRes] = await Promise.all([
        adminAPI.getMetrics(),
        productAPI.getProducts({}),
        orderAPI.getAllOrders(),
      ]);
      setMetrics(metRes.data);
      setProducts(prodRes.data.products || []);
      setOrders(ordRes.data.orders || []);
    } catch (err) {
      console.error('Error loading admin metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await productAPI.createProduct({
        title: newTitle,
        description: newDesc,
        price: Number(newPrice),
        category: newCategory,
        aesthetic: newAesthetic,
        color: newColor,
        stock: Number(newStock),
        images: [newImage],
      });
      setShowAddModal(false);
      fetchAdminData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this garment from inventory?')) return;
    try {
      await productAPI.deleteProduct(id);
      fetchAdminData();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Haute Atelier Console</span>
            <h1 className="font-serif-luxury text-3xl font-bold text-slate-100">Boutique Management Dashboard</h1>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" /> Add New Garment
          </button>
        </div>

        {/* Tab: Overview Metrics */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
                  <Package className="w-5 h-5 text-amber-400" />
                </div>
                <div className="font-serif-luxury text-3xl font-bold text-slate-100">{metrics?.totalProducts || 0}</div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Customer Orders</span>
                  <ShoppingCart className="w-5 h-5 text-amber-400" />
                </div>
                <div className="font-serif-luxury text-3xl font-bold text-slate-100">{metrics?.totalOrders || 0}</div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Est. Revenue</span>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="font-serif-luxury text-3xl font-bold text-emerald-400">${metrics?.totalRevenue || 0}</div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between text-rose-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Low Stock Alerts</span>
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="font-serif-luxury text-3xl font-bold text-rose-400">{metrics?.lowStockCount || 0}</div>
              </div>

            </div>
          </div>
        )}

        {/* Tab: Products Inventory */}
        {(activeTab === 'products' || activeTab === 'overview') && (
          <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-slate-100">Product Inventory Management</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-amber-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Garment</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Aesthetic</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-900/40">
                      <td className="p-3 font-semibold text-slate-100 flex items-center gap-3">
                        <img src={p.images[0]} alt={p.title} className="w-8 h-10 object-cover rounded-md" />
                        {p.title}
                      </td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3">{p.aesthetic}</td>
                      <td className="p-3 font-bold text-slate-100">${p.price}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold ${p.stock <= 5 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-300'}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p._id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Add Garment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg rounded-3xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-serif-luxury text-lg font-bold text-slate-100">Add New Boutique Product</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Silk Satin Tailored Blazer"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Description</label>
                <textarea
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Garment details..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Stock Qty</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Outerwear">Outerwear</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Aesthetic</label>
                  <select
                    value={newAesthetic}
                    onChange={(e) => setNewAesthetic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Minimalist Elegance">Minimalist Elegance</option>
                    <option value="Silent Luxury">Silent Luxury</option>
                    <option value="Parisian Chic">Parisian Chic</option>
                    <option value="Cyberpunk Luxury">Cyberpunk Luxury</option>
                    <option value="Urban Streetwear">Urban Streetwear</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Image URL</label>
                <input
                  type="text"
                  required
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition"
              >
                Save Garment to Inventory
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
