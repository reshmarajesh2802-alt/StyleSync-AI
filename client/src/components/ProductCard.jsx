import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Plus, Check } from 'lucide-react';
import { useStyleCart } from '../context/StyleCartContext';

const ProductCard = ({ product, matchScore }) => {
  const { toggleFavorite, favorites, addToCart, cart } = useStyleCart();
  const isFav = favorites.some((item) => item._id === product._id);
  const isInCart = cart.some((item) => item.product._id === product._id);

  return (
    <div className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
          <img
            src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1548624149-f1e944f86d8a?auto=format&fit=crop&w=800&q=80'}
            alt={product.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Aesthetic Tag Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
              {product.aesthetic || 'Luxe'}
            </span>
            {matchScore && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center gap-1 shadow-lg">
                <Sparkles className="w-3 h-3 fill-slate-950" /> {matchScore}% AI Match
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(product)}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
              isFav
                ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400'
                : 'bg-slate-950/60 border border-slate-700/50 text-slate-300 hover:text-rose-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-400">{product.brand || 'StyleSync Atelier'}</span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full border border-slate-600 inline-block" style={{ backgroundColor: product.colorHex || '#000' }} />
              {product.color}
            </span>
          </div>

          <Link to={`/product/${product._id}`} className="block">
            <h3 className="font-serif-luxury font-bold text-slate-100 text-base group-hover:text-amber-300 transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing & Add to Cart Action */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-800/60 mt-2">
        <div>
          <span className="text-xs text-slate-400 block font-medium">Price</span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif-luxury text-lg font-bold text-slate-100">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <button
          onClick={() => addToCart(product, product.sizes ? product.sizes[0] : 'M')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            isInCart
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-100 border border-slate-700 hover:border-amber-500/50 hover:bg-slate-700'
          }`}
        >
          {isInCart ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isInCart ? 'In Bag' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
