import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoute from "./routes/userRoutes.js";

// App config
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/user", userRoute);

app.get("/api/", (req, res) => {
  res.send("API endpoint is working good!");
});

app.listen(port, () => {
  console.log(`Server is listing on PORT : ${port}`);
});
