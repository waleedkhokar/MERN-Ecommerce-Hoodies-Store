import React from 'react';
import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import FeaturedHoodies from '../components/home/FeaturedHoodies';
import FeaturesSection from '../components/home/FeaturesSection';

const Home = ({ darkMode }) => {
    return (
        <div>
            <Hero darkMode={darkMode} />
            <StatsSection darkMode={darkMode} />
            <FeaturedHoodies darkMode={darkMode} />
            <FeaturesSection darkMode={darkMode} />
            
            {/* Final CTA */}
            <section className={`py-12 md:py-16 lg:py-20 text-center ${darkMode ? 'bg-black' : 'bg-white'}`}>
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                        Ready to Elevate Your Style?
                    </h2>
                    <p className={`text-lg mb-8 md:mb-10 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Join 500+ developers who trust our premium quality hoodies.
                    </p>
                    <a 
                        href="/products" 
                        className={`inline-block px-8 py-4 rounded-full font-bold text-lg ${darkMode ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                        Shop All Hoodies →
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;