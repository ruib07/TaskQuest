import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Img from "../../assets/TaskQuestLogo.png";
import MainHeader from "../../layouts/Header/MainHeader";
import { NewTaskList } from "../../types/Tasks/newTaskList";
import { AddTaskList } from "../../services/taskService";

export default function AddTaskCategory() {
  const [name, setName] = useState<string>("");
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const showSuccess = () => {
    toast.success("Project created successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const showError = () => {
    toast.error("Project was not created!", {
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

    const newTaskList: NewTaskList = {
      name,
      project_id: projectId,
    };

    try {
      await AddTaskList(newTaskList);
      showSuccess();

      setName("");
      navigate(`/TaskCategories/${projectId}`);
    } catch (error) {
      showError();
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
            Create a Task Category
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Task Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
