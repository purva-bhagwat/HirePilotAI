import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization header if JWT token is stored
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("hirepilot_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle session expiration cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if unauthorized request happens
      localStorage.removeItem("hirepilot_token");
      localStorage.removeItem("hirepilot_user");
    }
    return Promise.reject(error);
  }
);

export default api;
