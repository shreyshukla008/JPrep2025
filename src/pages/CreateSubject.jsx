import React, { useState } from "react";

const CreateSubject = () => {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.code || !formData.department) {
      return setMessage("Please fill all fields.");
    }

    try {
      const res = await fetch(`${BASE_URL}/api/subject/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Subject created successfully.");
        setFormData({ name: "", code: "", department: "" });
      } else {
        setMessage(data.message || "Creation failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Server error while creating subject.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* <h2 className="text-2xl underline font-bold mb-4 text-blue-700">Create New Subject</h2> */}

      <div className="space-y-4 flex flex-col gap-4">
        <label className="block  text-slate-700 font-semibold text-lg">
          Subject Name:
          <input
            className="w-full px-4 py-2 rounded-md shadow border border-gray-300 "
            type="text"
            name="name"
            placeholder="Enter subject name..."
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label className="block text-slate-700 font-semibold text-lg">
          Subject Code:
          <input
            className="w-full px-4 py-2 rounded-md shadow border border-gray-300 "
            type="text"
            name="code"
            placeholder="Enter subject code..."
            value={formData.code}
            onChange={handleChange}
          />
        </label>

        <label className="block  text-slate-700 font-semibold text-lg">
          Department:
          <input
            className="w-full px-4 py-2 rounded-md shadow border border-gray-300 "
            type="text"
            name="department"
            placeholder="Enter department..."
            value={formData.department}
            onChange={handleChange}
          />
        </label>

        <button
          onClick={handleSubmit}
          className="bg-lime-600 font-bold text-lg my-2  cursor-pointer text-white px-8 py-3 rounded hover:bg-lime-700"
        >
          Create Subject
        </button>

        {message && <div className="text-sm text-blue-700 mt-4">{message}</div>}
      </div>
    </div>
  );
};

export default CreateSubject;
