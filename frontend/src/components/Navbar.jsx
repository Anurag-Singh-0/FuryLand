import { images } from "../Images";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Material Icons
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Hook
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const {
    getCartCount,
    searchQuery,
    setSearchQuery,
    performSearch,
    clearSearch,
    searchResults,
    showSearchResults,
    setShowSearch,
    currency,
  } = useContext(ShopContext);

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const navigate = useNavigate();

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        clearSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clearSearch]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    performSearch(value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery)}`);
      clearSearch();
    }
  };

  // Handle search result click
  const handleResultClick = (product) => {
    navigate(`/product/${product.id}`);
    clearSearch();
  };

  // View all results
  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery)}`);
      clearSearch();
    }
  };

  // Get product image
  const getProductImage = (product) => {
    if (Array.isArray(product.image)) {
      return product.image[0];
    }
    return product.image || images.productPlaceholder;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, type: "tween" }}
        className="flex items-center justify-between py-5 font-medium relative"
      >
        {/* Logo */}
        <Link to="/">
          <motion.img
            src={images.logoDark}
            className="logo w-32 md:w-40 lg:w-48"
            alt="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <ul className="flex gap-8 text-sm uppercase">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 group transition-all duration-300 ${
                    isActive ? "text-black" : "text-gray-600 hover:text-black"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <p className="uppercase font-semibold tracking-wide text-sm">
                      {item.name}
                    </p>
                    <span
                      className={`h-[2px] bg-gradient-to-r from-black to-gray-800 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          {/* Search Button for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <SearchIcon className="text-gray-700" />
            </button>
          </div>

          {/* Search for Desktop */}
          <div className="hidden lg:block relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery && performSearch(searchQuery)}
                  className="w-64 px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                {/* Clear search button */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <CloseIcon fontSize="small" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="max-h-96 overflow-y-auto">
                      {/* Results Header */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-semibold text-gray-700">
                            {searchResults.length} results found
                          </p>
                          <button
                            type="button"
                            onClick={handleViewAllResults}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            View all
                            <ArrowForwardIcon fontSize="small" />
                          </button>
                        </div>
                      </div>

                      {/* Search Results */}
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleResultClick(product)}
                          className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={getProductImage(product)}
                              alt={product.brand}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  images.productPlaceholder ||
                                  "https://via.placeholder.com/100";
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm truncate">
                              {product.brand}
                            </h4>
                            <p className="text-gray-600 text-xs truncate">
                              {product.desc}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-bold text-black">
                                {currency}
                                {product.price}
                              </span>
                              {product.bestseller && (
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                  Bestseller
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* User Profile Dropdown */}
          <div className="group relative">
            <Link to="/login">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <PersonOutlinedIcon className="text-gray-700" />
              </button>
            </Link>
            <div className="group-hover:block hidden absolute right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-48 py-4 bg-white shadow-2xl border border-gray-200 rounded-xl">
                <button
                  onClick={() => navigate("/profile")}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors text-left"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate("/orders")}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors text-left"
                >
                  My Orders
                </button>
                <button
                  onClick={() => navigate("/wishlist")}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors text-left"
                >
                  Wishlist
                </button>
                <div className="border-t border-gray-100 pt-2">
                  <button className="px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-left w-full">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <LocalMallOutlinedIcon className="text-gray-700" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">
                {getCartCount()}
              </span>
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MenuIcon className="text-gray-700" />
          </button>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-50 lg:hidden"
            >
              <div className="p-4">
                {/* Mobile Search Header */}
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setMobileSearchOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <ArrowBackIosNewIcon fontSize="small" />
                  </button>
                  <form onSubmit={handleSearchSubmit} className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        autoFocus
                        className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          <CloseIcon fontSize="small" />
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Mobile Search Results */}
                {searchQuery && searchResults.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-semibold text-gray-700">
                        {searchResults.length} results found
                      </p>
                      <button
                        onClick={handleViewAllResults}
                        className="text-blue-600 font-medium"
                      >
                        View all
                      </button>
                    </div>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          handleResultClick(product);
                          setMobileSearchOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl active:bg-gray-100"
                      >
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={getProductImage(product)}
                            alt={product.brand}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                images.productPlaceholder ||
                                "https://via.placeholder.com/100";
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {product.brand}
                          </h4>
                          <p className="text-gray-600 text-sm truncate">
                            {product.desc}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-bold text-black">
                              {currency}
                              {product.price}
                            </span>
                            {product.bestseller && (
                              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No products found</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Try searching with different keywords
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      Start typing to search products
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Sidebar */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl z-50 lg:hidden"
            >
              <div className="p-6">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" onClick={() => setOpen(false)}>
                    <img src={images.logoDark} alt="Logo" className="w-32" />
                  </Link>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                          isActive
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>

                {/* User Menu in Mobile */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-gray-100 rounded-xl"
                  >
                    <PersonOutlinedIcon />
                    <span className="font-medium">My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/orders");
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-gray-100 rounded-xl"
                  >
                    <LocalMallOutlinedIcon />
                    <span className="font-medium">My Orders</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay for mobile menu */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </motion.div>
    </>
  );
}

export default Navbar;
