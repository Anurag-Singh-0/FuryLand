import { images } from "../Images";
import { Link, NavLink } from "react-router-dom";

// Meterial Icons
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

//Hook
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//Framer Motion
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/collection`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="flex items-center justify-between py-5 font-medium"
    >
      {/* Logo */}
      <Link to="/">
        <motion.img src={images.logoDark} className="logo" alt="logo" />
      </Link>

      {/* Nav Links */}
      <ul className="hidden sm:flex gap-5 text-sm uppercase">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 group transition-all duration-300 ${
                isActive ? "text-black" : "text-gray-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <p className="uppercase">{item.name}</p>
                <span
                  className={`h-[2px] bg-black transition-all duration-300 ${
                    isActive ? "w-1/1" : "w-0"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </ul>

      {/* Action Buttons */}
      <div className="flex items-center gap-4"> 
        <SearchIcon
          sx={{ fontSize: 25 }}
          className="cursor-pointer text-black/70"
          onClick={() => {
            setShowSearch(true);
            handleSearch();
          }}
        />

        <div className="group relative">
          <Link to="/login">
            <PersonOutlinedIcon
              sx={{ fontSize: 30 }}
              className="text-black/70 cursor-pointer"
            />
          </Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-100">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white outline outline-black/30 text-slate-600 rounded-sm">
              <p className="cursor-pointer hover:text-black duration-200">
                My Profile
              </p>
              <p
                onClick={() => navigate("/orders")}
                className="cursor-pointer hover:text-black duration-200"
              >
                Orders
              </p>
              <p className="cursor-pointer hover:text-black duration-200">
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Cart icon */}
        <Link to="/cart" className="relative">
          <LocalMallOutlinedIcon className="text-black/70" />
          <p className="aspect-square text-[8px] bg-black text-white rounded-full text-center w-4 leading-4 absolute right-[-5px] bottom-[-5px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger Menu */}
        <div className="sm:hidden" onClick={() => setOpen(true)}>
          <MenuIcon
            className="cursor-pointer text-black/70"
            sx={{ fontSize: 30 }}
          />
        </div>

        {/* Sidebar menu for small screens */}
        <div
          className={`bg-white z-[999] absolute top-0 right-0 bottom-0 overflow-hidden transition-all ${
            open ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-800">
            <div
              className="flex items-center gap-1 p-3 text-black"
              onClick={() => setOpen(false)}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
              <span>Back</span>
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
              >
                <p className="uppercase border-b-2 border-black/20 py-3 pl-6">
                  {item.name}
                </p>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
