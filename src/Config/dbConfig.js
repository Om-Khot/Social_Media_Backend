import mongoose from "mongoose";
import { MONGO_URL } from "../Config/serverConfig.js";
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB is connected successfully");
    } catch (error) {
        console.log("Fail to connect to MongoDB", error);
    }
};

export default connectDB;