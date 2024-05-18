import mongoose, { Schema } from "mongoose";
const CaretakerSchema = new Schema(
    {
        fName: { type: String, required: true, uppercase: true },
        surname: { type: String, required: true, uppercase: true },
        idNo: { type: String, required: true },
        contact: { type: String, required: true, unique: true },
        isContactVerified: { type: Boolean, default: "false" },
        contactVerificationCode: { type: String },
        role: {
            type: String,
            required: true,
            uppercase: true,
            default: "EM-202",
        },
        password: { type: String, required: true },
        status: { type: String, required: true, enum: ["active", "inactive"], default: "active" },
        resetToken: { type: String },
    },
    {
        timestamps: true,
    }
);

const CareTaker = mongoose.models?.CareTaker || mongoose.model("CareTaker", CaretakerSchema);

export default CareTaker;
