import { model, Schema } from "mongoose";

const GoogleAuthSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: String, default: "google", required: true },
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true }
);

export const GoogleAuth = model("GoogleAuth", GoogleAuthSchema);
