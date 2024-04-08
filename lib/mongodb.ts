import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        if (!process.env.DATABASE_URI) {
            throw new Error("Database URI not defined");
        }
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
};

export default connectMongoDB;
