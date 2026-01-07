import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LatestCollection() {
  const { Products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Take the latest 12 products
    const sorted = [...Products]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 12);
    setLatestProducts(sorted);
  }, [Products]);

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header - Simplified without filters */}
        <div className=" mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              New Arrivals
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Latest Collections
          </h2>

          <p className="text-gray-600  text-lg">
            Discover our newest arrivals featuring premium quality and
            contemporary designs
          </p>
        </div>

        {/* Products Grid - Show all 12 at once */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {latestProducts.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              name={item.brand}
              desc={item.desc}
              price={item.price}
              image={item.image}
              bestseller={item.bestseller}
              date={item.date}
            />
          ))}
        </div>

        {/* Empty State */}
        {latestProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Check back soon for new arrivals
            </p>
          </div>
        )}

        {/* Simple CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Explore Our Full Collection
              </h3>
              <p className="text-gray-300">
                Discover thousands of premium products with exclusive member
                benefits
              </p>
            </div>
            <button onClick={() => navigate("/collection")} className="cursor-pointer px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
              View All Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestCollection;
