import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema(
    {
        date: { type: Date, required: true },
        firstName: { type: String, required: true, uppercase: true },
        modeOfPayment: { type: String, required: true },
        surname: { type: String, required: true, uppercase: true },
        contact: { type: String, required: true },
        amount: { type: Number, required: true },
        status: { type: String, required: true, enum: ['disbursed', 'undisbursed'], default: "undisbursed" },
        referenceID: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.models?.Payment || mongoose.model("Payment", PaymentSchema);

export default Payment;
