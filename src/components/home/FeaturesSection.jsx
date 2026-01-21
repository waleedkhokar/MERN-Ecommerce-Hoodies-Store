import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = ({ darkMode }) => {
    const features = [
        { icon: "🧵", title: "Premium Quality", desc: "100% premium cotton blend for ultimate comfort" },
        { icon: "✂️", title: "Tailored Fit", desc: "Designed for perfect fit and movement" },
        { icon: "🏔️", title: "Rawalakot Made", desc: "Handcrafted in the mountains of Pakistan" },
        { icon: "💎", title: "Minimal Design", desc: "Clean aesthetics with no unnecessary branding" },
    ];

    return (
        <section className={`py-12 md:py-16 lg:py-20 ${darkMode ? 'bg-gray-900/30' : 'bg-gray-100/50'}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
                        Why Choose JAVASCRIPT?
                    </h2>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        We're not just selling hoodies, we're creating experiences
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.03 }}
                            className={`p-6 md:p-8 rounded-xl text-center ${darkMode ? 'bg-gray-900/50' : 'bg-white'} border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
                        >
                            <div className={`text-5xl md:text-6xl mb-6 ${darkMode ? 'text-yellow-500' : 'text-black'}`}>
                                {feature.icon}
                            </div>
                            <h3 className={`text-xl md:text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                                {feature.title}
                            </h3>
                            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;