import { ChatMessage } from "../types/chatMessages";
import apiRequest from "./helpers/apiService";

export const GetMessagesByProject = async (projectId: string) => {
  return await apiRequest("GET", `chatmessages/${projectId}`);
};

export const AddMessage = async (newChatMessage: ChatMessage) => {
  return await apiRequest("POST", "chatmessages", newChatMessage);
};
