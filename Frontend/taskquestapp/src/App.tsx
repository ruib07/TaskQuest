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

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/Dashboard" element={<HomeComponent />} />
          <Route
            path="/Authentication/Registration"
            element={<RegistrationComponent />}
          />
          <Route path="/Authentication/Login" element={<LoginComponent />} />
          <Route path="/Projects" element={<ProjectsComponent />} />
          <Route path="/AddProject" element={<AddProjectComponent />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
