import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Advanced_Redux");
    console.log("Connected to Database successfully");
  } catch (error) {
    console.log("Error from connect to DB", error);
  }
};

export default connectDB;
