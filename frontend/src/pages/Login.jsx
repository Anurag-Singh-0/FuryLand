import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Person4Icon from "@mui/icons-material/Person4";
import Button from "@mui/material/Button";

function Login() {
  const [currentState, setCurrentState] = useState("Sign up");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center border-t border-gray-300 py-20">
      <div className="relative bg-transparent border border-gray-400 rounded-xl w-full max-w-sm p-8 text-black">
        {/* Profile Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-200 rounded-full p-4 border border-gray-500">
          <Person4Icon fontSize="large" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-8">
          {currentState}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          {currentState === "Login" ? (
            ""
          ) : (
            <input
              type="text"
              placeholder="Username"
              required
              className="bg-transparent border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-black"
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            required
            className="bg-transparent border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-black"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="bg-transparent border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:border-black pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-800 hover:text-black"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>

          {/* Links */}
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <button
              type="button"
              className="text-black cursor-pointer hover:text-gray-700"
            >
              Forget Password
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentState(
                  currentState === "Sign up" ? "Login" : "Sign up"
                )
              }
              className="text-black hover:text-gray-700 cursor-pointer"
            >
              {currentState === "Sign up" ? "Login Here" : "Create Account"}
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="!bg-black !text-white !mt-10 cursor-pointer"
          >
            {currentState}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
