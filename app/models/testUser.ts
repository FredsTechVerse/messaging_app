import mongoose, { Schema } from "mongoose";

const TestUserSchema = new Schema(
    {
        firstName: { type: String, required: true, uppercase: true },
        surname: { type: String, required: true, uppercase: true },
        contact: { type: String, required: true, unique: true },
        amount: { type: Number, required: true, },
    },
    {
        timestamps: true,
    }
);

const TestUser = mongoose.models?.TestUser || mongoose.model("TestUser", TestUserSchema);

export default TestUser;
