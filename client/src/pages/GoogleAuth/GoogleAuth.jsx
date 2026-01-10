import { useEffect } from "react";
import API_BASE_URL from "../../utils/apiBaseUrl";
import "./GoogleAuth.css";

export const GoogleAuth = () => {
  useEffect(() => {
    // 🔥 Start OAuth with top-level navigation
    window.location.href = `${API_BASE_URL}/google`;
  }, []);

  return (
    <div className="redirection">
      <h1>Redirecting to Google...</h1>
    </div>
  );
};
