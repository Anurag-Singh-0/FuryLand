import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Material Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Navbar({ setToken }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Customers",
      path: "/customers",
    },
    {
      name: "Add Product",
      path: "/add",
    },
    {
      name: "Orders",
      path: "/orders",
    },

    {
      name: "List Products",
      path: "/list",
    },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setToken("");
      localStorage.removeItem("token");
    }
  };

  const isItemActive = (path) => {
    if (path === "/dashboard" && location.pathname === "/") return true;
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section: Logo */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 mr-3 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <CloseIcon className="w-6 h-6 text-gray-700" />
                ) : (
                  <MenuIcon className="w-6 h-6 text-gray-700" />
                )}
              </button>

              {/* Logo */}
              <div className="flex flex-col">
                <span className="text-2xl font-bold">Furyland</span>
                <span className="text-xs text-gray-500">Admin Panel</span>
              </div>
            </div>

            {/* Desktop Navigation Links - Center */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive || isItemActive(item.path)
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Right Section: Profile & Logout */}
            <div className="flex items-center gap-4">
              {/* Desktop Profile Dropdown */}
              {/* <div className="hidden md:block relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <PersonIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                  <ArrowDropDownIcon className="w-5 h-5 text-gray-400" />
                </button>

                
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500 mt-1">admin@furyland.com</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        // Navigate to profile page
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        // Navigate to settings
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Settings
                    </button>
                    <div className="border-t border-gray-200 mt-1 pt-1">
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <LogoutIcon className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div> */}

              {/* Desktop Logout Button */}
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogoutIcon className="w-4 h-4" />
                Logout
              </button>

              {/* Mobile Logout Button */}
              <button
                onClick={handleLogout}
                className="md:hidden flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogoutIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Sidebar */}
        <div
          className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Furyland</span>
                <span className="text-xs text-gray-500">Admin Panel</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <CloseIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Mobile User Profile */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <PersonIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@furyland.com</p>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Items */}
          <div className="p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const active = isItemActive(item.path);
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Logout Button */}
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              <LogoutIcon className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
