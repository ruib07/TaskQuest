import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const DeleteProject = async (projectId: string) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    await axios.delete(`${API_BASE_URL}/${API_VERSION}/projects/${projectId}`, {
      headers: headers,
    });
  } catch (error) {
    throw new Error("Failed to delete project!");
  }
};
