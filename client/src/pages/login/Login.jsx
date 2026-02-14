import { NavLink, useNavigate } from "react-router-dom";
// import "./Login.css";
import '../../styles/input.css'
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import {  useState } from "react";
import axios from "axios";
import { Input } from "../../components/ui/customUi/Input";
import { Password } from "../../components/ui/customUi/Password";
import API_BASE_URL from "../../utils/apiBaseUrl";
import { useBioContext } from "../../hooks/UseBioContext";

export const Login = () => {
  const {isLoggedIn,setIsLoggedIn ,setUser,setUserFromGAuth} = useBioContext()
  const navigate = useNavigate();
  if(isLoggedIn) return navigate('/home')
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
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
      const res = await axios.post(`${API_BASE_URL}/login`, formData,axios.defaults.withCredentials=true);
      if (res.status == 200) {
        toast.success(res.data.message);
        if(res.data.hasPassword) {setUserFromGAuth(false)}
        setUser(res.data.user)
        setFormData({ name: "", email: "", password: "" });
        setError("");
        setIsLoggedIn(true)
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      //  Handle different types of errors safely
      if (error.response) {
        // If backend sends an array of errors (like your case)
        const { errors, message } = error.response.data;

        if (Array.isArray(errors)) {
          // Show multiple errors using toast
          errors.forEach((err) => toast.error(err));
          setError(errors.join(", "));
          setFormData({ email: "", password: "" });
          // setError('')
        } else {
          toast.error(message || "Login failed!");
          setError(message || "Login failed!");
          setFormData({ email: "", password: "" });
        }
      } else {
        toast.error("Something went wrong!");
        setError("Something went wrong!");
        setFormData({ email: "", password: "" });
      }
    }
  };

  return (
    <>
      {/* <section className="login">
        <div className="login-container">
          <h1 className="heading">Login</h1>
          <form className="login-form" method="POST" onSubmit={handleSubmit}>
            <Input
              classname={"input"}
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
              <NavLink to="/forgot-password" >Forget Password?</NavLink>
              </p>
            </div>
            <div className="submit-btn">
              <button type="submit">Login</button>
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
      </section> */}
      <section className="login">
  <div className="login-container">
    <h1 className="heading">Login</h1>

    <form className="login-form" onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        classname="input"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInput}
      />

      <Password
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleInput}
        iconClass="toggle-icon"
      />

      <p className="login-para">
        <NavLink to="/forgot-password">Forgot Password?</NavLink>
      </p>

      <div className="submit-btn">
        <button type="submit">Login</button>
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

    </>
  );
};