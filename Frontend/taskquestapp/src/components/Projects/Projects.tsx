import { useEffect, useState } from "react";
import { Project } from "../../types/Projects/project";
import MainHeader from "../../layouts/Header/MainHeader";
import { useNavigate } from "react-router-dom";
import { GetAllProjects } from "../../services/projectService";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await GetAllProjects();
        setProjects(response?.data);
      } catch (error) {
        setError("Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (projectId: string) => {
    navigate(`/Project/${encodeURIComponent(projectId)}`);
  };

  return (
    <>
      <MainHeader />
      <br />
      <br />
      <div className="flex flex-col items-center p-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Projects</h1>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <div className="flex items-center w-full max-w-md mb-6 space-x-2">
          <input
            type="text"
            placeholder="Search project..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <a
            href="/AddProject"
            className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Project
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-8xl">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleProjectClick(project.id!)}
              className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer bg-white transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200"
            >
              <img
                className="w-full"
                src="https://st4.depositphotos.com/12981370/20592/i/450/depositphotos_205925330-stock-photo-start-partners-working-casual-clothes.jpg"
                alt="ProjectImage"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{project.name}</div>
                <p className="text-gray-700 text-base">{project.description}</p>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Deadline:</span>{" "}
                  {new Date(project.deadline).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
