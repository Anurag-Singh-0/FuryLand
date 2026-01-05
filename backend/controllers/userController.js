import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // better to include expiry
};

// Route for user Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    // 2️⃣ Validate inputs
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format!" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters and strong!",
      });
    }

    // 3️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // 5️⃣ Create token
    const token = createToken(user._id);

    // 6️⃣ Respond
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(`Register Error: ${error}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Route for user Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(`Login Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
  
      const token = jwt.sign(
        {
          email: process.env.ADMIN_EMAIL,
          role: "admin",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(`Login Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { loginUser, registerUser, adminLogin };
