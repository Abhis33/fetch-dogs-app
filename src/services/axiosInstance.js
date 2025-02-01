import axios from "axios";

const API_BASE = "https://frontend-take-home-service.fetch.com";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export default axiosInstance;
