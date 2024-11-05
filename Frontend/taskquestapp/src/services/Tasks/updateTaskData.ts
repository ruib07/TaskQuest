import axios from "axios";
import { Task } from "../../types/Tasks/task";

export const UpdateTaskDataService = (
  taskId: string,
  newTaskData: Partial<Task>
) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = axios.put(
        `http://localhost:3005/v1/tasks/${taskId}`,
        newTaskData,
        {
          headers: headers,
        }
      );

      return response;
    } catch (error) {
      throw new Error("Failed to update a task!");
    }
  }
};
