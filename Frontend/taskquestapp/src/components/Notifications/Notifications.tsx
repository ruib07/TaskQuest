import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import {
  GetNotificationsByUser,
  MarkAsRead,
  DeleteNotification,
} from "../../services/notificationsService";

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      const response = await GetNotificationsByUser();
      setNotifications(response?.data || []);
    } catch (error) {
      setError(`Failed to load notifications: ${error}`);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await MarkAsRead(id);
      setNotifications((prev: any) =>
        prev.map((notification: any) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await DeleteNotification(id);
      setNotifications((prev) =>
        prev.filter((notification: any) => notification.id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Menu as="div" className="relative">
      <MenuButton className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="sr-only">View notifications</span>
        <BellIcon aria-hidden="true" className="h-6 w-6" />
        {notifications.some((n: any) => !n.read) && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
        )}
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-4 py-2 text-sm font-medium text-gray-700">
          Notifications
        </div>
        {notifications.length === 0 ? (
          <div className="px-4 py-2 text-sm text-gray-500">
            No notifications
          </div>
        ) : (
          notifications.map((notification: any) => (
            <MenuItem
              as="div"
              key={notification.id}
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
            >
              <div className="flex-grow">
                <p
                  className={
                    notification.read ? "text-gray-500" : "text-gray-800"
                  }
                >
                  {notification.content}
                </p>
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Mark as read
                  </button>
                )}
              </div>
              <button
                onClick={() => handleDelete(notification.id)}
                className="text-red-500 ml-2"
              >
                Delete
              </button>
            </MenuItem>
          ))
        )}
      </MenuItems>
    </Menu>
  );
}
