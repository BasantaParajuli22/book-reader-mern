//@ts-check
import bcrypt from "bcrypt";
import User from "../models/User.js";

// Checks if books collection is empty; if yes, seeds data
export default async function checkAndInitializeAdmin() {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      await intializeAdmin();
    } else {
      console.log(" Database already has users. Skipping intializing admin.");
    }
  } catch (error) {
    console.error("Error while checking and intializing admin:", error);
  }
}

export async function intializeAdmin() {
  try {
    const password = "admin@example.com";
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      username: 'superadmin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });
    await admin.save();
  } catch (error) {
    console.error("Error while intializing admin:", error);
  }
}
    

