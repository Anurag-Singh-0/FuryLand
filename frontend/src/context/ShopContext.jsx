import { createContext, useEffect, useState } from "react";
import { Products } from "../data/Product.js";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivaryFee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select size");
      return;
    }

    setCartItems((prevCart) => {
      // Copy old cart
      const newCart = { ...prevCart };

      // If product already in cart
      if (newCart[itemId]) {
        // If that size exists, increase qty
        newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
      } else {
        // If product not in cart, add it
        newCart[itemId] = { [size]: 1 };
      }
      return newCart;
    });
  };

  const getCartCount = () => {
    // If cartItems is missing or empty, quickly return 0 (no items).
    if (!cartItems || Object.keys(cartItems).length === 0) return 0;

    // Running total of quantities
    let totalCount = 0;

    // Loop through each productId in the cart (productId keys).
    for (const productId in cartItems) {
      // sizesObj is the inner object that maps sizes to quantities for this product.
      // e.g. { "M": 2, "L": 1 }
      const sizesObj = cartItems[productId];

      // Loop through each size key inside this product's sizes object.
      for (const sizeKey in sizesObj) {
        // Convert stored value to a number safely.
        // Number("2") => 2, Number(undefined) or Number("abc") => NaN
        // The `|| 0` turns NaN (or any falsy value like undefined) into 0.
        const qty = Number(sizesObj[sizeKey]) || 0;

        // Add this size's quantity to the running total.
        totalCount += qty;
      }
    }

    // Return the total sum across all products and sizes.
    return totalCount;
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prevItem) => {
      const updatedCart = { ...prevItem };

      // if product exists and that size exists
      if (updatedCart[productId] && updatedCart[productId][size]) {
        delete updatedCart[productId][size]; // remove that size only, [The delete keyword removes a key from an object.]

        if (Object.keys(updatedCart[productId]).length === 0) {
          delete updatedCart[productId];
        }
      }

      return updatedCart;
    });
  };

  // Increase quantity
  const increaseQuantity = (productId, size) => {
    setCartItems((prevCart) => {
      if ((prevCart[productId][size] || 0) >= 10) {
        toast.error("Oops! You’ve reached the maximum limit for this item.");
        return prevCart;
      }

      return {
        ...prevCart,
        [productId]: {
          ...prevCart[productId],
          [size]: (prevCart[productId][size] || 0) + 1,
        },
      };
    });
  };

  // Decrease Quantity
  const decreaseQuantity = (productId, size) => {
    setCartItems((prevCart) => {
      const currQuantity = prevCart[productId][size];
      if (currQuantity > 1) {
        return {
          ...prevCart,
          [productId]: {
            ...prevCart[productId],
            [size]: currQuantity - 1,
          },
        };
      } else {
        const newCart = { ...prevCart };
        const updatedSizes = { ...newCart[productId] };
        delete updatedSizes[size];

        if (Object.keys(updatedSizes).length === 0) {
          delete newCart[productId];
        } else {
          newCart[productId] = updatedSizes;
        }
        return newCart;
      }
    });
  };

  const value = {
    Products,
    currency,
    delivaryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
