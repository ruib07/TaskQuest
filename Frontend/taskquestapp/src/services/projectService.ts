import { NewProject, ProjectMember } from "../types/project";
import apiRequest from "./helpers/apiService";

export const GetAllProjects = async () => {
  return await apiRequest("GET", "projects");
};

export const GetProjectById = async (projectId: string) => {
  return await apiRequest("GET", `projects/byId/${projectId}`);
};

export const GetProjectMembersByProject = async (projectId: string) => {
  return await apiRequest("GET", `projectmembers/${projectId}`);
};

export const GetProjectsByUser = async () => {
  const userId = localStorage.getItem("id");
  return await apiRequest("GET", `projects/${userId}`);
};

export const AddProject = async (newProject: NewProject) => {
  return await apiRequest("POST", "projects", newProject);
};

export const AddProjectMember = async (newProjectMember: ProjectMember) => {
  return await apiRequest("POST", "projectmembers", newProjectMember);
};

export const DeleteProject = async (projectId: string) => {
  return await apiRequest("DELETE", `projects/${projectId}`);
};
