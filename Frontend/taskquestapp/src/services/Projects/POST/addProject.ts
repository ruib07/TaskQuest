import axios from "axios";
import { NewProject } from "../../../types/Projects/newProject";
import { GetAuthHeaders } from "../../getAuthHeaders";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const AddProject = async (newProject: NewProject) => {
  const token = GetAuthHeaders();

  if (!token) return;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/projects`,
      newProject,
      {
        headers: token,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create a new project!");
  }
};
