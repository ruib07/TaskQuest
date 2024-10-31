import axios from "axios";

export const GetProjectsByUser = () => {
  try {
    const userId = localStorage.getItem("id");

    const response = axios.get(`http://localhost:3005/v1/projects/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user data!");
  }
};
