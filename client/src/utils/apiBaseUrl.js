const API_BASE_URL =
//built in by vite
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"          //  local backend
    : "https://authify-server-c1zn.onrender.com";      //  Ngrok URL

    // const API_BASE_URL = "http://localhost:8080" 
    // const API_BASE_URL = "https://authify-server-c1zn.onrender.com" 
    
export default API_BASE_URL;
