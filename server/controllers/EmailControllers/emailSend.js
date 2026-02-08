
import { sendVerificationEmail } from "../../lib/nodemailer.js";
import { AppError } from "../../middleware/globalErrorClass.js";
import { EmailVerification } from "../../models/emailVerificationModel.js";
import { User } from "../../models/user.js";
import {
    emailToMjml,
    findUserByEmail,
  generateRandomToken,
  insertVerifyEmailToken,
} from "../../services/service.js";
import { asynWrapper } from "../AsyncWrapper/asyncWrapper.js";

export const sendEmailFun =asynWrapper( async (req, res) => {
const {email,from:purpose} = req.body

  const user = await findUserByEmail(email);
    // console.log('user',user)
  if (!user) throw new AppError("user not found",404) 

  const randomToken = generateRandomToken();
  await insertVerifyEmailToken(user.id, randomToken,purpose);
    const html = await emailToMjml(randomToken,purpose)
  await sendVerificationEmail({
    to: user.email,
    subject: (purpose ==='register') ?"Verify Your Email": 'Forgot Password OTP',
    html:html,
  });

  return res.status(200).json({message:"OTP Sent"})
})


export const verifyEmail = asynWrapper(async (req, res) => {
    const { token, userId } = req.body;
    console.log('req.body from verifyemail',req.body)
    if (!token) throw new AppError('OTP not found',404)

    const record = await EmailVerification.findOne({ userId });
    if (!record) throw new AppError('No OTP record found',400) 

    if (record.expiresAt < new Date()) {
      await EmailVerification.deleteMany({ userId });
      throw new AppError('OTP is expired!',400)
    }

    if (record.token !== token) {
      throw new AppError('Invalid OTP!',400)
    }

    await User.updateOne({ _id: userId }, { $set: { isVerified: true } });
    await EmailVerification.deleteMany({ userId });

    return res.status(200).json({ message: "Email verified successfully!" });
})
