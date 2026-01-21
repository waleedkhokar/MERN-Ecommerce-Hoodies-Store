import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; // ✅ Keep this ONE import
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';

const Products = ({ darkMode }) => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category') || 'all';
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [500, 10000]  // Change from [0, 10000]
});

    // Random shuffle function
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Fetch products from backend API
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const result = await response.json();
                
                if (result.success && result.data) {
               let allProducts = result.data.map(product => ({
    _id: product._id,          // ← ADD THIS LINE (keep MongoDB ID)
    id: product._id,           // ← KEEP THIS (for compatibility)
    name: product.name,
    price: product.price,
    category: product.category, // 'boys' or 'girls'
    image: product.image,
    description: product.description,
    stock: product.stock,
    rating: product.ratings || 4.5,
    numReviews: product.numReviews || 0,
    featured: product.featured || false
}));
                    // FILTER FIX: Exact category matching
                    let filtered = allProducts;
                    if (category === 'boys') {
                        filtered = allProducts.filter(p => p.category === 'boys');
                    } else if (category === 'girls') {
                        filtered = allProducts.filter(p => p.category === 'girls');
                    }
                    // 'all' shows everything - will be shuffled
                    
                    setProducts(filtered);
                    setFilteredProducts(filtered);
                    
                    console.log(`✅ Filtered: ${filtered.length} products for: ${category}`);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, [category]); // Re-fetch when category changes

    // Apply price filter
    useEffect(() => {
     let filtered = [...products];
filtered = filtered.filter(p => 
    p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
);
        setFilteredProducts(filtered);
    }, [filters, products]);

    const handlePriceChange = (maxPrice) => {
        setFilters({ ...filters, priceRange: [0, maxPrice] });
    };

    const clearFilters = () => {
        setFilters({ priceRange: [500, 10000] });
    };

    // Get display products with randomization for "all" category
    const getDisplayProducts = () => {
        if (category === 'all') {
            return shuffleArray(filteredProducts);
        }
        return filteredProducts;
    };

    const displayProducts = getDisplayProducts();

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        {category === 'boys' ? "Boys Hoodies" : 
                         category === 'girls' ? "Girls Hoodies" : 
                         'All Hoodies'}
                    </h1>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {filteredProducts.length} {category === 'all' ? 'premium hoodies' : category + "'s hoodies"} available
                        {category === 'all' && ' • Random order on each visit'}
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter Sidebar */}
                    <div className="lg:w-1/4">
                        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">Filters</h3>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-yellow-500 hover:text-yellow-400"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Category Filter - USING LINK COMPONENT */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">Category</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['all', 'boys', 'girls'].map((cat) => (
                                        <Link
                                            key={cat}
                                            to={`/products?category=${cat}`}
                                            className={`px-3 py-1 rounded-full text-sm ${category === cat 
                                                ? 'bg-yellow-500 text-black' 
                                                : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                        >
                                            {cat === 'all' ? 'All Hoodies' : cat === 'boys' ? "Boys" : "Girls"}
</Link>
                                    ))}
                                </div>
                            </div>
{/* Price Filter */}
<div className="mb-6">
    <h4 className="font-medium mb-3">Price Range</h4>
    <div className="space-y-4">
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span>Rs {filters.priceRange[0]}</span>
                <span className="font-medium">Rs {filters.priceRange[1]}</span>
            </div>
            <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({ ...filters, priceRange: [500, parseInt(e.target.value)] })}
                className="w-full accent-yellow-500"
            />
            <div className="flex justify-between text-xs opacity-75">
                <span>Min: Rs 500</span>
                <span>Max: Rs 10,000</span>
            </div>
        </div>
    </div>
</div></div>
                    </div>

                    {/* Product Grid */}
                    <div className="lg:w-3/4">
                        {loading ? (
                            <div className="flex flex-col justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mb-4"></div>
                                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                    Loading {category === 'all' ? 'all hoodies' : category + "'s hoodies"}...
                                </p>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <h3 className="text-xl font-semibold mb-2">No hoodies found</h3>
                                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {category === 'boys' ? "No boys hoodies available" : 
                                     category === 'girls' ? "No girls hoodies available" : 
                                     "No hoodies available"}
                                </p>
                                <Link
                                    to="/products?category=all"
                                    className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors inline-block"
                                >
                                    View All Hoodies
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <ProductCard product={product} darkMode={darkMode} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;