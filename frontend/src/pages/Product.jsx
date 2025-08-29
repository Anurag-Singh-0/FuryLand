import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Product() {
  const { productId } = useParams();
  const { Products } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");

  const fetchProductData = async () => {
    Products.map((item) => {
      if (item.id === Number(productId)) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, Products]);


  return <div>Product</div>;
}

export default Product;
