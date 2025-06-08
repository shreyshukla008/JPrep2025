import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addStarred, removeStarred, fetchStarred } from "../redux/starredSlice";

const CourseDetails = ({ course }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [papersByTerm, setPapersByTerm] = useState({
    Term1: [],
    Term2: [],
    Term3: [],
  });
  const [openTerm, setOpenTerm] = useState(null);

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const starredCourses = useSelector((state) => state.starred.list);
  const isStarred = starredCourses.includes(course?._id);

  // Fetch starred list for this user
  useEffect(() => {
    if (userId) {
      dispatch(fetchStarred(userId));
    }
  }, [dispatch, userId]);

  // Fetch question papers by term
  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/subject/${course._id}/question-papers`);
        console.log("received res of quesition papers; ", res);
        setPapersByTerm(res.data);
      } catch (error) {
        console.error("Failed to fetch question papers:", error);
      }
    };

    if (course?._id) fetchQuestionPapers();
  }, [course]);

  const handleAddStarred = async () => {
    if (!userId) return alert("User not logged in");

    const user = JSON.parse(localStorage.getItem("user"));
    const isGuest = user?.role === "Guest";
    

    if(isGuest) return;

    setLoading(true);
    try {
      await dispatch(addStarred({ subjectId: course._id, userId }));
      await dispatch(fetchStarred(userId));
    } catch (error) {
      console.error("Add starred failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStarred = async () => {
    if (!userId) return alert("User not logged in");
    setLoading(true);
    try {
      await dispatch(removeStarred({ subjectId: course._id, userId }));
      await dispatch(fetchStarred(userId));
    } catch (error) {
      console.error("Remove starred failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTerm = (term) => {
    setOpenTerm((prev) => (prev === term ? null : term));
  };

  const renderPapers = (papers) => {
    if (papers.length === 0) {
      return <p className="text-gray-500 text-sm">No papers available.</p>;
    }

    return papers.map((paper) => (
      <div key={paper._id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:pr-6 border-b-2 border-sky-900 p-2 rounded mb-2 bg-gray-50">
        <div className="flex flex-col">
        <div className="font-semibold">{paper.name} ({paper.year}) - {paper.term}</div>
        <div className="text-sm text-gray-600">Updated By: {paper.contributor}</div>
        <div className="text-sm text-gray-600">Last Updated: {paper.createdAt}</div>
        </div>
        <div className="text-blue-600 text-sm space-x-4 mt-1 flex gap-8">
          <a href={paper.viewLink} target="_blank" rel="noopener noreferrer">View</a>
          <a href={paper.downloadLink} target="_blank" rel="noopener noreferrer">Download</a>
        </div>
      </div>
    ));
  };

  if (!course) return null;

  return (
    <div className="sm:p-4 space-y-4 pt-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">{course.name}</h2>
          <p className="text-sm text-gray-600">Course Code: {course.code}</p>
          <p className="text-sm text-gray-600 text-justify">Department: {course.department}</p>
        </div>

        <button
          onClick={isStarred ? handleRemoveStarred : handleAddStarred}
          disabled={loading}
          className={`px-3 py-1 rounded font-semibold shadow-sm ${
            JSON.parse(localStorage.getItem("user"))?.role === "Guest" ? ("bg-slate-100 text-black"):
            (isStarred ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-700')}`
          }
        >
          {JSON.parse(localStorage.getItem("user"))?.role === "Guest" ?
          (<div className="flex flex-col cursor-not-allowed"> 
              <p>☆</p> 
              <p className="text-red-600 text-sm sm:text-md">*Login </p>
            </div>):
          (isStarred ? 
          (<div className="flex gap-2 cursor-pointer"> 
              <p>★</p> 
              <p className="hidden sm:block"> Starred </p>
            </div>) : 
          (<div className="flex gap-2 cursor-pointer">  
            <p> ☆ </p> 
            <p className="hidden sm:block"> Star this </p>
            </div>))
          }
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-4 ">
        {["Term1", "Term2", "Term3"].map((term) => (
          <div key={term}>
            <button
              onClick={() => toggleTerm(term)}
              className="w-full flex justify-between items-center text-left bg-blue-100 hover:cursor-pointer hover:bg-blue-200 font-medium px-4 py-2 sm:px-6 sm:py-4 rounded"
            >

              <p> {term} </p>
              <p> {openTerm === term ? "▲" : "▼"} </p>
               
            </button>
            {openTerm === term && (
              <div className="mt-2 sm:pl-4">{renderPapers(papersByTerm[term])}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
