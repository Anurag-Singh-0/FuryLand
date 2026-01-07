import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

import {
  SpaceDashboard as DashboardIcon,
  Assignment as OrdersIcon,
  Category as ProductsIcon,
  Inventory2 as InventoryIcon,
} from "@mui/icons-material";

function Navbar({ setToken }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
    { name: "Add Item", path: "/add", icon: ProductsIcon },
    { name: "List Items", path: "/list", icon: InventoryIcon },
    { name: "Orders", path: "/orders", icon: OrdersIcon },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md md:hidden w-full fixed top-0 left-0 z-50">
        <img
          src="/Admin-logo.png"
          alt="Admin Logo"
          className="w-28 object-contain"
        />
        <MenuOpenIcon
          onClick={() => setIsOpen(true)}
          className="text-3xl text-gray-700 cursor-pointer"
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-white shadow-lg flex flex-col transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        w-64`}
      >
        {/* Close Button (Mobile) */}
        <div className="flex justify-end md:hidden p-4">
          <CloseIcon
            onClick={() => setIsOpen(false)}
            className="text-2xl text-gray-600 cursor-pointer"
          />
        </div>

        <div className="flex flex-col px-6 py-6 gap-10 overflow-y-auto">
          {/* Logo */}
          <div className="hidden md:block">
            <img
              src="/Admin-logo.png"
              alt="Admin Logo"
              className="w-36 mx-auto object-contain"
            />
          </div>

          {/* Navigation */}
          <div>
            <span className="text-gray-400 text-xs uppercase tracking-wider mb-4 block">
              Menu
            </span>

            <div className="flex flex-col gap-2">
              {navItems.map(({ name, path, icon: Icon }) => (
                <NavLink
                  key={name}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-md font-medium text-sm transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`
                  }
                  onClick={() => setIsOpen(false)} // close menu on mobile
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`text-lg ${
                          isActive ? "text-white" : "text-gray-500"
                        }`}
                      />
                      <span>{name}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-100">
          <Button
            fullWidth
            variant="contained"
            className="!rounded-md !bg-blue-600 !text-white !capitalize"
            onClick={() => setToken("")}
          >
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

export default Navbar;