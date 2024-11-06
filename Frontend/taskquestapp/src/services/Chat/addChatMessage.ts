import { ChatMessage } from "../../types/Chat/chatMessages";
import axios from "axios";

export const AddChatMessage = async (newChatMessage: ChatMessage) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:3005/v1/chatmessages",
        newChatMessage,
        {
          headers: headers,
        }
      );

      return response;
    } catch (error) {
      throw new Error("Failed to create a new chat message!");
    }
  }
};
