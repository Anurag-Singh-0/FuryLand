import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import SearchIcon from "@mui/icons-material/Search";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBox() {
  const { 
    searchQuery, 
    setSearchQuery,
    performSearch,
    clearSearch,
    showSearch,
    setShowSearch,
    searchResults
  } = useContext(ShopContext);

  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    performSearch(value);
  };

  const handleResultClick = (product) => {
    navigate(`/product/${product.id}`);
    clearSearch();
    setShowSearch(false);
  };

  if (!showSearch || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div className="flex justify-center items-center mb-5 gap-3">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              className="w-full px-6 py-4 pr-12 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:border-black text-lg"
            />
            <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
          </div>

          <button
            onClick={() => {
              setShowSearch(false);
              clearSearch();
            }}
            className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            <CloseRoundedIcon />
          </button>
        </div>

        {/* Search Results Dropdown for SearchBox */}
        {searchQuery && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-2xl mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="max-h-96 overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <p className="font-semibold text-gray-700">
                  {searchResults.length} results found
                </p>
              </div>
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleResultClick(product)}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={Array.isArray(product.image) ? product.image[0] : product.image}
                      alt={product.brand}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{product.brand}</h4>
                    <p className="text-gray-600 text-sm">{product.desc}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-black text-lg">
                        ${product.price}
                      </span>
                      <button className="px-4 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800">
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default SearchBox;