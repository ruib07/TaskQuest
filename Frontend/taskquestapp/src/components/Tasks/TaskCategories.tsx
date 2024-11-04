import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetTaskListsByProjectIdService } from "../../services/Tasks/getTaskListsByProjectId";
import { TaskList } from "../../types/taskList";
import MainHeader from "../../layouts/Header/MainHeader";
import { GetProjectById } from "../../services/Projects/getProjectById";
import { Project } from "../../types/project";

export default function TaskCategories() {
  const { projectId } = useParams<{ projectId: string }>();
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskLists = async () => {
      try {
        const projectResponse = await GetProjectById(projectId!);
        setProject(projectResponse?.data);

        const taskResponse = await GetTaskListsByProjectIdService(projectId!);
        setTaskLists(taskResponse?.data || []);
      } catch (error) {
        setError("Failed to load task lists");
      }
    };

    fetchTaskLists();
  }, [projectId]);

  return (
    <div className="bg-white min-h-screen">
      <MainHeader />
      <br />
      <br />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-12 text-center">
          Task Categories
        </h1>

        {error && <p className="text-center text-red-500 mb-6">{error}</p>}

        {taskLists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {taskLists.map((taskList) => (
              <div
                key={taskList.id}
                className="bg-white shadow-lg rounded-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 text-center cursor-pointer"
              >
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  {taskList.name}
                </h3>
                <p className="text-gray-500 mb-6">
                  Task list for project: {project?.name}
                </p>
                <div className="flex space-x-4 justify-center">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-500 transition duration-200"
                    onClick={() =>
                      navigate(`/Tasks/${taskList.id}`, {
                        state: { taskListName: taskList.name },
                      })
                    }
                  >
                    See Tasks
                  </button>
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-500 transition duration-200"
                    onClick={() => navigate(`/AddTask`)}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-12 text-lg">
            No task categories found for this project.
          </p>
        )}
      </div>
    </div>
  );
}
