import axios from "axios";

export const GetTaskCommentsByTaskService = async (taskId: string) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = await axios.get(
        `http://localhost:3005/v1/taskcomments/${taskId}`,
        {
          headers: headers,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to retrieve task comments by task!");
    }
  }
};
