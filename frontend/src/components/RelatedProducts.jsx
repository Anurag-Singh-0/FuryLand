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
          item.id !== currentProductId
      );

      setRelated(filtered);
    }
  }, [category, subCategory, currentProductId, Products]);

  return (
    <div>
      {related.map((product) => (
        <ProductItem
          name={product.brand}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
}

export default RelatedProducts;
