import { decodeIdToken, generateCodeVerifier, generateState } from "arctic";
import { google } from "../../lib/googleAuth.js";
import { createUserWithOauth, generateAccessToken, generateRefreshToken, getUserWithOauthId, linkUserWithOauth } from "../../services/service.js";
import { Session } from "../../models/session.js";

export const getGoogleLoginPage = (req, res) => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const scope = ["openid", "email", "profile"];
    const url = google.createAuthorizationURL(state, codeVerifier, scope);

    const cookieConfig = {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 10 * 1000,
      sameSite: "none",
    };

    res.cookie("google_oauth_state", state, cookieConfig);
    res.cookie("google_oauth_codeVerifier", codeVerifier, cookieConfig);

    return res.status(200).json({ url });
  } catch (err) {
    console.error("Error generating Google login URL:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getGoogleLoginCallback = async (req, res) => {
  try {
    const { code, state } = req.query;

    const {
      google_oauth_state: storedState,
      google_oauth_codeVerifier: codeVerifier,
    } = req.cookies;

    if (
      !code ||
      !state ||
      !storedState ||
      !codeVerifier ||
      state !== storedState
    ) {
      return res
        .status(400)
        .json({ error: "Invalid login attempt , please try again!" });
    }
    let token = await google.validateAuthorizationCode(code,codeVerifier)
    if(!token) return res.status(400).json({error:'Invalid login attempt, Please try again!'})
     
    const claims = decodeIdToken(token.idToken())
    const {sub:googleUserId,name,email,picture} = claims;
    
    let user = await getUserWithOauthId({googleUserId,email})
    // console.log('user',user)
    
    //user not exist
    if(!user){
      user = await createUserWithOauth({
        name,
        email,
        password:null,
        provider:'google',
        providerAccountId:googleUserId,
        picture
      })
    }
    
    //user exist but not linked with oauth 
    if(user && !user.providerAccountId)
    {
      await linkUserWithOauth({
        userId:user._id,
        provider:'google',
        providerAccountId:googleUserId
      })
    }

    const tempSession = new Session({
        userId:user._id,
        userAgent: req.headers['user-agent'],
        ip:req.clientIp,
        expiresAt: new Date(Date.now() + 7*24*60*60*1000)
    })

    const refreshToken = generateRefreshToken({sessionId: tempSession.id})
     tempSession.refreshToken = refreshToken
     const session = await tempSession.save()

     const accessToken = generateAccessToken({
      id:user._id,
      name:user.name,
      email:user.email,
      sessionId: session._id
     })

     const baseConfig = {httpOnly:true,sameSite:'lax'}

     res.cookie('access_token',accessToken,{...baseConfig,maxAge: 15*60*1000})
     res.cookie('refresh_token',refreshToken,{...baseConfig,maxAge:7*24*60*60*1000})

    return res.redirect(`http://localhost:5173/auth-success`)
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
};
