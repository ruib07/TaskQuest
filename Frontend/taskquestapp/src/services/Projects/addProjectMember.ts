import { ProjectMember } from "../../types/Projects/projectMember";
import axios from "axios";

export const AddProjectMemberService = async (
  newProjectMember: ProjectMember
) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:3005/v1/projectmembers",
        newProjectMember,
        {
          headers: headers,
        }
      );

      return response;
    } catch (error) {
      throw new Error("Failed to create a new project member!");
    }
  }
};
