import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
    {
        message: { type: String, required: true },
        totalCount: { type: Number, required: true },
        successful: { type: Number, required: true },
        unsuccessful: { type: Number, required: true },
        unsuccessfulRecipients: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

const Message =
    mongoose.models?.Message || mongoose.model("Message", MessageSchema);

export default Message;
