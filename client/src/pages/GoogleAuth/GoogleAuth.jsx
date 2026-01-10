import axios from "axios";
import { useEffect } from "react";
import "./GoogleAuth.css";
import API_BASE_URL from "../../utils/apiBaseUrl";
export const GoogleAuth = () => {
  useEffect(() => {
    let timer = setTimeout(() => {
      handleRedirection();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRedirection = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/google`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        const { url } = res.data;
        window.location.href = url; //navigation to google auth url
      } else {
        console.log("unexpected response", res);
      }
    } catch (error) {
      console.log("error from GoogleAuth Page", error.message);
    }
  };

  return (
    <>
      <div className="redirection">
        <h1>Redirecting...</h1>
      </div>
    </>
  );
};
