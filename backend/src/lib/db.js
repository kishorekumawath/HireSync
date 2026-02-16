import mongoose from "mongoose";
import ENV from "./env.js";

const connectDB = async () => {
    try {
        if (!ENV.DB_URL) {
            throw new Error("DB_URL is not defined");
        }
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("MongoDB connected", conn.connection.host);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // 0 means success and 1 means failure 
    }
}

export default connectDB;