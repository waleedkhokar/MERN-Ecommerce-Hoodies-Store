import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, FaShoppingBag, FaBox, FaUsers, 
  FaSignOutAlt, FaHome, FaBars, FaTimes,
  FaStore, FaCog, FaChartBar, FaBell,
  FaChevronRight, FaChevronLeft, FaShoppingCart
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = ({ 
  darkMode, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(false);
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <FaTachometerAlt />, 
      badge: null,
      color: 'text-blue-500'
    },
    { 
      name: 'Products', 
      path: '/admin/products', 
      icon: <FaShoppingBag />, 
      badge: 31,
      color: 'text-emerald-500'
    },
    { 
      name: 'Orders', 
      path: '/admin/orders', 
      icon: <FaBox />, 
      badge: 12,
      color: 'text-purple-500'
    },
    { 
      name: 'Customers', 
      path: '/admin/users', 
      icon: <FaUsers />, 
      badge: 45,
      color: 'text-pink-500'
    },
    { 
      name: 'Analytics', 
      path: '/admin/analytics', 
      icon: <FaChartBar />,
      badge: null,
      color: 'text-amber-500'
    },
   
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const sidebarWidth = isMobile ? 'w-80' : collapsed ? 'w-20' : 'w-72';

  return (
    <>
      {/* Floating Mobile Toggle Button */}
      {isMobile && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-50 p-3 rounded-2xl shadow-2xl ${
            darkMode 
              ? 'bg-gray-900 text-yellow-400 hover:bg-gray-800' 
              : 'bg-white text-amber-600 hover:bg-gray-50'
          } transition-all duration-300 hover:shadow-3xl`}
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </motion.button>
      )}

      {/* Desktop Collapse Toggle */}
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-6 left-6 z-50 p-2 rounded-full ${
            darkMode 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-all duration-300 hover:scale-110 hidden lg:block`}
        >
          {collapsed ? <FaChevronRight size={16} /> : <FaChevronLeft size={16} />}
        </button>
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isMobile ? (isMobileMenuOpen ? 0 : -320) : 0,
          width: isMobile ? 320 : collapsed ? 80 : 288
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed lg:sticky top-0 left-0 h-screen z-40 ${
          darkMode 
            ? 'bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800' 
            : 'bg-gradient-to-b from-white to-gray-50 border-r border-gray-200'
        } shadow-2xl overflow-hidden`}
        style={{ 
          width: isMobile ? '320px' : collapsed ? '80px' : '288px'
        }}
      >
        {/* Logo Section */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-300'}`}>
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} gap-3`}>
            <motion.div
              animate={{ scale: collapsed ? 1.2 : 1 }}
              className={`p-3 rounded-xl ${
                darkMode 
                  ? 'bg-gradient-to-br from-yellow-600/20 to-amber-600/20' 
                  : 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20'
              }`}
            >
              <FaStore className={`text-xl ${darkMode ? 'text-yellow-400' : 'text-amber-600'}`} />
            </motion.div>
            
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                    SMART CART
                  </h1>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Admin Panel
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Admin Info - Only show when not collapsed */}
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-white text-sm font-bold">
                  {localStorage.getItem('adminEmail')?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div>
                  <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-black'}`}>
                    {localStorage.getItem('adminEmail') || 'Admin User'}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Administrator
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  className={`flex items-center ${collapsed ? 'justify-center px-3' : 'justify-between px-4'} py-3 rounded-xl transition-all duration-300 group relative ${
                    isActive(item.path)
                      ? darkMode
                        ? 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 text-yellow-400'
                        : 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-600'
                      : darkMode
                      ? 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100/80 hover:text-black'
                  }`}
                >
                  {/* Active Indicator */}
                  {isActive(item.path) && (
                    <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r ${
                      darkMode ? 'bg-yellow-500' : 'bg-amber-500'
                    }`} />
                  )}

                  <div className="flex items-center gap-3">
                    <span className={`text-lg ${item.color} ${isActive(item.path) ? 'scale-110' : ''}`}>
                      {item.icon}
                    </span>
                    
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className={`font-medium truncate ${
                            isActive(item.path) ? (darkMode ? 'text-white' : 'text-black') : ''
                          }`}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Badge */}
                  {item.badge && !collapsed && (
                    <span className={`px-2 py-1 text-xs rounded-full min-w-[24px] text-center ${
                      darkMode 
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : 'bg-amber-500/20 text-amber-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Footer Actions */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-300'}`}>
          <div className="space-y-2">
            {/* Back to Store */}
            <Link
              to="/"
              onClick={() => isMobile && setIsMobileMenuOpen(false)}
              className={`flex items-center ${collapsed ? 'justify-center px-3' : 'justify-start px-4'} py-3 rounded-xl transition ${
                darkMode 
                  ? 'text-gray-400 hover:bg-gray-800/50 hover:text-white' 
                  : 'text-gray-600 hover:bg-gray-100/80 hover:text-black'
              }`}
            >
              <FaHome className="text-lg" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  className="ml-3 font-medium truncate"
                >
                  Back to Store
                </motion.span>
              )}
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${collapsed ? 'justify-center px-3' : 'justify-start px-4'} py-3 rounded-xl transition ${
                darkMode 
                  ? 'bg-gradient-to-r from-red-900/30 to-red-800/30 text-red-400 hover:from-red-900/50 hover:to-red-800/50 hover:text-white' 
                  : 'bg-gradient-to-r from-red-100/80 to-red-50/80 text-red-600 hover:from-red-200 hover:to-red-100 hover:text-red-800'
              }`}
            >
              <FaSignOutAlt className="text-lg" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  className="ml-3 font-medium truncate"
                >
                  Logout
                </motion.span>
              )}
            </button>
          </div>

          {/* Version Info - Only show when not collapsed */}
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 text-center text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
            >
              v2.0 • Smart Cart Admin
            </motion.div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;