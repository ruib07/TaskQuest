import { useEffect, useState } from "react";
import { GetProjectsByUser } from "../../services/getProjectsByUser";
import { Project } from "../../types/project";
import MainHeader from "../../layouts/Header/MainHeader";
import ProjectsSideNav from "../../layouts/SideNavbar/ProjectsSideNav";
import { useNavigate } from "react-router-dom";

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
        console.error(error);
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
      <div className="flex">
        <ProjectsSideNav />
        <div className="flex-1 ml-64 p-8 overflow-y-auto bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Projects</h1>
          {error && <p className="text-red-500 text-center mb-6">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => handleProjectClick(project.id!)}
                className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer bg-white"
              >
                <img
                  className="w-full"
                  src="https://st4.depositphotos.com/12981370/20592/i/450/depositphotos_205925330-stock-photo-start-partners-working-casual-clothes.jpg"
                  alt="ProjectImage"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{project.name}</div>
                  <p className="text-gray-700 text-base">
                    {project.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold">Deadline:</span>{" "}
                    {new Date(project.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
