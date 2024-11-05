import axios from "axios";

export const GetTaskByIdService = (taskId: string) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = axios.get(
        `http://localhost:3005/v1/tasks/byId/${taskId}`,
        {
          headers: headers,
        }
      );

      return response;
    } catch (error) {
      throw new Error("Failed to retrieve task by ID!");
    }
  }
};
