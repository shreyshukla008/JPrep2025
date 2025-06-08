import React from "react";
import Spinner from "../Spinner";
import Status from "../Status"

const OCRProcessingStep2 = ({ data, onNext, onBack, fieldStatus }) => {
  return (
    <div className="space-y-4">
      {/* <h2 className="text-lg font-semibold">Processing OCR and Validating...</h2> */}
      <p className="text-sm text-gray-600">Checking file clarity and verifying course info.</p>

      <div className="flex gap-4">
        {/* <button onClick={onBack} className="bg-gray-300 px-4 py-2 rounded">
          Back
        </button> */}
        
      </div>

      <div className="flex flex-col border-2 border-dashed rounded-lg p-4 gap-4 shadow-lg">
        <div className="flex justify-between items-center mx-4 p-2 font-semibold">OCR Processing{fieldStatus.imageOCR === -1 ? <Spinner></Spinner> : <Status value={fieldStatus.imageOCR}></Status>}</div>
        <div className="flex justify-between items-center mx-4 p-2 font-semibold">Course Details {fieldStatus.course === -1 ? <Spinner></Spinner> : <Status value={fieldStatus.course}></Status>}</div>
        <div className="flex justify-between items-center mx-4 p-2 font-semibold">Examination  {fieldStatus.examination === -1 ? <Spinner></Spinner> : <Status value={fieldStatus.examination}></Status>}</div>
        <div className="flex justify-between items-center mx-4 p-2 font-semibold">Year {fieldStatus.year === -1 ? <Spinner></Spinner> : <Status value={fieldStatus.year}></Status>}</div>
        <div className="flex justify-between items-center mx-4 p-2 font-semibold">Contributer {fieldStatus.isValid === -1 ? <Spinner></Spinner> : <Status value={1}></Status>}</div>
        {fieldStatus.isValid === -1 ? 
        (<p className="mx-auto font-semibold text-slate-500 my-2">Fetching Information........</p>):
        (<button onClick={onNext} className="bg-green-600 text-white mx-4 px-4 py-2 font-semibold rounded">
          View Status
        </button>)}
      </div>
    </div>
  );
};

export default OCRProcessingStep2;
