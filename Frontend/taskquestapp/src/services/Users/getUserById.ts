import axios from "axios";

export const GetUserByIdService = async (userId: string) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = await axios.get(
        `http://localhost:3005/v1/users/${userId}`,
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