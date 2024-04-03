import React, { useState } from "react";
import ImageInput from "@/components/ImageInput";

function StepA({
  formData,
  handleChangeInput,
  handleNextStep,
  handlePrevStep,
}: {
  formData: any;
  handleChangeInput: any;
  handleNextStep: any;
  handlePrevStep: any;
}) {
  const [profilePicture, setProfilePicture] = useState<string>("");

  return (
    <div className="flex flex-col">
      <h1 className="m-2 pt-4 text-xl font-bold text-white font-outline-4 text-center">
        ADD A PROFILE PICTURE
      </h1>
      <ImageInput state={profilePicture} setState={setProfilePicture} />

      <div className=" mt-6 flex btn-xs text-lg font-bold justify-between items-center">
        <button
          className="bg-indigo-200  px-4 py-2 rounded-xl"
          onClick={handlePrevStep}
        >
          Prev
        </button>
        <button
          className="bg-indigo-400 px-4 py-2 rounded-xl"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StepA;
