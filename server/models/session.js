import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userAgent: { type: String },
    ip: { type: String },
    refreshToken:{type:String},
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Session = mongoose.model('Session',SessionSchema)
