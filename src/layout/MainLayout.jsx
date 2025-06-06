// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <Navbar />
      <main className="pt-20 px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
