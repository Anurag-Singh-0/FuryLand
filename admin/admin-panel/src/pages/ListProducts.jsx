import React, { useEffect, useState } from "react";
import { backendURL } from "../App.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Eye,
  Edit2,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Star,
  Calendar,
} from "lucide-react";

function ListProducts() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subCategoryFilter, setSubCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendURL + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
        setFilteredList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let results = list;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      results = results.filter(
        (product) =>
          product.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply subcategory filter
    if (subCategoryFilter !== "all") {
      results = results.filter(
        (product) =>
          product.subCategory?.toLowerCase() === subCategoryFilter.toLowerCase()
      );
    }

    setFilteredList(results);
  }, [searchTerm, categoryFilter, subCategoryFilter, list]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `${backendURL}/api/product/delete/${id}`
        );
        if (response.data.success) {
          toast.success("Product deleted successfully");
          fetchProducts();
        }
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(filteredList.map((product) => product._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      );
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // Extract unique categories and subcategories from products
  const getUniqueValues = (key) => {
    const values = list.map((product) => product[key]).filter(Boolean);
    return ["all", ...Array.from(new Set(values))];
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              All Products
            </h1>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
              {filteredList.length} products found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <div className="text-sm md:text-base text-gray-500">
              Total Products
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
              {list.length}
            </div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <div className="text-sm md:text-base text-gray-500">
              Men's Products
            </div>
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mt-1">
              {list.filter((p) => p.category === "Men").length}
            </div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <div className="text-sm md:text-base text-gray-500">
              Women's Products
            </div>
            <div className="text-2xl md:text-3xl font-bold text-pink-600 mt-1">
              {list.filter((p) => p.category === "Women").length}
            </div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <div className="text-sm md:text-base text-gray-500">
              Bestsellers
            </div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-600 mt-1">
              {list.filter((p) => p.bestseller === "true").length}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-4 md:mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <select
                className="w-full pl-9 md:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm md:text-base"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {getUniqueValues("category")
                  .filter((cat) => cat !== "all")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>

            {/* SubCategory Filter */}
            <select
              className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              value={subCategoryFilter}
              onChange={(e) => setSubCategoryFilter(e.target.value)}
            >
              <option value="all">All Subcategories</option>
              {getUniqueValues("subCategory")
                .filter((subCat) => subCat !== "all")
                .map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
            </select>

            {/* Bestseller Filter */}
            <select className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base">
              <option value="all">All Products</option>
              <option value="true">Bestsellers Only</option>
              <option value="false">Regular Products</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table Header with Selection */}
          <div className="px-4 md:px-6 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                checked={
                  selectedProducts.length === filteredList.length &&
                  filteredList.length > 0
                }
                onChange={handleSelectAll}
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                {selectedProducts.length} selected
              </span>
            </div>
            {selectedProducts.length > 0 && (
              <button
                className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center text-xs md:text-sm"
                onClick={() => {
                  if (
                    window.confirm(
                      `Delete ${selectedProducts.length} selected products?`
                    )
                  ) {
                    // Handle bulk delete
                  }
                }}
              >
                <Trash2 className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                Delete Selected
              </button>
            )}
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sizes
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-lg font-medium">No products found</p>
                        <p className="mt-2 text-gray-400">
                          Try adjusting your search or filter
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredList.map((product) => (
                    <tr
                      key={product._id || product.date}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4 mr-3"
                            checked={selectedProducts.includes(product._id)}
                            onChange={() => handleSelectProduct(product._id)}
                          />
                          <div className="flex items-start">
                            <div className="h-12 w-12 md:h-16 md:w-16 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden mr-3 md:mr-4">
                              {product.image && product.image[0] ? (
                                <img
                                  src={product.image[0]}
                                  alt={product.brand}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/150?text=No+Image";
                                  }}
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                                  <span className="text-xs text-gray-400">
                                    No Image
                                  </span>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="text-sm md:text-base font-medium text-gray-900">
                                {product.brand || "Unbranded"}
                              </div>
                              <div className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2 max-w-xs">
                                {product.description || "No description"}
                              </div>
                              <div className="flex items-center mt-1 md:mt-2">
                                <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400 mr-1" />
                                <span className="text-xs text-gray-500">
                                  {formatDate(product.date)}
                                </span>
                                {product.bestseller === "true" && (
                                  <span className="ml-2 flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                    <Star
                                      className="w-3 h-3 mr-1"
                                      fill="currentColor"
                                    />
                                    Bestseller
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="space-y-1">
                          <span
                            className={`inline-flex px-2 md:px-3 py-1 text-xs font-semibold rounded-full ${
                              product.category === "Men"
                                ? "bg-blue-100 text-blue-800"
                                : product.category === "Women"
                                ? "bg-pink-100 text-pink-800"
                                : product.category === "Kids"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.category || "Uncategorized"}
                          </span>
                          {product.subCategory && (
                            <div className="text-xs text-gray-600">
                              {product.subCategory}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="text-base md:text-lg font-bold text-gray-900">
                          ₹{product.price?.toLocaleString() || "0"}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {product.sizes && product.sizes.length > 0 ? (
                            product.sizes.map((size, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded border border-gray-300"
                              >
                                {size}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-gray-500">
                              No sizes
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex px-2 md:px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                          {product.image && product.image.length > 1 && (
                            <span className="text-xs text-blue-600">
                              +{product.image.length - 1} more images
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <button
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition"
                            title="View"
                            onClick={() => {
                              // Handle view action
                              console.log("View product:", product._id);
                            }}
                          >
                            <Eye className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded transition"
                            title="Edit"
                            onClick={() => {
                              // Handle edit action
                              console.log("Edit product:", product._id);
                            }}
                          >
                            <Edit2 className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition"
                            title="Delete"
                            onClick={() => handleDelete(product._id)}
                          >
                            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredList.length > 0 && (
            <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{filteredList.length}</span> of{" "}
                  <span className="font-medium">{list.length}</span> products
                </div>
                <div className="flex space-x-1 md:space-x-2">
                  <button className="px-2 md:px-3 py-1 border border-gray-300 rounded text-xs md:text-sm hover:bg-gray-50 transition">
                    Previous
                  </button>
                  <button className="px-2 md:px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded text-xs md:text-sm hover:bg-blue-700 transition">
                    1
                  </button>
                  <button className="px-2 md:px-3 py-1 border border-gray-300 rounded text-xs md:text-sm hover:bg-gray-50 transition">
                    2
                  </button>
                  <button className="px-2 md:px-3 py-1 border border-gray-300 rounded text-xs md:text-sm hover:bg-gray-50 transition">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListProducts;
