import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { getThemeClasses } from '../../utils/theme'; // Import your theme utility
import {
    FaFacebook, FaInstagram, FaGithub, FaLinkedin,
    FaMapMarkerAlt, FaPhone, FaEnvelope, FaTruck, FaShieldAlt,
    FaUndo, FaCreditCard, FaGlobe, FaWhatsapp, FaMoneyBillWave,
    FaUniversity
} from 'react-icons/fa';

const Footer = ({ darkMode = true }) => {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    
    // Get theme classes from your utility
    const themeClasses = getThemeClasses(darkMode);

    // All social links in one place
    const socialLinks = [
        { icon: <FaLinkedin />, label: 'LinkedIn', link: 'https://www.linkedin.com/in/waleed-khokhar-8ba554261', color: 'hover:bg-blue-700' },
        { icon: <FaGithub />, label: 'GitHub', link: 'https://github.com/waleedkhokar', color: 'hover:bg-gray-800' },
        { icon: <FaGlobe />, label: 'Portfolio', link: 'https://waledkhokar.vercel.app/', color: 'hover:bg-purple-600' },
        { icon: <FaFacebook />, label: 'Facebook', link: 'https://www.facebook.com/share/16nqTXfbEQ/', color: 'hover:bg-blue-600' },
        { icon: <FaInstagram />, label: 'Instagram', link: 'https://www.instagram.com/waled.khokhar?igsh=MWMxaW5ybDJ4NzY2cg==', color: 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600' },
        { icon: <FaWhatsapp />, label: 'WhatsApp', link: 'https://wa.me/+923191402404', color: 'hover:bg-green-600' },
    ];

    // Quick navigation links - Use React Router Link for internal navigation
    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Boys Hoodies', path: '/products?category=boys' },
        { name: 'Girls Hoodies', path: '/products?category=girls' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
    ];

    // Pakistani banks
    const banks = [
        { name: 'Allied Bank', code: 'ABL' },
        { name: 'UBL', code: 'UBL' },
        { name: 'NBP', code: 'NBP' },
        { name: 'HBL', code: 'HBL' },
    ];

    // Function to handle navigation with scroll to top
    const handleNavigation = (path) => {
        navigate(path);
        // Scroll to top when navigating
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className={`${themeClasses.bgPrimary} ${themeClasses.textPrimary} pt-8 pb-6 border-t ${themeClasses.border}`}>
            <div className="container mx-auto px-4">
                {/* Main Grid: 2 columns on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

                    {/* Column 1: Brand */}
                    <div>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
                            JAVASCRIPT
                        </h2>
                        <p className={`${themeClasses.textSecondary} text-sm mb-4`}>
                          Cozy | Stylish | Yours <br />
                             Hoodies for Students, Developers & Everyone
                        </p>

                        {/* Contact Info - Compact */}
                        <div className={`space-y-1 text-xs ${themeClasses.textSecondary}`}>
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-yellow-500" />
                                <span>Rawalakot, PK</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaPhone className="text-yellow-500" />
                                <span>+92 319 1402404</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-yellow-500" />
                                <span>support@javascript.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Follow Us - All Social Links */}
                    <div>
                        <h3 className={`text-lg font-bold mb-3 ${themeClasses.textAccent}`}>
                            Follow Us
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className={`${themeClasses.bgSecondary} p-2 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${social.color}`}
                                    aria-label={social.label}
                                >
                                    <div className="text-white text-lg">
                                        {social.icon}
                                    </div>
                                    <span className="text-[10px] mt-1 opacity-75">{social.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Quick Links - 2 Parts - USING handleNavigation */}
                    <div>
                        <h3 className={`text-lg font-bold mb-3 ${themeClasses.textAccent}`}>
                            Quick Links
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {quickLinks.slice(0, 3).map((link, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 3 }}
                                >
                                    <button
                                        onClick={() => handleNavigation(link.path)}
                                        className={`${themeClasses.textSecondary} hover:${themeClasses.textAccent} transition text-xs p-1 hover:${themeClasses.bgSecondary} rounded block w-full text-left`}
                                    >
                                        {link.name}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {quickLinks.slice(3).map((link, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 3 }}
                                >
                                    <button
                                        onClick={() => handleNavigation(link.path)}
                                        className={`${themeClasses.textSecondary} hover:${themeClasses.textAccent} transition text-xs p-1 hover:${themeClasses.bgSecondary} rounded block w-full text-left`}
                                    >
                                        {link.name}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Payment Methods */}
                    <div>
                        <h3 className={`text-lg font-bold mb-3 ${themeClasses.textAccent}`}>
                            Payments
                        </h3>

                        {/* EasyPaisa & JazzCash */}
                        <div className="flex gap-2 mb-3">
                            <div className={`${darkMode ? 'bg-green-900' : 'bg-green-100'} rounded p-2 flex items-center justify-center`}>
                                <FaMoneyBillWave className={`${darkMode ? 'text-white' : 'text-green-800'} text-xl mr-2`} />
                                <span className="text-xs">EasyPaisa</span>
                            </div>
                            <div className={`${darkMode ? 'bg-red-800' : 'bg-red-100'} rounded p-2 flex items-center justify-center`}>
                                <FaMoneyBillWave className={`${darkMode ? 'text-white' : 'text-red-800'} text-xl mr-2`} />
                                <span className="text-xs">JazzCash</span>
                            </div>
                        </div>

                        {/* Banks */}
                        <div className="grid grid-cols-2 gap-1">
                            {banks.map((bank) => (
                                <div 
                                    key={bank.code} 
                                    className={`${themeClasses.bgSecondary} rounded p-1 text-center flex items-center justify-center gap-1`}
                                >
                                    <FaUniversity className="text-yellow-500 text-xs" />
                                    <span className="text-xs">{bank.code}</span>
                                </div>
                            ))}
                        </div>

                        {/* COD */}
                        <div className={`${themeClasses.bgSecondary} mt-2 rounded p-1 text-center flex items-center justify-center gap-1`}>
                            <FaCreditCard className="text-yellow-500 text-xs" />
                            <span className="text-xs">Cash on Delivery</span>
                        </div>
                    </div>
                </div>

                {/* Trust Badges - Single Row */}
                <div className={`border-t ${themeClasses.border} pt-4 mb-4`}>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { icon: <FaTruck />, text: 'Free Shipping' },
                            { icon: <FaUndo />, text: '30 Day Returns' },
                            { icon: <FaShieldAlt />, text: 'Secure Payment' },
                            { icon: <FaCreditCard />, text: 'COD Available' },
                        ].map((badge, idx) => (
                            <div key={idx} className={`flex items-center gap-2 text-sm ${themeClasses.textSecondary}`}>
                                <div className="text-yellow-500">
                                    {badge.icon}
                                </div>
                                <span>{badge.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Copyright - Minimal */}
                <div className={`border-t ${themeClasses.border} pt-3 text-center`}>
                    <p className={`${themeClasses.textSecondary} text-xs`}>
                        © {currentYear} <span className="text-yellow-500 font-bold">JAVASCRIPT</span> •
                        Made with ❤️ in <span className="text-green-400">Pakistan</span> •
                        By <a href="https://waledkhokar.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Waleed Khokhar</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;