import { AppError } from "../../middleware/globalErrorClass.js";
import { EmailVerification } from "../../models/emailVerificationModel.js";
import { User } from "../../models/user.js";
import { findUserByEmail, hashPassword } from "../../services/service.js";
import { PasswordValidation } from "../../validations/zod-validation/validator.js";
import { asynWrapper } from "../AsyncWrapper/asyncWrapper.js";

export const verifyForgotPasswordToken = asynWrapper(async (req, res) => {
  const { token, email } = req.body;
  if (!token || !email) {
    throw new AppError("Token and email are required!", 400);
  }

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const tokenFromDb = await EmailVerification.findOne({
    token,
    userId: user._id,
    medium: "forgot-password",
  });

  if (!tokenFromDb) {
    throw new AppError("Invalid or expired OTP!", 400);
  }

  if (tokenFromDb.expiresAt < Date.now()) {
    throw new AppError("OTP has expired!", 400);
  }

  return res.status(200).json({ message: "OTP is correct" });
});
export const updatePassword = asynWrapper(async (req, res) => {
  const result = PasswordValidation.safeParse(req.body);
  console.log("result data", result.data);
  if (!result.success) {
    throw result.error;
  }
  if (result.success) {
    const { newPassword } = result.data;
    const { email } = req.body;

    const user = await findUserByEmail(email);
    if (!user) throw new AppError('User Not Found',404)

    const hashedPassword = await hashPassword(newPassword);
    await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } },
    );
    return res.status(200).json({ message: "Password Change Successfully!" });
  }
});
