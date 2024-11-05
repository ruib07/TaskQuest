import { TaskComment } from "../../types/Tasks/taskComments";
import axios from "axios";

export const AddTaskCommentService = async (newTaskComment: TaskComment) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:3005/v1/taskcomments",
        newTaskComment,
        {
          headers: headers,
        }
      );

      return response;
    } catch (error) {
      throw new Error("Failed to add a task comment!");
    }
  }
};
