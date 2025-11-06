import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import Button from "@mui/material/Button";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center border-t border-gray-300 py-20 w-full bg-gray-200">
      <div className="relative bg-transparent border border-gray-400 rounded-xl w-full max-w-sm p-8 text-black">
        {/* Profile Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-200 rounded-full p-4 border border-gray-500">
          <FingerprintIcon fontSize="large" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-8">Admin Panel</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-black"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:border-black pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-800 hover:text-black"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="!bg-[#155DFC] !text-white !mt-5 cursor-pointer"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
