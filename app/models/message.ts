import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
    {
        message: { type: String },
        totalCount: { type: Number, required: true },
        successful: { type: Number, required: true },
        unsuccessful: { type: Number, required: true },
        unsuccessfulRecipients: [{ type: String }],
        successfulRecipients: [{ type: String, required: true }],
        category: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const Message =
    mongoose.models?.Message || mongoose.model("Message", MessageSchema);

export default Message;
