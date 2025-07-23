import { images } from "../Images";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

function Navbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img
        src={images.logoDark}
        className="w-65 h-10 object-cover"
        alt="logo"
      />

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

      <div className="flex items-center gap-6">
        <SearchIcon sx={{ fontSize: 30 }} className="cursor-pointer" />
        <div className="group relative">
          <PersonOutlinedIcon sx={{ fontSize: 30 }} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
