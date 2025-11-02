import axios from "axios";
import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Logout.css'
import API_BASE_URL from "../../utils/apiBaseUrl";
import { useBioContext } from "../../hooks/UseBioContext";
export const Logout = () => {
  useEffect(() => {
   let timer = setTimeout(() => {
      logoutUser();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const {setIsLoggedIn} = useBioContext()
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/logout`,
        {},
        (axios.defaults.withCredentials = true)
      );
      if (res.status === 200) {
        toast.success("Successfully Logged Out");
        setIsLoggedIn(false)
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <>
      <div className="logout-container">
        <div className="loader"></div>
        <h2>Logging out...</h2>
      </div>
    </>
  );
};
