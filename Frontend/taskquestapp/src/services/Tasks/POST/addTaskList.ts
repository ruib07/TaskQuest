import { NewTaskList } from "../../../types/Tasks/newTaskList";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const AddTaskList = async (newTaskList: NewTaskList) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/tasklists`,
      newTaskList,
      {
        headers: headers,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to add a new task category!");
  }
};
