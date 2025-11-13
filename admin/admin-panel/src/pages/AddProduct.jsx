import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { useState } from "react";

function AddProduct() {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  return (
    <>
      <form className="flex flex-col gap-5 text-gray-700">
        {/* Product Upload Images section */}
        <div>
          <p className="mb-3 text-sm sm:text-md">Upload Image</p>

          <div className="flex gap-2 sm:gap-5 justify-between sm:justify-start">
            <label htmlFor="image1">
              <img
                src={!image1 ? "/upload.png" : URL.createObjectURL(image1)}
                className="w-18 cursor-pointer"
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>

            <label htmlFor="image2">
              <img
                src={!image2 ? "/upload.png" : URL.createObjectURL(image2)}
                className="w-18 cursor-pointer"
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>

            <label htmlFor="image3">
              <img
                src={!image3 ? "/upload.png" : URL.createObjectURL(image3)}
                className="w-18 cursor-pointer"
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>

            <label htmlFor="image4">
              <img
                src={!image4 ? "/upload.png" : URL.createObjectURL(image4)}
                className="w-18 cursor-pointer"
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>

        {/* Product name input */}
        <div className="sm:w-[40vw] md:w-100 w-full">
          <p className="mb-2 text-sm sm:text-md">Product name</p>
          <TextField
            id="outlined-basic"
            label="Type here"
            variant="outlined"
            className="w-full"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        {/* Product description input */}
        <div className="sm:w-[40vw] md:w-100 w-full">
          <p className="mb-2 text-sm sm:text-md">Product description</p>

          <TextField
            id="outlined-textarea"
            label="Write content here"
            className="w-full"
            multiline
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        {/* Product category & price section */}
        <div className="flex gap-5 w-full flex-col sm:flex-row ">
          <div>
            <p className="mb-2 text-sm sm:text-md">Product category</p>
            <select
              className="bg-gray-200 border-black/40 border rounded-sm w-full sm:w-30 p-2 text-sm outline-none cursor-pointer"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-sm sm:text-md">Sub category</p>
            <select
              className="bg-gray-200 border-black/40 border rounded-sm w-full sm:w-40 p-2 text-sm outline-none cursor-pointer"
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-sm sm:text-md">Price</p>
            <input
              type="number"
              placeholder="100"
              className="bg-gray-200 border-black/40 border rounded-sm w-full sm:w-20 p-2 text-sm outline-none cursor-pointer"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
        </div>

        {/* Product choose size section */}
        <div>
          <p className="mb-2 text-sm sm:text-md">Product sizes</p>
          <div className="flex gap-3">
            <Button variant="contained">S</Button>
            <Button variant="contained">M</Button>
            <Button variant="contained">L</Button>
            <Button variant="contained">XL</Button>
            <Button variant="contained">XXL</Button>
          </div>
        </div>

        {/* BestSeller section */}
        <div className="flex items-center justify-center sm:justify-normal">
          <p>BestSeller</p>
          <Switch />
        </div>

        <div className="flex justify-center sm:justify-normal">
          <Button type="submit" variant="contained" className="!bg-black">
            Add Product
          </Button>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
