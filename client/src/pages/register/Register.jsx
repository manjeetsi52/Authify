import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import { Input } from "../../components/ui/customUi/Input";
import { Password } from "../../components/ui/customUi/Password";
import API_BASE_URL from "../../utils/apiBaseUrl";
import { useBioContext } from "../../hooks/UseBioContext";
export const Register = () => {
  const navigate = useNavigate()
  const {isLoggedIn,setUser} = useBioContext()
  if(isLoggedIn) return navigate('/home')
    const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      const res = await axios.post(`${API_BASE_URL}/register`, formData);
      // console.log('response',res.data.user)
      if(res.status==201)
      {
        toast.success("Registration successful!");
        setUser(res.data.user)
        setFormData({ name: "", email: "", password: "" });
        setError("");
        navigate('/send-email',{state:{from:'register'}})
      }
    } catch (error) {
      console.log(error);

      //  Handle different types of errors safely
      if (error.response) {
        const { errors, message } = error.response.data;

        if (Array.isArray(errors)) {
          errors.forEach((err) => toast.error(err));
          setError(errors.join(", "));
          setFormData({ name: "", email: "", password: "" });
          // setError('')
        } else {
          toast.error(message || "Registration failed!");
          setError(message || "Registration failed!");
          setFormData({ name: "", email: "", password: "" });
        }
      } else {
        toast.error("Something went wrong!");
        setError("Something went wrong!");
        setFormData({ name: "", email: "", password: "" });
      }
    }
  };



  return (
    <>
      <section className="register">
        <div className="register-container">
          <h1 className="heading">Register</h1>
          <form className="register-form" method="POST" onSubmit={handleSubmit}>
            <Input
              classname={"name"}
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleInput}
            />
            <Input
              classname={"email"}
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleInput}
            />
            <Password
              classname="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleInput}
              iconClass={"toggle-icon"}
            />
            <div>
              <p className="login-para">
                Already have an account? <NavLink to="/login">Login</NavLink>{" "}
              </p>
            </div>
            <div className="submit-btn">
              <button type="submit">Register</button>
            </div>
            <hr />
            <div className="login-with-google">
              <NavLink to={"/google-auth"}>
                <button>
                  Login with <FcGoogle id="google-icon" />
                </button>
              </NavLink>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </section>
    </>
  );
};
