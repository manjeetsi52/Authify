import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./Register.css";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import { Input } from "../../components/ui/customUi/Input";
import { Password } from "../../components/ui/customUi/Password";
import API_BASE_URL from "../../utils/apiBaseUrl";
import { useBioContext } from "../../hooks/UseBioContext";

export const Register = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setUser } = useBioContext();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${API_BASE_URL}/register`,
        formData,
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success("Registration successful!");
        setUser(res.data.user);
        setFormData({ name: "", email: "", password: "" });
        navigate("/send-email", { state: { from: "register" } });
      }
    } catch (err) {
      const data = err.response?.data;

      if (data?.errors) {
        data.errors.forEach((msg) => toast.error(msg));
        setError(data.errors.join(", "));
      } else {
        toast.error(data?.message || "Registration failed");
        setError(data?.message || "Registration failed");
      }

      setFormData({ name: "", email: "", password: "" });
    }
  };

  return (
    <section className="register">
      <div className="register-container">
        <h1 className="heading">Register</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInput}
          />

          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInput}
          />

          <Password
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInput}
          />

          <p className="login-para">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>

          <div className="submit-btn">
            <button type="submit">Register</button>
          </div>

          <hr />

          <div className="login-with-google">
            <NavLink to="/google-auth">
              <button type="button">
                Login with <FcGoogle />
              </button>
            </NavLink>
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
};
