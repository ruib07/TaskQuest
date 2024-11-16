import { Notification } from "../types/notification";
import { GetAuthHeaders } from "./getAuthHeaders";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const token = GetAuthHeaders();

export const GetNotificationsByUser = async () => {
  if (!token) return;

  try {
    const userId = localStorage.getItem("id");

    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/notifications/${userId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to retrieve all notifications by user ID!");
  }
};

export const AddNotification = async (newNotification: Notification) => {
  if (!token) return;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/notifications`,
      newNotification,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to add new notification!");
  }
};

export const MarkAsRead = async (id: string) => {
  if (!token) return;

  try {
    const response = await axios.put(
      `${API_BASE_URL}/${API_VERSION}/notifications/${id}`,
      { read: true },
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to mark as read!");
  }
};

export const DeleteNotification = async (id: string) => {
  if (!token) return;

  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${API_VERSION}/notifications/${id}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to delete notification!");
  }
};
