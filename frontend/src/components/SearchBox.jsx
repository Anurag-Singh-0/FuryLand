import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import SearchIcon from "@mui/icons-material/Search";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

function SearchBox() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <AnimatePresence>
      <motion.div
        key="searchbox"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-center items-center mb-5 gap-5">
          <div
            className={`rounded-full w-full md:w-100 lg:w-150 flex p-2 gap-3 outline outline-black/20`}
          >
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none px-3"
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon className="text-gray-400" />
          </div>

          <div className="bg-black text-white rounded-full cursor-pointer">
            <CloseRoundedIcon onClick={() => setShowSearch(false)} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  ) : null;
}

export default SearchBox;
