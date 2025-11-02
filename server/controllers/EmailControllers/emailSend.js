
import { sendVerificationEmail } from "../../lib/nodemailer.js";
import { EmailVerification } from "../../models/emailVerificationModel.js";
import { User } from "../../models/user.js";
import {
    emailToMjml,
    findUserByEmail,
  generateRandomToken,
  insertVerifyEmailToken,
} from "../../services/service.js";

export const sendEmailFun = async (req, res) => {
const {email,from:purpose} = req.body

  const user = await findUserByEmail(email);
    // console.log('user',user)
  if (!user) return res.status(400).json({ message: "user not found" });

  const randomToken = generateRandomToken();
  await insertVerifyEmailToken(user.id, randomToken,purpose);
    const html = await emailToMjml(randomToken,purpose)
  await sendVerificationEmail({
    to: user.email,
    subject: (purpose ==='register') ?"Verify Your Email": 'Forgot Password OTP',
    html:html,
  });

  return res.status(200).json({message:"OTP Sent"})
};


export const verifyEmail = async (req, res) => {
  try {
    const { token, userId } = req.body;
    console.log('req.body from verifyemail',req.body)
    if (!token) return res.status(400).json({ message: "OTP not found" });

    const record = await EmailVerification.findOne({ userId });
    if (!record) return res.status(400).json({ message: "No OTP record found" });

    if (record.expiresAt < new Date()) {
      await EmailVerification.deleteMany({ userId });
      return res.status(400).json({ message: "OTP is expired!" });
    }

    if (record.token !== token) {
      return res.status(400).json({ message: "Invalid OTP!" });
    }

    await User.updateOne({ _id: userId }, { $set: { isVerified: true } });
    await EmailVerification.deleteMany({ userId });

    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
