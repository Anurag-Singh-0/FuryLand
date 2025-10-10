import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [currentState, setCurrentState] = useState("Sign up");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="border-t border-gray-300 px-12 py-12">
      <div className="">
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
