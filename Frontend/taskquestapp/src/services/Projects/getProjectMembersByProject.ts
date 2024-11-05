import axios from "axios";

export const GetProjectMembersByProjectService = (projectId: string) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = axios.get(
        `http://localhost:3005/v1/projectmembers/${projectId}`,
        {
          headers: headers,
        }
      );

      return response;
    } catch (error) {
      throw new Error("Failed to retrieve project members!");
    }
  }
};
