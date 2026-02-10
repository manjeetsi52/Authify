import { Google } from "arctic";
import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const google = new Google(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  isProduction
    ? "https://authify-server-c1zn.onrender.com/api/auth/google/callback" // deployed backend
    : "http://localhost:8080/api/auth/google/callback" // local dev
)
