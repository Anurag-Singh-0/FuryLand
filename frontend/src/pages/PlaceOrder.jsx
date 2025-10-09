import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

function PlaceOrder() {
  const { navigate, cartItems } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  return (
    <div className="pb-10">
      <hr className="text-gray-300 mb-10" />

      <div className="flex flex-col md:flex-row gap-15">
        {/* LEFT: Delivery Info */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl font-semibold text-gray-600 mb-6 uppercase">
            Delivery <span className="text-gray-900">Information</span>
          </h1>

          <form className="flex flex-col gap-4">
            {/* Row 1 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
                type="text"
                placeholder="First name"
              />
              <input
                className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
                type="text"
                placeholder="Last name"
              />
            </div>

            <input
              className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
              type="email"
              placeholder="Email address"
            />

            <input
              className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
              type="text"
              placeholder="Street"
            />

            {/* Row 2 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
                type="text"
                placeholder="City"
              />
              <input
                className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
                type="text"
                placeholder="State"
              />
            </div>

            {/* Row 3 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
                type="number"
                placeholder="Zipcode"
              />
              <input
                className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
                type="text"
                placeholder="Country"
              />
            </div>

            <input
              className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
              type="Number"
              placeholder="Phone"
            />
          </form>
        </div>

        {/* RIGHT: Cart Summary */}
        <div className="flex-1 md:max-w-xl">
          <h1 className="text-2xl font-semibold text-gray-600 mb-6 uppercase">
            Cart <span className="text-gray-900">Totals</span>
          </h1>

          <div className="border border-gray-300 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">$110.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-medium">$10.00</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>$120.00</span>
            </div>
          </div>

          {/* Payment Methods */}
          <h2 className="mt-8 text-lg font-semibold text-gray-600">
            Payment <span className="text-gray-900">Method</span>
          </h2>

          <div className="mt-4 flex flex-wrap gap-4">
            <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:shadow-md transition-all">
              <input
                type="radio"
                name="payment"
                value="stripe"
                checked={method === "stripe"}
                onChange={(e) => setMethod(e.target.value)}
                className="accent-green-500"
              />
              <span>Stripe</span>
            </label>

            <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:shadow-md transition-all">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={method === "razorpay"}
                onChange={(e) => setMethod(e.target.value)}
                className="accent-green-500"
              />
              <span>Razorpay</span>
            </label>

            <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:shadow-md transition-all">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={method === "cod"}
                onChange={(e) => setMethod(e.target.value)}
                className="accent-green-500"
              />
              <span>Cash on Delivery</span>
            </label>
          </div>

          {/* Place Order Button */}
          <Button
            onClick={() => navigate("/orders")}
            variant="contained"
            className="!mt-8 w-full !bg-black !text-white !py-3 rounded-lg text-lg font-semibold"
          >
            PLACE ORDER
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
