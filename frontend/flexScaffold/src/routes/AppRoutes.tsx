import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import JobSite from "../pages/JobSite";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/jobsites/:id" element={<JobSite />} />
    </Routes>
  );
}

export default AppRoutes;
