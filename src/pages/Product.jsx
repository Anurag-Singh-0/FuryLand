import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Review from "../components/Review";
import Button from "@mui/material/Button";
import Title from "../components/Title";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
  const { productId } = useParams();
  const { Products, currency, delivaryFee, addToCart } =
    useContext(ShopContext);
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
        <div className="w-full sm:w-1/2 product-thumbnail gap-2 ">
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
                <Button
                  onClick={() => setSize(item)}
                  className={`!text-black py-2 px-4 rounded-sm cursor-pointer ${
                    item === size
                      ? "!bg-black !text-white"
                      : "!border !border-black/20"
                  }`}
                  key={idx}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          {/* ADD TO CART Button */}
          <Button
            onClick={() => addToCart(productData.id, size)}
            variant="contained"
            className="cart-button cursor-pointer"
          >
            Add to cart
          </Button>
          <hr className="text-gray-300" />

          {/* Short INFO */}
          <div className="text-gray-600 text-sm mt-5 flex flex-col gap-2">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description Section */}
      <div className="flex flex-col gap-1 mt-18 mb-20">
        <div>
          <button className="outline rounded-sm outline-black/40 py-2 px-4 font-semibold">
            Description
          </button>
          {/* <button className="outline rounded-sm outline-black/40 py-2 px-4">Reviews (200)</button> */}
        </div>

        <div className="p-5 flex flex-col gap-5 outline rounded-sm outline-black/20 text-gray-600">
          <p>
            FuryLand is a modern online shopping destination built to bring
            style, convenience, and variety to your fingertips. It’s a digital
            marketplace where shoppers can explore unique collections, discover
            the latest trends, and purchase products without leaving the comfort
            of home. Designed for today’s fast-paced lifestyle, FuryLand makes
            online shopping seamless, secure, and enjoyable.
          </p>
          <p>
            From fashion essentials and accessories to lifestyle products,
            FuryLand offers a wide range of items complete with clear images,
            accurate pricing, and multiple size and color options. Each product
            page is crafted to provide all the details you need to make
            confident choices, ensuring a smooth and satisfying shopping
            experience every time.
          </p>
        </div>
      </div>

      {/* Related Product */}
      <div>
        <Title text1={"Related"} text2={"Product"} />
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData.id}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
