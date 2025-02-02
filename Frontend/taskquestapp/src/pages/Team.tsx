import { useEffect, useState } from "react";
import { GetAllUsers } from "../services/userService";
import { User } from "../types/user";
import MainHeader from "../layouts/Header/MainHeader";
import { useNavigate } from "react-router-dom";
import { GetAllProjects } from "../services/projectService";

export default function TeamMembers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetAllUsers();
        setUsers(response?.data);
      } catch (err) {
        setError("Failed to retrieve users.");
      }
    };
    fetchUsers();

    const fetchProjects = async () => {
      try {
        const response = await GetAllProjects();
        setProjects(response?.data);
      } catch (error) {
        setError("Failed to retrieve projects.");
      }
    };

    fetchProjects();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (userId: string) => {
    setSelectedUser(userId);
    setShowModal(true);
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleAddToProject = () => {
    if (selectedProject && selectedUser) {
      navigate(`/AddProjectMembers/${selectedProject}`, {
        state: { userId: selectedUser },
      });
    }
    setShowModal(false);
    setSelectedUser(null);
    setSelectedProject(null);
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <>
      <MainHeader />
      <br />
      <br />
      <div className="bg-white min-h-screen p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          All Users available
        </h1>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search user..."
            className="max-w-md w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-8xl mx-auto">
          {users.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 cursor-pointer"
              >
                <img
                  src="https://pngimg.com/d/anonymous_mask_PNG28.png"
                  alt="User Avatar"
                  className="w-12 h-12 mr-4 object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.name}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <button
                  className="ml-auto flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
                  onClick={() => openModal(user.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
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
                  project
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-xl font-semibold mb-4">
                Which project do you want to add this user?
              </h2>
              <select
                className="border rounded-md p-2 w-full mb-4"
                onChange={(e) => handleProjectSelect(e.target.value)}
                value={selectedProject || ""}
              >
                <option value="" disabled>
                  Select a project
                </option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToProject}
                  disabled={!selectedProject}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
