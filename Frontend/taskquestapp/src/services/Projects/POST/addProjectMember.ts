import { ProjectMember } from "../../../types/Projects/projectMember";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const AddProjectMember = async (newProjectMember: ProjectMember) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/projectmembers`,
      newProjectMember,
      {
        headers: headers,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to create a new project member!");
  }
};
