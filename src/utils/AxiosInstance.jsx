import axios from "axios";
const accessToken = localStorage.getItem("accessToken");
const axiosInstance = axios.create({
  baseURL:
    "http://localhost:4000/api/v1",
     withCredentials: true,
});

export default axiosInstance;
