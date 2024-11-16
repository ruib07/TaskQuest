import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainHeader from "../../layouts/Header/MainHeader";
import {
  GetProjectById,
  GetProjectMembersByProject,
} from "../../services/projectService";
import { Project, ProjectMember } from "../../types/project";
import { GetUserById } from "../../services/userService";

export default function ProjectMembers() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectResponse = await GetProjectById(projectId!);
        setProject(projectResponse?.data);

        const projectMemberResponse = await GetProjectMembersByProject(
          projectId!
        );
        setProjectMembers(projectMemberResponse?.data || []);
      } catch (error) {
        setError("Failed to load project or members");
      }
    };

    fetchProjectData();
  }, [projectId]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const newNames: { [key: string]: string } = {};

      for (const member of projectMembers) {
        try {
          const userResponse = await GetUserById(member.user_id);
          newNames[member.user_id] = userResponse?.data?.name || "Unknown";
        } catch {
          newNames[member.user_id] = "Unknown";
        }
      }

      setUserNames(newNames);
    };

    if (projectMembers.length > 0) {
      fetchUserNames();
    }
  }, [projectMembers]);

  return (
    <div className="bg-white min-h-screen">
      <MainHeader />
      <br />
      <br />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-12 text-center">
          Project Members for: {project?.name}
        </h1>

        {error && <p className="text-center text-red-500 mb-6">{error}</p>}

        {projectMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectMembers.map((projectMember) => (
              <div
                key={projectMember.user_id}
                className="bg-white shadow-lg rounded-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 text-center cursor-pointer"
              >
                <h3 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-center">
                  <img
                    src="https://pngimg.com/d/anonymous_mask_PNG28.png"
                    alt="User Icon"
                    className="w-8 h-8 mr-2"
                  />
                  {userNames[projectMember.user_id]}
                </h3>
                <p className="text-gray-500 mb-6">Role: {projectMember.role}</p>
                <button
                  onClick={() =>
                    navigate(
                      `/ProductivityMetrics/${projectId}/${projectMember.user_id}`
                    )
                  }
                  className="text-white bg-blue-600 p-2 rounded-lg"
                >
                  See Productivity Metrics
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-12 text-lg">
            No project members found for this project.
          </p>
        )}
      </div>
    </div>
  );
}
