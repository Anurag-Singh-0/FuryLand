import { NavLink } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import {
  SpaceDashboard as DashboardIcon,
  Assignment as OrdersIcon,
  Category as ProductsIcon,
  Inventory2 as InventoryIcon,
} from "@mui/icons-material";

function Navbar() {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
    { name: "Add Item", path: "/add", icon: ProductsIcon },
    { name: "List Items", path: "/list", icon: InventoryIcon },
    { name: "Orders", path: "/orders", icon: OrdersIcon },
  ];

  return (
    <div>
      {/* Left section */}
      <div className="bg-gray-100 flex flex-col py-10 px-5 w-[18%] gap-10">
        <img
          src="../../public/Admin-logo.png"
          alt="admin-logo"
          className="w-30 sm:w-50"
        />

        <nav className="flex flex-col gap-5">
          <span className="text-gray-500 text-sm">Menu</span>
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#003DF6] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={` ${isActive ? "text-white" : "text-gray-500"}`}
                  />
                  <span>{name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button>Logout</button>
        <MenuOpenIcon />
      </div>

      {/* Right section */}
      <div></div>
    </div>
  );
}

export default Navbar;
