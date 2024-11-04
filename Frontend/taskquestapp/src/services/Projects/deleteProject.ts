import axios from "axios";

export const DeleteProjectService = (projectId: string) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      axios.delete(`http://localhost:3005/v1/projects/${projectId}`, {
        headers: headers,
      });
    } catch (error) {
      throw new Error("Failed to delete project!");
    }
  }
};
