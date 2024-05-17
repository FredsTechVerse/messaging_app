import mongoose, { Schema } from "mongoose";

const EmailSchema = new Schema(
    {
        from: { type: String, required: true, lowercase: true },
        to: [{ type: String, required: true, lowercase: true }],
        subject: { type: String, required: true },
        text: { type: String, required: true },
        status: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Email = mongoose.models?.Email || mongoose.model("Email", EmailSchema);

export default Email;
