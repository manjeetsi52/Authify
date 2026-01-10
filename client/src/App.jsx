import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Logout } from "./pages/Logout/Logout";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { SendEmail } from "./pages/email-send/SendEmail";
import { VerifyEmail } from "./pages/email-verify/EmailVerification";
import { ForgotPassword } from "./pages/forgotPassword/ForgotPassword";
import { ChangePassword } from "./pages/changePassword/ChangePassword";
import { GoogleAuth } from "./pages/GoogleAuth/GoogleAuth";
import { AuthSuccess } from "./pages/GoogleAuth/AuthSuccess";
import { EditImage } from "./pages/editImage/EditImage";
import { AppLayout } from "./components/ui/applayout/Applayout";

import API_BASE_URL from "./utils/apiBaseUrl";
import { useBioContext } from "./hooks/UseBioContext";

import "react-toastify/dist/ReactToastify.css";
import "./Toast.css";

/* ---------------- ROUTER ---------------- */

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

/* ---------------- APP ---------------- */

export const App = () => {
  const {
    setIsLoggedIn,
    setUser,
    setUserFromGAuth,
    setAuthLoading,
  } = useBioContext();

  /* 🔹 Wake Render backend (non-blocking) */
  useEffect(() => {
    fetch(`${API_BASE_URL}/health`).catch(() => {});
  }, []);

  /* 🔹 Background auth check (DO NOT block UI) */
useEffect(() => {
  const pathname = window.location.pathname;

  // 🚫 Do NOT run auth check during OAuth flow
  if (
    pathname === "/google-auth" ||
    pathname === "/auth-success"
  ) {
    setAuthLoading(false);
    return;
  }

  const checkAuth = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await axios.get(`${API_BASE_URL}/check-auth`, {
        withCredentials: true,
        signal: controller.signal,
      });

      if (res.status === 200) {
        setIsLoggedIn(true);
        setUser(res.data.user);
        setUserFromGAuth(res.data.hasPassword);
        localStorage.setItem("auth", "true");
      }
    } catch {
      setIsLoggedIn(false);
      localStorage.removeItem("auth");
    } finally {
      clearTimeout(timeout);
      setAuthLoading(false);
    }
  };

  // optimistic UI
  const cachedAuth = localStorage.getItem("auth") === "true";
  setIsLoggedIn(cachedAuth);

  checkAuth();
}, [setIsLoggedIn, setUser, setUserFromGAuth, setAuthLoading]);

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
