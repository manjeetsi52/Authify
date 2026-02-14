import { useNavigate } from "react-router-dom";
import { useBioContext } from "../../hooks/UseBioContext";
import { useState } from "react";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import "./GoogleAuth.css";
import API_BASE_URL from "../../utils/apiBaseUrl";
import axios from "axios";
export const AuthSuccess = () => {
  const { setUser, setUserFromGAuth, setIsLoggedIn, setAuthLoading } =
    useBioContext();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
          withCredentials: true,
        });

        setUser(res.data.user);
        setUserFromGAuth(true);
        setIsLoggedIn(true); 
        setAuthLoading(false);
        toast("Login Successful!");
        navigate("/home"); //  go directly
      } catch (err) {
        setIsLoggedIn(false);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="redirection">
      <h1>{loading ? "Verifying login..." : "Redirecting..."}</h1>
      <Toaster position="top-center"/>
    </div>
  );
};
