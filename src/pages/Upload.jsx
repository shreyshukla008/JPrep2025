import React, { useState } from "react";
import UploadFormStep1 from "../components/upload/UploadFormStep1";
import OCRProcessingStep2 from "../components/upload/OCRProcessingStep2";
import UploadStatusStep3 from "../components/upload/UploadStatusStep3";

const Upload = () => {
  const [step, setStep] = useState(1);
  const [uploadData, setUploadData] = useState({});

  const [fieldStatus, setFieldStatus] = useState({
                                          imageOCR : -1,
                                          course : -1,
                                          year : -1,
                                          examination : -1,
                                          isValid : -1,
                                        })

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className=" p-4 sm:pt-6 sm:mt-6 max-w-3xl mx-auto">
      <div className="mt-4 mb-6 text-lg font-semibold">
        {
          step === 1 && <div> Upload Document - Step {step}/3 </div>
        }
        {
          step === 2 && <div> Processing OCR and Validating - Step {step}/3 </div>
        }
        {
          step === 3 && <div> Upload Result - Step {step}/3 </div>
        }
      </div>

      {step === 1 && (
        <UploadFormStep1
          onNext={nextStep}
          setUploadData={setUploadData}
          setFieldStatus={setFieldStatus}
        />
      )}

      {step === 2 && (
        <OCRProcessingStep2
          data={uploadData}
          fieldStatus={fieldStatus}
          onNext={nextStep}
          onBack={prevStep}
          setFieldStatus={setFieldStatus}
        />
      )}

      {step === 3 && (
        <UploadStatusStep3
          data={uploadData}
          onBack={prevStep}
          setStep={setStep}
          fieldStatus={fieldStatus}
          setFieldStatus={setFieldStatus}
        />
      )}
    </div>
  );
};

export default Upload;
