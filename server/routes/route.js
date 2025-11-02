import { Router } from "express";
import {
  checkAuth,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/AuthControllers/hanldeAuth.js";
import { verifyAuth } from "../middleware/verifyAuthmw.js";
import { sendEmailFun, verifyEmail } from "../controllers/EmailControllers/emailSend.js";
import { updatePassword, verifyForgotPasswordToken } from "../controllers/forgotPasswordControllers/verifyForgotPasswordEmail.js";
import { getGoogleLoginCallback, getGoogleLoginPage } from "../controllers/GoogleAuth/handleGoogleAuth.js";
import { getUserAndAuth } from "../controllers/handleAuthMe/getUser.js";
import { setPassword } from "../controllers/setPassword/handleSetPassword.js";
import { updateImage } from "../controllers/ProfileUpdate/updateImage.js";
import { avatarUpload } from "../middleware/uploadMW.js";
export const router = Router();


router.route("/register",verifyAuth).post(registerUser);

router.route("/login").post(loginUser);

router.post('/logout',verifyAuth,logoutUser)

router.get('/check-auth',verifyAuth,checkAuth)

router.get("/auth/me", verifyAuth,getUserAndAuth);

router.post('/send-verification-email',sendEmailFun)

router.post('/verify-email',verifyEmail)

router.post('/forgot-password-verify',verifyForgotPasswordToken)

router.post('/change-password',updatePassword)

router.post('/set-password',setPassword)

router.get('/google',getGoogleLoginPage)

router.get('/api/auth/google/callback',getGoogleLoginCallback)

router.post('/update-image',avatarUpload.single('image'),updateImage)

router.get("/", (req, res) => {
  res.send("🚀 Auth server is live via Ngrok!");
});
