import { NewTaskList } from "../../../types/Tasks/newTaskList";
import axios from "axios";
import { GetAuthHeaders } from "../../getAuthHeaders";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const AddTaskList = async (newTaskList: NewTaskList) => {
  const token = GetAuthHeaders();

  if (!token) return;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/tasklists`,
      newTaskList,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to add a new task category!");
  }
};
