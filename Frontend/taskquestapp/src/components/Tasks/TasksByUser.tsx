import { useEffect, useState } from "react";
import { Task } from "../../types/Tasks/task";
import MainHeader from "../../layouts/Header/MainHeader";
import { GetTasksByUserIdService } from "../../services/Tasks/getTasksByUserId";

export default function TasksByUser() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskResponse = await GetTasksByUserIdService();
        setTasks(taskResponse?.data);
      } catch (error) {
        setError("Failed to load tasks");
      }
    };

    fetchTasks();
  });

  return (
    <>
      <MainHeader />
      <br />
      <br />
      <div className="bg-white min-h-screen">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-12 text-center">
            Tasks for You
          </h1>

          {error && <p className="text-center text-red-500 mb-6">{error}</p>}

          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tasks.map((task) => (
                <div
                  key={task.title}
                  className="bg-white shadow-lg rounded-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 text-center cursor-pointer"
                >
                  <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                    {task.title}
                  </h3>
                  <p className="text-gray-500 mb-4">{task.description}</p>
                  <p className="text-gray-700 mb-4">
                    Status: <span className="font-semibold">{task.status}</span>
                  </p>
                  <p className="text-gray-500">
                    Due Date:{" "}
                    <span className="font-semibold">
                      {new Date(task.due_date).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-12 text-lg">
              No tasks found for you.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
