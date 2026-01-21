import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaShoppingCart, FaTrash, FaPlus, FaMinus, 
  FaArrowLeft, FaCreditCard, FaShippingFast, FaShieldAlt
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart = ({ darkMode }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Proceeding to checkout...');
    // navigate('/checkout'); // Will add later
  };

  const handleQuantityChange = (productId, size, color, change) => {
    const item = cart.items.find(
      item => item._id === productId && item.size === size && item.color === color
    );
    
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1) {
        updateQuantity(productId, size, color, newQuantity);
      }
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className={`inline-flex p-6 rounded-full mb-6 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <FaShoppingCart className="text-4xl opacity-50" />
          </div>
          <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            Your Cart is Empty
          </h1>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Looks like you haven't added any hoodies to your cart yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 ${
                darkMode 
                  ? 'bg-yellow-600 text-black hover:bg-yellow-700' 
                  : 'bg-black text-white hover:bg-gray-800'
              } transition`}
            >
              <FaArrowLeft />
              Continue Shopping
            </Link>
            <Link
              to="/"
              className={`px-6 py-3 rounded-lg border ${
                darkMode 
                  ? 'border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-black'
              } transition`}
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
          Shopping Cart
        </h1>
        <div className="flex items-center justify-between">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''} in your cart
          </p>
          <button
            onClick={clearCart}
            className={`text-sm flex items-center gap-1 px-3 py-1 rounded ${
              darkMode 
                ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30' 
                : 'text-red-600 hover:text-red-800 hover:bg-red-100'
            } transition`}
          >
            <FaTrash size={12} />
            Clear Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="space-y-4">
            {cart.items.map((item, index) => (
              <motion.div
                key={`${item._id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg border ${
                  darkMode ? 'border-gray-800' : 'border-gray-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="sm:w-32">
                    <div className={`aspect-square rounded-lg overflow-hidden ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <img
                        src={item.image || (darkMode ? '/images/hoodie-black.jpeg' : '/images/hoodie-white.jpeg')}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = darkMode ? '/images/hoodie-black.jpeg' : '/images/hoodie-white.jpeg';
                        }}
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                          {item.name}
                        </h3>
                        
                        {/* Size & Color */}
                        <div className="flex flex-wrap gap-3 mb-3">
                          {item.size && (
                            <span className={`px-2 py-1 text-xs rounded ${
                              darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}>
                              Size: {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span className={`px-2 py-1 text-xs rounded flex items-center gap-1 ${
                              darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}>
                              <span 
                                className="w-3 h-3 rounded-full border"
                                style={{ backgroundColor: item.color.toLowerCase() }}
                              />
                              {item.color}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className={`flex items-center border rounded-lg ${
                            darkMode ? 'border-gray-700' : 'border-gray-300'
                          }`}>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.size, item.color, -1)}
                              className={`p-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className={`px-3 py-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.size, item.color, 1)}
                              className={`p-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                          
                          {/* Price */}
                          <div className={`text-lg font-semibold ${darkMode ? 'text-yellow-400' : 'text-amber-600'}`}>
                            Rs {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item._id, item.size, item.color)}
                        className={`p-2 rounded-lg self-start sm:self-center ${
                          darkMode 
                            ? 'text-red-400 hover:bg-red-900/30' 
                            : 'text-red-600 hover:bg-red-100'
                        } transition`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-8">
            <Link
              to="/products"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${
                darkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition`}
            >
              <FaArrowLeft />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className={`sticky top-24 p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg border ${
            darkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
              Order Summary
            </h2>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                  Rs {cart.totalPrice.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                <span className={darkMode ? 'text-green-400' : 'text-green-600'}>
                  {cart.totalPrice > 5000 ? 'FREE' : 'Rs 250'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Tax (18%)</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Rs {(cart.totalPrice * 0.18).toLocaleString()}
                </span>
              </div>
              
              <div className="border-t pt-3 mt-3 border-gray-700">
                <div className="flex justify-between">
                  <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Total</span>
                  <span className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-amber-600'}`}>
                    Rs {(cart.totalPrice + (cart.totalPrice > 5000 ? 0 : 250) + (cart.totalPrice * 0.18)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 mb-4 ${
                darkMode 
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:opacity-90' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90'
              } transition`}
            >
              <FaCreditCard />
              Proceed to Checkout
            </button>

            {/* Shipping Info */}
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="flex items-center gap-2 mb-2">
                <FaShippingFast />
                <span>Free shipping on orders above Rs 5,000</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt />
                <span>Secure SSL encrypted payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;