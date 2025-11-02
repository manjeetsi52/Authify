import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { ToastContainer } from "react-toastify";
import { Logout } from "./pages/Logout/Logout";
import { useEffect } from "react";
import axios from "axios";
import { FullPageSkeleton } from "./components/ui/skeleton/Skeleton";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { AppLayout } from "./components/ui/applayout/Applayout";
import { SendEmail } from "./pages/email-send/SendEmail";
import { VerifyEmail } from "./pages/email-verify/EmailVerification";
import { ForgotPassword } from "./pages/forgotPassword/ForgotPassword";
import { ChangePassword } from "./pages/changePassword/ChangePassword";
import { GoogleAuth } from "./pages/GoogleAuth/GoogleAuth";
import { AuthSuccess } from "./pages/GoogleAuth/AuthSuccess";
import { EditImage } from "./pages/editImage/EditImage";
import "react-toastify/dist/ReactToastify.css";
import "./Toast.css";
import API_BASE_URL from "./utils/apiBaseUrl.js";
import { useBioContext } from "./hooks/UseBioContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
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

export const App = () => {
  const {
    setIsLoggedIn,
    authLoading,
    setAuthLoading,
    setUser,
    setUserFromGAuth,
  } = useBioContext();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/check-auth`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data.user);
          // console.log("res.data.hasPassword", res.data.hasPassword);
          setUserFromGAuth(res.data.hasPassword);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, [setIsLoggedIn, setAuthLoading]);

  if (authLoading) {
    return <FullPageSkeleton />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />
    </>
  );
};
