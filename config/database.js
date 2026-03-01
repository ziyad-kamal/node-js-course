import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully! ✓");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

mongoose.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});

export default connectDB;
