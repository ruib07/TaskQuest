import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const GetTaskCommentsByTask = async (taskId: string) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/taskcomments/${taskId}`,
      {
        headers: headers,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to retrieve task comments by task!");
  }
};