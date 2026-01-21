import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaTimes, FaSave, FaUpload, FaImage, FaTag,
  FaDollarSign, FaBox, FaStar, FaPalette, FaRuler
} from 'react-icons/fa';

const ProductForm = ({ darkMode, product, onSave, onCancel }) => {
const [formData, setFormData] = useState({
  name: '',
  description: '',
  price: '',
  category: 'boys',
  stock: '',
  featured: false,
  colors: ['Black', 'White'],
  sizes: ['S', 'M', 'L', 'XL'],
  image: null,
  imagePreview: '',
  rating: 0,
  numReviews: 0  // ✅ ADD THIS LINE
});

  const [loading, setLoading] = useState(false);

  // Initialize form if editing
 useEffect(() => {
  if (product) {
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || 'boys',
      stock: product.stock || 50,
      featured: product.featured || false,
      colors: Array.isArray(product.colors) ? product.colors : ['Black', 'White'],
      sizes: Array.isArray(product.sizes) ? product.sizes : ['S', 'M', 'L', 'XL'],
      image: null,
      imagePreview: product.image 
        ? (product.image.startsWith('http') 
           ? product.image 
           : `http://localhost:5000/${product.image}`)
        : '',
      rating: product.ratings || 0,
      numReviews: product.numReviews || 0  // ✅ ADD THIS LINE
    });
  }
}, [product]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  // Handle color addition
  const handleAddColor = () => {
    const newColor = prompt('Enter a new color:');
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColor]
      }));
    }
  };

  // Handle color removal
  const handleRemoveColor = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }));
  };

  // Handle size toggle
  const handleToggleSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  // ✅ FIXED: Handle form submission - Bulletproof version
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 🛡️ DEFENSE 1: Prevent double submission during loading
    if (loading) {
      console.log('⏸️ Already submitting, ignoring...');
      return;
    }
    
    // 🛡️ DEFENSE 2: Debounce check
    const now = Date.now();
    if (window.lastSubmit && (now - window.lastSubmit) < 2000) {
      console.log('⏸️ Too soon since last submit, ignoring');
      return;
    }
    window.lastSubmit = now;

    // ✅ FIXED: Improved validation - Allow edits without new image
    const isEditing = !!product;
    
    if (!isEditing && !formData.image) {
      alert('❌ Please select an image for new product');
      return;
    }

    if (!formData.name || !formData.description || !formData.price || !formData.stock) {
      alert('❌ Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('⚠️ Please login again');
        setLoading(false);
        return;
      }

      console.log('📤 Starting submission...');
      console.log('📁 Image file:', formData.image);
      console.log('🖼️ Image preview:', formData.imagePreview);

      // Create FormData
      const formDataToSend = new FormData();

      // Add text fields
 // Add text fields
formDataToSend.append('name', formData.name);
formDataToSend.append('description', formData.description);
formDataToSend.append('price', formData.price);
formDataToSend.append('category', formData.category);
formDataToSend.append('stock', formData.stock);
formDataToSend.append('featured', formData.featured);
formDataToSend.append('colors', formData.colors.join(','));
formDataToSend.append('sizes', formData.sizes.join(','));
formDataToSend.append('ratings', formData.rating);
formDataToSend.append('numReviews', formData.numReviews || 0); // ✅ ADD THIS LINE// ✅ Consistent field name
      
      // ✅ ONLY append image if user uploaded a NEW one
      if (formData.image) {
        formDataToSend.append('image', formData.image);
        console.log('✅ New image attached');
      } else {
        console.log('ℹ️ Using existing image (editing mode)');
      }

      const url = product
        ? `http://localhost:5000/api/products/${product._id}`
        : 'http://localhost:5000/api/products';

      console.log(`📡 Sending ${product ? 'PUT' : 'POST'} to ${url}`);

      const response = await fetch(url, {
        method: product ? 'PUT' : 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const result = await response.json();
      console.log('📥 Response:', result);

      if (result.success) {
        alert('✅ Product saved successfully!');
        
        // Clear form only for new products
        if (!product) {
          setFormData({
            name: '', description: '', price: '', category: 'boys',
            stock: '', featured: false, colors: ['Black', 'White'],
            sizes: ['S', 'M', 'L', 'XL'], image: null, imagePreview: '', rating: 0
          });
        }
        
        if (onSave) onSave(result.data);
 
      } else {
        throw new Error(result.message || 'Failed to save product');
      }

    } catch (error) {
      console.error('❌ Submission Error:', error);
      alert('❌ Failed: ' + error.message);
    } finally {
      setLoading(false);
      window.lastSubmit = null; // Reset debounce
    }
  };

  // Available sizes
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  return (
    <div className={`p-6 ${darkMode ? 'text-white' : 'text-black'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {product ? 'Update product details' : 'Create a new hoodie product'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className={`p-2 rounded-full ${darkMode
            ? 'hover:bg-gray-800 text-gray-400'
            : 'hover:bg-gray-200 text-gray-600'
            }`}
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Debug Info */}
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
          <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
            <strong>Status:</strong> Selected image: <span className="font-bold">{formData.image ? formData.image.name : 'None'}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className={`block mb-2 font-medium flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <FaTag />
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="e.g., Premium Black Hoodie"
              />
            </div>

            {/* Description */}
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className={`w-full px-4 py-3 rounded-lg border ${darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none`}
                placeholder="Describe the hoodie features, material, comfort..."
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block mb-2 font-medium flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FaDollarSign />
                  Price (Rs) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="500"
                  max="10000"
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                  placeholder="e.g., 4999"
                />
              </div>

              <div>
                <label className={`block mb-2 font-medium flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FaBox />
                  Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  max="1000"
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                  placeholder="e.g., 50"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Category *
              </label>
              <div className="flex gap-4">
                {[
                  { value: 'boys', label: 'Boys Hoodies', color: 'blue' },
                  { value: 'girls', label: 'Girls Hoodies', color: 'pink' }
                ].map((cat) => (
                  <label
                    key={cat.value}
                    className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg border ${darkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-gray-50 border-gray-300'
                      } ${formData.category === cat.value
                        ? darkMode
                          ? 'border-blue-500 bg-blue-900/20'
                          : 'border-blue-500 bg-blue-50'
                        : ''
                      }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={formData.category === cat.value}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 ${formData.category === cat.value
                      ? `border-${cat.color}-500 bg-${cat.color}-500`
                      : darkMode ? 'border-gray-600' : 'border-gray-400'
                      }`} />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>
{/* Rating & Reviews Section */}
<div className="space-y-4 pt-4 border-t dark:border-gray-700 border-gray-300">
  <div>
    <label className={`font-medium flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <FaStar />
      Initial Rating (0-5)
    </label>
    <div className="flex items-center gap-4 mt-2">
      <input
        type="number"
        min="0"
        max="5"
        step="0.1"
        value={formData.rating}
        onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
        className={`w-24 px-3 py-2 rounded border ${darkMode
          ? 'bg-gray-700 border-gray-600'
          : 'bg-white border-gray-300'
          }`}
        placeholder="e.g., 4.5"
      />
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <FaStar
            key={star}
            size={20}
            className={`cursor-pointer ${star <= formData.rating ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
          />
        ))}
      </div>
    </div>
    <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
      Average star rating (e.g., 4.5 = 4½ stars)
    </p>
  </div>

  {/* ✅ ADD THIS: Number of Reviews Field */}
  <div>
    <label className={`font-medium block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      Total Reviews Count
    </label>
    <input
      type="number"
      min="0"
      max="10000"
      step="1"
      value={formData.numReviews || 0}
      onChange={(e) => setFormData(prev => ({ 
        ...prev, 
        numReviews: parseInt(e.target.value) || 0 
      }))}
      className={`w-full px-3 py-2 rounded border ${darkMode
        ? 'bg-gray-700 border-gray-600'
        : 'bg-white border-gray-300'
        }`}
      placeholder="e.g., 12, 45, 100"
    />
    <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
      How many reviews this product has received
    </p>
  </div>
</div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className={`block mb-2 font-medium flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <FaImage />
                Product Image *
              </label>

              {/* Image Preview */}
              <div className="mb-4">
                <div className={`w-full h-48 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
                  {formData.imagePreview ? (
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <FaImage className={`text-4xl mx-auto mb-2 ${darkMode ? 'text-gray-700' : 'text-gray-400'}`} />
                      <p className={darkMode ? 'text-gray-500' : 'text-gray-600'}>
                        No image selected
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Button */}
              <label className={`block w-full px-4 py-3 rounded-lg border ${darkMode
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                : 'bg-white border-gray-300 hover:bg-gray-50'
                } cursor-pointer text-center transition`}>
                <FaUpload className="inline mr-2" />
                {formData.image ? 'Change Image' : 'Upload Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Recommended: 800x800px, Max 5MB
              </p>
            </div>

            {/* Colors */}
            <div>
              <label className={`block mb-2 font-medium flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <FaPalette />
                Available Colors
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.colors.map((color) => (
                  <div
                    key={color}
                    className={`px-3 py-1 rounded-full flex items-center gap-2 ${darkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    <span>{color}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(color)}
                      className={`text-xs ${darkMode ? 'hover:text-red-400' : 'hover:text-red-600'}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddColor}
                className={`text-sm px-3 py-1 rounded ${darkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-800'
                  }`}
              >
                + Add Color
              </button>
            </div>

            {/* Sizes */}
            <div>
              <label className={`block mb-2 font-medium flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <FaRuler />
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleToggleSize(size)}
                    className={`px-3 py-2 rounded-lg transition ${formData.sizes.includes(size)
                      ? darkMode
                        ? 'bg-yellow-600 text-black'
                        : 'bg-yellow-500 text-white'
                      : darkMode
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700 border-gray-300">
              <div className="flex items-center gap-3">
                <FaStar className={formData.featured ? 'text-yellow-500' : darkMode ? 'text-gray-500' : 'text-gray-400'} />
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    Featured Product
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Show on homepage
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 rounded-full peer ${darkMode
                  ? 'bg-gray-700 peer-checked:bg-yellow-600'
                  : 'bg-gray-300 peer-checked:bg-yellow-500'
                  } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              </label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t dark:border-gray-800 border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className={`px-6 py-3 rounded-lg ${darkMode
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-600 hover:text-black'
              }`}
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            disabled={loading}
            onClick={(e) => {
              if (loading) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${loading
              ? 'bg-gray-600 cursor-not-allowed'
              : darkMode
                ? 'bg-yellow-600 text-black hover:bg-yellow-700'
                : 'bg-black text-white hover:bg-gray-800'
              } transition`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                {product ? 'Update Product' : 'Create Product'}
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
