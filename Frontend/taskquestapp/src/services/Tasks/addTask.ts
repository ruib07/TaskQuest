import { Task } from "../../types/Tasks/task";
import axios from "axios";

export const AddTaskService = async (newTask: Task) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:3005/v1/tasks",
        newTask,
        {
          headers: headers,
        }
      );

      return response;
    } catch (error) {
      throw new Error("Failed to create a new task!");
    }
  }
};
