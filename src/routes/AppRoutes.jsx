// AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
//import Login from "../pages/Login";
import GoogleLogin from "../components/GoogleLogin";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import CourseDetails from "../pages/CourseDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<GoogleLogin />} />
      <Route path="/user/:id/*" element={
          //<ProtectedRoute>
            <Dashboard />
          //</ProtectedRoute>
        }
      />
      <Route path="/courses/:id" element={<CourseDetails />} />
    </Routes>
  );
};

export default AppRoutes;
