import { Task } from "../../../types/Tasks/task";
import axios from "axios";
import { GetAuthHeaders } from "../../getAuthHeaders";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const UpdateTaskData = async (
  taskId: string,
  newTaskData: Partial<Task>
) => {
  const token = GetAuthHeaders();

  if (!token) return;

  try {
    const response = await axios.put(
      `${API_BASE_URL}/${API_VERSION}/tasks/${taskId}`,
      newTaskData,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to update task data!");
  }
};
