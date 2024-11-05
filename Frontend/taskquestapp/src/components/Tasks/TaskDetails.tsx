import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetTaskByIdService } from "../../services/Tasks/getTaskById";
import { GetTaskCommentsByTaskService } from "../../services/Tasks/getTaskCommentsByTask";
import { GetUserByIdService } from "../../services/Users/getUserById";
import { Task } from "../../types/Tasks/task";
import { TaskComment } from "../../types/Tasks/taskComments";
import { AddTaskCommentService } from "../../services/Tasks/addTaskComment";
import MainHeader from "../../layouts/Header/MainHeader";
import { UpdateTaskDataService } from "../../services/Tasks/updateTaskData";

export default function TaskDetails() {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskResponse = await GetTaskByIdService(taskId!);
        setTask(taskResponse?.data);
        setEditTitle(taskResponse?.data.title);
        setEditDescription(taskResponse?.data.description);
      } catch (error) {
        console.error("Failed to load task details");
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await GetTaskCommentsByTaskService(taskId!);
        setComments(commentsResponse || []);
      } catch (error) {
        console.error("Failed to load comments");
      }
    };

    fetchComments();
  }, [taskId]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const newNames: { [key: string]: string } = {};

      for (const comment of comments) {
        try {
          const userResponse = await GetUserByIdService(comment.user_id);
          newNames[comment.user_id] = userResponse?.data?.name || "Unknown";
        } catch {
          newNames[comment.user_id] = "Unknown";
        }
      }

      setUserNames(newNames);
    };

    if (comments.length > 0) {
      fetchUserNames();
    }
  }, [comments]);

  const handleStatusChange = async () => {
    if (task && task.status !== "Completed") {
      try {
        await UpdateTaskDataService(taskId!, {
          status: "Completed",
        });
        window.location.reload();
      } catch (error) {
        console.error("Failed to update task status");
      }
    }
  };

  const handleSaveChanges = async () => {
    if (task) {
      try {
        await UpdateTaskDataService(taskId!, {
          title: editTitle,
          description: editDescription,
        });
        window.location.reload();
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to save changes");
      }
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const userId = localStorage.getItem("id");

    const newTaskComment: TaskComment = {
      task_id: taskId!,
      user_id: userId!,
      content: newComment,
      created_at: new Date().toISOString(),
    };

    try {
      await AddTaskCommentService(newTaskComment);
      setNewComment("");

      const commentsResponse = await GetTaskCommentsByTaskService(taskId!);
      setComments(commentsResponse || []);
    } catch (error) {
      console.error("Failed to add comment");
    }
  };

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-lg text-gray-600">Task not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <MainHeader />
      <br />
      <br />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          {isEditing ? (
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          ) : (
            task.title
          )}
        </h1>
        <p className="text-gray-700 mb-4">
          <strong>Description:</strong>{" "}
          {isEditing ? (
            <textarea
              className="border rounded-md p-2 w-full"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          ) : (
            task.description
          )}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Status:</strong> {task.status}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Due Date:</strong>{" "}
          {new Date(task.due_date).toLocaleDateString()}
        </p>

        <button
          onClick={handleStatusChange}
          className="bg-green-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-green-500 transition duration-200"
          disabled={task.status === "Completed"}
        >
          {task.status === "Completed" ? "Task Completed" : "Mark as Completed"}
        </button>

        {isEditing ? (
          <button
            onClick={handleSaveChanges}
            className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-500 transition duration-200 ml-4"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-yellow-500 transition duration-200 ml-4"
          >
            Edit Task
          </button>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Comments
          </h2>
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md">
                <h4 className="font-bold text-gray-700">
                  {userNames[comment.user_id] || "Unknown User"}
                </h4>
                <p>{comment.content}</p>
                <small className="text-gray-500">
                  {new Date(comment.created_at).toLocaleString()}
                </small>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-500 transition duration-200"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
