import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true, uppercase: true },
        surname: { type: String, required: true, uppercase: true },
        contact: { type: String, required: true, unique: true },
        amount: { type: Number, required: true, },
        paymentInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
