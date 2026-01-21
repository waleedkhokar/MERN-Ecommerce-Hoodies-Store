import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = ({ darkMode }) => {
    return (
        <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className="container mx-auto px-4 py-12 md:py-16">
                
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                            Style <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">Meets</span> Comfort
                        </h1>
                        <p className="text-xl md:text-2xl opacity-80 mb-6">
                            Premium hoodies for developers, students, and everyday hustlers who don’t have time for markets, noise, or overpriced brands.
                        </p>
                        <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full"></div>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    
                    {/* Mission Section */}
                   <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
    >
 <h2 className="text-3xl font-bold mb-4">Premium Comfort. Everyday Style.</h2>

<p className="text-lg mb-4">
  Designed for <span className="font-bold text-yellow-500"> Devolpers</span> students, professionals, homemakers, and everyday hustlers who value comfort without sacrificing style. 
  <span className="font-bold text-yellow-500"> JAVASCRIPT Hoodies</span> are made for those who want quality without crowded markets or overpriced brand tags.
</p>

<p className="opacity-80">
  From late-night study sessions and work-from-home days to quick errands and relaxed evenings — our hoodies keep you comfortable, confident, and sharp at a price that truly makes sense.
</p>


    </motion.div>
    
    {/* Image Placeholder - Use your hoodie image */}
    <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
    >
        <div className={`aspect-square rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            {/* Use your hoodie-black.jpeg or hoodie-white.jpeg */}
            <img 
                src={darkMode ? "/images/hoodie-black.jpeg" : "/images/hoodie-white.jpeg"}
                alt="JAVASCRIPT Hoodie"
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-6xl">
                            ${darkMode ? '🏠' : '👕'}
                        </div>
                    `;
                }}
            />
        </div>
        <div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-xl ${darkMode ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-yellow-100 border border-yellow-300'} backdrop-blur-sm flex items-center justify-center text-3xl`}>
            {darkMode ? '⚫' : '⚪'}
        </div>
    </motion.div>
</div>
                   {/* For Everyone Section */}
<div className="mb-20">
  <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
    Built for <span className="text-yellow-500">Everyone</span>
  </h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      { icon: "👨‍💻", title: "Busy Developers", desc: "Perfect for long coding sessions, hackathons, and remote work days" },
      { icon: "👩‍💻", title: "Tech Girls", desc: "Stylish yet ultra-comfortable hoodies for women in tech" },
      { icon: "👕", title: "Unisex Fit", desc: "Premium fit for boys, girls & everyone in between" },
      { icon: "🎨", title: "20+ Colors", desc: "From classic black & white to trendy blues, grays & navys" },
    ].map((value, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12 }}
        whileHover={{ y: -6, scale: 1.02 }}
        className={`p-6 rounded-2xl border backdrop-blur-md ${
          darkMode
            ? 'bg-gray-900/40 border-gray-800 hover:border-yellow-500/60'
            : 'bg-white/70 border-gray-200 hover:border-black/50'
        } transition-all duration-300`}
      >
        <div className="text-4xl mb-4">{value.icon}</div>
        <h3 className="text-xl font-bold mb-2">{value.title}</h3>
        <p className="opacity-80 text-sm leading-relaxed">{value.desc}</p>
      </motion.div>
    ))}
  </div>
</div>

{/* Why Choose Us */}
<div className={`p-10 rounded-3xl ${
  darkMode 
    ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
    : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
} border ${darkMode ? 'border-gray-800' : 'border-gray-200'} mb-20`}>
  
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
      Why People Love <span className="text-yellow-500">JAVASCRIPT Hoodies</span>
    </h2>

    <div className="grid sm:grid-cols-2 gap-6">
      {[
        "Premium 100% cotton fabric",
        "Double stitching for durability",
        "Kangaroo pocket for phone & accessories",
        "Ribbed cuffs & hem for perfect fit",
        "Unisex sizing (S–XXL available)",
        "Dark & Light mode matching colors",
        "Machine wash friendly",
        "30-day easy return policy"
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="flex items-start gap-3"
        >
          <span className="text-green-500 mt-1 text-xl">✔</span>
          <span className="opacity-90 leading-relaxed">{item}</span>
        </motion.div>
      ))}
    </div>
  </div>
</div>

                   {/* CTA */}
<div className="text-center">
  <h2 className="text-3xl font-bold mb-6">Ready to Upgrade Your Everyday Comfort?</h2>

  <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
    Join 1000+ developers, students, and everyday hustlers who’ve already upgraded their wardrobe with 
    <span className="font-bold text-yellow-500"> JAVASCRIPT Hoodies</span>.  
    Comfort, style, and smart pricing — all in one.
  </p>

  <div className="flex flex-wrap justify-center gap-4">
    <Link
  to="/products?category=boys"
  className={`px-8 py-3 rounded-full font-bold border 
    ${darkMode 
      ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-white border-slate-600 hover:from-indigo-600 hover:to-blue-600 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40' 
      : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white border-slate-900 hover:from-indigo-700 hover:to-blue-800 hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30'
    } 
    transition-all duration-300`}
>
  👦 Shop Boys Collection
</Link>

<Link
  to="/products?category=girls"
  className={`px-8 py-3 rounded-full font-bold border 
    ${darkMode 
      ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-white border-slate-600 hover:from-fuchsia-600 hover:to-pink-600 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/40' 
      : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white border-slate-900 hover:from-fuchsia-700 hover:to-pink-800 hover:border-pink-700 hover:shadow-lg hover:shadow-pink-500/30'
    } 
    transition-all duration-300`}
>
  👧 Shop Girls Collection
</Link>


    <Link
      to="/products"
      className={`px-8 py-3 rounded-full font-bold border ${darkMode 
        ? 'border-gray-700 hover:border-yellow-500 hover:bg-yellow-500/10' 
        : 'border-gray-300 hover:border-black hover:bg-black/10'
      } transition-all duration-300`}
    >
      View All Hoodies
    </Link>
  </div>
</div>

                </div>
            </div>
        </div>
    );
};

export default About;