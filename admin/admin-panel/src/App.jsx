import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import { AddProduct, Dashboard, ListProduct, Orders } from "./index.js";
import { useState } from "react";
import Login from "./components/Login.jsx";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState("");

  return (
    <div className="flex min-h-screen">
      {token === "" ? (
        <Login />
      ) : (
        <>
          <Navbar />

          <div className="flex-1 bg-gray-50 p-6 md:ml-0 mt-16 md:mt-0">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/list" element={<ListProduct />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
