import { sendVerificationEmail } from "../../lib/nodemailer.js";
import { AppError } from "../../middleware/globalErrorClass.js";
import { Session } from "../../models/session.js";
import { User } from "../../models/user.js";
import {
  checkUserExist,
  createUser,
  deleteSession,
  generateAccessToken,
  generateRandomToken,
  generateRefreshToken,
  hashPassword,
  insertVerifyEmailToken,
  verifyPassword,
} from "../../services/service.js";
import { UserValidation } from "../../validations/zod-validation/validator.js";
import { asynWrapper } from "../AsyncWrapper/asyncWrapper.js";

export const registerUser = asynWrapper(async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  // 1. Check if user exists
  const existingUser = await checkUserExist(email);
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  // 2. Validate input
  const result = UserValidation.safeParse(req.body);
  if (!result.success) {
    throw result.error;
    // return res.status(400).json({ errors: result.error.issues.map((err)=>err.message) });
  }

  const { name, password } = result.data;

  // 3. Hash password
  const securePassword = await hashPassword(password);

  // 4. Create user
  const user = await createUser({ name, email, password: securePassword });

  return res.status(201).json({
    message: "Registration successful!",
    user: { id: user._id, email: user.email }, // never send plain password
  });
});

export const loginUser = asynWrapper(async (req, res) => {
  if (req.user) {
    throw new AppError("Already logged in", 400);
  }

  const { email, password } = req.body;

  //check user exist or not
  const userExist = await checkUserExist(email);

  if (!userExist)
    throw new AppError("User Does not Exist, Register First", 401);

  //validation
  const validCredentials = await verifyPassword(password, userExist.password);

  if (!validCredentials) {
    throw new AppError("Invalid email or password",400)
  }

  const tempSession = Session({
    userId: userExist.id,
    ip: req.clientIp,
    userAgent: req.headers["user-agent"],
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  const refreshToken = generateRefreshToken({ sessionId: tempSession._id });
  tempSession.refreshToken = refreshToken;
  const session = await tempSession.save();

  const accessToken = generateAccessToken({
    id: userExist.id,
    name: userExist.name,
    email: userExist.email,
    sessionId: session.id,
  });
  const cookieConfig = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("access_token", accessToken, {
    ...cookieConfig,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refresh_token", refreshToken, {
    ...cookieConfig,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "Login Successful",
    accessToken,
    refreshToken,
    user: {
      name: userExist.name,
      email: userExist.email,
      avatarUrl: userExist.avatarUrl,
    },
    hasPassword: true,
  });
});

export const logoutUser =asynWrapper( async (req, res) => {
    console.log("User in logout:", req.user);
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    await deleteSession(req.user?.id);
    return res.status(200).json({ message: "Successfully Logged Out" });
})

export const checkAuth =asynWrapper (async (req, res) => {
    if (!req.user) {
      throw new AppError('Not Authenticated',400)
    }
    const user = await User.findById(req.user.id);
    // console.log('user from checkAuth',user)
    const hasPassword = user.password === null ? false : true;
    return res.status(200).json({
      message: "Authenticated",
      user: { name: user.name, email: user.email, avatarUrl: user.avatarUrl },
      hasPassword: !hasPassword,
    });
})
