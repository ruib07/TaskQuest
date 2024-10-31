import axios from "axios";
import { UserRegistration } from "../types/userRegistration";

export const registerUserService = async (newUser: UserRegistration) => {
  try {
    await axios.post("http://localhost:3005/auth/signup", newUser);
  } catch (error) {
    throw new Error("Failed to register user!");
  }
};
