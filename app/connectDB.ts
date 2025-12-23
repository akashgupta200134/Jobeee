import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "❌ Please define the MONGODB_URL environment variable in .env.local"
  );
}

/**
 * Global cache interface
 * Prevents multiple DB connections during hot reloads
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Extend global type safely
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

/**
 * Initialize global cache
 */
const cached: MongooseCache =
  global.mongoose || (global.mongoose = { conn: null, promise: null });

/**
 * Connect to MongoDB
 */
export async function connectDB(): Promise<typeof mongoose> {
  // ✅ Reuse existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // ✅ Create new connection if none exists
  if (!cached.promise) {
    const options = {
      dbName: "HireNova",     // 🔹 your DB name
      bufferCommands: false, // 🔥 prevents buffering timeout
    };

    cached.promise = mongoose
      .connect(MONGODB_URL, options)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected");
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB connection failed", error);
    throw error;
  }

  return cached.conn;
}
