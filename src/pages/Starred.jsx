// src/pages/Starred.jsx

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import CourseDetails from './CourseDetails';
import { fetchStarred } from '../redux/starredSlice';

const Starred = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const allCourses = useSelector((state) => state.courses.list);
  const starredIds = useSelector((state) => state.starred.list);
  const starredLoading = useSelector((state) => state.starred.loading);

  useEffect(() => {
    if (userId) {
      dispatch(fetchStarred(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedCourse]);

  const starredCourses = allCourses.filter((course) =>
    starredIds.includes(course._id || course.id)
  );

  const filteredCourses = starredCourses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  // React portal for modal
  const modalRoot = document.getElementById('modal-root');
  const modal = selectedCourse && modalRoot
    ? ReactDOM.createPortal(
        <div
          className="fixed inset-0 bg-slate-600/90 flex items-start justify-center pt-20 z-50 overflow-y-auto"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute cursor-pointer top-2 right-3 text-red-500 hover:text-red-700 text-xl"
            >
              ❌
            </button>
            <CourseDetails course={selectedCourse} />
          </div>
        </div>,
        modalRoot
      )
    : null;

  return (
    <div className="p-4 mt-6 flex flex-col gap-4">
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search Starred Courses..."
      />

      {
        JSON.parse(localStorage.getItem("user"))?.role === "Guest" ?
        (<p className='text-lg font-semibold text-red-600 mt-8'>*Login to Star Subjects...</p>):
      (
      starredLoading ? (
        <p className="text-gray-500 mt-4">Loading starred courses...</p>
      ) : filteredCourses.length === 0 ? (
        <p className="text-gray-500 mt-4">No starred courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {filteredCourses.map((course) => (
            <div
              key={course._id || course.id}
              onClick={() => setSelectedCourse(course)}
              className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100 hover:scale-103 transition"
            >
              <h3 className="text-xl font-semibold">{course.name}</h3>
              <p className="text-gray-600">Course ID: {course.code}</p>
            </div>
          ))}
        </div>
      ))
    }
      {modal}
    </div>
  );
};

export default Starred;
