import { TaskComment } from "../../../types/Tasks/taskComments";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const AddTaskComment = async (newTaskComment: TaskComment) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/taskcomments`,
      newTaskComment,
      {
        headers: headers,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to add a task comment!");
  }
};
