import axios from "axios";
import { NewProject } from "../../types/newProject";

export const AddProjectService = async (newProject: NewProject) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:3005/v1/projects",
        newProject,
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create a new project!");
    }
  }
};
