import { User } from "../types/user";
import apiRequest from "./helpers/apiService";

export const GetAllUsers = async () => {
  return await apiRequest("GET", "users");
};

export const GetUserById = async (userId: string) => {
  return await apiRequest("GET", `users/${userId}`);
};

export const UpdateUserData = async (newUserData: Partial<User>) => {
  const userId = localStorage.getItem("id");
  return await apiRequest("PUT", `users/${userId}`, newUserData);
};
