import { createContext } from "react";
import { Products } from "../data/Product.js";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivaryFee = 20;

  const value = { Products, currency, delivaryFee };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
