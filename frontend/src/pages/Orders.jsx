import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function Orders() {
  const { Products, currency } = useContext(ShopContext);

  return (
    <div className="border-t border-gray-300 pt-10 px-4 md:px-10">
      <h1 className="text-xl md:text-2xl uppercase font-semibold text-gray-500 mb-8 text-center md:text-left">
        Your <span className="text-gray-900">Orders</span>
      </h1>

      {/* Orders Data */}
      <div className="flex flex-col gap-6">
        {Products.slice(0, 3).map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row justify-between gap-5 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all bg-white p-4 md:p-6"
          >
            {/* Product Info */}
            <div className="flex items-center gap-5 w-full sm:w-2/3">
              <img
                src={item.image[0]}
                alt={item.brand}
                className="w-20 sm:w-28 h-20 sm:h-28 object-cover rounded-xl shadow-sm"
              />

              <div className="flex flex-col gap-1 w-full">
                <p className="text-lg font-semibold text-gray-800">
                  {item.brand}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>

                <p className="text-sm text-gray-500">
                  Date:{" "}
                  <span className="text-gray-800">
                    {new Date().toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Payment: <span className="text-green-600 font-medium">COD</span>
                </p>

                <p className="text-sm text-gray-800 mt-2">
                  Price:{" "}
                  <span className="font-semibold">
                    {currency}
                    {item.price}
                  </span>
                </p>
              </div>
            </div>

            {/* Status + Action */}
            <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 w-full sm:w-1/3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-sm md:text-base font-medium text-gray-700">
                  Order Placed
                </p>
              </div>

              <button className="border border-gray-400 hover:border-green-500 hover:text-green-600 px-5 py-1.5 rounded-xl text-sm font-medium transition-all">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
