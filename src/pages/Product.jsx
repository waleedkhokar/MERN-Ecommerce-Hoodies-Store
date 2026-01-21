import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, FaShoppingCart, FaStar, FaTruck, 
  FaShieldAlt, FaExchangeAlt, FaTag, FaBox,
  FaHeart, FaShareAlt, FaMinus, FaPlus
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Product = ({ darkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  // Product images gallery (we'll use product images when available)
  const productImages = product?.image ? [product.image] : [
    '/images/hoodie-black.jpeg',
    '/images/hoodie-white.jpeg',
    '/images/hoodie-gray.jpeg',
    '/images/hoodie-blue.jpeg'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Gray', 'Blue', 'Red', 'Green'];

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const result = await response.json();
        
        if (result.success) {
          setProduct(result.data);
          // Set default selections
          if (result.data.sizes?.length > 0) {
            setSelectedSize(result.data.sizes[0]);
          }
          if (result.data.colors?.length > 0) {
            setSelectedColor(result.data.colors[0]);
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    });
    
    alert(`${quantity} × ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            Product Not Found
          </h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {error || 'The product you are looking for does not exist.'}
          </p>
          <Link
            to="/products"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${
              darkMode 
                ? 'bg-yellow-600 text-black hover:bg-yellow-700' 
                : 'bg-black text-white hover:bg-gray-800'
            } transition`}
          >
            <FaArrowLeft />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6">
        <ol className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/products" className="hover:underline">Products</Link>
          </li>
          <li>/</li>
          <li className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Back Button - Mobile */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            darkMode 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition`}
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Images */}
        <div>
          {/* Main Image */}
          <div className={`mb-4 rounded-2xl overflow-hidden ${
            darkMode ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-auto aspect-square object-cover"
              onError={(e) => {
                e.target.src = darkMode ? '/images/hoodie-black.jpeg' : '/images/hoodie-white.jpeg';
              }}
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? darkMode 
                      ? 'border-yellow-500' 
                      : 'border-amber-500'
                    : darkMode 
                      ? 'border-gray-800 hover:border-gray-600' 
                      : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div>
          {/* Category Badge */}
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              darkMode
                ? product.category === 'boys' 
                  ? 'bg-blue-900/30 text-blue-400' 
                  : 'bg-pink-900/30 text-pink-400'
                : product.category === 'boys' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-pink-100 text-pink-700'
            }`}>
              {product.category === 'boys' ? 'Boys Collection' : 'Girls Collection'}
            </span>
          </div>

          {/* Product Name */}
          <h1 className={`text-3xl lg:text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={i < Math.floor(product.ratings) ? 'fill-current' : 'fill-gray-300'} />
              ))}
            </div>
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {product.ratings?.toFixed(1) || '4.5'} ({product.numReviews || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className={`text-4xl font-bold ${darkMode ? 'text-yellow-500' : 'text-amber-600'}`}>
              Rs {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className={`ml-3 text-lg line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Rs {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
              Description
            </h3>
            <p className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {product.description}
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
              Select Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedSize === size
                      ? darkMode
                        ? 'bg-yellow-600 text-black border-yellow-600'
                        : 'bg-amber-500 text-white border-amber-500'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
              Select Color
            </h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedColor === color
                      ? darkMode
                        ? 'border-yellow-500'
                        : 'border-amber-500'
                      : darkMode
                      ? 'border-gray-700 hover:border-gray-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-5 h-5 rounded-full"
                      style={{ 
                        backgroundColor: color.toLowerCase(),
                        border: '1px solid rgba(0,0,0,0.1)'
                      }}
                    />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {color}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
              Quantity
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Quantity Selector */}
              <div className={`flex items-center border rounded-lg ${
                darkMode ? 'border-gray-700' : 'border-gray-300'
              }`}>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className={`p-3 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} ${
                    quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FaMinus />
                </button>
                <span className={`px-4 py-2 text-lg font-medium ${
                  darkMode ? 'text-white' : 'text-black'
                }`}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className={`p-3 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} ${
                    quantity >= product.stock ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Stock Info */}
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {product.stock > 10 ? (
                  <span className="text-green-500">✓ In Stock ({product.stock} available)</span>
                ) : product.stock > 0 ? (
                  <span className="text-yellow-500">⚠ Low Stock ({product.stock} left)</span>
                ) : (
                  <span className="text-red-500">✗ Out of Stock</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold transition ${
                product.stock === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : darkMode
                  ? 'bg-yellow-600 text-black hover:bg-yellow-700'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <FaShoppingCart />
              Add to Cart
            </button>
            
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold transition ${
                product.stock === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : darkMode
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:opacity-90'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90'
              }`}
            >
              Buy Now
            </button>
          </div>

          {/* Additional Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setWishlist(!wishlist)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                wishlist
                  ? darkMode ? 'text-red-400' : 'text-red-600'
                  : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              <FaHeart className={wishlist ? 'fill-current' : ''} />
              Wishlist
            </button>
            
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}>
              <FaShareAlt />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h2 className={`text-2xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
          Why Choose This Hoodie?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <FaTruck />, title: 'Free Shipping', desc: 'Free delivery on orders above Rs 5000' },
            { icon: <FaShieldAlt />, title: 'Quality Guarantee', desc: 'Premium quality with 1-year warranty' },
            { icon: <FaExchangeAlt />, title: 'Easy Returns', desc: '30-day return policy, no questions asked' },
            { icon: <FaTag />, title: 'Best Price', desc: 'Price match guarantee for 7 days' },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl text-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
            >
              <div className={`inline-flex p-3 rounded-full text-2xl mb-4 ${
                darkMode ? 'text-yellow-400' : 'text-amber-600'
              }`}>
                {feature.icon}
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                {feature.title}
              </h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;