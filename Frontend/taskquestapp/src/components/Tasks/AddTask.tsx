import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Img from "../../assets/TaskQuestLogo.png";
import MainHeader from "../../layouts/Header/MainHeader";
import { GetAllUsers } from "../../services/Users/GET/getAllUsers";
import { AddTask } from "../../services/Tasks/POST/addTask";
import { NewTask } from "../../types/Tasks/newTask";

export default function AddNewTask() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("Pending");
  const [due_date, setDueDate] = useState<string>("");
  const [assigned_to, setAssignedTo] = useState<string>("");
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { taskListId } = useParams<{ taskListId: string }>();
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
  }, []);

  const showSuccess = () => {
    toast.success("Task created successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const showError = () => {
    toast.error("Task was not created!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskListId) {
      showError();
      return;
    }

    const newTask: NewTask = {
      title,
      description,
      status,
      due_date,
      task_list_id: taskListId,
      assigned_to,
    };

    try {
      await AddTask(newTask);
      showSuccess();

      setTitle("");
      setDescription("");
      setStatus("Pending");
      setDueDate("");
      navigate(`/Tasks/${taskListId}`);
    } catch (error) {
      showError();
    }
  };

  const handleUsersSearch = (search: string) => {
    setAssignedTo(search);

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
            Create a Task
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  placeholder="Description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Status
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Due Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  placeholder="DueDate"
                  required
                  value={due_date}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Assigned to
              </label>
              <div className="mt-2 relative">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  placeholder="Search for user"
                  required
                  value={assigned_to}
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
                            setAssignedTo(user.id);
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
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
