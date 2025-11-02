import axios from "axios";
import "./SendEmail.css";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../utils/apiBaseUrl";
import { useBioContext } from "../../hooks/UseBioContext";

export const SendEmail = () => {
  const { user, resendInfo, setResendInfo } = useBioContext();
  const navigate = useNavigate();
  const timer = useRef(null);
  const location = useLocation();
  const from = location.state?.from; //register or forget-password

  const handleEmailVerification = async (e) => {
    e.preventDefault();

    try {
      // Immediately update resend state
      setResendInfo({
        buttonStatus: "Resend OTP",
        disabled: true,
        resendTime: 30,
      });

      const res = await axios.post(
        `${API_BASE_URL}/send-verification-email`,
        {
          email: user.email,
          from: from == "register" ? "register" : "forgot-password",
        },
        { withCredentials: true }
      );
      if(res.status === 200)
      toast.success("Verification email sent!");
      navigate("/verify-email", { state: { from: from, email: user.email } });

      // Enable button after 30 seconds
      timer.current = setInterval(() => {
        setResendInfo((prev) => {
          if (prev.resendTime <= 1) {
            clearInterval(timer.current);
            return { buttonStatus: "Send", disabled: false, resendTime: 0 };
          }
          return { ...prev, resendTime: prev.resendTime - 1 };
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send verification email");
      setResendInfo((prev) => ({
        ...prev,
        disabled: false,
      }));
    }
  };

  return (
    <section className="email-section">
      <div className="email-verification">
        <p className="email-para">Send OTP for email verification</p>

        <form onSubmit={handleEmailVerification} className="email-form">
          <input type="hidden" name="email" value={user.email} />
          <button type="submit" disabled={resendInfo.disabled}>
            {resendInfo.buttonStatus === "send" ? "Send OTP" : "Resend OTP"}
          </button>

          <p className="timer-info">
            {resendInfo.buttonStatus === "Resend OTP" &&
              `Try again after ${resendInfo.resendTime}s`}
          </p>
        </form>
      </div>
    </section>
  );
};
