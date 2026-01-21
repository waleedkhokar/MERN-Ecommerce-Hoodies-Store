import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEdit, FaTrash, FaStar, FaEye, FaCheck, FaTimes,
  FaImage, FaBox, FaTag, FaShoppingCart, FaFilter
} from 'react-icons/fa';

const ProductTable = ({
  products,
  darkMode,
  onEdit,
  onDelete,
  onView,
  onToggleFeatured,
  selectedProducts,
  onSelectProduct,
  onSelectAll
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // ✅ ADD THIS SIMPLE HELPER FUNCTION HERE
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    // Just fix double slashes if backend returns them
    return imagePath.includes(':////')
      ? imagePath.replace(':////', '://')
      : imagePath;
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    // ✅ ADD NULL CHECK HERE
    if (!product || !product.name || !product.description) return false;

    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Categories
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'boys', label: 'Boys Hoodies' },
    { value: 'girls', label: 'Girls Hoodies' }
  ];

  // ... rest of your code

  // Status badge
  const getStatusBadge = (stock) => {
    if (stock > 20) return { text: 'In Stock', color: 'green' };
    if (stock > 0) return { text: 'Low Stock', color: 'yellow' };
    return { text: 'Out of Stock', color: 'red' };
  };

  return (
    <div className={`rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg overflow-hidden`}>
      {/* Table Header with Controls */}
      <div className={`p-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
              Products Management
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {products.length} total products • {filteredProducts.length} filtered
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border ${darkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-black'
                  } focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-64`}
              />
              <FaFilter className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${darkMode
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-black'
                } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <th className="p-4 w-12">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={onSelectAll}
                  className={`h-4 w-4 rounded ${darkMode
                    ? 'bg-gray-800 border-gray-600 checked:bg-yellow-500'
                    : 'bg-white border-gray-300 checked:bg-yellow-500'
                    }`}
                />
              </th>
              <th className={`text-left p-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Product
              </th>
              <th className={`text-left p-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Category
              </th>
              <th className={`text-left p-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Price
              </th>
              <th className={`text-left p-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Stock
              </th>
              <th className={`text-left p-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Featured
              </th>
              <th className={`text-left p-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product, index) => {
              const status = getStatusBadge(product.stock);

              return (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b ${darkMode
                    ? 'border-gray-800 hover:bg-gray-800/50'
                    : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {/* Checkbox */}
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => onSelectProduct(product._id)}
                      className={`h-4 w-4 rounded ${darkMode
                        ? 'bg-gray-800 border-gray-600 checked:bg-yellow-500'
                        : 'bg-white border-gray-300 checked:bg-yellow-500'
                        }`}
                    />
                  </td>

                  {/* Product Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-16 h-16 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                       <img 
  src={product.image} 
  alt={product.name}
  className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                          {product.name}
                        </h3>
                        <p className={`text-sm line-clamp-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode
                      ? product.category === 'boys' ? 'bg-blue-900/30 text-blue-400' : 'bg-pink-900/30 text-pink-400'
                      : product.category === 'boys' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                      }`}>
                      {product.category === 'boys' ? 'Boys' : 'Girls'}
                    </span>
                  </td>

                  {/* Price */}
                  <td className={`p-4 font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                    Rs {product.price.toLocaleString()}
                  </td>

                  {/* Stock */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className={`text-sm font-medium ${status.color === 'green' ? 'text-green-500' :
                          status.color === 'yellow' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                        {status.text}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {product.stock} units
                      </span>
                    </div>
                  </td>

                  {/* Featured */}
                  <td className="p-4">
                    <button
                      onClick={() => onToggleFeatured(product._id, !product.featured)}
                      className={`p-2 rounded-full ${product.featured
                        ? darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                        : darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                        } hover:opacity-90 transition`}
                    >
                      {product.featured ? <FaStar /> : <FaStar className="opacity-50" />}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onView(product._id)}
                        className={`p-2 rounded-lg ${darkMode
                          ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          } transition`}
                        title="View"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => onEdit(product)}
                        className={`p-2 rounded-lg ${darkMode
                          ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                          } transition`}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => onDelete(product._id)}
                        className={`p-2 rounded-lg ${darkMode
                          ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                          } transition`}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="7" className="p-8 text-center">
                  <div className={`py-8 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    <FaBox className="text-4xl mx-auto mb-4 opacity-50" />
                    <p>No products found</p>
                    {searchTerm && (
                      <p className="text-sm mt-2">
                        Try different search terms or clear filters
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {selectedProducts.length > 0 && (
        <div className={`p-4 border-t ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedProducts.length} product(s) selected
            </span>
            <button
              onClick={() => {
                if (window.confirm(`Delete ${selectedProducts.length} selected products?`)) {
                  // Bulk delete would be handled by parent
                  console.log('Bulk delete:', selectedProducts);
                }
              }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode
                ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                : 'bg-red-100 text-red-600 hover:bg-red-200'
                } transition`}
            >
              <FaTrash />
              Delete Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;