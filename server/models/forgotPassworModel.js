import { model, Schema } from "mongoose";

const ForgotPasswordSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const ForgotPassword =  model('ForgotPassword',ForgotPasswordSchema)