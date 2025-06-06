// FinalStatus.jsx
const FinalStatus = ({ status }) => (
    <div className="p-4 bg-white dark:bg-dark-card rounded shadow text-center">
      {status.success ? (
        <p className="text-green-600 font-semibold text-lg">✅ File Uploaded Successfully!</p>
      ) : (
        <p className="text-red-600 font-semibold text-lg">❌ Upload Failed: {status.message}</p>
      )}
    </div>
  );
  
export default FinalStatus;