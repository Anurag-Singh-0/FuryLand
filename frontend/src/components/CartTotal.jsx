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
      <h1 className="text-2xl font-semibold text-gray-600 mb-6 uppercase">
        Cart <span className="text-gray-900">Totals</span>
      </h1>

      <div className="border border-gray-300 rounded-2xl p-5 space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="font-medium">
            {currency}
            {delivaryFee.toFixed(2)}
          </span>
        </div>
        <hr />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>
            {currency}
            {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
