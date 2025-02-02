import { Notification } from "../types/notification";
import apiRequest from "./helpers/apiService";

export const GetNotificationsByUser = async () => {
  const userId = localStorage.getItem("id");
  return await apiRequest("GET", `notifications/${userId}`);
};

export const AddNotification = async (newNotification: Notification) => {
  return await apiRequest("POST", "notifications", newNotification);
};

export const MarkAsRead = async (id: string) => {
  return await apiRequest("PUT", `notifications/${id}`, { read: true });
};

export const DeleteNotification = async (id: string) => {
  return await apiRequest("DELETE", `notifications/${id}`);
};
