import getBase64 from "@/utils/imagetobase64";
import React, { ChangeEvent } from "react";

type Props = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const ImageInput = ({ state, setState }: Props) => {
  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e target", e.target.files?.[0]);
    const file = e.target.files?.[0];
    if (file) {
      const base64 = (await getBase64(file)) as string;
      console.log("base64", base64);

      setState(typeof base64 === "string" ? base64 : "");
    }
  };
  return (
    <div>
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
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            // value={formData.userProfile}
            onChange={handleFileSelect}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageInput;
