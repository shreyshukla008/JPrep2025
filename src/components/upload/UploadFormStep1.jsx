import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import { useSelector } from 'react-redux';


const UploadFormStep1 = ({ onNext, setUploadData, setFieldStatus }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [term, setTerm] = useState("Term-1");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const maxFileSize = 5 * 1024 * 1024;
  const termOptions = ["Term-1", "Term-2", "Term-3"];
  const yearOptions = Array.from({ length: 7 }, (_, i) => year - 3 + i);
  
    const courseList = useSelector((state) => state.courses.list);

  
    useEffect(() => {
      if (courseList?.length > 0) {
        setCourses(courseList);
      }
    }, [courseList]);

    const filteredCourses = courses.filter((course) =>
      course.name.toLowerCase().includes(search.toLowerCase())
    );


  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!selectedFile || !course || !year || !term) {
      setError("All fields are required.");
      return;
    }

    

    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user || !user._id) {
      console.log("user: ", user);
      setError("User not logged in.");
      return;
    }

    setUploadData({
      file: selectedFile,
      course,
      year,
      term,
      userId: user.id,
    });

    // updated for here

    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("name", course.name);       // subject name
    formData.append("code", course.code);       // subject code
    formData.append("term", term);
    formData.append("year", year);
    formData.append("contributor", user.name);           // set default or let user provide
  
    try {

      setProcessing(true);

      onNext();

      const response = await fetch(`${BASE_URL}/api/question-papers/upload`, {
        method: "POST",
        body: formData,
        // NO Content-Type header needed; browser sets it
      });

      const data = await response.json();
      console.log("resPonse received:", data);

      setTimeout(() => {
        onNext();
        setFieldStatus({
          imageOCR : -1,
          course : -1,
          year : -1,
          examination : -1,
          isValid : -1,
        })
      }, 1800);

      if(data.validationResult){
        setFieldStatus({
          imageOCR : 1,
          course : data.validationResult.courseDetailValidation,
          year : data.validationResult.yearValidation,
          examination : data.validationResult.examValidation,
          isValid : data.validationResult.isValid,
        })
      }
  
      if (!response.ok) {
        setError(data.message || "Upload failed");
        setProcessing(false);
        return;
      }
  
      
  
      // Pass data to parent or next step
      setUploadData({
        ...data.questionPaper,
      });

      setProcessing(false);
  
      // onNext();
  
    } catch (err) {
      console.error("Upload error:", err);
      setProcessing(false);
      setError("Something went wrong during upload.");
    }
  

    // update ends here
  };

  return (

    <div>  
    <p className="text-sm text-gray-600 my-4">Select the document to upload.</p>
    {processing == true ?
      (<div>
        <h2 className="text-lg font-semibold">Processing OCR and Validating...</h2>
        <p className="text-sm text-gray-600">Checking file clarity and verifying course info.</p>
       </div>
      )
      :
      ( 
      <div className="space-y-4 border-2 border-dashed rounded-lg border-slate-600 p-4 flex flex-col justify-center shadow-lg">

      <div>
        <label className="block font-medium">Select PDF (max 5MB)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.size > maxFileSize) {
              setError("File size exceeds 5MB.");
              return;
            }
            setSelectedFile(file);
            setError("");
          }}
          className="w-full border rounded p-2"
        />
      </div>


      <div>
        <label className="block font-medium">Search Course</label>
        <SearchBar selected={course} setSelected={setCourse} search={search} setSearch={setSearch} placeholder="Search course"/>

        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto mt-2 p-2 bg-gray-100  rounded border">
          {filteredCourses.map((c) => (
            <div
            key={c._id}
              onClick={() => {
                setCourse(c);
                setSearch(c.name);
              }}
              className={`p-2 font-medium text-slate-600 text-sm rounded cursor-pointer hover:bg-slate-300  ${
                course?.id === c.id ? "bg-slate-200 " : ""
              }`}
            >
              {c.name}
              <br/>
              {c.code}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium">Select Year</label>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border rounded p-2"
        >
          {yearOptions.map((yr) => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Select Term</label>
        <select
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full border rounded p-2"
        >
          {termOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {error && (<p className="text-red-500 font-bold "> *{error} </p>)}

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Proceed to OCR Verification
      </button>

      
  </div>
  )}
      

    </div>
  
  );
};

export default UploadFormStep1;
