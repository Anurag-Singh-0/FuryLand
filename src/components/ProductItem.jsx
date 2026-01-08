import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, Eye, Star, Zap } from "lucide-react";

function ProductItem({ id, image, name, price, desc, bestseller, date }) {
  const { currency, addToCart } = useContext(ShopContext);
  const { pathname } = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id);
    // Show toast or notification here
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative">
      <Link
        to={`/product/${id}`}
        className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image Container */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          {/* Multiple Images on Hover */}
          <div className="relative w-full h-full">
            <img
              src={image[0]}
              alt={name}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isHovered && image[1] ? "opacity-0" : "opacity-100"
              }`}
            />
            {image[1] && (
              <img
                src={image[1]}
                alt={`${name} alternate view`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {bestseller && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                <Star className="w-3 h-3 fill-current" />
                Best Seller
              </span>
            )}

            {/* New Arrival Badge (within 7 days) */}
            {Date.now() - new Date(date).getTime() <
              7 * 24 * 60 * 60 * 1000 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                <Zap className="w-3 h-3" />
                New
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Premium Collection
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium text-gray-700">4.8</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 hover:text-blue-600 transition-colors">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[40px]">
            {desc}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900">
                {currency}
                {price.toLocaleString()}
              </span>
              {price > 2000 && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {currency}
                  {(price * 1.2).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">
                In Stock
              </span>
            </div>
            <span className="text-xs text-gray-500">Free Shipping</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
