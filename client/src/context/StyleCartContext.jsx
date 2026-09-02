import React, { createContext, useContext, useState } from 'react';

const StyleCartContext = createContext();

export const StyleCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [stylePersona, setStylePersona] = useState({
    primaryAesthetic: 'Minimalist Elegance',
    colorPalette: ['Monochrome', 'Gold Accents'],
    fitPreference: 'Tailored Fit',
  });
  const [activeOutfit, setActiveOutfit] = useState(null);

  const addToCart = (product, size = 'M') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) => prev.filter((item) => !(item.product._id === productId && item.size === size)));
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p._id === product._id);
      if (exists) return prev.filter((p) => p._id !== product._id);
      return [...prev, product];
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <StyleCartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        favorites,
        toggleFavorite,
        stylePersona,
        setStylePersona,
        activeOutfit,
        setActiveOutfit,
      }}
    >
      {children}
    </StyleCartContext.Provider>
  );
};

export const useStyleCart = () => useContext(StyleCartContext);
