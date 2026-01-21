import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ProductTable from '../components/admin/ProductTable';
import ProductForm from '../components/admin/ProductForm';
import { 
  FaPlus, FaSync, FaDownload, FaUpload, FaChartLine,
  FaBox, FaFilter, FaSearch, FaCog, FaDatabase,
  FaStar, FaTrash, FaUsers, FaDollarSign
} from 'react-icons/fa';

const AdminProducts = ({ darkMode }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    boys: 0,
    girls: 0,
    featured: 0,
    outOfStock: 0
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await axios.get('http://localhost:5000/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setProducts(response.data.data || response.data.products);
        calculateStats(response.data.data || response.data.products);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
      
      // Fallback data for development
      const fallbackData = [
        {
          _id: '1',
          name: 'Classic Black Hoodie',
          description: 'Premium black hoodie for everyday wear',
          price: 4999,
          category: 'boys',
          stock: 45,
          featured: true,
          image: '/images/hoodie-black.jpeg',
          colors: ['Black', 'Gray'],
          sizes: ['S', 'M', 'L', 'XL'],
          ratings: 4.5,
          numReviews: 24,
          createdAt: '2024-01-15'
        },
        {
          _id: '2',
          name: 'Pink Comfort Hoodie',
          description: 'Soft pink hoodie for girls',
          price: 4299,
          category: 'girls',
          stock: 30,
          featured: false,
          image: '/images/hoodie-pink.jpeg',
          colors: ['Pink', 'White'],
          sizes: ['S', 'M', 'L'],
          ratings: 4.2,
          numReviews: 18,
          createdAt: '2024-01-20'
        },
      ];
      setProducts(fallbackData);
      calculateStats(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (productsData) => {
    const stats = {
      total: productsData.length,
      boys: productsData.filter(p => p.category === 'boys' || p.gender === 'boys').length,
      girls: productsData.filter(p => p.category === 'girls' || p.gender === 'girls').length,
      featured: productsData.filter(p => p.featured).length,
      outOfStock: productsData.filter(p => p.stock <= 0).length
    };
    setStats(stats);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Handle product delete
  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Remove from local state
      setProducts(products.filter(p => p._id !== productId));
      alert('Product deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete product. Please try again.');
    }
  };

  // Handle toggle featured
  const handleToggleFeatured = async (productId, featured) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/api/products/${productId}`, {
        featured
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update local state
      setProducts(products.map(p => 
        p._id === productId ? { ...p, featured } : p
      ));
    } catch (err) {
      console.error('Toggle featured error:', err);
    }
  };

  // Handle product selection
  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p._id));
    }
  };

  // Handle form save
  const handleSaveProduct = async (formData) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      console.log('📤 Sending FormData...');
      
      // ✅ Use fetch instead of axios for FormData
      const url = editingProduct 
        ? `http://localhost:5000/api/products/${editingProduct._id}`
        : 'http://localhost:5000/api/products';
        
      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
          // ✅ NO Content-Type header!
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update products list
        if (editingProduct) {
          setProducts(products.map(p => 
            p._id === editingProduct._id ? data.data : p
          ));
        } else {
          setProducts([data.data, ...products]);
        }
        
        alert('✅ Product saved!');
        setShowForm(false);
        setEditingProduct(null);
      }
      
    } catch (error) {
      console.error('❌ Save error:', error);
      alert('Failed: ' + error.message);
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    
    if (!window.confirm(`Delete ${selectedProducts.length} selected products?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:5000/api/admin/products/bulk/delete', {
        productIds: selectedProducts
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setProducts(products.filter(p => !selectedProducts.includes(p._id)));
      setSelectedProducts([]);
      alert(`${selectedProducts.length} products deleted successfully!`);
    } catch (err) {
      console.error('Bulk delete error:', err);
      alert('Failed to delete products. Please try again.');
    }
  };

  // Export products
  const handleExport = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'javascript-hoodies-products.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
            Product Management
          </h1>
          <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your hoodies collection ({stats.total} products)
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className={`px-3 md:px-4 py-2 rounded-lg flex items-center gap-1 md:gap-2 text-sm md:text-base ${darkMode 
              ? 'bg-yellow-600 text-black hover:bg-yellow-700' 
              : 'bg-black text-white hover:bg-gray-800'
            } transition active:scale-95`}
          >
            <FaPlus className="text-sm md:text-base" />
            <span className="hidden sm:inline">Add New Product</span>
            <span className="sm:hidden">Add</span>
          </button>
          
          <button
            onClick={fetchProducts}
            className={`px-3 md:px-4 py-2 rounded-lg flex items-center gap-1 md:gap-2 text-sm md:text-base ${darkMode 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition active:scale-95`}
          >
            <FaSync className="text-sm md:text-base" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <button
            onClick={handleExport}
            className={`px-3 md:px-4 py-2 rounded-lg flex items-center gap-1 md:gap-2 text-sm md:text-base ${darkMode 
              ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' 
              : 'bg-green-100 text-green-700 hover:bg-green-200'
            } transition active:scale-95`}
          >
            <FaDownload className="text-sm md:text-base" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
        {[
          { 
            title: 'Total Products', 
            value: stats.total, 
            icon: <FaBox />, 
            color: darkMode ? 'text-blue-400' : 'text-blue-600',
            bgColor: darkMode ? 'bg-blue-900/20' : 'bg-blue-50',
            borderColor: darkMode ? 'border-blue-800' : 'border-blue-200'
          },
          { 
            title: 'Boys Hoodies', 
            value: stats.boys, 
            icon: <FaUsers />, 
            color: darkMode ? 'text-blue-400' : 'text-blue-600',
            bgColor: darkMode ? 'bg-blue-900/20' : 'bg-blue-50',
            borderColor: darkMode ? 'border-blue-800' : 'border-blue-200'
          },
          { 
            title: 'Girls Hoodies', 
            value: stats.girls, 
            icon: <FaUsers />, 
            color: darkMode ? 'text-pink-400' : 'text-pink-600',
            bgColor: darkMode ? 'bg-pink-900/20' : 'bg-pink-50',
            borderColor: darkMode ? 'border-pink-800' : 'border-pink-200'
          },
          { 
            title: 'Featured', 
            value: stats.featured, 
            icon: <FaStar />, 
            color: darkMode ? 'text-yellow-400' : 'text-yellow-600',
            bgColor: darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50',
            borderColor: darkMode ? 'border-yellow-800' : 'border-yellow-200'
          },
          { 
            title: 'Out of Stock', 
            value: stats.outOfStock, 
            icon: <FaBox />, 
            color: darkMode ? 'text-red-400' : 'text-red-600',
            bgColor: darkMode ? 'bg-red-900/20' : 'bg-red-50',
            borderColor: darkMode ? 'border-red-800' : 'border-red-200'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border ${stat.bgColor} ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs md:text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.title}
                </p>
                <p className={`text-xl md:text-2xl font-bold mt-1 ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 md:p-3 rounded-lg ${stat.bgColor} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border`}>
          <div className="flex items-start justify-between">
            <p className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
            <button 
              onClick={() => setError('')}
              className={`text-sm ml-4 ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className={`rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg overflow-hidden`}>
        <ProductTable
          products={products}
          darkMode={darkMode}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={(id) => console.log('View product:', id)}
          onToggleFeatured={handleToggleFeatured}
          selectedProducts={selectedProducts}
          onSelectProduct={handleSelectProduct}
          onSelectAll={handleSelectAll}
        />
      </div>

      {/* Bulk Actions Footer - Mobile Optimized */}
      {selectedProducts.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:w-auto p-4 rounded-xl shadow-2xl ${darkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200'
          } border z-50`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-yellow-500' : 'bg-yellow-600'}`}></div>
              <span className={`font-medium text-sm md:text-base ${darkMode ? 'text-white' : 'text-black'}`}>
                {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkDelete}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm md:text-base ${darkMode 
                  ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
                } transition active:scale-95`}
              >
                <FaTrash />
                <span className="hidden xs:inline">Delete</span>
              </button>
              <button
                onClick={() => setSelectedProducts([])}
                className={`px-3 py-2 rounded-lg text-sm md:text-base ${darkMode 
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-black'
                } transition active:scale-95`}
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Product Form Modal - Mobile Responsive */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-2 md:p-4 z-[100]">
          <div className={`w-full max-w-full md:max-w-4xl max-h-[90vh] md:max-h-[95vh] overflow-y-auto rounded-xl md:rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl`}>
            <ProductForm
              darkMode={darkMode}
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;