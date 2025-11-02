import { User } from "../models/user.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Session } from "../models/session.js";
import crypto from "crypto";
import { EmailVerification } from "../models/emailVerificationModel.js";
import path from "path";
import fs from 'fs/promises'
import mjml2html from "mjml";
import ejs from 'ejs'
import { GoogleAuth } from "../models/googleAuthModel.js";
export const checkUserExist = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    return null;
  }
};
export const createUser = async ({ name, email, password }) => {
  try {
    const user = await User.create({ name, email, password });
    return user;
  } catch (error) {
    res.status(404).json({ error: error });
    return null;
  }
};

export const hashPassword = async (userPassword) => {
  return await argon2.hash(userPassword, { type: argon2.argon2id });
};

export const verifyPassword = async (userPassword, hashedPassword) => {
  return await argon2.verify(hashedPassword, userPassword);
};

export const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
  return token;
};

export const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyJwtToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

export const findSessionId = async (sessionId) => {
  return await Session.findOne({ _id: sessionId });
};
export const findUserById = async (userId) => {
  return await User.findOne({ _id: userId });
};
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const refreshTokenVerify = async (refreshToken) => {
  try {
    const decodedToken = await verifyJwtToken(refreshToken);
    const currentSession = await findSessionId(decodedToken.sessionId);
    // console.log('decodedToken',decodedToken)
    // console.log('currentsession',currentSession)
    if (!currentSession) throw new Error("Invalid session");
    // console.log(currentSession.userId.toString());
    const user = await findUserById(currentSession.userId.toString());
    // console.log('user',user);
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      sessionId: currentSession.id,
    };
    const newAccessToken = generateAccessToken(userInfo);
    // console.log('newaccesstoken',newAccessToken);
    return { user, newAccessToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteSession = async (userId) => {
  try {
    await Session.deleteMany({ userId });
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const generateRandomToken = (digit = 6) => {
  const min = 10 ** (digit - 1);
  const max = 10 ** digit;

  return crypto.randomInt(min, max).toString();
};

export const insertVerifyEmailToken = async (userId, token,purpose) => {
  try {
    //delete all previous data
    await EmailVerification.deleteMany({ userId });

    //create new token document
    await EmailVerification.create({
      userId,
      token,
      medium:(purpose=='register')? 'email-verification':'forgot-password',
      expiresAt: Date.now() + 1000 * 60 * 15,//15 minutes
    });
  } catch (error) {
    console.log(error)
  }
};

export const emailToMjml = async(token,purpose)=>{
  //get the file template 
  const template =  await fs.readFile(path.join(import.meta.dirname,'..','views','verifyEmail.mjml'),'utf-8')

  //put data with ejs
  const filledTemplate = ejs.render(template,{
    code:token,
    purpose:purpose
  })

  //convert to html
  return mjml2html(filledTemplate).html
}

export const getUserWithOauthId = async({googleUserId,email})=>{
    try {
        const oauthAccount = await GoogleAuth.findOne({providerAccountId:googleUserId})
        .populate({
          path:'userId',
          match:{email:email},
          select: 'name email isVerified avatarUrl'
        })
        .select('provider providerAccountId userId')

        if(!oauthAccount || !oauthAccount.userId) return null;

        return {provider: oauthAccount.provider,
          providerAccountId: oauthAccount.providerAccountId,
          ...oauthAccount.userId.toObject()
        }
    } catch (error) {
      console.log('error from getuserwithoauthid',error.message)
      return null
    }
}

export const createUserWithOauth = async({name,email,password,provider,providerAccountId,picture})=>{
    try {
       const user = await User.create({name,email,isVerified:true,password,avatarUrl:picture})
        await GoogleAuth.create({provider,providerAccountId,userId:user._id})
        return user
    } catch (error) {
      console.log('error from createuserwithoaut',error.message)
    }
}

export const linkUserWithOauth = async({provider,providerAccountId,userId})=>{
  try {
    const exists = await GoogleAuth.findOne({userId,provider,providerAccountId})
    if(!exists)
    {
      await GoogleAuth.create({userId,provider,providerAccountId})
    }
  } catch (error) {
    console.log('error from linuserwithoauth',error.message)
  }
}

export const updateUserByEmail = async({email,avatarUrl,avatarPublicId})=>{
  try {
      await User.updateOne({email},{$set:{avatarUrl,avatarPublicId}})
  } catch (error) {
    console.log('error fromm updateUserByEmail',error)
  }
}