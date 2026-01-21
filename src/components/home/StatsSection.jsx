import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WhyChooseUs = ({ darkMode }) => {
    const features = [
        { 
            emoji: "🎨",
            title: "12+ Premium Colors",
            description: "Black, White, Gray, Blue, Navy, Charcoal & more for both Boys & Girls",
            color: "from-purple-500 to-pink-500"
        },
        { 
            emoji: "👕",
            title: "Unisex Premium Fit",
            description: "Designed for comfort with premium cotton blend, perfect for all-day coding",
            color: "from-blue-500 to-cyan-500"
        },
        { 
            emoji: "🇵🇰",
            title: "Made in Rawalakot",
            description: "Handcrafted in Pakistan with attention to detail and quality stitching",
            color: "from-green-500 to-emerald-500"
        },
        { 
            emoji: "⚡",
            title: "Fast 3-5 Day Delivery",
            description: "Across Pakistan with easy returns and 24/7 customer support",
            color: "from-yellow-500 to-amber-500"
        },
    ];

    return (
        <section className={`py-16 ${darkMode ? 'bg-black/30' : 'bg-white'}`}>
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                        Why Choose JAVASCRIPT Hoodies?
                    </h2>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                        Premium hoodies designed specifically for developers who value style, comfort, and quality.
                        Perfect for coding sessions, hackathons, or everyday wear.
                    </p>
                    <Link
                        to="/about"
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${darkMode 
                            ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border border-yellow-500/30' 
                            : 'bg-black/10 text-black hover:bg-black/20 border border-black/20'
                        }`}
                    >
                        <span>Learn More About Us</span>
                        <span>→</span>
                    </Link>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group"
                        >
                            <div className={`h-full p-6 rounded-xl border ${darkMode 
                                ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700' 
                                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                            } transition-all duration-300`}>
                                
                                {/* Emoji Icon */}
                                <div className="text-4xl mb-4">
                                    {feature.emoji}
                                </div>
                                
                                {/* Title */}
                                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                                    {feature.title}
                                </h3>
                                
                                {/* Description */}
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                                    {feature.description}
                                </p>
                                
                                {/* Gradient Accent Line */}
                                <div className={`h-1 w-12 bg-gradient-to-r ${feature.color} rounded-full opacity-70 group-hover:w-20 transition-all duration-300`}></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mt-12"
                >
                    <Link
                        to="/products"
                        className={`inline-block px-8 py-3 rounded-full font-medium transition-all ${darkMode 
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:shadow-2xl hover:shadow-yellow-500/30' 
                            : 'bg-gradient-to-r from-black to-gray-800 text-white hover:shadow-2xl hover:shadow-black/30'
                        }`}
                    >
                        Explore All Hoodies Collection
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;