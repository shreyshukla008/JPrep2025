// OCRProcessing.jsx
const OCRProcessing = ({ data, onNext, onError, setOcrScore }) => {
    return (
      <div className="p-4 bg-white dark:bg-dark-card rounded shadow">
        <p>🧠 Processing file using OCR...</p>
        <p className="mt-2 text-sm">This may take a few seconds.</p>
        {/* Simulate OCR result */}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setOcrScore(78); // dummy value
            onNext();
          }}
        >
          Continue
        </button>
      </div>
    );
  };
  
  export default OCRProcessing;