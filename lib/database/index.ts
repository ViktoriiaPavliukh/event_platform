import mongoose from "mongoose";
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  const dbName = process.env.NODE_ENV === "test" ? "Test-Event" : "EventSpot";

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: dbName,
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
