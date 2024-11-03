import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
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

export default function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <ToastContainer />
        <ScrollToTop />
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}
