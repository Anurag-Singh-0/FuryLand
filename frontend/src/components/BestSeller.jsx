import { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

function BestSeller() {
  const [bestseller, setBestSeller] = useState([]);
  const { Products, currency } = useContext(ShopContext);

  useEffect(() => {
    const bestProducts = Products.filter((item) => item.bestseller);
    setBestSeller(bestProducts.slice(0, 3));
  }, []);

  return (
    <div className="mb-10">
      <Title text1={"Best"} text2={"Seller"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {bestseller.map((item,idx) => (
          <ProductItem
            name={item.brand}
            price={item.price}
            key={idx}
            id={item.id}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
