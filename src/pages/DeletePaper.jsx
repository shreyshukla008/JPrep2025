import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const DeletePaper = () => {
  const [subject, setSubject] = useState(null);
  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("Term-1");
  const [year, setYear] = useState(new Date().getFullYear());
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const courseList = useSelector((state) => state.courses.list);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const termOptions = ["Term-1", "Term-2", "Term-3"];
  const yearOptions = Array.from({ length: 7 }, (_, i) => year - 3 + i);

  const filteredCourses = courseList.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const findPaper = async () => {
    if (!subject || !term || !year) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/question-papers/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: subject.name,
          term,
          year,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setResult(data.data);
    } catch (err) {
      setResult(null);
      setError(err.message || "Failed to find question paper.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this paper?")) return;

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      const res = await fetch(`${BASE_URL}/api/question-papers/delete/${result._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");
      setResult(null);
      alert("Paper deleted successfully.");
    } catch (err) {
      alert("Failed to delete paper.");
    }
  };

  return (
    <div className="p-6 mt-4 sm:mt-16 border border-slate-400 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Find & Delete Question Paper</h2>

      <div className="space-y-4 flex flex-col gap-4 p-1 sm:p-4">
        <div>
          <label className="font-medium block mb-1">Search Subject</label>
          <SearchBar
            selected={subject}
            setSelected={setSubject}
            search={search}
            setSearch={setSearch}
            placeholder="Search course"
          />
          <div className="max-h-40 overflow-y-auto mt-2 grid grid-cols-2 gap-2 bg-gray-100 p-2 rounded border">
            {filteredCourses.map((c) => (
              <div
                key={c._id}
                onClick={() => {
                  setSubject(c);
                  setSearch(c.name);
                }}
                className={`p-2 rounded text-sm font-medium cursor-pointer hover:bg-slate-300 ${
                  subject?.id === c.id ? "bg-slate-200" : ""
                }`}
              >
                {c.name} <br /> ({c.code})
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">Select Term</label>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full border rounded p-2"
          >
            {termOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Select Year</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full border rounded p-2"
          >
            {yearOptions.map((yr) => (
              <option key={yr}>{yr}</option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 font-semibold">{error}</p>}

        <div className="flex w-full justify-center">
          <button
          onClick={findPaper}
          className="bg-lime-600 text-white text-lg font-bold px-6 py-3 rounded hover:bg-lime-700 cursor-pointer w-full sm:w-[40%]"
        >
          {loading ? "Searching..." : "Find Paper"}
        </button>
        </div>

        {result && (
          <div className="mt-12 mb-6 bg-white p-4 border-2 border-slate-300 border-dashed rounded shadow-md">
            <h3 className="text-lg font-semibold">{result.name}</h3>
            <div className="flex flex-col sm:flex-row justify-between items-start">
                <div>
                <p className="text-sm text-gray-600 font-semibold">
              Code: {result.code} 
            </p>
            <p className="text-sm text-gray-600">
              Term: {result.term} | Year: {result.year} | Score: {result.score}
            </p>
            <p className="text-sm">Uploaded By: {result.contributor || "N/A"}</p>
            </div>
            <div className="mt-3 flex gap-4 w-full sm:w-[40%]">
              <a
                href={result.viewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-lime-600 text-white text-center px-3 py-3 rounded hover:bg-green-700 cursor-pointer w-[48%]"
              >
                View
              </a>
              <button
                onClick={handleDelete}
                className="bg-amber-700 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer w-[48%]"
              >
                Delete
              </button>
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default DeletePaper;
