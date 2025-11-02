import { refreshTokenVerify, verifyJwtToken } from "../services/service.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    req.user = null;

    if (accessToken) {
      try {
        const decodedToken = await verifyJwtToken(accessToken);
        req.user = decodedToken;
        return next();
      } catch (err) {
        // Token expired → fall through to refresh token flow
        console.log(err)
      }
    }

    if (refreshToken) {
      const tokens = await refreshTokenVerify(refreshToken);
      if (!tokens) {
        return res.status(401).json({ message: "Unauthorized: Invalid session" });
      }
      const { user, newAccessToken } = tokens;
      req.user = user;

      const cookieConfig = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      res.cookie("access_token", newAccessToken, {
        ...cookieConfig,
        maxAge: 15 * 60 * 1000,
      });

      return next();
    }

    return res.status(401).json({ message: "Unauthorized: No valid tokens" });
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
