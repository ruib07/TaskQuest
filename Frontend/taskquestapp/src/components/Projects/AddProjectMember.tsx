import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Img from "../../assets/TaskQuestLogo.png";
import MainHeader from "../../layouts/Header/MainHeader";
import { GetAllUsers } from "../../services/Users/GET/getAllUsers";
import { ProjectMember } from "../../types/Projects/projectMember";
import { AddProjectMember } from "../../services/Projects/POST/addProjectMember";

export default function AddNewProjectMember() {
  const [role, setRole] = useState<string>("");
  const [user_id, setUserId] = useState<string>("");
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetAllUsers();
        setUsers(response?.data || []);
        setFilteredUsers(response?.data || []);
      } catch (error) {
        setError(`Error fetching users: ${error}`);
      }
    };

    fetchUsers();

    if (location.state?.userId) {
      setUserId(location.state.userId);
    }
  }, [location.state]);

  const showSuccess = () => {
    toast.success("Project member created successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const showError = () => {
    toast.error("Project member was not created!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectId) {
      showError();
      return;
    }

    const newProjectMember: ProjectMember = {
      project_id: projectId,
      user_id,
      role,
    };

    try {
      await AddProjectMember(newProjectMember);
      showSuccess();

      setRole("");
      navigate(`/ProjectMembers/${projectId}`);
    } catch (error) {
      showError();
    }
  };

  const handleUsersSearch = (search: string) => {
    setUserId(search);

    if (search) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };
  return (
    <>
      <MainHeader />
      <br />
      <br />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="TaskQuest" src={Img} className="mx-auto h-20 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create a Project Member
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Role
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  placeholder="Title"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                User
              </label>
              <div className="mt-2 relative">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  placeholder="Search for user"
                  required
                  value={user_id}
                  onChange={(e) => handleUsersSearch(e.target.value)}
                  onFocus={() => setIsDropdownVisible(true)}
                  onBlur={() =>
                    setTimeout(() => setIsDropdownVisible(false), 200)
                  }
                />
                <div className="relative">
                  {isDropdownVisible && filteredUsers.length > 0 && (
                    <div className="absolute z-10 bg-white border rounded-md w-full mt-1 max-h-40 overflow-y-auto shadow-lg">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setUserId(user.id);
                            setIsDropdownVisible(false);
                          }}
                        >
                          {user.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Project Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
