import { useEffect, useState } from "react";
import "./GoogleAuth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API_BASE_URL from "../../utils/apiBaseUrl";
import { useBioContext } from "../../hooks/UseBioContext";

export const AuthSuccess = () => {
  const { setUser,setUserFromGAuth} = useBioContext()
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data.user);
        console.log('res.data.user from authsuccess',res.data.user)
        toast.success("Login Successful!");
        setUserFromGAuth(true)//user login from gauth
        setTimeout(() => navigate("/home"), 1000);
      } catch (err) {
        toast.error(err.response?.data?.error || err.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="redirection">
        <h1>
          {loading ? "Verifying login..." : "Login Successful! Redirecting..."}
        </h1>
      </div>
    </>
  );
};
