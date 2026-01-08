import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

function CartTotal() {
  const { delivaryFee, currency, Products, cartItems } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // Convert cartItems object → usable array
  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      const product = Products.find((p) => p.id === Number(productId));
      if (product) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          tempData.push({
            price: product.price,
            quantity,
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, Products]);

  // Calculate totals
  const subtotal = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + delivaryFee;

  return (
    <div>
      <h4 className="text-xl font-semibold text-gray-700 mb-4">Cart Totals</h4>

      <div className="p-6 rounded-xl border border-gray-300">
        {/* Subtotal */}
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Shipping Fee</span>
          <span className="font-semibold">
            {subtotal >= 1999 ? (
              <>Free</>
            ) : (
              <>
                {currency}
                {delivaryFee.toFixed(2)}
              </>
            )}
          </span>
        </div>

        <hr className="my-4" />

        {/* Total */}
        <div className="flex justify-between">
          <span className="text-xl font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">
            {total >= 1999 ? (
              <>{currency}{subtotal.toFixed(2)}</>
            ) : (
              <>
                {currency}
                {total.toFixed(2)}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
