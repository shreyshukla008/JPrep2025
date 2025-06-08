import React, { useEffect, useState } from "react";

const ReviewUnverified = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  // Fetch only unverified papers with auth header
  const fetchUnverifiedPapers = async () => {
    try {
      setLoading(true);
      setError(null);

      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;

      const res = await fetch(`${BASE_URL}/api/question-papers/unverified`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setPapers(data.data); // assuming backend sends { data: [...] }
    } catch (err) {
      console.error("Error fetching unverified papers:", err);
      setError("Failed to load unverified papers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnverifiedPapers();
  }, []);

  const handleVerify = async (id) => {

    const confirmVerify = window.confirm("Are you sure you want to VERIFY this paper?");
    if (!confirmVerify) return;

    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;

      const res = await fetch(`${BASE_URL}/api/question-papers/verify/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        fetchUnverifiedPapers(); // Refresh list after verifying
      } else {
        throw new Error(`Verify failed with status ${res.status}`);
      }
    } catch (err) {
      console.error("Verification failed:", err);
      alert("Verification failed. Please try again.");
    }
  };

  const handleReject = async (id) => {
    const confirmReject = window.confirm("Are you sure you want to REJECT this paper?");
    if (!confirmReject) return;
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;

      const res = await fetch(`${BASE_URL}/api/question-papers/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        fetchUnverifiedPapers(); // Refresh list after rejection
      } else {
        throw new Error(`Reject failed with status ${res.status}`);
      }
    } catch (err) {
      console.error("Rejection failed:", err);
      alert("Rejection failed. Please try again.");
    }
  };

  if (loading) return <div className="p-4">Loading unverified papers...</div>;

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (

    <div className="p-6 mt-4 sm:mt-16">
      <h2 className="text-2xl font-bold mb-4">Review Unverified Question Papers</h2>

      {papers.length === 0 ? (
        <p className="text-gray-600">No unverified papers pending review.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {papers.map((paper) => (
            <div
              key={paper._id}
              className="bg-slate-50 group rounded-2xl p-6 hover:bg-slate-100 shadow-md  hover:scale-105 transition"
            >
              <h3 className="text-xl text-blue-700 font-bold">
                <span className="font-semibold">Uploaded by:</span> <span className="italic">{paper.contributor || "Anonymous"}</span>
              </h3>
              <p className="text-md text-gray-700 mt-1 font-semibold">
                <span>Subject: </span>{paper.name}
              </p>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div>
                  <p className="text-md text-gray-700 mt-1 font-semibold">
                    <span>Course Id:</span> {paper.code}
                  </p>
                  <p className="text-md text-gray-700 mt-1 flex gap-3">
                    <span>Details:  {paper.term} - {paper.year}</span> | 
                    <span>Score: {paper.score}</span> 
                  </p>
                  
                  <a
                    href={paper.viewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-2 inline-block font-bold text-md italic hover:text-green-600"
                  >
                    View File
                  </a>
              </div>
              <div className="mt-4 flex gap-2 w-full  sm:w-[40%]">
                <button
                  onClick={() => handleVerify(paper._id)}
                  className="bg-lime-600 text-white text-lg px-3 py-3 rounded hover:bg-lime-700 hover:group:bg-lime-500 cursor-pointer w-[48%]"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleReject(paper._id)}
                  className="bg-amber-700 text-white text-lg px-3 py-3 rounded hover:bg-amber-800 cursor-pointer w-[48%]"
                >
                  Reject
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewUnverified;
