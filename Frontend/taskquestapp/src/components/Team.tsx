import { useEffect, useState } from "react";
import { GetAllUsersService } from "../services/Users/getAllUsers";
import { User } from "../types/user";
import MainHeader from "../layouts/Header/MainHeader";
import { useNavigate } from "react-router-dom";

export default function TeamComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetAllUsersService();
        setUsers(response?.data);
      } catch (err) {
        setError("Failed to retrieve users.");
      }
    };
    fetchUsers();
  }, []);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-8xl mx-auto">
          {users.length > 0 ? (
            users.map((user) => (
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
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200"
                  onClick={() => navigate("/Projects")}
                >
                  Add to a project
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      </div>
    </>
  );
}
