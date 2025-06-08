import React, { useEffect, useState } from "react";
import ManageCourse from "./ManageCourse";
import CreateSubject from "./CreateSubject";

const ReviewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selector, setSelector] = useState("manage");

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  return (
    <div className="flex justify-center mt-4 sm:mt-16">
 
      <div className="flex flex-col border-slate-200 border shadow-lg w-[95%] sm:w-[80%] rounded-lg pb-6">
        <div className="flex gap-4 p-4 mt-4">
          <button onClick={()=> setSelector("manage")} className = {`w-[50%] shadow-lg p-4 text-lg rounded-lg font-bold ${selector==="manage" ? "text-blue-600 bg-blue-100" : "text-slate-700 bg-slate-50" } border border-slate-100  hover:bg-blue-50 hover:scale-103 transition cursor-pointer`}> Manage Course </button>
          <button onClick={()=> setSelector("create")} className = {`w-[50%] shadow-lg p-4 text-lg rounded-lg font-bold ${selector==="create" ? "text-blue-600 bg-blue-100" : "text-slate-700 bg-slate-50" } border border-slate-100  hover:bg-blue-50 hover:scale-103 transition cursor-pointer`}> Add Course </button>
        </div>

        <div>
          {selector === "create" ? (<CreateSubject/>) : (<ManageCourse/>)}
        </div>
      </div>

      
      
    </div>
  )
};

export default ReviewCourses;
