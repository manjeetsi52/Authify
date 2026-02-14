import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../ui/applayout/Applayout";
import { authLoader } from "../../utils/loader";
import {Home} from '../../pages/home/Home'
// import {authLoader} 
const Register = lazy(() =>
  import("../../pages/register/Register").then((module) => ({
    default: module.Register,
  })),
);

// const Home = lazy(() =>
//   import("../../pages/home/Home").then((module) => ({
//     default: module.Home,
//   })),
// );

const Login = lazy(() =>
  import("../../pages/login/Login").then((module) => ({
    default: module.Login,
  })),
);

const Dashboard = lazy(() =>
  import("../../pages/Dashboard/Dashboard").then((module) => ({
    default: module.Dashboard,
  })),
);

const SendEmail = lazy(() =>
  import("../../pages/email-send/SendEmail").then((module) => ({
    default: module.SendEmail,
  })),
);

const VerifyEmail = lazy(() =>
  import("../../pages/email-verify/EmailVerification").then((module) => ({
    default: module.VerifyEmail,
  })),
);

const ForgotPassword = lazy(() =>
  import("../../pages/forgotPassword/ForgotPassword").then((module) => ({
    default: module.ForgotPassword,
  })),
);

const ChangePassword = lazy(() =>
  import("../../pages/changePassword/ChangePassword").then((module) => ({
    default: module.ChangePassword,
  })),
);

const GoogleAuth = lazy(() =>
  import("../../pages/GoogleAuth/GoogleAuth").then((module) => ({
    default: module.GoogleAuth,
  })),
);

const AuthSuccess = lazy(() =>
  import("../../pages/GoogleAuth/AuthSuccess").then((module) => ({
    default: module.AuthSuccess,
  })),
);

const EditImage = lazy(() =>
  import("../../pages/editImage/EditImage").then((module) => ({
    default: module.EditImage,
  })),
);

const Logout = lazy(() =>
  import("../../pages/Logout/Logout").then((module) => ({
    default: module.Logout,
  })),
);


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    loader: authLoader,
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
