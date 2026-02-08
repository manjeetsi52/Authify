import { createBrowserRouter } from "react-router-dom";
import { Register } from "../../pages/register/Register";
import { Home } from "../../pages/home/Home";
import { Login } from "../../pages/login/Login";
import { Dashboard } from "../../pages/Dashboard/Dashboard";
import { SendEmail } from "../../pages/email-send/SendEmail";
import { VerifyEmail } from "../../pages/email-verify/EmailVerification";
import { ForgotPassword } from "../../pages/forgotPassword/ForgotPassword";
import { ChangePassword } from "../../pages/changePassword/ChangePassword";
import { GoogleAuth } from "../../pages/GoogleAuth/GoogleAuth";
import { AuthSuccess } from "../../pages/GoogleAuth/AuthSuccess";
import { EditImage } from "../../pages/editImage/EditImage";
import { Logout } from "../../pages/Logout/Logout";
import { authLoader } from "../../utils/loader";
import { AppLayout } from "../ui/applayout/Applayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    loader:authLoader,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/send-email", element: <SendEmail /> },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/google-auth", element: <GoogleAuth /> },
      { path: "/auth-success", element: <AuthSuccess /> },
      { path: "/edit-profile", element: <EditImage /> },
      { path: "/logout", element: <Logout /> },
    ],
  },
]);
