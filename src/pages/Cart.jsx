import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import {
  DeleteOutline,
  Remove,
  Add,
  ShoppingBagOutlined,
  ArrowForward,
  LocalShipping,
  Shield,
  Replay,
  FavoriteBorder,
} from "@mui/icons-material";

// Fallback image when product image fails to load
const FALLBACK_IMAGE =
  "https://plus.unsplash.com/premium_photo-1708110769789-b9da3a592cd7?q=80&w=434&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// ==============================================
// CART ITEM COMPONENT - Shows one product in cart
// ==============================================
const CartItem = React.memo(
  ({ item, onIncrease, onDecrease, onRemove, onSaveForLater }) => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

    // Handle broken images
    const handleImageError = () => setImageError(true);
    const { currency } = useContext(ShopContext);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative p-6 mb-4 border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all duration-300 bg-white">
          {/* NEW and DISCOUNT badges */}
          {item.isNew && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
              NEW
            </span>
          )}

          {item.discount > 0 && (
            <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
              -{item.discount}%
            </span>
          )}

          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* PRODUCT IMAGE */}
            <div className="w-full md:w-1/4">
              <div
                className="relative w-full pt-[100%] rounded-xl overflow-hidden bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={
                    imageError ? FALLBACK_IMAGE : item.image || FALLBACK_IMAGE
                  }
                  alt={item.desc}
                  onError={handleImageError}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="w-full md:w-3/4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-2/3">
                  {/* Product Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.brand}
                  </h3>

                  {/* Product Description */}
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>

                  {/* Size and Color */}
                  <div className="flex flex-wrap gap-3 items-center mb-4">
                    <span className="px-3 py-1 border border-gray-300 rounded-full text-sm">
                      Size: {item.size}
                    </span>
                    {item.color && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">Color:</span>
                        <div
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center border-2 border-blue-200 rounded-xl">
                      <button
                        onClick={() => onDecrease(item.id, item.size)}
                        disabled={item.quantity <= 1}
                        className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300"
                      >
                        <Remove fontSize="small" />
                      </button>

                      <span className="px-4 min-w-[60px] text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => onIncrease(item.id, item.size)}
                        disabled={item.quantity >= item.maxStock}
                        className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300"
                      >
                        <Add fontSize="small" />
                      </button>
                    </div>

                    {/* Stock Status */}
                    <span
                      className={`text-sm font-medium ${
                        item.maxStock < 10 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {item.maxStock < 10
                        ? `Only ${item.maxStock} left!`
                        : "In Stock"}
                    </span>
                  </div>
                </div>

                {/* PRICE AND ACTIONS */}
                <div className="lg:w-1/3">
                  <div className="text-right">
                    {/* Total Price */}
                    <h4 className="text-2xl font-extrabold text-blue-600 mb-2">
                      {currency}
                      {((item.price || 0) * item.quantity).toFixed(2)}
                    </h4>

                    {/* Original Price (if on sale) */}
                    {item.originalPrice > item.price && (
                      <>
                        <p className="text-gray-500 line-through text-sm">
                          {currency}
                          {((item.originalPrice || 0) * item.quantity).toFixed(
                            2
                          )}
                        </p>
                        <p className="text-green-600 text-sm">
                          Save $
                          {(
                            ((item.originalPrice || 0) - (item.price || 0)) *
                            item.quantity
                          ).toFixed(2)}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 justify-end mt-4">
                    <button
                      onClick={() => onSaveForLater(item)}
                      className="p-2 text-gray-500 hover:text-pink-500 transition-colors"
                    >
                      <FavoriteBorder fontSize="small" />
                    </button>

                    <button
                      onClick={() => onRemove(item.id, item.size)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <DeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

CartItem.displayName = "CartItem";

// ==============================================
// MAIN CART COMPONENT
// ==============================================

function Cart() {
  const navigate = useNavigate();
  const { currency } = useContext(ShopContext);

  // Get data and functions from our shop context
  const {
    Products,
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    isLoading,
  } = useContext(ShopContext);

  // State for our cart data
  const [cartData, setCartData] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  // Prepare cart data for display
  const prepareCartData = useCallback(() => {
    if (!Products || !cartItems) return [];

    const items = [];

    // Loop through each product in cart
    for (const productId in cartItems) {
      const product = Products.find((p) => p.id === Number(productId));
      if (!product) continue;

      // Loop through each size of this product
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];

        // Get product image (with fallback)
        let productImage = FALLBACK_IMAGE;
        if (product.image) {
          if (Array.isArray(product.image)) {
            productImage = product.image[0] || FALLBACK_IMAGE;
          } else if (typeof product.image === "string") {
            productImage = product.image;
          }
        }

        // Create cart item object
        items.push({
          id: product.id,
          brand: product.brand,
          desc: product.description || product.desc || "Product description",
          price: product.salePrice || product.price || 0,
          originalPrice: product.originalPrice || product.price || 0,
          image: productImage,
          size,
          quantity,
          color: product.color,
          isNew: product.isNew,
          discount: product.discount || 0,
          maxStock: product.stock?.[size] || 99,
          category: product.category,
        });
      }
    }

    return items;
  }, [Products, cartItems]);

  // Update cart data when products or cart changes
  useEffect(() => {
    setCartData(prepareCartData());
  }, [prepareCartData]);

  // Move item to saved for later
  const handleSaveForLater = useCallback(
    (item) => {
      setSavedItems((prev) => [...prev, item]);
      removeFromCart(item.id, item.size);
    },
    [removeFromCart]
  );

  // Move item back to cart
  const handleMoveToCart = useCallback(
    (item) => {
      increaseQuantity(item.id, item.size, item.quantity || 1);
      setSavedItems((prev) =>
        prev.filter((i) => i.id !== item.id || i.size !== item.size)
      );
    },
    [increaseQuantity]
  );

  // Calculate totals
  const totalItems = useMemo(
    () => cartData.reduce((sum, item) => sum + item.quantity, 0),
    [cartData]
  );

  const subtotal = useMemo(
    () =>
      cartData.reduce(
        (sum, item) => sum + (item.price || 0) * item.quantity,
        0
      ),
    [cartData]
  );

  // ==============================================
  // DIFFERENT STATES OF THE CART
  // ==============================================

  // 1. LOADING STATE
  if (isLoading) {
    return (
      <div className="w-full py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-8 text-xl font-semibold text-gray-700">
            Loading Your Cart...
          </p>
        </div>
      </div>
    );
  }

  // 2. EMPTY CART STATE
  if (cartData.length === 0) {
    return (
      <div className="w-full py-16">
        <div className="flex flex-col items-center text-center py-12">
          <AnimatePresence>
            <motion.span
              animate={{
                y: [0, -30, 0],
                scaleY: [1, 1.1, 0.95, 1],
                scaleX: [1, 0.95, 1.05, 1],
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-10 lg:mb-20"
            >
              <ShoppingBagOutlined className="scale-300 lg:scale-500 text-blue-600" />
            </motion.span>
          </AnimatePresence>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Add items to your cart to get started
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Continue Shopping
            <ArrowForward />
          </button>
        </div>
      </div>
    );
  }

  // 3. CART WITH ITEMS STATE
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Your Shopping Cart
          </h1>
          <p className="text-xl text-gray-600">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDE: Cart Items */}
          <div className="lg:w-2/3">
            {/* Features Banner */}
            <div className="p-6 mb-6 rounded-2xl bg-blue-600 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="flex items-center gap-3">
                  <LocalShipping className="text-3xl" />
                  <div>
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-sm text-blue-100">
                      On orders over {currency}1999
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Replay className="text-3xl" />
                  <div>
                    <p className="font-semibold">Easy Returns</p>
                    <p className="text-sm text-blue-100">
                      30-day return policy
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="text-3xl" />
                  <div>
                    <p className="font-semibold">Secure Checkout</p>
                    <p className="text-sm text-blue-100">SSL encrypted</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="max-h-[65vh] overflow-y-auto pr-2 scrollbar-hide">
              <AnimatePresence>
                {cartData.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.size}`}
                    item={item}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={removeFromCart}
                    onSaveForLater={handleSaveForLater}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Saved Items Section */}
            {savedItems.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Saved for Later ({savedItems.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedItems.slice(0, 3).map((item) => (
                    <div
                      key={`saved-${item.id}-${item.size}`}
                      className="p-4 rounded-xl border-2 border-dashed border-gray-300"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image || FALLBACK_IMAGE}
                          alt={item.brand}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.brand}</p>
                          <p className="text-gray-500 text-xs">
                            Size: {item.size}
                          </p>
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                          >
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Order Summary */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-6">
              <div className="p-8 rounded-2xl bg-white shadow-lg">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-6">
                  Order Summary
                </h3>

                {/* Cart Total Component */}
                <CartTotal
                  subtotal={subtotal}
                  itemCount={totalItems}
                  cartData={cartData}
                />

                <hr className="my-6" />

                {/* Checkout Button */}
                <button
                  onClick={() => navigate("/place-order")}
                  className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors mb-4 flex items-center justify-center gap-2"
                >
                  Secure Checkout
                  <ArrowForward />
                </button>

                <p className="text-xs text-gray-500 text-center mb-4">
                  By completing your purchase, you agree to our Terms of Service
                </p>

                {/* Continue Shopping Button */}
                <button
                  onClick={() => navigate("/collection")}
                  className="w-full py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Cart);
