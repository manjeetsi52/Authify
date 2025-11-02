import { sendVerificationEmail } from "../../lib/nodemailer.js";
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

export const registerUser = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    // 1. Check if user exists
    const existingUser = await checkUserExist(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Validate input
    const result = UserValidation.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.issues.map((err)=>err.message) });
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
  
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
   if (req.user) {
  return res.status(400).json({ message: "Already logged in" });
}

    const { email, password } = req.body;

    //check user exist or not
    const userExist = await checkUserExist(email);

    if (!userExist)
      return res
        .status(401)
        .json({ message: "User Does not Exist, Register First" });

    //validation
    const validCredentials = await verifyPassword(password, userExist.password);

    if (!validCredentials) {
      return res.status(400).json({ message: "Invalid email or password" });
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
        avatarUrl:userExist.avatarUrl,
      },
      hasPassword:true
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const logoutUser = async(req,res)=>{
      try {
           console.log("User in logout:", req.user);
          res.clearCookie('access_token')
          res.clearCookie('refresh_token')
          await deleteSession(req.user?.id)
          return res.status(200).json({message:'Successfully Logged Out'})
      } catch (error) {
        return res.status(500).json({message:error.message})
      }
}

export const checkAuth = async(req,res)=>{
        try {
            if(!req.user)
            {
              return res.status(400).json({message:'Not Authenticated'})
            }
            const user = await User.findById(req.user.id)
            // console.log('user from checkAuth',user)
            const hasPassword = user.password===null ? false :true
            return res.status(200).json({
              message:'Authenticated',
              user: {name:user.name,email:user.email, avatarUrl:user.avatarUrl},
              hasPassword:!hasPassword
            })
        } catch (error) {
          return res.status(500).json({message:error.message})
        }
}