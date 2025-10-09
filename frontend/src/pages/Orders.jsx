import { Products } from "../data/Product";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";

function Orders() {
  const { Products, currency } = useContext(ShopContext);

  return (
    <div className="border-t border-gray-300 pt-10">
      <h1 className="text-xl md:text-2xl uppercase font-semibold text-gray-500">
        Your <span className="text-gray-800">Order</span>
      </h1>

      {/* Orders Data */}
      <div>
        {Products.slice(1, 4).map((item, idx) => (
         <div></div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
