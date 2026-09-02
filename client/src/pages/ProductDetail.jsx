import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, Heart, ShoppingBag, Check, ShieldCheck, ArrowLeft, Star } from 'lucide-react';
import { productAPI, stylistAPI } from '../services/api';
import { useStyleCart } from '../context/StyleCartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleFavorite, favorites, cart } = useStyleCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [styleWithItems, setStyleWithItems] = useState([]);

  const isFav = product && favorites.some((item) => item._id === product._id);
  const isInCart = product && cart.some((item) => item.product._id === product._id && item.size === selectedSize);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await productAPI.getProductById(id);
        setProduct(res.data);
        if (res.data.sizes && res.data.sizes.length > 0) {
          setSelectedSize(res.data.sizes[0]);
        }

        // Fetch AI Style With recommendations
        const recRes = await stylistAPI.recommend({ prompt: `Find items that style with ${res.data.title}` });
        setStyleWithItems(recRes.data.outfitItems.filter((item) => item._id !== id));
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <Sparkles className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Loading garment details from Haute Atelier database...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold text-slate-100">Garment Not Found</h2>
        <Link to="/shop" className="inline-block text-xs font-bold text-amber-400 underline">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Back Button */}
      <Link to="/shop" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-amber-400 transition">
        <ArrowLeft className="w-4 h-4" /> Back to Boutique Catalog
      </Link>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Images Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden glass-panel border border-slate-800 bg-slate-900">
            <img
              src={product.images && product.images[activeImageIdx] ? product.images[activeImageIdx] : product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-24 aspect-[3/4] rounded-xl overflow-hidden border-2 transition ${
                    activeImageIdx === idx ? 'border-amber-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Meta & Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">{product.brand}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                {product.aesthetic}
              </span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-100">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold">{product.rating || 4.9}</span>
                <span className="text-slate-500">({product.reviewCount || 24} reviews)</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> In Stock ({product.stock} units)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 border-y border-slate-800 py-4">
            <span className="font-serif-luxury text-3xl font-bold text-slate-100">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Color preview */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Selected Shade</span>
            <div className="flex items-center gap-2.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800 w-fit">
              <span className="w-4 h-4 rounded-full border border-slate-600 inline-block" style={{ backgroundColor: product.colorHex || '#000' }} />
              <span className="text-xs font-semibold text-slate-200">{product.color}</span>
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Select Size</span>
            <div className="flex gap-2">
              {product.sizes && product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl text-xs font-bold border transition ${
                    selectedSize === size
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Primary CTA Buttons */}
          <div className="pt-4 flex gap-4">
            <button
              onClick={() => addToCart(product, selectedSize)}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-amber-500/20 transition"
            >
              {isInCart ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
              {isInCart ? 'In Shopping Bag' : 'Add to Shopping Bag'}
            </button>

            <button
              onClick={() => toggleFavorite(product)}
              className={`p-4 rounded-2xl border transition ${
                isFav
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-rose-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

        </div>

      </div>

      {/* AI "Style With" Section */}
      {styleWithItems.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif-luxury text-2xl font-bold text-slate-100">
              AI Stylist "Style With" Suggestions
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {styleWithItems.map((item) => (
              <ProductCard key={item._id} product={item} matchScore={97} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProductDetail;
