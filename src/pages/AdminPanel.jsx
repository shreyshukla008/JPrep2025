import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleReviewUnverified = () => {
    navigate("review-unverified"); // route: /user/:id/admin/review-unverified
  };

  const handleReviewCourses = () => {
    navigate("review-courses"); // route: /user/:id/admin/delete-courses
  };

  const handleDeletePaper = () => {
    navigate("delete-paper");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-center sm:mt-16 mt-4">
      

      <div className="flex flex-col justify-center gap-6 ">
        <div
          onClick={handleReviewUnverified}
          className="cursor-pointer bg-indigo-50  shadow-md rounded-2xl p-6 hover:bg-blue-200/50 hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold text-gray-800  mb-2">
            Review Unverified Papers
          </h2>
          <p className="text-sm text-gray-500">
            View and verify newly uploaded papers that failed auto-validation.
          </p>
        </div>

        <div
          onClick={handleReviewCourses}
          className="cursor-pointer bg-indigo-50  shadow-md rounded-2xl p-6 hover:bg-blue-100 hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold text-gray-800  mb-2">
            Review Courses
          </h2>
          <p className="text-sm text-gray-500">
            Manage and remove obsolete or incorrect course entries.
          </p>
        </div>

        <div
          onClick={handleDeletePaper}
          className="cursor-pointer bg-indigo-50 shadow-md rounded-2xl p-6 hover:bg-blue-100 hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold text-gray-800  mb-2">
            Delete Papers
          </h2>
          <p className="text-sm text-gray-500">
            View and delete  uploaded papers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
