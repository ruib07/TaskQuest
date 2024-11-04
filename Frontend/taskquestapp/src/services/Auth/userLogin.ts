import axios from "axios";
import { UserLogin } from "../../types/login";

export const UserLoginService = async (login: UserLogin) => {
  try {
    const response = await axios.post(
      "http://localhost:3005/auth/signin",
      login
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to login!");
  }
};
