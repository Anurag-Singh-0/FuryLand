import { createContext, useState } from "react";
import { Products } from "../data/Product.js";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivaryFee = 20;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    const newCartData =
      structuredClone(
        cartItems
      ); 
      /* structuredClone() is used in React primarily for creating deep copies of objects and arrays, especially when dealing with complex or deeply nested state updates. */
  };

  const value = {
    Products,
    currency,
    delivaryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
