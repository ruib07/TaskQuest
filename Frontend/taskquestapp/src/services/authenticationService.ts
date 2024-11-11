import { UserRegistration } from "../types/Auth/registration";
import { UserLogin } from "../types/Auth/login";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const Registration = async (newUser: UserRegistration) => {
  try {
    await axios.post(`${API_BASE_URL}/auth/signup`, newUser);
  } catch (error) {
    throw new Error("Failed to register user!");
  }
};

export const Login = async (login: UserLogin) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, login);
    return response.data;
  } catch (error) {
    throw new Error("Failed to login!");
  }
};
