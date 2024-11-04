import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import RegistrationComponent from "./components/Auth/UserRegistration";
import LoginComponent from "./components/Auth/UserLogin";
import HomeComponent from "./components/Home";
import NotFoundPage from "./components/404";
import ProjectsComponent from "./components/Projects/Projects";
import AddProjectComponent from "./components/Projects/AddProject";
import ProjectDetails from "./components/Projects/ProjectDetails";
import TeamComponent from "./components/Team";
import ScrollToTop from "./hooks/ScrollToTop";
import TaskCategories from "./components/Tasks/TaskCategories";
import TasksByTaskList from "./components/Tasks/TasksByTaskCategory";
import TasksByUser from "./components/Tasks/TasksByUser";
import Footer from "./layouts/Footer/Footer";
import AddTaskCategoryComponent from "./components/Tasks/AddTaskCategory";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ToastContainer />
        <ScrollToTop />

        <div className="flex-grow container mx-auto">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/Dashboard" element={<HomeComponent />} />
            <Route
              path="/Authentication/Registration"
              element={<RegistrationComponent />}
            />
            <Route path="/Authentication/Login" element={<LoginComponent />} />
            <Route path="/Team" element={<TeamComponent />} />
            <Route path="/Projects" element={<ProjectsComponent />} />
            <Route path="/Project/:projectId" element={<ProjectDetails />} />
            <Route path="/AddProject" element={<AddProjectComponent />} />
            <Route
              path="/TaskCategories/:projectId"
              element={<TaskCategories />}
            />
            <Route path="/Tasks/:taskListId" element={<TasksByTaskList />} />
            <Route path="/Tasks/byUser" element={<TasksByUser />} />
            <Route
              path="/AddTaskCategory/:projectId"
              element={<AddTaskCategoryComponent />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
