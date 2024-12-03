import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://localhost:8000",
});

export default axiosAPI;
