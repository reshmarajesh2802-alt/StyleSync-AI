import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';

const CATEGORIES = ['All', 'Outerwear', 'Dresses', 'Tops', 'Bottoms', 'Footwear', 'Accessories'];
const AESTHETICS = ['All', 'Minimalist Elegance', 'Silent Luxury', 'Parisian Chic', 'Cyberpunk Luxury', 'Urban Streetwear'];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialAesthetic = searchParams.get('aesthetic') || 'All';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedAesthetic, setSelectedAesthetic] = useState(initialAesthetic);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedAesthetic, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        aesthetic: selectedAesthetic !== 'All' ? selectedAesthetic : undefined,
        search: searchQuery.trim() || undefined,
        sort: sortBy,
      };
      const res = await productAPI.getProducts(params);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error('Error fetching catalog products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
          <Sparkles className="w-4 h-4" /> Boutique Collection Catalog
        </div>
        <h1 className="font-serif-luxury text-4xl font-bold text-slate-100">
          Haute Couture Apparel & Accessories
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Discover luxury tailored blazers, silk gowns, grade-A Mongolian cashmere, and sculpted leather mules curated by our AI Stylist knowledge engine.
        </p>
      </div>

      {/* Search & Sorting Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search cashmere, silk, blazer, trousers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 pl-10 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </form>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-semibold">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

      </div>

      {/* Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Filter Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Filter className="w-4 h-4 text-amber-400" />
              <h3 className="font-serif-luxury font-bold text-slate-100 text-base">Filter Collection</h3>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Apparel Category</span>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                      selectedCategory === cat
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Aesthetics */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Style Aesthetic</span>
              <div className="space-y-1">
                {AESTHETICS.map((aes) => (
                  <button
                    key={aes}
                    onClick={() => setSelectedAesthetic(aes)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                      selectedAesthetic === aes
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {aes}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-9">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-slate-900/60 rounded-2xl animate-pulse border border-slate-800" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-2xl border border-slate-800 p-8">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="font-serif-luxury text-slate-200 text-lg font-bold">No Garments Found</h3>
              <p className="text-xs text-slate-400 mt-1">Try resetting your filters or search query.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedAesthetic('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} matchScore={96} />
              ))}
            </div>
          )}
        </main>

      </div>

    </div>
  );
};

export default Shop;
