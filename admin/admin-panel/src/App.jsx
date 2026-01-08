import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import {
  AddProduct,
  Dashboard,
  ListProduct,
  Orders,
  Customers,
} from "./index.js";
import { useEffect, useState } from "react";
import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const storeToken = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  const [token, setToken] = useState(storeToken);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />

          {/* Main content area - Adjusted for taller navbar (80px navbar + 48px breadcrumb = 128px) */}
          <main className=" min-h-screen">
            <div className="px-4 md:px-6 lg:px-8 py-6">
              <Routes>
                <Route path="/" element={<Dashboard token={token} />} />
                <Route
                  path="/dashboard"
                  element={<Dashboard token={token} />}
                />
                <Route path="/add" element={<AddProduct token={token} />} />
                <Route path="/list" element={<ListProduct token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route
                  path="/customers"
                  element={<Customers token={token} />}
                />
                <Route path="/products" element={<Dashboard token={token} />} />
              </Routes>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
