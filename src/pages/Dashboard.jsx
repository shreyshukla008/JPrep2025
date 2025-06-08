import { useEffect } from "react";
import { useParams, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCourses } from "../redux/courseSlice";
import { fetchStarred } from "../redux/starredSlice";


import Navbar from "../components/Navbar";
import Home from "./Home";
import CoursePage from "./CoursePage";
import Upload from "./Upload";
import Starred from "./Starred";
import AdminPanel from "./AdminPanel";
import ReviewUnverified from "./ReviewUnverified";
import ReviewCourses from "./ReviewCourses";
import DeletePaper from "./DeletePaper";

const Dashboard = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchCourses());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCourses())
      .unwrap()
      .then(data => console.log("Fetch successful:", data))
      .catch(err => console.error("Fetch failed:", err));
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchStarred(user._id));
    }
  }, [dispatch, user?._id]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="h-screen bg-light-bg text-light-text">

      <div>
        <Navbar userId={id} onLogout={handleLogout} onLogin={handleLogin} />
      </div>
      
      <div>
        <main className="sm:pt-[6rem] pb-[8rem]">
          <Routes>
            <Route path="home" element={<Home />} />

            <Route path="courses" element={<CoursePage />} />

            <Route path="upload" element={<Upload />} />

            <Route path="starred" element={<Starred />} />

            <Route path="admin" element={user?.role === "Admin" || user?.role === "Owner" ? 
              (<AdminPanel />) : 
              (<Navigate to={`/user/${id}/home`} replace />)
            }/>

             <Route
              path="admin/review-unverified"
              element={
                user?.role === "Admin" || user?.role === "Owner" ? (
                  <ReviewUnverified />
                ) : (
                  <Navigate to={`/user/${id}/home`} replace />
                )
              }
            />

            
            <Route
              path="admin/review-courses"
              element={
                user?.role === "Admin" || user?.role === "Owner" ? (
                  <ReviewCourses />
                ) : (
                  <Navigate to={`/user/${id}/home`} replace />
                )
              }
            />

            <Route
              path="admin/delete-paper"
              element={
                user?.role === "Admin" || user?.role === "Owner" ? (
                  <DeletePaper />
                ) : (
                  <Navigate to={`/user/${id}/home`} replace />
                )
              }
            />

            <Route path="*" element={<Navigate to={`/user/${id}/home`} />} />


          </Routes>
        </main>
      </div>
      
    </div>
  );
};

export default Dashboard;
