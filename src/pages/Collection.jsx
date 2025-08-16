import { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function Collection() {
  const { Products, search } = useContext(ShopContext);

  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectType, setSelectType] = useState([]);
  const [sortby, setSortBy] = useState("Relevant");

  const handleCategoryChange = (e) => {
    const { id, checked } = e.target;
    setSelectCategory((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleTypeChange = (e) => {
    const { id, checked } = e.target;
    setSelectType((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const getFilteredProducts = useMemo(() => {
    let filtered = [...Products];

    if (selectCategory.length > 0) {
      filtered = filtered.filter((item) =>
        selectCategory.includes(item.category)
      );
    }

    if (selectType.length > 0) {
      filtered = filtered.filter((item) =>
        selectType.includes(item.subCategory)
      );
    }

    // 🔥 Search filter
    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter((item) =>
        item.brand.toLowerCase().includes(lowerSearch)
      );
    }

    if (sortby === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortby === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [Products, selectCategory, selectType, sortby, search]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 pt-10 border-black/10 border-t mb-30">
      {/* Left Section */}
      <div className="hidden sm:block w-full sm:w-60 md:w-50 select-none">
        <p className="uppercase text-lg font-semibold mb-3">Filters</p>
        <div className="outline-black/20 outline lg:p-3 p-2 rounded-lg">
          <p className="uppercase text-sm font-medium mb-3">Categories</p>
          <div className="flex flex-col gap-2 px-5 text-sm text-gray-700">
            <label htmlFor="men" className="cursor-pointer">
              <input type="checkbox" id="men" onChange={handleCategoryChange} />{" "}
              Men
            </label>
            <label htmlFor="women" className="cursor-pointer">
              <input
                type="checkbox"
                id="women"
                onChange={handleCategoryChange}
              />{" "}
              Women
            </label>
            <label htmlFor="kids" className="cursor-pointer">
              <input
                type="checkbox"
                id="kids"
                onChange={handleCategoryChange}
              />{" "}
              Kids
            </label>
          </div>
        </div>
        <div className="outline-black/20 outline p-3 mt-5 rounded-lg">
          <p className="uppercase text-sm font-medium mb-3">Type</p>
          <div className="flex flex-col gap-2 px-5 text-sm text-gray-700">
            <label htmlFor="topwear" className="cursor-pointer">
              <input type="checkbox" id="topwear" onChange={handleTypeChange} />{" "}
              Topwear
            </label>
            <label htmlFor="bottomwear" className="cursor-pointer">
              <input
                type="checkbox"
                id="bottomwear"
                onChange={handleTypeChange}
              />{" "}
              Bottomwear
            </label>
            <label htmlFor="winterwear" className="cursor-pointer">
              <input
                type="checkbox"
                id="winterwear"
                onChange={handleTypeChange}
              />{" "}
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="lg:text-2xl font-semibold uppercase text-gray-500">
            All <span className="text-black">Collections</span>
          </p>
          <select
            className="border-gray-300 border py-1 px-2 outline-none text-sm rounded-full hidden sm:block"
            onChange={handleSortChange}
            value={sortby}
          >
            <option value="Relevant">Sort by: Relevant</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-5">
          {getFilteredProducts.map((item, idx) => (
            <ProductItem
              id={item.id}
              key={idx} // Use item.id for stable keys
              image={item.image}
              name={item.brand}
              price={item.price}
            />
          ))}
        </div>
      </div>

      {/* Bottom mobile filter/sort bar */}
      <div className="fixed bottom-0 left-0 w-full sm:hidden bg-white/90 border-t border-black/50 z-50 flex justify-around py-2 backdrop-blur-[40px] rounded-2xl">
        <button
          onClick={() => setShowMobileSort(true)}
          className="flex items-center gap-1 text-sm font-medium"
        >
          <FilterListIcon />
          Sort
        </button>
        <span className="border"></span>
        <button
          onClick={() => setShowMobileFilter(true)}
          className="flex items-center gap-1 text-sm font-medium"
        >
          <FilterAltOutlinedIcon />
          Filter
        </button>
      </div>

      {/* Filter Drawer */}
      <div
        className={`fixed w-full left-0 bottom-0 z-50 sm:hidden outline rounded-t-2xl overflow-hidden transition-transform duration-300 ease-in-out ${
          showMobileFilter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-white h-[50vh] p-4">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-lg">Filter</p>
            <button
              onClick={() => setShowMobileFilter(false)}
              className="bg-black text-white rounded-full p-1"
            >
              <CloseRoundedIcon />
            </button>
          </div>
          <div className="flex justify-between px-5">
            <div className="mb-5">
              <p className="font-semibold uppercase text-sm mb-2">Categories</p>
              <div className="flex flex-col gap-2 text-sm">
                {["men", "women", "kids"].map((cate, idx) => (
                  <label key={cate}>
                    <input
                      type="checkbox"
                      onChange={handleCategoryChange}
                      id={cate}
                      checked={selectCategory.includes(cate)}
                    />{" "}
                    {cate.charAt(0).toUpperCase() + cate.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold uppercase text-sm mb-2">Type</p>
              <div className="flex flex-col gap-2 text-sm">
                {["topwear", "bottomwear", "winterwear"].map((type) => (
                  <label key={type} className="cursor-pointer">
                    <input
                      type="checkbox"
                      id={type}
                      checked={selectType.includes(type)}
                      onChange={handleTypeChange}
                    />{" "}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Drawer */}
      <div
        className={`fixed w-full left-0 bottom-0 z-50 sm:hidden outline rounded-t-2xl overflow-hidden transition-transform duration-300 ease-in-out ${
          showMobileSort ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-white h-[40vh] p-4">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-lg">Sort</p>
            <button
              onClick={() => setShowMobileSort(false)}
              className="bg-black text-white rounded-full p-1"
            >
              <CloseRoundedIcon />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {["Relevant", "Low-high", "High-low"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="sort"
                  value={option}
                  checked={sortby === option}
                  onChange={handleSortChange}
                />{" "}
                {option === "Relevant"
                  ? "Relevant"
                  : option.replace("-", " to ")}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
