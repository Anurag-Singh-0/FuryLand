import { lazy, Suspense, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Truck, Zap } from "lucide-react";

// Lazy load the motion component
const MotionDiv = lazy(() =>
  import("framer-motion").then((mod) => ({ default: mod.motion.div }))
);

// Optimized image component
const OptimizedImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

// Static fallback content
const HeroContent = ({ navigate }) => (
  <div className="flex flex-col lg:flex-row items-center justify-between min-h-[70vh]">
    {/* Left Content - Reduced padding */}
    <div className="w-full lg:w-1/2 px-4 lg:px-8 py-6 lg:py-8">
      <div className="max-w-lg mx-auto lg:mx-0">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full mb-3">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span className="text-xs font-medium text-blue-700">
            New Collection 2024
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight">
          Embrace{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Elegance
          </span>
          <br />
          Live in{" "}
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Comfort
          </span>
        </h1>

        {/* Description */}
        <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-5 leading-relaxed">
          Discover our latest winter essentials — where timeless style meets
          cozy perfection. Crafted for those who love to stand out effortlessly,
          even in the coldest moments.
        </p>

        {/* CTA Buttons - Compact */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <button
            onClick={() => navigate("/collection")}
            className="group px-5 py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-1.5"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => navigate("/sale")}
            className="px-5 py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-white to-gray-50 border border-gray-200 text-gray-900 rounded-lg font-semibold hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            View Sale
          </button>
        </div>

        {/* Features - Compact */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-green-100 rounded">
              <Truck className="w-3.5 h-3.5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">
                Free Shipping
              </p>
              <p className="text-xs text-gray-500">Over ₹1999</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-blue-100 rounded">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">
                2 Year Warranty
              </p>
              <p className="text-xs text-gray-500">Quality Guaranteed</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-purple-100 rounded">
              <Zap className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">
                Fast Delivery
              </p>
              <p className="text-xs text-gray-500">2-3 Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right Image - Reduced height */}
    <div className="w-full lg:w-1/2 h-[300px] lg:h-[500px] relative">
      <OptimizedImage
        src="https://images.unsplash.com/photo-1697395156014-7b3abb7c9262?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Fashion Model in Winter Collection"
        className="w-full h-full object-cover"
      />

      {/* Floating Card - Smaller */}
      <div className="absolute bottom-3 left-3 right-3 lg:bottom-4 lg:left-4 lg:right-auto lg:w-48">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-900">
              Winter Sale
            </span>
            <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
              -40%
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-2">
            Limited time offer
          </p>
          <button
            onClick={() => navigate("/sale")}
            className="w-full py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Shop Sale
          </button>
        </div>
      </div>
    </div>
  </div>
);

function Hero() {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Subtle pattern background - FIXED */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto">
        {isClient ? (
          <Suspense
            fallback={
              <div className="min-h-[70vh] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            }
          >
            <MotionDiv
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <HeroContent navigate={navigate} />
            </MotionDiv>
          </Suspense>
        ) : (
          <HeroContent navigate={navigate} />
        )}
      </div>
    </section>
  );
}

export default Hero;