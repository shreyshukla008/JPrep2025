// ValidationCheck.jsx
const ValidationCheck = ({ data, ocrScore, onNext, onError }) => {
    const betterScoreExists = true; // simulate
  
    return (
      <div className="p-4 bg-white dark:bg-dark-card rounded shadow">
        <p>🔍 Checking for duplicate entry...</p>
        {betterScoreExists ? (
          <p className="text-red-500 mt-2">A better file already exists (clarity score 85)</p>
        ) : (
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded" onClick={onNext}>
            Replace Existing and Continue
          </button>
        )}
      </div>
    );
  };

  export default ValidationCheck
  