
import ProtectedRoute from "../components/ProtectedRoute";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import CourseDetails from "../pages/CourseDetails";

function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (!user) {
    // Not logged in — redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in — allow access
  return children;
}

export default function AppRoutes() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      {/* Redirect '/' based on login status */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={`/user/${user._id}`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/login" element={<Landing />} />

      <Route
        path="/user/:id/*"
        element={
          
            <Dashboard />
        }
      />

      <Route path="/courses/:id" element={<CourseDetails />} />
    </Routes>
  );
}
