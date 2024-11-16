import { ChatMessage } from "../types/chatMessages";
import { GetAuthHeaders } from "./getAuthHeaders";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const token = GetAuthHeaders();

export const GetMessagesByProject = async (projectId: string) => {
  if (!token) return;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/chatmessages/${projectId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to retrieve chat messages by project!");
  }
};

export const AddMessage = async (newChatMessage: ChatMessage) => {
  if (!token) return;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/chatmessages`,
      newChatMessage,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to create a new chat message!");
  }
};
