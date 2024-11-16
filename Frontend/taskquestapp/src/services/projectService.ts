import { NewProject, ProjectMember } from "../types/project";
import { GetAuthHeaders } from "./getAuthHeaders";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const token = GetAuthHeaders();

export const GetAllProjects = async () => {
  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/projects`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to retrieve projects!");
  }
};

export const GetProjectById = async (projectId: string) => {
  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/projects/byId/${projectId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to get project by his ID!");
  }
};

export const GetProjectMembersByProject = async (projectId: string) => {
  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/projectmembers/${projectId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to retrieve project members!");
  }
};

export const GetProjectsByUser = async () => {
  const userId = localStorage.getItem("id");

  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/projects/${userId}`,
      {
        headers: token,
      }
    );
    return response;
  } catch (error) {
    throw new Error("Failed to get user data!");
  }
};

export const AddProject = async (newProject: NewProject) => {
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

export const AddProjectMember = async (newProjectMember: ProjectMember) => {
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

export const DeleteProject = async (projectId: string) => {
  if (!token) return;

  try {
    await axios.delete(`${API_BASE_URL}/${API_VERSION}/projects/${projectId}`, {
      headers: token,
    });
  } catch (error) {
    throw new Error("Failed to delete project!");
  }
};
