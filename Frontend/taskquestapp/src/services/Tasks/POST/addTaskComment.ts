import { TaskComment } from "../../../types/Tasks/taskComments";
import axios from "axios";
import { GetAuthHeaders } from "../../getAuthHeaders";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const AddTaskComment = async (newTaskComment: TaskComment) => {
  const token = GetAuthHeaders();

  if (!token) return;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/taskcomments`,
      newTaskComment,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to add a task comment!");
  }
};
