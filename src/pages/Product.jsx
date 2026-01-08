import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import RelatedProducts from "../components/RelatedProducts";


import {
  Star,
  Truck,
  Shield,
  RefreshCw,
  Heart,
  Share2,
  ZoomIn,
  Minus,
  Plus,
  Package,
  CheckCircle,
  ArrowLeft,
  ShoppingBag
} from "lucide-react";

function Product() {
  const { productId } = useParams();
  const { Products, currency, addToCart, addToWishlist } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const product = Products.find(item => item.id === Number(productId));
    if (product) {
      setProductData(product);
      setMainImage(product.image[0]);
      setIsWishlisted(product.bestseller || false);
    }
  }, [Products, productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart(productData.id, selectedSize, quantity);
    toast.success("🎉 Added to cart successfully!");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart(productData.id, selectedSize, quantity);
    // Navigate to checkout
    window.location.href = "/place-order  ";
  };

  const handleWishlistToggle = () => {
    if (productData) {
      addToWishlist(productData.id);
      setIsWishlisted(!isWishlisted);
      toast.success(!isWishlisted ? "Added to wishlist" : "Removed from wishlist");
    }
  };

  const handleImageHover = (e) => {
    if (!zoomImage) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const rating = 4.8;
  const reviewCount = 155;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600 flex items-center gap-2">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{productData.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{productData.brand}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div 
              className={`relative bg-gray-100 rounded-2xl overflow-hidden mb-6 ${zoomImage ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={() => setZoomImage(!zoomImage)}
              onMouseMove={handleImageHover}
              onMouseLeave={() => setZoomImage(false)}
            >
              <img
                src={mainImage}
                alt={productData.brand}
                className="w-full h-auto object-contain max-h-[500px]"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {productData.bestseller && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    Best Seller
                  </span>
                )}
                {Date.now() - new Date(productData.date).getTime() < 7 * 24 * 60 * 60 * 1000 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    New Arrival
                  </span>
                )}
              </div>

              {/* Zoom Icon */}
              <button className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors">
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </button>

              {/* Zoom Effect */}
              {zoomImage && (
                <div className="absolute inset-0 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-no-repeat bg-origin-border"
                    style={{
                      backgroundImage: `url(${mainImage})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: '200%',
                      transform: 'scale(1.5)',
                    }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-4">
              {productData.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMainImage(img);
                    setSelectedIndex(index);
                    setZoomImage(false);
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedIndex === index
                      ? 'border-blue-600 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                {productData.category} • {productData.subCategory}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({reviewCount} reviews)</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              {productData.brand}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {productData.desc}
            </p>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                  {currency}
                  {productData.price.toLocaleString()}
                </span>
                {productData.price < 2000 && (
                  <span className="text-sm text-gray-500">incl. GST</span>
                )}
              </div>
              {productData.price > 2000 && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xl text-gray-500 line-through">
                    {currency}
                    {(productData.price * 1.2).toLocaleString()}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-bold rounded">
                    Save 20%
                  </span>
                </div>
              )}
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Select Size</h3>
                <span className="text-sm text-gray-500">Size Guide</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 bg-gray-100 rounded-xl p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  Only {productData.stock || 10} items left
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="group py-4 bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Buy Now
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleWishlistToggle}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                  isWishlisted
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                <span className="font-medium">Wishlist</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                    <p className="text-xs text-gray-500">Over ₹1999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% Protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <RefreshCw className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Easy Returns</p>
                    <p className="text-xs text-gray-500">30 Day Policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Package className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Quality Checked</p>
                    <p className="text-xs text-gray-500">Premium Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8">
              <button className="pb-4 text-lg font-semibold text-gray-900 border-b-2 border-gray-900">
                Product Details
              </button>
              <button className="pb-4 text-lg font-semibold text-gray-500 hover:text-gray-900">
                Reviews ({reviewCount})
              </button>
              <button className="pb-4 text-lg font-semibold text-gray-500 hover:text-gray-900">
                Shipping & Returns
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Features & Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Premium quality fabric for long-lasting comfort</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Designed for perfect fit and modern styling</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Easy maintenance with machine washable material</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Breathable fabric suitable for all seasons</span>
                </li>
              </ul>
            </div>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">{productData.category}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium text-gray-900">{productData.subCategory}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Available Sizes</span>
                  <span className="font-medium text-gray-900">{productData.sizes.join(', ')}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Material</span>
                  <span className="font-medium text-gray-900">Premium Cotton Blend</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">About This Product</h3>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                FuryLand is a modern online shopping destination built to bring
                style, convenience, and variety to your fingertips. It's a digital
                marketplace where shoppers can explore unique collections, discover
                the latest trends, and purchase products without leaving the comfort
                of home. Designed for today's fast-paced lifestyle, FuryLand makes
                online shopping seamless, secure, and enjoyable.
              </p>
              <p>
                From fashion essentials and accessories to lifestyle products,
                FuryLand offers a wide range of items complete with clear images,
                accurate pricing, and multiple size and color options. Each product
                page is crafted to provide all the details you need to make
                confident choices, ensuring a smooth and satisfying shopping
                experience every time.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products - You'll need to create this component */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">You May Also Like</h2>
              <p className="text-gray-600">Similar products you might love</p>
            </div>
            <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all">
              View All
            </button>
          </div>
          <RelatedProducts
            category={productData.category}
            subCategory={productData.subCategory}
            currentProductId={productData.id}
          />
        </div>
      </div>
    </div>
  );
}

export default Product;