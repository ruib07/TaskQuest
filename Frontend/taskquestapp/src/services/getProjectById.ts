import axios from "axios";

export const GetProjectById = async (projectId: string) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = await axios.get(
        `http://localhost:3005/v1/projects/byId/${projectId}`,
        {
          headers: headers,
        }
      );

      return response;
    } catch (error) {
      throw new Error("Failed to get project by his ID!");
    }
  }
};
