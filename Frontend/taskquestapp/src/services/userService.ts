import { GetAuthHeaders } from "./getAuthHeaders";
import { User } from "../types/user";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const token = GetAuthHeaders();

export const GetAllUsers = async () => {
  if (!token) return;

  try {
    const response = await axios.get(`${API_BASE_URL}/${API_VERSION}/users`, {
      headers: token,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to retrive users!");
  }
};

export const GetMyUser = async () => {
  const userId = localStorage.getItem("id");

  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/users/${userId}`,
      {
        headers: token,
      }
    );
    return response;
  } catch (error) {
    throw new Error("Failed to get user data!");
  }
};

export const GetUserById = async (userId: string) => {
  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/users/${userId}`,
      {
        headers: token,
      }
    );
    return response;
  } catch (error) {
    throw new Error("Failed to get user data!");
  }
};

export const UpdateUserData = async (newUserData: Partial<User>) => {
  const userId = localStorage.getItem("id");

  if (!token || !userId) return;

  try {
    const response = await axios.put(
      `${API_BASE_URL}/${API_VERSION}/users/${userId}`,
      newUserData,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to update user data!");
  }
};
