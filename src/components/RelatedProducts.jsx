import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem.jsx";

function RelatedProducts({ category, subCategory, currentProductId }) {
  const { Products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (category && subCategory) {
      const filtered = Products.filter(
        (item) =>
          item.category === category &&
          item.subCategory === subCategory &&
          item.id !== currentProductId // avoid showing the same product
      );

      setRelated(filtered);
    }
  }, [category, subCategory, currentProductId, Products]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5">
      {related.length > 0 ? (
        related
          .slice(0, 5)
          .map((product) => (
            <ProductItem
              key={product.id}
              name={product.brand}
              price={product.price}
              image={product.image}
              id={product.id}
            />
          ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No related products found
        </p>
      )}
    </div>
  );
}

export default RelatedProducts;
