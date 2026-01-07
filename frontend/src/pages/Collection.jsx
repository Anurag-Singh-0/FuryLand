import { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { 
  Filter, 
  X, 
  ChevronDown, 
  Grid, 
  List, 
  Sparkles,
  Check,
  SlidersHorizontal,
  Tag,
  Package
} from "lucide-react";

function Collection() {
  const { Products, search } = useContext(ShopContext);

  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectType, setSelectType] = useState([]);
  const [sortby, setSortBy] = useState("relevant");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handleCategoryChange = (category) => {
    setSelectCategory(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (type) => {
    setSelectType(prev =>
      prev.includes(type)
        ? prev.filter(item => item !== type)
        : [...prev, type]
    );
  };

  const handleClearFilters = () => {
    setSelectCategory([]);
    setSelectType([]);
    setPriceRange([0, 10000]);
    setSortBy("relevant");
  };

  const getFilteredProducts = useMemo(() => {
    let filtered = [...Products];

    // Category filter
    if (selectCategory.length > 0) {
      filtered = filtered.filter(item =>
        selectCategory.includes(item.category.toLowerCase())
      );
    }

    // Type filter
    if (selectType.length > 0) {
      filtered = filtered.filter(item =>
        selectType.includes(item.subCategory.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(item =>
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Search filter
    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(item =>
        item.brand.toLowerCase().includes(lowerSearch) ||
        item.desc?.toLowerCase().includes(lowerSearch)
      );
    }

    // Sorting
    switch (sortby) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "bestseller":
        filtered.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
      default:
        // Relevant - default sorting
        break;
    }

    return filtered;
  }, [Products, selectCategory, selectType, priceRange, sortby, search]);

  const activeFiltersCount = selectCategory.length + selectType.length + (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Package className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Collection</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Explore Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Premium Collection</span>
            </h1>
            
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover curated fashion pieces that blend style, comfort, and quality
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  Categories
                </h3>
                <div className="space-y-3">
                  {["men", "women", "kids"].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${
                        selectCategory.includes(category)
                          ? "bg-blue-50 border border-blue-200 text-blue-700"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span className="font-medium capitalize">{category}</span>
                      {selectCategory.includes(category) && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Types */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Product Type</h3>
                <div className="space-y-3">
                  {["topwear", "bottomwear", "winterwear", "footwear", "accessories"].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        selectType.includes(type)
                          ? "bg-purple-50 border border-purple-200"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectType.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                        selectType.includes(type)
                          ? "bg-purple-600 border-purple-600"
                          : "border-gray-300"
                      }`}>
                        {selectType.includes(type) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="font-medium capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {selectCategory.map(cat => (
                      <span key={cat} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {cat} ×
                      </span>
                    ))}
                    {selectType.map(type => (
                      <span key={type} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                        {type} ×
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{getFilteredProducts.length}</span> products
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* View Mode */}
                  <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortby}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-gray-100 border-0 rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors outline-none cursor-pointer"
                    >
                      <option value="relevant">Sort: Relevant</option>
                      <option value="newest">Newest First</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="bestseller">Best Sellers</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowMobileFilter(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filter
                    {activeFiltersCount > 0 && (
                      <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {getFilteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                  : "grid-cols-1"
              }`}>
                {getFilteredProducts.map((item) => (
                  <ProductItem
                    key={item.id}
                    id={item.id}
                    name={item.brand}
                    desc={item.desc}
                    price={item.price}
                    image={item.image}
                    bestseller={item.bestseller}
                    date={item.date}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Package className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Try adjusting your filters or search to find what you're looking for.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {getFilteredProducts.length > 0 && (
              <div className="mt-12 text-center">
                <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilter(false)}
          />
          
          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {activeFiltersCount} active
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Filters Content */}
              <div className="overflow-y-auto max-h-[60vh] pr-2 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {["men", "women", "kids"].map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                          selectCategory.includes(category)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Types */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Product Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["topwear", "bottomwear", "winterwear", "footwear"].map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all ${
                          selectType.includes(type)
                            ? "bg-purple-50 border border-purple-200"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectType.includes(type)}
                          onChange={() => handleTypeChange(type)}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          selectType.includes(type)
                            ? "bg-purple-600 border-purple-600"
                            : "border-gray-300"
                        }`}>
                          {selectType.includes(type) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="font-medium capitalize text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-3 text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 mt-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <button
                    onClick={handleClearFilters}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowMobileFilter(false)}
                    className="flex-1 py-3 bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collection;