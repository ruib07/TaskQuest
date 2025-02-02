import { NewTask, NewTaskList, Task, TaskComment } from "../types/task";
import apiRequest from "./helpers/apiService";

export const GetTaskById = async (taskId: string) => {
  return await apiRequest("GET", `tasks/byId/${taskId}`);
};

export const GetTaskCommentsByTask = async (taskId: string) => {
  return await apiRequest("GET", `taskcomments/${taskId}`);
};

export const GetTaskListsByProjectId = async (projectId: string) => {
  return await apiRequest("GET", `tasklists/${projectId}`);
};

export const GetTasksByTaskListId = async (taskListId: string) => {
  return await apiRequest("GET", `tasks/${taskListId}`);
};

export const GetTasksByUserId = async () => {
  const userId = localStorage.getItem("id");
  return await apiRequest("GET", `tasks/user/${userId}`);
};

export const AddTask = async (newTask: NewTask) => {
  return await apiRequest("POST", "tasks", newTask);
};

export const AddTaskComment = async (newTaskComment: TaskComment) => {
  return await apiRequest("POST", "taskcomments", newTaskComment);
};

export const AddTaskList = async (newTaskList: NewTaskList) => {
  return await apiRequest("POST", "tasklists", newTaskList);
};

export const UpdateTaskData = async (
  taskId: string,
  newTaskData: Partial<Task>
) => {
  return await apiRequest("PUT", `tasks/${taskId}`, newTaskData);
};
