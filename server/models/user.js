import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isVerified: { type: String, default: false },
    avatarUrl: { type: String,default: 'image' },
    avatarPublicId: { type: String,default: 'image-id' },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
