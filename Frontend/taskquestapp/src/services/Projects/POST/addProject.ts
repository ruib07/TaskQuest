import axios from "axios";
import { NewProject } from "../../../types/Projects/newProject";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const AddProject = async (newProject: NewProject) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/projects`,
      newProject,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create a new project!");
  }
};
