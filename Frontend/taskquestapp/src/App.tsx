import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import UserRegistration from "./components/Auth/UserRegistration";
import Authentication from "./components/Auth/UserLogin";
import UserProfile from "./components/User/Profile";

import Dashboard from "./components/Dashboard";
import TeamMembers from "./components/Team";
import NotFound from "./components/404";

import Projects from "./components/Projects/Projects";
import AddProject from "./components/Projects/AddProject";
import ProjectDetails from "./components/Projects/ProjectDetails";
import ProjectMembers from "./components/Projects/ProjectMembers";
import AddProjectMember from "./components/Projects/AddProjectMember";
import ProjectMessages from "./components/Chat/ProjectMessages";

import TaskCategories from "./components/Tasks/TaskCategories";
import AddTaskCategory from "./components/Tasks/AddTaskCategory";
import TasksByTaskList from "./components/Tasks/TasksByTaskCategory";
import TasksByUser from "./components/Tasks/TasksByUser";
import AddTask from "./components/Tasks/AddTask";
import TaskDetails from "./components/Tasks/TaskDetails";

import ScrollToTopButton from "./hooks/ScrollToTopButton";
import GoToTopPage from "./hooks/GoToTopPage";
import Footer from "./layouts/Footer/Footer";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ToastContainer />
        <GoToTopPage />
        <ScrollToTopButton />

        <div className="flex-grow container mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route
              path="/Authentication/Registration"
              element={<UserRegistration />}
            />
            <Route path="/Authentication/Login" element={<Authentication />} />
            <Route path="/Profile" element={<UserProfile />} />
            <Route path="/Team" element={<TeamMembers />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Project/:projectId" element={<ProjectDetails />} />
            <Route path="/AddProject" element={<AddProject />} />
            <Route
              path="/ProjectMembers/:projectId"
              element={<ProjectMembers />}
            />
            <Route
              path="/AddProjectMembers/:projectId"
              element={<AddProjectMember />}
            />
            <Route
              path="/ChatMessages/:projectId"
              element={<ProjectMessages />}
            />
            <Route
              path="/TaskCategories/:projectId"
              element={<TaskCategories />}
            />
            <Route path="/Tasks/:taskListId" element={<TasksByTaskList />} />
            <Route path="/Tasks/byUser" element={<TasksByUser />} />
            <Route
              path="/AddTaskCategory/:projectId"
              element={<AddTaskCategory />}
            />
            <Route path="/AddTask/:taskListId" element={<AddTask />} />
            <Route path="/TaskDetails/:taskId" element={<TaskDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
