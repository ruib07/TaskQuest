import axios from "axios";
import { UserRegistration } from "../../types/Auth/registration";

export const UserRegistrationService = async (newUser: UserRegistration) => {
  try {
    await axios.post("http://localhost:3005/auth/signup", newUser);
  } catch (error) {
    throw new Error("Failed to register user!");
  }
};
