import { useEffect, useState } from "react";
import { GetProjectsByUser } from "../../services/Projects/getProjectsByUser";
import { Project } from "../../types/project";
import MainHeader from "../../layouts/Header/MainHeader";
import { useNavigate } from "react-router-dom";
import ProjectsMiniNav from "../../layouts/ProjectsNav/ProjectsMiniNav";

export default function ProjectsComponent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await GetProjectsByUser();
        setProjects(response?.data);
      } catch (error) {
        setError("Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId: string) => {
    navigate(`/Project/${encodeURIComponent(projectId)}`);
  };

  return (
    <>
      <MainHeader />
      <br />
      <br />
      <br />
      <ProjectsMiniNav />
      <div className="flex flex-col items-center p-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Projects</h1>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-8xl">
          {projects.map((project, index) => (
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
