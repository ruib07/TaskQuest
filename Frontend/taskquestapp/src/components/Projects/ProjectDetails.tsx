import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetProjectById } from "../../services/Projects/GET/getProjectById";
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
            <hr className="my-10" />
            <div className="grid grid-cols-2 gap-4 mt-6">
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
            <hr className="my-10" />
            <h1 className="text-3xl font-bold mb-10 text-blue-600">
              Send messages to your project colleagues
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-stretch">
                <div className="text-gray-400 text-xs">
                  Members
                  <br />
                  connected
                </div>
                <div className="h-100 border-l mx-4"></div>
                <div className="flex flex-nowrap -space-x-3">
                  <div className="h-9 w-9">
                    <img
                      alt=""
                      className="object-cover w-full h-full rounded-full"
                      src="https://ui-avatars.com/api/?background=random"
                    />
                  </div>
                  <div className="h-9 w-9">
                    <img
                      alt=""
                      className="object-cover w-full h-full rounded-full"
                      src="https://ui-avatars.com/api/?background=random"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400 text-gray-800 hover:text-gray-900 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="bi bi-chat-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 text-sm font-semibold transition"
                  onClick={() => navigate(`/ChatMessages/${projectId}`)}
                >
                  Open
                </button>
              </div>
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
