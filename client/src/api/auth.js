import api from "./axios.js";

/**
 * Register a new user
 * @param {{ name: string, email: string, password: string }} data
 */
export async function registerUser(data) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

/**
 * Log in with email and password
 * @param {{ email: string, password: string }} data
 */
export async function loginUser(data) {
  const response = await api.post("/auth/login", data);
  return response.data;
}

/**
 * Fetch authenticated user profile
 */
export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}

/**
 * Update authenticated user profile
 * @param {{ name: string }} data
 */
export async function updateUserProfile(data) {
  const response = await api.put("/auth/profile", data);
  return response.data;
}
