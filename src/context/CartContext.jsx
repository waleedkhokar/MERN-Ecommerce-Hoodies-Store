import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalPrice: 0,
    totalItems: 0
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(
        item => item._id === product._id && item.size === product.size && item.color === product.color
      );
      
      let updatedItems;
      if (existingItem) {
        updatedItems = prevCart.items.map(item =>
          item._id === product._id && item.size === product.size && item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        updatedItems = [...prevCart.items, product];
      }

      const totalPrice = updatedItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
      
      const totalItems = updatedItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      return {
        items: updatedItems,
        totalPrice,
        totalItems
      };
    });

    return { success: true, message: 'Added to cart!' };
  };

  const removeFromCart = (productId, size, color) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(
        item => !(item._id === productId && item.size === size && item.color === color)
      );
      
      const totalPrice = updatedItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
      
      const totalItems = updatedItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      return {
        items: updatedItems,
        totalPrice,
        totalItems
      };
    });
  };

  const updateQuantity = (productId, size, color, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item._id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      );
      
      const totalPrice = updatedItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
      
      const totalItems = updatedItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      return {
        items: updatedItems,
        totalPrice,
        totalItems
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      totalPrice: 0,
      totalItems: 0
    });
    localStorage.removeItem('cart');
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;