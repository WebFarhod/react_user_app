import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_DB = process.env.MONGO_DB;

  if (!MONGO_DB) {
    throw new Error("MONGO_DB environment variable is not set");
  }
  try {
    await mongoose.connect(MONGO_DB);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
