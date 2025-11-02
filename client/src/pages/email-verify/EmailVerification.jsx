import {   useRef, useState } from "react";
import "./EmailVerification.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../utils/apiBaseUrl";
import { useBioContext } from "../../hooks/UseBioContext";

export const VerifyEmail = () => {
  const [formData, setFormData] = useState({ token: "" });
  const { user, resendInfo, setResendInfo } = useBioContext()
  const navigate = useNavigate();
  const location = useLocation()
  const {from,email} = location?.state
  const timer = useRef(null)
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res ;
    try {
      if(from==='forgot-password'){
        const payload = {token: formData.token,email:email}
        sessionStorage.setItem('token-email',JSON.stringify(payload))
         res = await axios.post(`${API_BASE_URL}/forgot-password-verify`,payload)
      }
      else{
        const payload = { token: formData.token, userId: user.id };
        res = await axios.post(`${API_BASE_URL}/verify-email`, payload);
      }

      if (res.status === 200) {
        toast.success(res.data.message);
        if(from ==='forgot-password') navigate('/change-password',{state:{email,token:formData.token}});
        else  navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  const handleResend = async () => {
    try {
      setResendInfo({
        buttonStatus: "Resend OTP",
        disabled: true,
        resendTime: 30,
      });

      await axios.post(`${API_BASE_URL}/send-verification-email`, {
        email: user.email,from:from
      });

      toast.success("Verification email resent!");

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
      toast.error("Failed to resend OTP");
      setResendInfo((prev) => ({ ...prev, disabled: false }));
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-box">
        <h2>Email Verification</h2>
        <p className="verify-text">
          Enter the 6-digit OTP sent to your registered email.
        </p>

        <form className="verify-form" onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="6"
            placeholder="Enter OTP"
            className="otp-input"
            name="token"
            onChange={handleChange}
            value={formData.token}
          />
          <button type="submit" className="verify-btn">
            Verify
          </button>
        </form>

        <p className="resend-text">Didn’t receive the OTP?</p>
        <button
          type="button"
          disabled={resendInfo.disabled}
          onClick={handleResend}
          className="verify-btn"
        >
          {resendInfo.disabled
            ? `Wait ${resendInfo.resendTime}s`
            : "Resend OTP"}
        </button>

        <p className="timer-info">
          {resendInfo.buttonStatus === "Resend OTP" &&
            `Try again after ${resendInfo.resendTime}s`}
        </p>
      </div>
    </div>
  );
};
