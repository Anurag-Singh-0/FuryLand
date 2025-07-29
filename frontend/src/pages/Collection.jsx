import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

function Collection() {
  const { Products } = useContext(ShopContext);

  useEffect(() => {
    Products.slice();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 pt-10 border-black/10 border-t">
      {/* Left Section */}
      <div className="w-full sm:w-60 md:w-50">
        <p className="uppercase text-lg font-semibold mb-3">Filters</p>
        {/* Category Action Box */}
        <div className="outline-black/20 outline lg:p-3 p-2 rounded-lg">
          <p className="uppercase text-sm font-medium mb-3">Categories</p>
          <div className="flex flex-col gap-2 px-5 text-sm text-gray-700">
            <label htmlFor="men" className="cursor-pointer">
              <input type="checkbox" id="men" /> Men
            </label>

            <label htmlFor="women" className="cursor-pointer">
              <input type="checkbox" id="women" /> Women
            </label>

            <label htmlFor="kids" className="cursor-pointer">
              <input type="checkbox" id="kids" /> Kids
            </label>
          </div>
        </div>

        {/* Type Action Box */}
        <div className="outline-black/20 outline p-3 mt-5 rounded-lg">
          <p className="uppercase text-sm font-medium mb-3">Type</p>
          <div className="flex flex-col gap-2 px-5 text-sm text-gray-700">
            <label htmlFor="topwear" className="cursor-pointer">
              <input type="checkbox" id="topwear" /> Topwear
            </label>

            <label htmlFor="bottomwear" className="cursor-pointer">
              <input type="checkbox" id="bottomwear" /> Bottomwear
            </label>

            <label htmlFor="winterwear" className="cursor-pointer">
              <input type="checkbox" id="winterwear" /> Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="lg:text-2xl font-semibold uppercase text-gray-500">
            All <span className="text-black">Collections</span>
          </p>
          <select className="border-gray-300 border py-1 px-2 outline-none text-sm rounded-full">
            <option value="Relevent">Sort by: Relavent</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>
        {/* Product Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {Products.map((item, idx) => (
            <ProductItem
              id={item.id}
              key={idx}
              image={item.image}
              name={item.brand}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
