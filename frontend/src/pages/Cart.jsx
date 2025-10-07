import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { images } from "../Images";

function Cart() {
  const {
    delivaryFee,
    currency,
    Products,
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(ShopContext);
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
            id: product.id,
            brand: product.brand,
            desc: product.desc,
            price: product.price,
            image: product.image[0],
            size,
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
    <div className="w-full px-4 md:px-2 pb-8">
      <hr className="text-gray-300 mb-5" />
      {/* <h1 className="text-3xl font-semibold uppercase mb-4">
        Your <span className="text-blue-700">Cart</span>
      </h1> */}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SECTION */}
        <div className="flex-1 flex flex-col">
          {/* Place Order Button */}

          {cartData.length === 0 ? (
            ""
          ) : (
            <div className="mb-3 flex justify-end">
              <Button
                variant="contained"
                className="!bg-black !text-white !px-6 !py-2 uppercase !text-sm"
              >
                Place Order
              </Button>
            </div>
          )}

          {/* Scrollable Cart List */}
          <div
            className="flex flex-col gap-6 pr-2 overflow-y-scroll"
            style={{
              maxHeight: "70vh",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE
            }}
          >
            <style>{`
              /* Hide scrollbar for Chrome, Safari, Opera */
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {cartData.length === 0 ? (
              <div className="flex justify-center items-center flex-col mb-30">
                <img
                  src={images.emptyCartPng}
                  alt="Empty Cart"
                  className="w-90"
                />
                <span className="text-sm sm:text-xl text-center">
                  Your cart is waiting for some amazing product.
                </span>
              </div>
            ) : (
              cartData.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 pb-5"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.desc}
                      className="w-24 h-28 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.brand}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                      <p className="text-black font-semibold mt-1">
                        {currency}
                        {item.price}
                      </p>
                      <span className="inline-block mt-2 border border-gray-400 px-3 py-1 text-sm rounded">
                        Size: {item.size}
                      </span>
                    </div>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex items-center gap-3 mt-3 sm:mt-0">
                    <div className=" flex justify-between items-center gap-4">
                      <button
                        onClick={() => decreaseQuantity(item.id, item.size)}
                        className="cursor-pointer border border-gray-600 text-black px-2 rounded-sm"
                      >
                        <RemoveIcon />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id, item.size)}
                        className="cursor-pointer border border-gray-600 text-black px- px-2 rounded-sm"
                      >
                        <AddIcon />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT SECTION - STICKY TOTALS */}
        {cartData.length === 0 ? (
          " "
        ) : (
          <div className="lg:w-1/3 w-full">
            <div className="border border-gray-300 rounded-lg p-6 shadow-sm sticky top-5">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                CART <span className="text-blue-700">TOTALS</span>
              </h3>

              <div className="flex justify-between py-3 border-b">
                <span>Subtotal</span>
                <span className="font-medium">
                  {currency}
                  {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span>Shipping Fee</span>
                <span className="font-medium">
                  {currency}
                  {delivaryFee.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between py-3 font-semibold text-lg">
                <span>Total</span>
                <span>
                  {currency}
                  {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
