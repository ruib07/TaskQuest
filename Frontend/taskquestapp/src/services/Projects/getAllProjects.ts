import axios from "axios";

export const GetAllProjectsService = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = await axios.get("http://localhost:3005/v1/projects", {
        headers: headers,
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    console.error("No token found");
    return null;
  }
};
