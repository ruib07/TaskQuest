import { ProjectMember } from "../../../types/Projects/projectMember";
import axios from "axios";
import { GetAuthHeaders } from "../../getAuthHeaders";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const AddProjectMember = async (newProjectMember: ProjectMember) => {
  const token = GetAuthHeaders();

  if (!token) return;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/projectmembers`,
      newProjectMember,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to create a new project member!");
  }
};
