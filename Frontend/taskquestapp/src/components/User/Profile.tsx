import { useEffect, useState } from "react";
import { GetMyUser } from "../../services/Users/GET/getMyUserById";
import { UpdateUserData } from "../../services/Users/PUT/updateUserData";
import MainHeader from "../../layouts/Header/MainHeader";
import { User } from "../../types/Users/user";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await GetMyUser();
        setUser(userResponse?.data);
        setEditName(userResponse?.data.name);
        setEditEmail(userResponse?.data.email);
      } catch (error) {
        console.error("Failed to load user details");
      }
    };

    fetchUserDetails();
  }, []);

  const showError = () => {
    toast.error("Data was not updated!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await UpdateUserData({
        name: editName,
        email: editEmail,
        ...(editPassword && { password: editPassword }),
      });
      window.location.reload();
      setIsEditing(false);
    } catch (error) {
      showError();
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(user?.name || "");
    setEditEmail(user?.email || "");
    setEditPassword("");
  };

  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-lg text-gray-600">User not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <MainHeader />
      <br />
      <br />
      <h1 className="text-3xl font-bold mb-6 text-center mt-6">Your Profile</h1>
      <div className="container mx-auto p-8 flex flex-col items-center">
        <img
          src="https://pngimg.com/d/anonymous_mask_PNG28.png"
          alt="User avatar"
          className="w-32 h-32 mb-6 rounded-full border-4 border-gray-300"
        />

        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">
            {isEditing ? (
              <input
                type="text"
                className="border rounded-md p-2 w-full"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            ) : (
              user.name
            )}
          </h1>
          <p className="text-gray-700 mb-4">
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                type="email"
                className="border rounded-md p-2 w-full"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            ) : (
              user.email
            )}
          </p>
          {isEditing && (
            <div className="relative mb-4">
              <label className="text-gray-700">
                <strong>Password:</strong>
              </label>
              <input
                type={visible ? "password" : "text"}
                className="border rounded-md p-2 w-full pr-10"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <span
                className="absolute inset-y-11 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} />
              </span>
            </div>
          )}

          {isEditing ? (
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-200"
            >
              Edit Info
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
