import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Review from "../components/Review";
import Button from "@mui/material/Button";

function Product() {
  const { productId } = useParams();
  const { Products, currency, delivaryFee } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [images, setImages] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    Products.map((item) => {
      if (item.id === Number(productId)) {
        setProductData(item);
        setImages(item.image[0]);
        setSelectedIndex(0);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [Products, productId]);

  return productData ? (
    <div className="border-t-2 border-t-black/20 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Left side image section */}
        <div className="w-full sm:w-1/2 product-thumbnail gap-2">
          {/* Thumbnails*/}
          <div className="flex sm:flex-col flex-row sm:w-1/5 w-full sm:gap-2 gap-3 mt-3 sm:mt-0 custom-thumbnail">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className={`w-20 h-20 object-cover cursor-pointer border-2 rounded-md 
          ${selectedIndex === index ? "border-black" : "border-transparent"}`}
                onClick={() => {
                  setImages(item);
                  setSelectedIndex(index);
                }}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 flex rounded-md">
            <img
              src={images}
              alt="Product"
              className="w-full max-h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Right side Product info section */}
        <div className="w-full sm:w-1/2 p-4 rounded-md">
          <h1 className="font-semibold text-2xl">{productData.brand}</h1>
          <Review value={3} ratingNum={155} />
          <div className="text-2xl font-semibold flex gap-1 mt-5 mb-5">
            <h1 className="">{currency}</h1>
            <h1 className="">{delivaryFee}</h1>
          </div>
          {/* Product Desc */}
          <p className="font-medium text-gray-600">{productData.desc}</p>
          {/* Product Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, idx) => (
                <button
                  onClick={() => setSize(item)}
                  className={`py-2 px-4 rounded-sm cursor-pointer ${
                    item === size
                      ? "bg-black text-white"
                      : "border border-black/20"
                  }`}
                  key={idx}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* ADD TO CART Button */}
          <Button variant="contained" className="cart-button cursor-pointer">
            Add to cart
          </Button>
          <hr className="text-gray-300" />
          {/* Short INFO */}
          <div></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
