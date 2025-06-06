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

  return (
    <div className="h-screen bg-light-bg text-light-text">

      <div>
        <Navbar userId={id} onLogout={handleLogout} />
      </div>
      
      <div>
        <main className="sm:pt-[6rem] pb-[8rem]">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="courses" element={<CoursePage />} />
            <Route path="upload" element={<Upload />} />
            <Route path="starred" element={<Starred />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to={`/user/${id}/home`} />} />
          </Routes>
        </main>
      </div>
      
    </div>
  );
};

export default Dashboard;
