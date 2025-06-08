// src/pages/Courses.jsx

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../components/SearchBar';
import { useSelector } from 'react-redux';
import CourseDetails from './CourseDetails';

const Courses = () => {
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courseList = useSelector((state) => state.courses.list);

  // Prevent background scroll when popup is open
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

  useEffect(() => {
    if (courseList?.length > 0) {
      setCourses(courseList);
    }
  }, [courseList]);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  // Modal content rendered in portal
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
              className="absolute top-2 right-3 text-red-500 hover:text-red-700 text-xl"
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
    <div className="p-4 sm:mt-4 flex flex-col gap-4">
      <SearchBar search={search} setSearch={setSearch} placeholder="Search Courses..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {filteredCourses.map((course) => (
          <div
            key={course._id}
            onClick={() => setSelectedCourse(course)}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100 hover:scale-103 transition"
          >
            <h3 className="text-xl font-semibold">{course.name}</h3>
            <p className="text-gray-600">Course ID: {course.code}</p>
          </div>
        ))}
      </div>

      {modal}
    </div>
  );
};

export default Courses;
