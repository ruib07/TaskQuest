import { Task } from "../../../types/Tasks/task";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const UpdateTaskData = async (
  taskId: string,
  newTaskData: Partial<Task>
) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    const response = await axios.put(
      `${API_BASE_URL}/${API_VERSION}/tasks/${taskId}`,
      newTaskData,
      {
        headers: headers,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to update a task!");
  }
};
