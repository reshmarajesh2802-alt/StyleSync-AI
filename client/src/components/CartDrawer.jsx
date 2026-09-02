import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStyleCart } from '../context/StyleCartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import confetti from 'canvas-confetti';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, clearCart, cartTotal } = useStyleCart();
  const { user } = useAuth();
  const [placing, setPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (!user) {
      alert('Please sign in or register to place your order.');
      return;
    }
    if (cart.length === 0) return;

    setPlacing(true);
    try {
      const orderItems = cart.map((item) => ({
        product: item.product._id,
        title: item.product.title,
        image: item.product.images[0],
        price: item.product.price,
        size: item.size,
        quantity: item.quantity,
      }));

      await orderAPI.createOrder({
        orderItems,
        totalAmount: cartTotal,
      });

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });

      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      alert(err.response?.data?.message || 'Checkout failed');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl h-full">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-luxury text-slate-100 font-bold text-lg">Your Shopping Bag</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {orderSuccess ? (
          <div className="text-center py-20 space-y-4 my-auto">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-serif-luxury text-2xl font-bold text-slate-100">Order Placed Successfully!</h3>
            <p className="text-xs text-slate-400">Your haute couture garments are being prepared for dispatch.</p>
            <button
              onClick={() => { setOrderSuccess(false); onClose(); }}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Continue Shopping
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-20 space-y-3 my-auto text-slate-400">
            <ShoppingBag className="w-12 h-12 mx-auto text-slate-600" />
            <p className="text-xs">Your shopping bag is currently empty.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images && item.product.images[0] ? item.product.images[0] : 'https://images.unsplash.com/photo-1548624149-f1e944f86d8a?auto=format&fit=crop&w=200&q=80'}
                    alt={item.product.title}
                    className="w-12 h-14 object-cover rounded-xl"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{item.product.title}</h4>
                    <span className="text-[10px] text-slate-400 block">Size: {item.size} • Qty: {item.quantity}</span>
                    <span className="text-xs font-serif-luxury font-bold text-amber-400">${item.product.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product._id, item.size)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer Checkout */}
        {!orderSuccess && cart.length > 0 && (
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Total Amount:</span>
              <span className="font-serif-luxury font-bold text-xl text-slate-100">${cartTotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={placing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-amber-500/20 transition disabled:opacity-50"
            >
              {placing ? 'Processing Order...' : 'Proceed to Checkout'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;
