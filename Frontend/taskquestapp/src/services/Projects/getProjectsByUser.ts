import axios from "axios";

export const GetProjectsByUser = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = axios.get(
        `http://localhost:3005/v1/projects/${userId}`,
        {
          headers: headers,
        }
      );
      return response;
    } catch (error) {
      throw new Error("Failed to get user data!");
    }
  }
};
