import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

function RelatedProducts({ category, subCategory }) {
  const { Products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  return <div>RelatedProducts</div>;
}

export default RelatedProducts;
