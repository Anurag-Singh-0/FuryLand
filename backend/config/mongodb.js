import mongoose from "mongoose";

const localMongoDbURL = "mongodb://127.0.0.1:27017/furyland";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URL);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
  }
};

export default connectDB;
