import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function LatestCollection() {
  const { Products } = useContext(ShopContext);
  const [letestProduct, setLetestProduct] = useState([]);

  useEffect(() => {
    setLetestProduct(Products.slice(-12));
  }, []);

  return (
    <div className="mb-7">
      <div className="mt-10">
        <Title text1={"Latest"} text2={"collections"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {letestProduct.map((item, idx) => (
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

export default LatestCollection;
