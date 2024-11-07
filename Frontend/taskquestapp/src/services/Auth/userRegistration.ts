import { UserRegistration } from "../../types/Auth/registration";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const Registration = async (newUser: UserRegistration) => {
  try {
    await axios.post(`${API_BASE_URL}/auth/signup`, newUser);
  } catch (error) {
    throw new Error("Failed to register user!");
  }
};
