import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendURL } from "../App.jsx";
import {
  Upload,
  X,
  Plus,
  Star,
  Package,
  DollarSign,
  Tag,
  AlignLeft,
  Grid,
  Type,
  Layers,
  Zap,
  Eye,
  CheckCircle,
} from "lucide-react";

export default function AddProduct({ token }) {
  const [images, setImages] = useState([null, null, null, null]);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Category to subcategory mapping
  const subCategories = {
    Men: ["Topwear", "Bottomwear", "Winterwear", "Footwear", "Accessories"],
    Women: [
      "Topwear",
      "Bottomwear",
      "Dresses",
      "Winterwear",
      "Footwear",
      "Accessories",
    ],
    Kids: ["Topwear", "Bottomwear", "Winterwear", "Footwear", "Accessories"],
  };

  // handle image upload
  const handleImageChange = (index, file) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload only image files");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }

      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  // toggle size selection
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const addAllSizes = () => {
    const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
    setSizes(allSizes);
  };

  const clearSizes = () => {
    setSizes([]);
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!brand.trim()) {
      toast.error("Please enter product brand name");
      setLoading(false);
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      setLoading(false);
      return;
    }

    if (sizes.length === 0) {
      toast.error("Please select at least one size");
      setLoading(false);
      return;
    }

    if (images.every((img) => img === null)) {
      toast.error("Please upload at least one image");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("brand", brand.trim());
      formData.append("description", description.trim());
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestSeller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, index) => {
        if (img) {
          formData.append(`image${index + 1}`, img);
        }
      });

      const response = await axios.post(
        backendURL + "/api/product/add",
        formData,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("🎉 Product added successfully!");

      // Reset form
      setBrand("");
      setDescription("");
      setPrice("");
      setCategory("Men");
      setSubCategory("Topwear");
      setBestSeller(false);
      setSizes([]);
      setImages([null, null, null, null]);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add product. Please try again."
      );
      console.error("Add product error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all fields?")) {
      setBrand("");
      setDescription("");
      setPrice("");
      setCategory("Men");
      setSubCategory("Topwear");
      setBestSeller(false);
      setSizes([]);
      setImages([null, null, null, null]);
    }
  };

  return (
    <div className="min-h-screen  p-4 md:p-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Add New Product
            </h1>
          </div>
          <p className="text-gray-600">
            Add new products to your e-commerce store. Fill in all required
            details below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Images Upload */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Product Images
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Upload up to 4 images. First image will be displayed as main.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <label
                      htmlFor={`image${index}`}
                      className={`block cursor-pointer border-2 border-dashed rounded-xl overflow-hidden transition-all duration-200 ${
                        img
                          ? "border-gray-300"
                          : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                    >
                      <div className="aspect-square flex items-center justify-center">
                        {img ? (
                          <>
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4">
                            <div className="p-3 bg-gray-100 rounded-full mb-2">
                              <Upload className="w-6 h-6 text-gray-400" />
                            </div>
                            <span className="text-xs text-gray-500 font-medium">
                              Image {index + 1}
                            </span>
                          </div>
                        )}
                      </div>
                    </label>

                    {img && (
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors z-10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    <input
                      id={`image${index}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Type className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h2>
              </div>

              <div className="space-y-6">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g., Nike, Levi's, Zara"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-12"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                    />
                    <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="Describe your product in detail..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-12 resize-none min-h-[120px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    <AlignLeft className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {description.length}/500 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing & Categories */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Grid className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Pricing & Categories
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="499"
                      min="1"
                      step="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-12"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-12 appearance-none bg-white"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setSubCategory(subCategories[e.target.value][0]);
                      }}
                    >
                      {["Men", "Women", "Kids"].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <Layers className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Subcategory */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory *
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-12 appearance-none bg-white"
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                    >
                      {subCategories[category]?.map((subCat) => (
                        <option key={subCat} value={subCat}>
                          {subCat}
                        </option>
                      ))}
                    </select>
                    <Grid className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sizes Selection */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Available Sizes *
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={addAllSizes}
                    className="px-3 py-1.5 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={clearSizes}
                    className="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-3 rounded-xl border-2 transition-all duration-200 font-medium ${
                      sizes.includes(size)
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {sizes.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm font-medium text-blue-800">
                    Selected sizes: {sizes.sort().join(", ")}
                  </p>
                </div>
              )}
            </div>

            {/* Best Seller & Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        bestSeller ? "bg-yellow-100" : "bg-gray-100"
                      }`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          bestSeller
                            ? "text-yellow-600 fill-yellow-600"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Mark as Best Seller
                      </h3>
                      <p className="text-sm text-gray-500">
                        Featured products get more visibility
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setBestSeller(!bestSeller)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      bestSeller ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        bestSeller ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {bestSeller ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Product
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-3 px-6 rounded-xl font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Reset Form
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Preview & Side Cards */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Preview Card - No longer sticky to prevent overlap */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Live Preview
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Preview Image */}
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    {images[0] ? (
                      <img
                        src={URL.createObjectURL(images[0])}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Upload className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  {/* Preview Details */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 truncate">
                        {brand || "Product Name"}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {description || "Product description will appear here"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          {price ? `₹${price}` : "₹0"}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          category === "Men"
                            ? "bg-blue-100 text-blue-800"
                            : category === "Women"
                            ? "bg-pink-100 text-pink-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {category || "Category"}
                      </span>
                    </div>

                    {/* Subcategory */}
                    {subCategory && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">Type:</span>
                        <span>{subCategory}</span>
                      </div>
                    )}

                    {/* Sizes Preview */}
                    {sizes.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Available Sizes:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {sizes.slice(0, 5).map((size) => (
                            <span
                              key={size}
                              className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                            >
                              {size}
                            </span>
                          ))}
                          {sizes.length > 5 && (
                            <span className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                              +{sizes.length - 5}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Best Seller Badge */}
                    {bestSeller && (
                      <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">
                          ⭐ Featured Best Seller
                        </span>
                      </div>
                    )}

                    {/* Additional Images */}
                    {images.filter((img) => img !== null).length > 1 && (
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Additional Images (
                          {images.filter((img) => img !== null).length - 1})
                        </p>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {images
                            .slice(1)
                            .filter((img) => img !== null)
                            .map((img, idx) => (
                              <div
                                key={idx}
                                className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
                              >
                                <img
                                  src={URL.createObjectURL(img)}
                                  alt={`Additional ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tips Card - Now properly spaced */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Quick Tips</h3>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Use high-quality images (min. 800x800px)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Write clear, detailed descriptions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Select all relevant sizes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Mark best sellers for better visibility
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Price competitively based on market
                    </span>
                  </li>
                </ul>
              </div>

              {/* Progress Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Form Completion
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      label: "Product Images",
                      completed: images.some((img) => img !== null),
                      required: true,
                    },
                    {
                      label: "Brand Name",
                      completed: !!brand.trim(),
                      required: true,
                    },
                    {
                      label: "Description",
                      completed: !!description.trim(),
                      required: true,
                    },
                    {
                      label: "Price",
                      completed: !!price && Number(price) > 0,
                      required: true,
                    },
                    {
                      label: "Sizes",
                      completed: sizes.length > 0,
                      required: true,
                    },
                    {
                      label: "Categories",
                      completed: !!category && !!subCategory,
                      required: true,
                    },
                    {
                      label: "Best Seller",
                      completed: true, // Optional field
                      required: false,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">
                          {item.label}
                        </span>
                        {item.required && (
                          <span className="text-xs text-red-500">*</span>
                        )}
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          item.completed ? "bg-green-100" : "bg-gray-100"
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Summary */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Completion
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      {Math.round(
                        ([
                          images.some((img) => img !== null),
                          !!brand.trim(),
                          !!description.trim(),
                          !!price && Number(price) > 0,
                          sizes.length > 0,
                          !!category && !!subCategory,
                        ].filter(Boolean).length /
                          6) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ([
                            images.some((img) => img !== null),
                            !!brand.trim(),
                            !!description.trim(),
                            !!price && Number(price) > 0,
                            sizes.length > 0,
                            !!category && !!subCategory,
                          ].filter(Boolean).length /
                            6) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
