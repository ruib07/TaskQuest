import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const GetTaskById = (taskId: string) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    const response = axios.get(
      `${API_BASE_URL}/${API_VERSION}/tasks/byId/${taskId}`,
      {
        headers: headers,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to retrieve task by ID!");
  }
};
