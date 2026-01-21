import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product, darkMode }) => {
    // ✅ FIX 1: Helper function for image URLs
    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return darkMode ? '/images/hoodie-black.jpeg' : '/images/hoodie-white.jpeg';
        }
        
        // Fix double slashes
        if (imagePath.includes(':////')) {
            return imagePath.replace(':////', '://');
        }
        
        // Ensure correct URL format
        if (imagePath.startsWith('/images/') && !imagePath.includes('localhost')) {
            return `http://localhost:5000${imagePath}`;
        }
        
        if (imagePath.startsWith('uploads/') && !imagePath.includes('localhost')) {
            return `http://localhost:5000/${imagePath}`;
        }
        
        return imagePath;
    };

    // ✅ FIX 2: Get correct rating value
    const rating = product.ratings || product.rating || 4;
    const numReviews = product.numReviews || 0;
    
    // ✅ FIX 3: Get correct image URL
    const imageUrl = getImageUrl(product.image);

    return (
       <Link to={`/product/${product._id}`}>  
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl overflow-hidden border ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} transition-all duration-300 hover:shadow-xl`}
            >
                {/* Product Image */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                    <img 
                        src={imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.src = darkMode ? '/images/hoodie-black.jpeg' : '/images/hoodie-white.jpeg';
                        }}
                    />
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-bold text-lg truncate ${darkMode ? 'text-white' : 'text-black'}`}>
                            {product.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                            {product.category}
                        </span>
                    </div>
                    
                    <p className={`text-sm mb-3 h-10 overflow-hidden ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {product.description}
                    </p>
                    
                    {/* ✅ FIX 4: Correct Rating Display */}
                    <div className="flex items-center mb-3">
                        <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i}>
                                    {i < Math.floor(rating) ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                        <span className={`text-xs ml-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {rating.toFixed(1)} ({numReviews} reviews)
                        </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <span className={`text-xl font-bold ${darkMode ? 'text-yellow-500' : 'text-black'}`}>
                                Rs {product.price}
                            </span>
                            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Stock: {product.stock}
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 rounded-lg font-medium ${darkMode 
                                ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' 
                                : 'bg-black/10 text-black hover:bg-black/20'
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                console.log('Add to cart:', product._id);
                                alert(`Added ${product.name} to cart!`);
                            }}
                        >
                            Add to Cart
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;