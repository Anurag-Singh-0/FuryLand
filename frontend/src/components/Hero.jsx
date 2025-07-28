import { images } from "../Images";

function Hero() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-6">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 michroma">Embrace Elegance. Live in Comfort</h1>
        <p className="text-gray-600 mb-2">
          Discover our latest winter essentials — where timeless style meets
          cozy perfection. Crafted for those who love to stand out effortlessly,
          even in the coldest moments.
        </p>
        <button className="mt-4 px-4 py-2 bg-black text-white rounded cursor-pointer">
          Shop Now
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
        <img
          src={images.model}
          alt="Model"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}

export default Hero;
