import axios from "axios";
import { GetAuthHeaders } from "../../getAuthHeaders";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const DeleteProject = async (projectId: string) => {
  const token = GetAuthHeaders();

  if (!token) return;

  try {
    await axios.delete(`${API_BASE_URL}/${API_VERSION}/projects/${projectId}`, {
      headers: token,
    });
  } catch (error) {
    throw new Error("Failed to delete project!");
  }
};
