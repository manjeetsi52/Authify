import axios from "axios";
import { useEffect } from "react";
import "./GoogleAuth.css";
import API_BASE_URL from "../../utils/apiBaseUrl";

export const GoogleAuth = () => {
  useEffect(() => {
    const redirectToGoogle = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/google`, {
          withCredentials: true,
        });

        if (res.status === 200 && res.data?.url) {
          window.location.href = res.data.url;
        } else {
          console.error("Invalid response from server", res);
        }
      } catch (error) {
        console.error(
          "Google Auth redirect failed:",
          error.response?.data || error.message
        );
      }
    };

    redirectToGoogle();
  }, []);

  return (
    <div className="redirection">
      <h1>Redirecting to Google...</h1>
    </div>
  );
};
