import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetProjectById } from "../../services/getProjectById";
import { Project } from "../../types/project";
import MainHeader from "../../layouts/Header/MainHeader";

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await GetProjectById(projectId!);
        setProject(response?.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchEvent();
  }, [projectId]);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-lg text-gray-600">Project not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <MainHeader />
      <br />
      <br />
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="https://cdn.pixabay.com/photo/2021/08/05/12/36/software-development-6523979_1280.jpg"
            alt={project.name}
            className="w-full h-auto object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {project.name}
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Description:</strong> {project.description}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Deadline:</strong>{" "}
              {new Date(project.deadline).toLocaleDateString()}
            </p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200"
              onClick={() => navigate("/Projects")}
            >
              Back to Projects List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
