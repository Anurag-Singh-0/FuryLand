import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // handle image upload
  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  // toggle size selection
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDate = new FormDate();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="flex flex-col gap-6 text-gray-700" onSubmit={handleSubmit}>
      {/* Upload Images Section */}
      <div>
        <p className="mb-3 text-sm sm:text-md font-medium">Upload Images</p>
        <div className="flex gap-3 sm:gap-5 flex-wrap">
          {images.map((img, index) => (
            <label
              key={index}
              htmlFor={`image${index}`}
              className="cursor-pointer"
            >
              <img
                src={img ? URL.createObjectURL(img) : "/upload.png"}
                alt={`upload-${index}`}
                className="w-20 h-20 object-cover rounded border border-gray-300"
              />
              <input
                id={`image${index}`}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="sm:w-[40vw] w-full">
        <p className="mb-2 text-sm sm:text-md font-medium">Product Name</p>
        <TextField
          label="Enter product name"
          variant="outlined"
          className="w-full"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Product Description */}
      <div className="sm:w-[40vw] w-full">
        <p className="mb-2 text-sm sm:text-md font-medium">
          Product Description
        </p>
        <TextField
          label="Write product description"
          variant="outlined"
          className="w-full"
          multiline
          minRows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className="flex flex-col sm:flex-row gap-5 w-full md:w-[80%]">
        <div className="flex-1">
          <p className="mb-2 text-sm sm:text-md font-medium">Category</p>
          <select
            className="bg-gray-100 border border-gray-300 rounded-md w-full p-2 text-sm outline-none cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="mb-2 text-sm sm:text-md font-medium">Subcategory</p>
          <select
            className="bg-gray-100 border border-gray-300 rounded-md w-full p-2 text-sm outline-none cursor-pointer"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="mb-2 text-sm sm:text-md font-medium">Price (₹)</p>
          <input
            type="number"
            placeholder="100"
            className="bg-gray-100 border border-gray-300 rounded-md w-full p-2 text-sm outline-none"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 text-sm sm:text-md font-medium">Available Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <Button
              key={size}
              variant="contained"
              onClick={() => toggleSize(size)}
              className={`!rounded-md ${
                sizes.includes(size)
                  ? "!bg-black !text-white"
                  : "!bg-[#1976D2] !text-white"
              }`}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Best Seller */}
      <div className="flex items-center gap-2">
        <p className="text-sm sm:text-md font-medium">Best Seller</p>
        <Switch
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center sm:justify-start">
        <Button
          type="submit"
          variant="contained"
          className="!bg-black !text-white !px-8 !py-2 !rounded-md"
        >
          Add Product
        </Button>
      </div>
    </form>
  );
}
