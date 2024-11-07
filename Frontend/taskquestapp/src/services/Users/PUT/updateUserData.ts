import { User } from "../../../types/Users/user";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const UpdateUserData = async (newUserData: Partial<User>) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  if (!token || !userId) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    const response = await axios.put(
      `${API_BASE_URL}/${API_VERSION}/users/${userId}`,
      newUserData,
      {
        headers: headers,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to update user data!");
  }
};
