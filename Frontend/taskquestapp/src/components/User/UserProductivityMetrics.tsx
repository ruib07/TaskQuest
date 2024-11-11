/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  GetTaskListsByProjectId,
  GetTasksByTaskListId,
} from "../../services/taskService";
import {
  AddProductivityMetric,
  UpdateProductivityMetricData,
  GetProductivityMetricByUser,
} from "../../services/productivityMetricService";
import { ProductivityMetric } from "../../types/ProductivityMetrics/productivityMetric";
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
  const [, setMetricId] = useState<string | null>(null);
  const [, setError] = useState<string | null>(null);

  const saveOrUpdateProductivityMetric = async (count: number) => {
    try {
      const existingMetric = await GetProductivityMetricByUser(userId!);
      const productivityMetricData = existingMetric?.data;

      if (productivityMetricData) {
        const currentCount = productivityMetricData.tasks_completed;
        if (count > currentCount) {
          await UpdateProductivityMetricData(productivityMetricData.id, {
            tasks_completed: count,
          });
          setMetricId(productivityMetricData.id);
        }
      } else {
        const newMetric: ProductivityMetric = {
          projectId: projectId!,
          userId: userId!,
          tasks_completed: count,
        };
        const response = await AddProductivityMetric(newMetric);
        setMetricId(response?.data.id);
      }
    } catch (error) {
      setError(`Failed to save or update productivity metric: ${error}`);
    }
  };

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const taskListsResponse = await GetTaskListsByProjectId(projectId!);
        const taskLists = taskListsResponse?.data;

        let totalCompletedTasks = 0;

        for (const taskList of taskLists) {
          const tasksResponse = await GetTasksByTaskListId(taskList.id);
          const tasks = tasksResponse?.data;

          const userCompletedTasks = tasks.filter(
            (task: any) =>
              task.assigned_to === userId && task.status === "Completed"
          );

          totalCompletedTasks += userCompletedTasks.length;
        }

        setCompletedTasksCount(totalCompletedTasks);

        await saveOrUpdateProductivityMetric(totalCompletedTasks);
      } catch (error) {
        setError(`Failed to fetch completed tasks: ${error}`);
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
          labels: [`Completed Tasks: ${completedTasksCount}`],
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
        <h1 className="text-3xl text-center font-bold text-blue-600 mb-8">
          Productivity Metrics
        </h1>
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
