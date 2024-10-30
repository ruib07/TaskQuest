import axios from "axios";

export const GetUserService = () => {
  try {
    const userId = localStorage.getItem("id");

    const response = axios.get(`http://localhost:3005/v1/users/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user data!");
  }
};
