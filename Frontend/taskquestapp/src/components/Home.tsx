import { useEffect, useState } from "react";
import MainHeader from "../layouts/Header/MainHeader";
import { GetUserService } from "../services/Users/getMyUserById";
import { GetTasksByUserIdService } from "../services/Tasks/getTasksByUserId";
import { Task } from "../types/Tasks/task";

export default function HomeComponent() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [totalTasksCount, setTotalTasksCount] = useState(0);
  const [trackedHours, setTrackerHours] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await GetUserService();
        const { name } = response?.data;
        setUser({ name });

        const tasksResponse = await GetTasksByUserIdService();
        const allTasks = tasksResponse?.data;

        const completedTasks = allTasks.filter(
          (task: Task) => task.status === "Completed"
        );
        setCompletedTasksCount(completedTasks.length);
        setTotalTasksCount(allTasks.length);

        const pendingTasks = allTasks.filter(
          (task: Task) => task.status !== "Completed"
        );
        setTasks(pendingTasks);

        setTrackerHours(5.5);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <MainHeader />
      <br />
      <div className="overflow-hidden max-h-screen">
        <main className="pt-16 max-h-screen overflow-auto">
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 mb-5">
                <h1 className="text-3xl font-bold mb-10">Your Dashboard</h1>
                <hr className="my-10" />

                <div className="grid grid-cols-2 gap-x-20">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Stats</h2>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <div className="p-4 bg-green-100 rounded-xl">
                          <div className="font-bold text-xl text-gray-800 leading-none">
                            Good day, {user?.name}
                          </div>
                          <div className="mt-5">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition"
                            >
                              Start tracking
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                        <div className="font-bold text-2xl leading-none">
                          {completedTasksCount}
                        </div>
                        <div className="mt-2">Tasks finished</div>
                      </div>
                      <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                        <div className="font-bold text-2xl leading-none">
                          {trackedHours}
                        </div>
                        <div className="mt-2">Tracked hours</div>
                      </div>
                      <div className="col-span-2">
                        <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                          <div className="font-bold text-xl leading-none">
                            Your daily plan
                          </div>
                          <div className="mt-2">
                            {completedTasksCount} of {totalTasksCount} completed
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Tasks to complete
                    </h2>

                    <div className="space-y-4">
                      {tasks.map((task, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white border rounded-xl text-gray-800 space-y-2"
                        >
                          <div className="flex justify-between">
                            <div className="text-gray-400 text-xs">
                              Task #{index + 1}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {new Date(task.due_date).toLocaleDateString()}
                            </div>
                          </div>
                          <a
                            href="/"
                            className="font-bold hover:text-yellow-800 hover:underline"
                          >
                            {task.title}
                          </a>
                          <div className="text-sm text-gray-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              className="text-gray-800 inline align-middle mr-1"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                            {task.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
