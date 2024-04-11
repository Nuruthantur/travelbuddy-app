import React from "react";

function Step3({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
}: {
  formData: any;
  handleChangeInput: any;
  handlePrevStep: any;
  handleNextStep: any;
}) {
  return (
    <div>
      <h1 className="m-2 pt-4 text-xl font-bold text-white font-outline-4 text-center">
        PERSONAL INFORMATION
      </h1>
      <div className="m-2 mt-4 text-black text-lg">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={(e) => handleChangeInput(e)}
          className="w-full mb-3 outline-none bg-white border border-grey-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={(e) => handleChangeInput(e)}
          className="w-full mb-3 outline-none bg-white border border-grey-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        <label className="mt-3">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={(e) => handleChangeInput(e)}
          className="w-full mb-3 outline-none bg-white border border-grey-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
      </div>
      <div className="m-2 mt-6 flex btn-xs text-lg font-bold justify-between items-center">
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

export default Step3;
