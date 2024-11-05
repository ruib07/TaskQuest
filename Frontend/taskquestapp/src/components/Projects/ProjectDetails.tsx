import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetProjectById } from "../../services/Projects/getProjectById";
import { Project } from "../../types/Projects/project";
import MainHeader from "../../layouts/Header/MainHeader";
import DeleteProjectModal from "./DeleteProjectModal";

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const handleDeleteConfirm = () => {
    navigate("/Projects");
  };

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
            className="w-full h-min object-cover"
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
            <div className="flex justify-center space-x-4 mt-6">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200"
                onClick={() => navigate(`/ProjectMembers/${projectId}`)}
              >
                See Project Members
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200"
                onClick={() => navigate(`/AddProjectMembers/${projectId}`)}
              >
                Add Project Members
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200"
                onClick={() => navigate(`/TaskCategories/${projectId}`)}
              >
                See all Tasks Categories
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200"
                onClick={() => navigate(`/AddTaskCategory/${projectId}`)}
              >
                Add Task Category
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-200"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>

        {showDeleteModal && (
          <DeleteProjectModal
            projectId={project.id}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
}
