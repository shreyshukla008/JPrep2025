import React from "react";

const UploadStatusStep3 = ({ data, onBack, fieldStatus, setStep, setFieldStatus }) => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="text-center space-y-6   px-4 py-8 mt-6">
      {
        fieldStatus.isValid === true ? 
        (<h2 className="text-2xl font-bold text-green-600">Upload Successful!</h2>):
        (<h2 className="text-2xl underline font-bold text-red-600">Upload Failed!</h2>)
      }

      {
        fieldStatus.isValid === true ? 
        (<p>Hey! <strong> {user.name} </strong> Thanks for uploading <strong>{data.course?.name}</strong> paper.</p>):
        (<p>Hey! <strong> {user.name} </strong> Your upload failed the OCR auto-verification test and has been sent for manual verification.</p>)
      } 
      
      
      <button
        onClick={ () => {
          setFieldStatus({
            imageOCR : -1,
            course : -1,
            year : -1,
            examination : -1,
            isValid : -1,
          })
          setStep(1);
         }}
        className="text-sky-800 font-semibold hover:text-sky-600 hover:font-bold underline"
      > 
        {
        fieldStatus.isValid === true ? 
        (<p>Upload Another</p>):
        (<p>Upload Again</p>)
      } 
      </button>
    </div>
  );
};

export default UploadStatusStep3;
