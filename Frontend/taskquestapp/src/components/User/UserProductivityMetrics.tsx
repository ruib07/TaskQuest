import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { GetTaskListsByProjectId } from "../../services/Tasks/GET/getTaskListsByProjectId";
import { GetTasksByTaskListId } from "../../services/Tasks/GET/getTasksByTaskListId";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import MainHeader from "../../layouts/Header/MainHeader";

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

export default function UserProductivityMetrics() {
  const { projectId, userId } = useParams<{
    projectId: string;
    userId: string;
  }>();
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const taskListsResponse = await GetTaskListsByProjectId(projectId!);
        console.log("task list response: ", taskListsResponse?.data);
        const taskLists = taskListsResponse?.data;

        let totalCompletedTasks = 0;

        for (const taskList of taskLists) {
          const tasksResponse = await GetTasksByTaskListId(taskList.id);
          console.log("tasks response: ", tasksResponse?.data);
          const tasks = tasksResponse?.data;

          const userCompletedTasks = tasks.filter(
            (task: any) =>
              task.assigned_to === userId && task.status === "Completed"
          );

          console.log("completed tasks: ", userCompletedTasks);
          totalCompletedTasks += userCompletedTasks.length;
        }

        setCompletedTasksCount(totalCompletedTasks);
      } catch (error) {
        console.error("Failed to fetch completed tasks", error);
      }
    };

    fetchCompletedTasks();
  }, [projectId, userId]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: ["Completed Tasks"],
          datasets: [
            {
              label: "Number of Tasks",
              data: [completedTasksCount],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              barThickness: 130,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 30,
            },
          },
        },
      });
    }
  }, [completedTasksCount]);

  return (
    <>
      <MainHeader />
      <br />
      <br />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          User Productivity Metrics
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Task completed: {completedTasksCount}
        </p>
        <canvas
          ref={chartRef}
          id="productivityChart"
          width="400"
          height="200"
        ></canvas>
      </div>
    </>
  );
}
