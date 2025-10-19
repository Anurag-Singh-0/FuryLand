import userModel from "../models/user.model.js";
import validator from "validator";

// Route for user Login
const loginUser = async (req, res) => {};

// Route for user Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check user already exist or not
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.json({ success: false, message: "user already exist!" });
    }

    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
  } catch (error) {
    console.log(`Register Error: ${error}`);
  }
};

// Route for admin login
const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
