import axios from "axios";

export const GetUserService = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = axios.get(`http://localhost:3005/v1/users/${userId}`, {
        headers: headers,
      });
      return response;
    } catch (error) {
      throw new Error("Failed to get user data!");
    }
  }
};
