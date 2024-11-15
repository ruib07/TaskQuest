import { useCallback, useEffect, useState } from "react";
import { GetMessagesByProject, AddMessage } from "../../services/chatService";
import { ChatMessage } from "../../types/Chat/chatMessages";
import { useNavigate, useParams } from "react-router-dom";
import MainHeader from "../../layouts/Header/MainHeader";
import { GetUserById } from "../../services/userService";
import { AddNotification } from "../../services/notificationsService";
import { Notification } from "../../types/Notifications/notification";

export default function ProjectMessages() {
  const { projectId } = useParams<{ projectId: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [, setError] = useState<string | null>(null);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const currentUserId = localStorage.getItem("id") || "";
  const navigate = useNavigate();

  const fetchMessages = useCallback(async () => {
    if (!projectId) return;
    try {
      const response = await GetMessagesByProject(projectId);
      const loadedMessages = response?.data || [];
      setMessages(loadedMessages);

      loadedMessages.forEach(async (message: any) => {
        if (!userNames[message.sender_id]) {
          try {
            const userResponse = await GetUserById(message.sender_id);
            const userName = userResponse?.data?.name || "Unknown";
            setUserNames((prevNames) => ({
              ...prevNames,
              [message.sender_id]: userName,
            }));
          } catch (error) {
            setError(`Failed to load user name: ${error}`);
          }
        }
      });
    } catch (error) {
      setError(`Failed to load chat messages: ${error}`);
    }
  }, [projectId, userNames]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      alert("Digite uma mensagem antes de enviar.");
      return;
    }

    const messageData: ChatMessage = {
      project_id: projectId!,
      sender_id: currentUserId,
      content: newMessage,
      sent_at: new Date().toISOString(),
    };

    try {
      await AddMessage(messageData);

      const notification: Notification = {
        user_id: currentUserId,
        content: `New Message from ${currentUserId} on project ${projectId}`,
        read: false,
      };

      await AddNotification(notification);
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      setError(`Error sending message: ${error}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <MainHeader />
      <br />
      <br />
      <div className="min-h-screen bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Project Chat</h1>
          <button
            onClick={() => navigate(`/Project/${projectId}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Back to Project
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-4 mb-6 max-h-[500px] overflow-y-auto border border-gray-300">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`py-2 px-3 rounded-lg mb-2 ${
                  message.sender_id === currentUserId
                    ? "text-black-800 self-end"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm">
                  <span className="font-semibold">
                    {message.sender_id === currentUserId
                      ? "You"
                      : userNames[message.sender_id] || message.sender_id}
                  </span>
                  : {message.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet.</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="w-full p-2 border border-gray-300 rounded mr-2"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
