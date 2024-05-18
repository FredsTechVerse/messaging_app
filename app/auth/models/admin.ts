import mongoose, { Schema } from "mongoose";
const AdminSchema = new Schema(
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
      default: "EM-203",
    },
    password: { type: String, required: true },
    status: { type: String, required: true, enum: ["active", "inactive"], default: "active" },
    resetToken: { type: String },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.models?.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
