import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const ManageCourse = () => {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseFields, setCourseFields] = useState({});
  const [message, setMessage] = useState("");

  const courseList = useSelector((state) => state.courses.list);
  const filteredCourses = courseList.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const fetchCourseDetails = async (name) => {
    try {
      const res = await fetch(`${BASE_URL}/api/subject/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) {
        setSelectedCourse(data.data);
        setCourseFields(data.data);
        setMessage("");
      } else {
        setSelectedCourse(null);
        setMessage(data.message || "Course not found");
      }
    } catch (err) {
      console.error("Fetch course failed", err);
      setMessage("Failed to fetch course");
    }
  };

  const handleUpdate = async () => {
    if (!window.confirm("Are you sure you want to update the details of this Subject?")) return;
    try {
      const res = await fetch(
        `${BASE_URL}/api/subject/update/${selectedCourse._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(courseFields),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Course updated successfully.");
      } else {
        setMessage(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Update failed", err);
      setMessage("Update error");
    }
  };

  const handleDelete = async () => {

    if (!window.confirm("Are you sure you want to delete this Subject?")) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${BASE_URL}/api/subject/delete/${selectedCourse._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Course deleted");
        setSelectedCourse(null);
        setCourseFields({});
        setSearch("");
      } else {
        setMessage(data.message || "Deletion failed");
      }
    } catch (err) {
      console.error("Deletion error", err);
      setMessage("Failed to delete");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* <h2 className="text-xl font-bold mb-4">Manage Course</h2> */}

      <label className="block text-slate-700 font-semibold text-lg">Search Course</label>
      <SearchBar
        selected={selectedCourse}
        setSelected={(c) => {
          setSearch(c.name);
          fetchCourseDetails(c.name);
        }}
        search={search}
        setSearch={setSearch}
        placeholder="Search course"
      />

      <div className="max-h-40 overflow-y-auto bg-gray-100 mt-2 rounded border p-2">
        {filteredCourses.map((c) => (
          <div
            key={c._id}
            onClick={() => {
              setSearch(c.name);
              fetchCourseDetails(c.name);
            }}
            className={`cursor-pointer p-2 rounded text-sm font-medium ${
              selectedCourse?._id === c._id
                ? "bg-slate-300"
                : "hover:bg-slate-200"
            }`}
          >
            {c.name} <br />
            <span className="text-xs text-gray-500">{c.code}</span>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="mt-6 space-y-4">
          <label className="block text-slate-700 font-semibold text-lg">
            Name:
            <input
              className="w-full px-4 py-2 rounded-md shadow border border-gray-300 "
              value={courseFields.name || ""}
              onChange={(e) =>
                setCourseFields((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </label>

          <label className="block text-slate-700 font-semibold text-lg">
            Code:
            <input
              className="w-full px-4 py-2 rounded-md shadow border border-gray-300 "
              value={courseFields.code || ""}
              onChange={(e) =>
                setCourseFields((prev) => ({ ...prev, code: e.target.value }))
              }
            />
          </label>

          <label className="block text-slate-700 font-semibold text-lg">
            Department:
            <input
              className="w-full px-4 py-2 rounded-md shadow border border-gray-300 "
              value={courseFields.department || ""}
              onChange={(e) =>
                setCourseFields((prev) => ({
                  ...prev,
                  department: e.target.value,
                }))
              }
            />
          </label>

          <div className="flex gap-4">
            <button
              className="bg-lime-600 text-lg font-bold text-white px-4 py-3 rounded hover:bg-lime-700 w-[48%] cursor-pointer"
              onClick={handleUpdate}
            >
              Update Course
            </button>
            <button
              className="bg-amber-700 text-lg font-bold text-white px-4 py-3 rounded hover:bg-amber-800 w-[48%] cursor-pointer"
              onClick={handleDelete}
            >
              Delete Course
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className="mt-4 text-sm text-blue-700 font-medium">{message}</div>
      )}
    </div>
  );
};

export default ManageCourse;
