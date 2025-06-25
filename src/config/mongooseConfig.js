import mongoose from "mongoose";
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI);
export async function connectToMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop app if DB fails
  }
}

export async function disconnectMongo() {
  try {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  } catch (err) {
    console.error("❌ Error disconnecting MongoDB:", err.message);
  }
}
