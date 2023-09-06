// db.ts
import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODBURL || "";

// console.log("first", MONGODB_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
    //   useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
