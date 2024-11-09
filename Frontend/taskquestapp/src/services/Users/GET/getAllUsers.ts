import axios from "axios";
import { GetAuthHeaders } from "../../getAuthHeaders";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const GetAllUsers = async () => {
  const token = GetAuthHeaders();

  if (!token) return;

  try {
    const response = await axios.get(`${API_BASE_URL}/${API_VERSION}/users`, {
      headers: token,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to retrive users!");
  }
};
