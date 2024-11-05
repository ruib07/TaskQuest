import axios from "axios";

export const GetAllUsersService = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = axios.get("http://localhost:3005/v1/users", {
        headers: headers,
      });
      return response;
    } catch (error) {
      throw new Error("Failed to retrive users!");
    }
  }
};