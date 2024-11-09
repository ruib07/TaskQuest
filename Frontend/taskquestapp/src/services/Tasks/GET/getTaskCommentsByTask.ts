import axios from "axios";
import { GetAuthHeaders } from "../../getAuthHeaders";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const GetTaskCommentsByTask = async (taskId: string) => {
  const token = GetAuthHeaders();

  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/taskcomments/${taskId}`,
      {
        headers: token,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to retrieve task comments by task!");
  }
};
