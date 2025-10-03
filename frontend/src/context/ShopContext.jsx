import { createContext, useEffect, useState } from "react";
import { Products } from "../data/Product.js";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivaryFee = 20;
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
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
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
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
