import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaFacebook, FaInstagram, FaGithub, FaLinkedin,
    FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp,
    FaGlobe, FaPaperPlane, FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';

const Contact = ({ darkMode }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    // Your social links
    const socialLinks = [
        { icon: <FaLinkedin />, label: 'LinkedIn', link: 'https://www.linkedin.com/in/waleed-khokhar-8ba554261', color: 'bg-blue-600' },
        { icon: <FaGithub />, label: 'GitHub', link: 'https://github.com/waleedkhokar', color: 'bg-gray-800' },
        { icon: <FaGlobe />, label: 'Portfolio', link: 'https://waledkhokar.vercel.app/', color: 'bg-purple-600' },
        { icon: <FaFacebook />, label: 'Facebook', link: 'https://www.facebook.com/share/16nqTXfbEQ/', color: 'bg-blue-700' },
        { icon: <FaInstagram />, label: 'Instagram', link: 'https://www.instagram.com/waled.khokhar?igsh=MWMxaW5ybDJ4NzY2cg==', color: 'bg-gradient-to-r from-purple-600 to-pink-600' },
        { icon: <FaWhatsapp />, label: 'WhatsApp', link: 'https://wa.me/+923191402404', color: 'bg-green-600' },
    ];

   // In handleSubmit function, update this part:
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setIsSuccess(false);

    const formData = new FormData(e.target);
    const data = {
        from_name: formData.get('from_name'),
        from_email: formData.get('from_email'),
        subject: formData.get('subject') || 'General Inquiry',
        message: formData.get('message')
    };

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            setIsSuccess(true);
            e.target.reset();
            
            // Show success message for 4 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 4000);
            
        } else {
            // Show error message for 3 seconds
            setError(result.message || 'Failed to send message');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    } catch (err) {
        console.error('Error:', err);
        // Show error message for 3 seconds
        setError('Failed to send message. Click "Direct Email" button below.');
        setTimeout(() => {
            setError('');
        }, 3000);
    } finally {
        setIsSubmitting(false);
    }
};

// In the form JSX, update the Direct Email button:


    // Direct email link
    const handleDirectEmail = () => {
        window.location.href = 'mailto:waleedkhokharbusiness@gmail.com?subject=JavaScript Hoodies Inquiry';
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'} transition-colors duration-300`}>
            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                        Get In Touch
                    </h1>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
                        Have questions about our hoodies? Want to place a custom order? 
                        We're here to help! Reach out through any channel.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    
                    {/* Left Column: Contact Information & Social */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Contact Info Cards */}
                        <div className="space-y-6 mb-8">
                            {/* Phone */}
                            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
                                <div className="flex items-center gap-4 mb-3">
                                    <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                                        <FaPhone className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                                            Call Us
                                        </h3>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            24/7 Customer Support
                                        </p>
                                    </div>
                                </div>
                                <a 
                                    href="tel:+923191402404"
                                    className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                                >
                                    +92 319 1402404
                                </a>
                            </div>

                            {/* Email */}
                            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
                                <div className="flex items-center gap-4 mb-3">
                                    <div className={`p-3 rounded-full ${darkMode ? 'bg-red-900' : 'bg-red-100'}`}>
                                        <FaEnvelope className={`text-xl ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                                            Email Us
                                        </h3>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Quick response guaranteed
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <a 
                                        href="mailto:waleedkhokharbusiness@gmail.com"
                                        className={`text-lg font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'} hover:underline truncate`}
                                    >
                                        waleedkhokharbusiness@gmail.com
                                    </a>
                                    <button
    onClick={handleDirectEmail}
    className={`text-sm px-4 py-2 rounded-full ${darkMode ? 'bg-red-900 text-red-300 hover:bg-red-800' : 'bg-red-100 text-red-700 hover:bg-red-200'} transition hover:scale-105 flex items-center gap-1`}
>
    <FaEnvelope className="inline" />
    Direct Email
</button>
                                </div>
                            </div>

                            {/* Location */}
                            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
                                <div className="flex items-center gap-4 mb-3">
                                    <div className={`p-3 rounded-full ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                                        <FaMapMarkerAlt className={`text-xl ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                                            Our Location
                                        </h3>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Based in Rawalakot, Pakistan
                                        </p>
                                    </div>
                                </div>
                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Rawalakot, Azad Kashmir, Pakistan
                                </p>
                                
                                {/* Google Maps Embed */}
                                <div className="mt-4 rounded-lg overflow-hidden">
                                    <iframe
                                        title="Rawalakot Location"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.8793535213235!2d73.76079131521026!3d33.85142678066312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f195f2b798ed3%3A0x4117a2e2f7b7b9c5!2sRawalakot%2C%20Azad%20Kashmir%2C%20Pakistan!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
                                        width="100%"
                                        height="200"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="rounded-lg"
                                    ></iframe>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div>
                            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                                Connect With Us
                            </h3>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                {socialLinks.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${social.color} p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:opacity-90`}
                                        aria-label={social.label}
                                    >
                                        <div className="text-white text-xl">
                                            {social.icon}
                                        </div>
                                        <span className="text-white text-[10px] mt-1 opacity-90">
                                            {social.label}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-xl`}>
                            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                                Send Us a Message
                            </h2>
                            
                            {/* Success/Error Messages */}
                            {isSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 rounded-lg bg-green-900/30 border border-green-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <FaCheckCircle className="text-green-500 text-xl" />
                                        <div>
                                            <p className="text-green-400 font-semibold">Message Sent Successfully!</p>
                                            <p className="text-green-300 text-sm">
                                                We'll get back to you within 24 hours.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <FaExclamationCircle className="text-red-500 text-xl" />
                                        <div>
                                            <p className="text-red-400 font-semibold">Error Sending Message</p>
                                            <p className="text-red-300 text-sm">{error}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Contact Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="from_name" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="from_name"
                                        name="from_name"
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition`}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="from_email" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="from_email"
                                        name="from_email"
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition`}
                                        placeholder="your@email.com"
                                    />
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label htmlFor="subject" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition`}
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Product Question">Product Question</option>
                                        <option value="Order Support">Order Support</option>
                                        <option value="Custom Order">Custom Order</option>
                                        <option value="Wholesale">Wholesale Inquiry</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Your Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition resize-none`}
                                        placeholder="Tell us about your inquiry..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${isSubmitting 
                                        ? 'bg-gray-600 cursor-not-allowed' 
                                        : darkMode 
                                            ? 'bg-yellow-600 text-black hover:bg-yellow-700' 
                                            : 'bg-black text-white hover:bg-gray-800'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>

                                {/* Note */}
                                <p className={`text-sm text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                    * Required fields. We respect your privacy and will never share your information.
                                </p>
                            </form>
                        </div>

                        {/* Business Hours */}
                        <div className={`mt-6 p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
                            <h3 className={`font-bold text-lg mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                                Business Hours
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Monday - Friday</span>
                                    <span className={darkMode ? 'text-white' : 'text-black'}>9:00 AM - 8:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Saturday - Sunday</span>
                                    <span className={darkMode ? 'text-white' : 'text-black'}>10:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Response Time</span>
                                    <span className="text-green-500 font-semibold">Within 24 Hours</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;