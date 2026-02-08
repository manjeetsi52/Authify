import axios from "axios";
import API_BASE_URL from "./apiBaseUrl";

export const authLoader = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/auth/me`, {
      withCredentials: true,
    });
    if(res.status ===200){
        // console.log(res.data.user)
        return res.data.user
    }

  } catch (error) {
    console.log(error)
    return null
  }
};
