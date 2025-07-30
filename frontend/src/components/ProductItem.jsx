import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  return (
    <div className="p-2">
      <Link
        to={`/product/${id}`}
        className="block outline outline-black/20 bg-white rounded-sm overflow-hidden"
      >
        <div className="overflow-hidden">
          <img
            src={image[0]}
            alt="thumbnail"
            className="w-full h-50 object-cover object-center hover:scale-106 duration-200"
          />
        </div>
        <div className="px-4 py-2">
          <p className="text-gray-700 font-medium text-sm">{name}</p>
          <p className="text-black font-medium text-sm mt-1">
            {currency}
            {price}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
