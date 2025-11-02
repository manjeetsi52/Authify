import { Google } from "arctic";
import dotenv from "dotenv";
dotenv.config();

export const google = new Google(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  `http://localhost:8080/api/auth/google/callback`
);
