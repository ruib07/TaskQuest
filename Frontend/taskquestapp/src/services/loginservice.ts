import axios from "axios";
import { UserLogin } from "../types/userLogin";

export const loginUserService = async (login: UserLogin) => {
  try {
    const response = await axios.post(
      "http://localhost:3005/auth/signin",
      login
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login!");
  }
};
