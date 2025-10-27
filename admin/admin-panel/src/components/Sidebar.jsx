import { NavLink } from "react-router-dom";
import {
  SpaceDashboard as DashboardIcon,
  Assignment as OrdersIcon,
  Category as ProductsIcon,
  Inventory2 as InventoryIcon,
} from "@mui/icons-material";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
  { name: "Add Item", path: "/add", icon: ProductsIcon },
  { name: "List Items", path: "/list", icon: InventoryIcon },
  { name: "Orders", path: "/orders", icon: OrdersIcon },
];

function Sidebar() {
  return (
    <aside className="bg-white w-[15%] min-h-screen border-r border-gray-200 py-6 px-4">
      <h2 className="text-gray-500 text-sm mb-2 px-2">
        Menu
      </h2>

      <nav className="flex flex-col gap-4">
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
                  className={`text-xl ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                />
                <span>{name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
