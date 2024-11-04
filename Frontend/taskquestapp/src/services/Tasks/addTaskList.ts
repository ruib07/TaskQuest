import axios from "axios";
import { NewTaskList } from "../../types/Tasks/newTaskList";

export const AddTaskListService = async (newTaskList: NewTaskList) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:3005/v1/tasklists",
        newTaskList,
        {
          headers: headers,
        }
      );

      return response;
    } catch (error) {
      throw new Error("Failed to add a new task category!");
    }
  }
};
