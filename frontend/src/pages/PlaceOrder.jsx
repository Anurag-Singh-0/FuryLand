import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";

function PlaceOrder() {
  const { navigate, cartItems } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    toast.success("Order Placed")
    navigate("/orders");
  };

  return (
    <div className="pb-10">
      <hr className="text-gray-300 mb-10" />

      <div className="flex flex-col md:flex-row gap-15">
        {/* LEFT: Delivery Info */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl font-semibold text-gray-600 mb-6 uppercase">
            Delivery <span className="text-gray-900">Information</span>
          </h1>

          <form
            onSubmit={handleSubmit}
            id="orderForm"
            className="flex flex-col gap-4"
          >
            {/* Row 1 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
                type="text"
                placeholder="First name"
                required
              />
              <input
                className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
                type="text"
                placeholder="Last name"
                required
              />
            </div>

            <input
              className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
              type="email"
              placeholder="Email address"
              required
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
                required
              />
              <input
                className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
                type="text"
                placeholder="State"
                required
              />
            </div>

            {/* Row 3 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
                type="number"
                placeholder="Zipcode"
                required
              />
              <input
                className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
                type="text"
                placeholder="Country"
                required
              />
            </div>

            <input
              className="focus:border-black border border-gray-400 px-4 py-3 rounded-md w-full outline-none"
              type="Number"
              placeholder="Phone"
              required
            />
          </form>
        </div>

        {/* RIGHT: Cart Summary */}
        <div className="flex-1 md:max-w-xl">
          <CartTotal />
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
            form="orderForm"
            type="submit"
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
