import axios from "axios";

export const GetChatMessagesByProjectService = (projectId: string) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = axios.get(
        `http://localhost:3005/v1/chatmessages/${projectId}`,
        {
          headers: headers,
        }
      );

      return response;
    } catch (error) {
      throw new Error("Failed to retrieve chat messages by project!");
    }
  }
};
