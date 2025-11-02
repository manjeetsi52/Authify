import mongoose, { Schema } from "mongoose";

const VerificationSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    medium: {
      type: String,
      enum: ["email-verification", "forgot-password"],
      required: true,
    },
  },
  { timestamps: true }
);

export const EmailVerification = mongoose.model(
  "EmailVerification",
  VerificationSchema
);
