import { NavLink } from "react-router-dom";

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
      <div>
        <img
          src="../../public/Admin-logo.png"
          alt="admin-logo"
          className="w-30 sm:w-50"
        />

        <nav>
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink key={name} to={path}>
              {
                <>
                  <Icon />
                  <span>{name}</span>
                </>
              }
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right section */}
      <div></div>
    </div>
  );
}

export default Navbar;
