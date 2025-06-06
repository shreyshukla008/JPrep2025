import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

// Dummy courses
const allCourses = [
  { id: 1, name: "Computer Networks", subject: "CSE" },
  { id: 2, name: "Data Structures", subject: "CSE" },
  { id: 3, name: "Operating Systems", subject: "CSE" },
  { id: 4, name: "Database Systems", subject: "CSE" },
  { id: 5, name: "Artificial Intelligence", subject: "CSE" },
  { id: 6, name: "Cyber Security", subject: "CSE" },
  { id: 7, name: "Web Technologies", subject: "CSE" },
];

const UploadForm = () => {
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [course, setCourse] = useState(null);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [term, setTerm] = useState("Term-1");
  const [error, setError] = useState("");
  const [ocrResult, setOcrResult] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const maxFileSize = 5 * 1024 * 1024;
  const termOptions = ["Term-1", "Term-2", "Term-3"];
  const yearOptions = Array.from({ length: 7 }, (_, i) => year - 3 + i);

  const filteredCourses = allCourses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > maxFileSize) {
      setError("File size exceeds 5MB.");
      return;
    }
    if (file && file.type !== "application/pdf") {
      setError("Only PDF files allowed.");
      return;
    }
    setSelectedFile(file);
    setError("");
  };

  const handleStep1Submit = () => {
    if (!selectedFile || !course || !year || !term) {
      setError("All fields are required.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      setError("User not logged in.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleStep2Submit = () => {
    // Dummy OCR simulation
    const clarity = Math.floor(Math.random() * 100);
    setOcrResult({
      clarity,
      existingFileClarity: 85,
      canReplace: clarity > 85,
    });
    setStep(3);
  };

  const handleFinalSubmit = () => {
    if (!ocrResult?.canReplace) {
      setStatusMessage("Upload failed: A better file already exists.");
      return;
    }
    setStatusMessage("Upload successful! 🎉");
  };

  return (
    <div className="p-6 pt-20">
      <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

      {/* Step Progress Indicator */}
      <div className="flex justify-between mb-6">
        {["Upload Info", "OCR Validation", "Status"].map((label, index) => (
          <div
            key={index}
            className={`flex-1 text-center py-2 font-semibold rounded ${
              step === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Select PDF (max 5MB)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Search Course</label>
            <SearchBar selected={course} setSelected={setCourse} search={search} setSearch={setSearch} />

            <div className="max-h-48 overflow-y-auto border rounded mt-2 p-2 bg-gray-50 dark:bg-gray-800">
              {filteredCourses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setCourse(c)}
                  className={`p-2 cursor-pointer rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${
                    course?.id === c.id ? "bg-blue-200 dark:bg-gray-600" : ""
                  }`}
                >
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Select Year</label>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="border rounded p-2 w-full">
              {yearOptions.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Select Term</label>
            <select value={term} onChange={(e) => setTerm(e.target.value)} className="border rounded p-2 w-full">
              {termOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            onClick={handleStep1Submit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: OCR Validation */}
      {step === 2 && (
        <div className="space-y-4">
          <p>🔍 Processing OCR... (Simulated)</p>
          <button
            onClick={handleStep2Submit}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            Run OCR Validation
          </button>
        </div>
      )}

      {/* Step 3: Status */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upload Summary</h3>
          <p>Clarity Score: {ocrResult?.clarity}/100</p>
          <p>Existing File Score: {ocrResult?.existingFileClarity}/100</p>

          {ocrResult?.canReplace ? (
            <p className="text-green-500">✅ Your file is better and can be uploaded!</p>
          ) : (
            <p className="text-red-500">⚠️ A better file already exists.</p>
          )}

          <button
            onClick={handleFinalSubmit}
            className={`${
              ocrResult?.canReplace ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            } text-white font-medium py-2 px-4 rounded`}
            disabled={!ocrResult?.canReplace}
          >
            Final Upload
          </button>

          {statusMessage && <p className="mt-4 font-medium">{statusMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
