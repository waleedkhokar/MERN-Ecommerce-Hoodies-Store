import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedHoodies = ({ darkMode }) => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Helper function to fix image URLs
    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return darkMode ? '/images/hoodie-black.jpeg' : '/images/hoodie-white.jpeg';
        }
        
        // Fix double slashes
        if (imagePath.includes(':////')) {
            return imagePath.replace(':////', '://');
        }
        
        // If already full URL, return as is
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        // If it's a relative path, add backend URL
        if (imagePath.startsWith('/images/')) {
            return `http://localhost:5000${imagePath}`;
        }
        
        if (imagePath.startsWith('uploads/')) {
            return `http://localhost:5000/${imagePath}`;
        }
        
        // Default fallback
        return darkMode ? '/images/hoodie-black.jpeg' : '/images/hoodie-white.jpeg';
    };

    // Fetch featured products from backend
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                console.log('🔍 Fetching featured products...');
                const response = await fetch('http://localhost:5000/api/products');
                const result = await response.json();
                
                console.log('📦 API Response:', result);
                
                if (result.success && result.data) {
                    // Filter featured products and take 4
                    const featured = result.data
                        .filter(product => {
                            console.log(`📊 Product: ${product.name}, Featured: ${product.featured}, Image: ${product.image}`);
                            return product.featured === true;
                        })
                        .slice(0, 4)
                        .map(product => ({
                            id: product._id,
                            name: product.name,
                            price: product.price, // Keep as number for formatting
                            image: getImageUrl(product.image), // ✅ FIXED: Use helper function
                            category: product.category,
                            description: product.description,
                            rating: product.ratings || 4.5,
                            stock: product.stock,
                            featured: product.featured // Keep for debugging
                        }));
                    
                    console.log('⭐ Featured Products Found:', featured);
                    setFeaturedProducts(featured);
                    
                    if (featured.length === 0) {
                        console.log('⚠️ No featured products found!');
                    }
                } else {
                    console.log('❌ API Error:', result);
                }
            } catch (error) {
                console.error('❌ Error fetching featured products:', error);
                // Fallback to sample data
                setFeaturedProducts([
                    { 
                        id: 1, 
                        name: "Classic Black", 
                        price: 4999, 
                        image: getImageUrl("/images/hoodie-black.jpeg"),
                        category: "boys",
                        description: "Premium black hoodie",
                        featured: true
                    },
                    { 
                        id: 2, 
                        name: "White Premium", 
                        price: 5499, 
                        image: getImageUrl("/images/hoodie-white.jpeg"),
                        category: "girls",
                        description: "Soft white hoodie",
                        featured: true
                    },
                    { 
                        id: 3, 
                        name: "Gray Comfort", 
                        price: 4799, 
                        image: getImageUrl("/images/hoodie-gray.jpeg"),
                        category: "boys",
                        description: "Everyday comfort",
                        featured: true
                    },
                    { 
                        id: 4, 
                        name: "Dark Blue", 
                        price: 5999, 
                        image: getImageUrl("/images/hoodie-blue.jpeg"),
                        category: "girls",
                        description: "Premium dark blue",
                        featured: true
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    if (loading) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-6 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
                </div>
            </section>
        );
    }

    // Show message if no featured products
    if (featuredProducts.length === 0) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Featured Hoodies</h2>
                    <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        No featured products yet. Mark products as "Featured" in admin panel.
                    </p>
                    <Link
                        to="/products"
                        className={`inline-block px-6 py-3 rounded-full border ${darkMode ? 'border-gray-800 hover:border-yellow-500' : 'border-gray-300 hover:border-black'} transition-all duration-300 hover:scale-105`}
                    >
                        Browse All Products →
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Featured Hoodies</h2>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Best sellers from our collection
                    </p>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Showing {featuredProducts.length} featured product{featuredProducts.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((hoodie, index) => (
                        <motion.div
                            key={hoodie.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Link to={`/product/${hoodie.id}`}>
                                <div className={`rounded-xl overflow-hidden border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                                    {/* Product Image - REAL IMAGES */}
                                    <div className={`aspect-square overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                                        <img 
                                            src={hoodie.image} 
                                            alt={hoodie.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                console.error('❌ Image failed to load:', hoodie.image);
                                                e.target.src = darkMode ? '/images/hoodie-black.jpeg' : '/images/hoodie-white.jpeg';
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Product Info */}
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className={`font-bold text-lg truncate ${darkMode ? 'text-white' : 'text-black'}`}>
                                                {hoodie.name}
                                            </h3>
                                            <span className={`px-2 py-1 text-xs rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                                                {hoodie.category === 'boys' ? 'Boys' : 'Girls'}
                                            </span>
                                        </div>
                                        <p className={`text-sm mb-3 h-10 overflow-hidden ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {hoodie.description}
                                        </p>
                                        
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xl font-bold ${darkMode ? 'text-yellow-500' : 'text-black'}`}>
                                                Rs {hoodie.price.toLocaleString()}
                                            </span>
                                            <button 
                                                className={`px-3 py-1 rounded text-sm ${darkMode ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' : 'bg-black/10 text-black hover:bg-black/20'}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    console.log('Add to cart:', hoodie.id);
                                                }}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                        {hoodie.featured && (
                                            <div className="mt-2">
                                                <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    ⭐ Featured
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/products"
                        className={`inline-block px-6 py-3 rounded-full border ${darkMode ? 'border-gray-800 hover:border-yellow-500' : 'border-gray-300 hover:border-black'} transition-all duration-300 hover:scale-105`}
                    >
                        View All Products →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedHoodies;