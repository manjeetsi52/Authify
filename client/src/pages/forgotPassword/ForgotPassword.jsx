import { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../utils/apiBaseUrl";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/send-verification-email`, {
        email,
        from: "forgot-password",
      });
      toast.success("OTP sent to your email!");
      navigate('/verify-email' , {state:{from:'forgot-password',email:email}})
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Forgot Password</h2>
        <p className="forgot-text">
          Enter your registered email to receive an OTP.
        </p>

        <form className="forgot-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="forgot-input"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="forgot-btn">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};
