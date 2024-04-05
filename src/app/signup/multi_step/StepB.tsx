"use client";
import React, { useEffect, useState } from "react";
import getBase64 from "@/utils/imagetobase64";

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
  const [profilePicture, setProfilePicture] = useState(formData.userPicture);
  console.log("formData.userPicture :>> ", formData.userPicture);

  useEffect(() => {
    setProfilePicture(formData.userPicture);
  }, [formData.userPicture]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e target", e.target.files?.[0]);
    const file = e.target.files?.[0];
    if (file) {
      const base64 = (await getBase64(file)) as string;
      console.log("base64", base64);
      handleChangeInput({
        target: {
          name: "userPicture",
          value: base64,
        },
      });
    }
  };

  // return (
  //   <div className="flex flex-col">
  //     <h1 className="m-2 pt-4 text-xl font-bold text-white font-outline-4 text-center">
  //       ADD A PROFILE PICTURE
  //     </h1>
  //     <ImageInput formData={profilePicture} setFormData={setProfilePicture} />
  //     {profilePicture ? (
  //       <div className="mb-4">
  //         <img
  //           src={profilePicture}
  //           alt="Profile"
  //           className="profile-picture w-full h-60"
  //           onChange={(e) => handleChangeInput(e)}
  //         />
  //       </div>
  //     ) : (
  //       <div className="flex items-center justify-center m-2">
  //         <label
  //           htmlFor="dropzone-file"
  //           className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700  dark:border-gray-600"
  //         >
  //           <div className="flex flex-col items-center justify-center pt-5 pb-6">
  //             <svg
  //               className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
  //               aria-hidden="true"
  //               xmlns="http://www.w3.org/2000/svg"
  //               fill="none"
  //               viewBox="0 0 20 16"
  //             >
  //               <path
  //                 stroke="currentColor"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
  //               />
  //             </svg>

  //             <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
  //               <span className="font-semibold">Click to upload</span>
  //             </p>
  //           </div>
  //         </label>
  //       </div>
  //     )}
  //     <div className=" mt-6 flex btn-xs text-lg font-bold justify-between items-center">
  //       <button
  //         className="bg-indigo-200  px-4 py-2 rounded-xl"
  //         onClick={handlePrevStep}
  //       >
  //         Prev
  //       </button>
  //       <button
  //         className="bg-indigo-400 px-4 py-2 rounded-xl"
  //         onClick={handleNextStep}
  //       >
  //         Next
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex flex-col">
      <h1 className="m-2 pt-4 text-xl font-bold text-white font-outline-4 text-center">
        ADD A PROFILE PICTURE
      </h1>
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={handleFileSelect}
      />
      {profilePicture ? (
        <div className="mb-4">
          <img
            src={profilePicture}
            alt="Profile"
            className="profile-picture w-full h-60"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center m-2">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700  dark:border-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>

              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
            </div>
          </label>
        </div>
      )}
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
