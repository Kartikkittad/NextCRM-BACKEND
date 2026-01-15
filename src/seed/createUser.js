import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import connectDB from "../utils/connectDb.js";

dotenv.config();

const seedUser = async () => {
  try {
    await connectDB();

    const userExists = await User.findOne({
      email: "sales@smartcrm.com",
    });

    if (userExists) {
      console.log("User already exists");
      process.exit();
    }

    const user = await User.create({
      name: "Sales User",
      email: "sales@smartcrm.com",
      password: "Sales@123", // will be hashed automatically
      role: "SALES",
    });

    console.log("User created:", {
      email: user.email,
      role: user.role,
    });

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUser();
