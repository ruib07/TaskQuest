import { Task, NewTask, NewTaskList, TaskComment } from "../types/task";
import { GetAuthHeaders } from "./getAuthHeaders";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const token = GetAuthHeaders();

export const GetTaskById = (taskId: string) => {
  if (!token) return;

  try {
    const response = axios.get(
      `${API_BASE_URL}/${API_VERSION}/tasks/byId/${taskId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to retrieve task by ID!");
  }
};

export const GetTaskCommentsByTask = async (taskId: string) => {
  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/taskcomments/${taskId}`,
      {
        headers: token,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to retrieve task comments by task!");
  }
};

export const GetTaskListsByProjectId = (projectId: string) => {
  if (!token) return;

  try {
    const response = axios.get(
      `${API_BASE_URL}/${API_VERSION}/tasklists/${projectId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to retrieve all tasks list by project ID!");
  }
};

export const GetTasksByTaskListId = (taskListId: string) => {
  if (!token) return;

  try {
    const response = axios.get(
      `${API_BASE_URL}/${API_VERSION}/tasks/${taskListId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to retrieve tasks by task list ID!");
  }
};

export const GetTasksByUserId = async () => {
  const userId = localStorage.getItem("id");

  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/tasks/user/${userId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to retrieve tasks by user ID!");
  }
};

export const AddTask = async (newTask: NewTask) => {
  if (!token) return;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/tasks`,
      newTask,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to create a new task!");
  }
};

export const AddTaskComment = async (newTaskComment: TaskComment) => {
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

export const AddTaskList = async (newTaskList: NewTaskList) => {
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

export const UpdateTaskData = async (
  taskId: string,
  newTaskData: Partial<Task>
) => {
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
