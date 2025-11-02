import { EmailVerification } from "../../models/emailVerificationModel.js";
import { User } from "../../models/user.js";
import { findUserByEmail, hashPassword } from "../../services/service.js";
import { PasswordValidation } from "../../validations/zod-validation/validator.js";

export const verifyForgotPasswordToken = async (req, res) => {
  try {
    const { token, email } = req.body;
    if (!token || !email) {
      return res.status(400).json({ message: "Token and email are required!" });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const tokenFromDb = await EmailVerification.findOne({
      token,
      userId: user._id,
      medium: "forgot-password",
    });

    if (!tokenFromDb) {
      return res.status(400).json({ message: "Invalid or expired OTP!" });
    }

    if (tokenFromDb.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired!" });
    }

    return res.status(200).json({ message: "OTP is correct" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const result = PasswordValidation.safeParse(req.body);
    console.log("result data", result.data);
    if (!result.success) {
      return res
        .status(400)
        .json({ message: result.error.issues.map((err) => err.message) });
    }
    if (result.success) {
      const { newPassword } = result.data;
      const { email } = req.body;

      const user = await findUserByEmail(email);
      if (!user) return res.status(400).json({ message: "User Not Found" });

      const hashedPassword = await hashPassword(newPassword);
      await User.updateOne(
        { _id: user._id },
        { $set: { password: hashedPassword } }
      );
      return res.status(200).json({ message: "Password Change Successfully!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
