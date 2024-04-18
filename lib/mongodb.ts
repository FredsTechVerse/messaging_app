"use server"
import mongoose from "mongoose";
const connectMongoDB = async () => {
    try {
        // if (!process.env.DATABASE_URI) {
        //     throw new Error("Database URI not defined");
        // }
        // await mongoose.connect(process.env.DATABASE_URI);
        await mongoose.connect("mongodb+srv://Elimu_Hub:PccapqznX0v7ai4R@sideprojectscluster.jtnn0yr.mongodb.net/Messaging_App?retryWrites=true&w=majority");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
};

export default connectMongoDB;
