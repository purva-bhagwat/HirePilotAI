import api from "./axios";

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const response = await api.post("/auth/register", data);
  return response.data;
}