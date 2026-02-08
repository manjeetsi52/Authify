import { useNavigate } from "react-router-dom";
import { useBioContext } from "../../hooks/UseBioContext";
import { useState } from "react";
import { useEffect } from "react";

export const AuthSuccess = () => {
  const {
    setUser,
    setUserFromGAuth,
    setIsLoggedIn,
    setAuthLoading,
  } = useBioContext();

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
        setIsLoggedIn(true);              //  REQUIRED
        localStorage.setItem("auth", "true");
        setAuthLoading(false);

        toast.success("Login Successful!");
        navigate("/dashboard");           //  go directly
      } catch (err) {
        setIsLoggedIn(false);
        localStorage.removeItem("auth");
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
    </div>
  );
};
