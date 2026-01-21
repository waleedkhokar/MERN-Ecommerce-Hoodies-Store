import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaUser, FaCreditCard, FaLock, FaArrowLeft
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Checkout = ({ darkMode }) => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod'
  });
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingCost = cart.totalPrice > 5000 ? 0 : 250;
  const tax = cart.totalPrice * 0.18;
  const total = cart.totalPrice + shippingCost + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (cart.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate random order ID
      const newOrderId = 'ORD-' + Date.now().toString().slice(-8);
      setOrderId(newOrderId);
      
      // Clear cart
      clearCart();
      
      // Show success
      setOrderPlaced(true);
      
    } catch (error) {
      alert('Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
          Your Cart is Empty
        </h1>
        <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Add some hoodies to your cart before checking out.
        </p>
        <button
          onClick={() => navigate('/products')}
          className={`px-6 py-3 rounded-lg flex items-center gap-2 mx-auto ${
            darkMode 
              ? 'bg-yellow-600 text-black hover:bg-yellow-700' 
              : 'bg-black text-white hover:bg-gray-800'
          } transition`}
        >
          <FaArrowLeft />
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`max-w-2xl mx-auto p-8 rounded-2xl text-center ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl`}
        >
          <div className={`inline-flex p-4 rounded-full mb-6 ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>
          
          <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            Order Placed Successfully! 🎉
          </h1>
          
          <p className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Thank you for your order, <span className="font-bold text-yellow-500">{formData.name}</span>!
          </p>
          
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your order <span className="font-bold text-green-500">{orderId}</span> has been confirmed.
          </p>
          
          <div className={`p-6 rounded-xl mb-8 text-left ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
              Order Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Order ID</p>
                <p className="font-bold">{orderId}</p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Amount</p>
                <p className="font-bold text-green-500">Rs {total.toLocaleString()}</p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Payment Method</p>
                <p className="font-bold">Cash on Delivery</p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Delivery To</p>
                <p className="font-bold">{formData.city}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/products')}
              className={`px-6 py-3 rounded-lg ${darkMode 
                ? 'bg-yellow-600 text-black hover:bg-yellow-700' 
                : 'bg-black text-white hover:bg-gray-800'} transition`}
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/')}
              className={`px-6 py-3 rounded-lg border ${
                darkMode 
                  ? 'border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-black'
              } transition`}
            >
              Go to Homepage
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
        Checkout
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Order Form */}
        <div className="lg:w-2/3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg mb-6`}
          >
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-black'}`}>
              <FaUser />
              Shipping Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-black'
                  } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3">
                    <FaEnvelope className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-black'
                    } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3">
                    <FaPhone className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-black'
                    } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="03XX XXXXXXX"
                  />
                </div>
              </div>
              
              <div>
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-black'
                  } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                  placeholder="Rawalakot"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Delivery Address *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3">
                    <FaMapMarkerAlt className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                  </div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-black'
                    } focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none`}
                    placeholder="House #123, Street #4, Sector..."
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
          >
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-black'}`}>
              <FaCreditCard />
              Payment Method
            </h2>
            
            <div className="space-y-3">
              <label className={`flex items-center p-4 rounded-lg border cursor-pointer ${
                formData.paymentMethod === 'cod'
                  ? darkMode 
                    ? 'border-yellow-500 bg-yellow-500/10' 
                    : 'border-amber-500 bg-amber-50'
                  : darkMode 
                  ? 'border-gray-700 hover:border-gray-600' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <div className="flex-1">
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    Cash on Delivery
                  </span>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Pay when you receive your order
                  </p>
                </div>
                <div className={`p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <FaLock className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                </div>
              </label>
              
              <label className={`flex items-center p-4 rounded-lg border cursor-pointer ${
                formData.paymentMethod === 'card'
                  ? darkMode 
                    ? 'border-yellow-500 bg-yellow-500/10' 
                    : 'border-amber-500 bg-amber-50'
                  : darkMode 
                  ? 'border-gray-700 hover:border-gray-600' 
                  : 'border-gray-300 hover:border-gray-400'
              } opacity-50 cursor-not-allowed`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  disabled
                  className="mr-3"
                />
                <div className="flex-1">
                  <span className={`font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Credit/Debit Card
                  </span>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>
                    Coming soon
                  </p>
                </div>
              </label>
            </div>
          </motion.div>
        </div>
        
        {/* Right Column - Order Summary */}
        <div className="lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`sticky top-24 p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
              Order Summary
            </h2>
            
            {/* Items List */}
            <div className="mb-6 max-h-60 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={`${item._id}-${item.size}`} className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-700">
                  <div className="w-16 h-16 rounded overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-black'}`}>
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.quantity} × Rs {item.price.toLocaleString()}
                      </span>
                      {item.size && (
                        <span className={`text-xs px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          {item.size}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`font-semibold ${darkMode ? 'text-yellow-400' : 'text-amber-600'}`}>
                    Rs {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                <span className="font-medium">Rs {cart.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                <span className={cart.totalPrice > 5000 ? 'text-green-500' : ''}>
                  {shippingCost === 0 ? 'FREE' : `Rs ${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Tax (18%)</span>
                <span>Rs {tax.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3 border-gray-700">
                <div className="flex justify-between">
                  <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Total</span>
                  <span className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-amber-600'}`}>
                    Rs {total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : darkMode 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:opacity-90' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90'
              } transition`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  Place Order
                </>
              )}
            </button>
            
            <p className={`text-xs text-center mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              By placing your order, you agree to our Terms & Conditions
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;