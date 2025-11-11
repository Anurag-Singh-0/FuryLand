import React from "react";

function AddProduct() {
  return (
    <>
      <form>
        <div className="">
          <p className="mb-3">Upload Image</p>

          <div className="flex gap-5">
            <label htmlFor="image1" className="">
              <img src="../../public/upload.png" className="w-20 cursor-pointer"/>
              <input type="file" id="image1" hidden/>
            </label>

            <label htmlFor="image2" className="">
              <img src="../../public/upload.png" className="w-20 cursor-pointer"/>
              <input type="file" id="image2" hidden/>
            </label>

            <label htmlFor="image3" className="">
              <img src="../../public/upload.png" className="w-20 cursor-pointer"/>
              <input type="file" id="image3" hidden/>
            </label>

            <label htmlFor="image4" className="">
              <img src="../../public/upload.png" className="w-20 cursor-pointer"/>
              <input type="file" id="image4" hidden/>
            </label>

          </div>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
