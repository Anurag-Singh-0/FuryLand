import { images } from "../Images";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";

function Hero() {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: -10 }}
      transition={{ duration: 1, type: "tween" }}
    >
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-6">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 michroma">
          Embrace Elegance. Live in Comfort
        </h1>
        <p className="text-gray-600 mb-2">
          Discover our latest winter essentials — where timeless style meets
          cozy perfection. Crafted for those who love to stand out effortlessly,
          even in the coldest moments.
        </p>
        <Button className="mt-4 !bg-black !text-white rounded cursor-pointer">
          Shop Now
        </Button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
        <img
          src={images.model}
          alt="Model"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </motion.div>
  );
}

export default Hero;
