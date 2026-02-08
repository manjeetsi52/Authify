import { useState } from "react";
import "./ChangePassword.css";
import { toast } from "sonner";
import axios from "axios";
import { Password } from "../../components/ui/customUi/Password";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../utils/apiBaseUrl";
import { useBioContext } from "../../hooks/UseBioContext";

export const ChangePassword = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { userFromGAuth } =useBioContext()
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const storedData = sessionStorage.getItem("token-email");
  const { email, token } = storedData ? JSON.parse(storedData) : {};
  console.log("email", email);
  const emailFromDashboard = JSON.parse(sessionStorage.getItem("email"));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      let res;
      if (userFromGAuth) {
        res = await axios.post(`${API_BASE_URL}/set-password`, {
          ...formData,
          email: emailFromDashboard,
        });
        navigate("/home");
      } else {
        res = await axios.post(`${API_BASE_URL}/change-password`, {
          ...formData,
          email: emailFromDashboard ? emailFromDashboard : email,
          token: token ? token : "",
        });
        sessionStorage.removeItem("token-email");
        if (userFromGAuth) navigate("/home")
          else if(emailFromDashboard) navigate('/home')
        else navigate("/login");
      }
      toast.success(res.data.message);
    } catch (error) {
      if (error.response) {
        const { errors, message } = error.response.data;

        if (Array.isArray(errors)) {
          errors.forEach((err) => toast.error(err));
          setError(errors.join(", "));
          // setError('')
        } else {
          toast.error(message || "Password Change failed!");
          setError(message || "Password Change failed!");
        }
      } else {
        toast.error("Something went wrong!");
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div className="change-container">
      <div className="change-box">
        {userFromGAuth ? <h2>Set Password</h2> : <h2>Change Password</h2>}

        <form className="change-form" onSubmit={handleSubmit}>
          <Password
            classname="password-input"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            iconClass="password-icon"
          />
          <Password
            classname="password-input"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            iconClass="password-icon"
          />
          <div className="show-error">
            <p>{error}</p>
          </div>
          <button type="submit" className="change-btn">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};
