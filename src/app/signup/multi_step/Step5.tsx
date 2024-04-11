import React from "react";

function Step5({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleSubmitFormData,
}: {
  formData: any;
  handleChangeInput: any;
  handlePrevStep: any;
  handleSubmitFormData: any;
}) {
  return (
    <div>
      <h1 className="m-2 pt-4 text-xl font-bold text-white font-outline-4 text-center">
        CONFIRM INFORMATION
      </h1>
      <div className="m-2 mt-4">
        <DataConfirm label="Username" value={formData.userName} />
        <DataConfirm label="Email" value={formData.email} />
        <DataConfirm label="First Name" value={formData.firstName} />
        <DataConfirm label="Last Name" value={formData.lastName} />
        <DataConfirm label="Birth Date" value={formData.birthDate} />
        <DataConfirm label="Traveling Dates" value={formData.travelingDates} />
        <DataConfirm
          label="Traveling Destinations"
          value={formData.travelingDestinations}
        />
        <DataConfirm label="Hobbies" value={formData.hobbies} />
        <DataConfirm label="About Yourself" value={formData.aboutYourSelf} />
        <div className="my-3 ml-1 flex items-center font-bold">
          <input
            type="checkbox"
            name="agreeToTerms"
            value={formData.agreeToTerms}
            onChange={(e) => handleChangeInput(e)}
            className="w-4 h-4 mr-2 "
          />
          <label className="text-base">I agree to terms and conditions</label>
        </div>
      </div>
      <div className="m-2 mt-6 flex btn-xs text-lg font-bold justify-between items-center">
        <button
          className="bg-indigo-200 px-4 py-2 rounded-xl"
          onClick={handlePrevStep}
        >
          Prev
        </button>
        <button
          className="bg-blue-400 px-4 py-2 border-2 rounded-xl"
          onClick={handleSubmitFormData}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Step5;

const DataConfirm = ({ label, value }: { label: any; value: any }) => {
  return (
    <div className="my-3 text-base font-bold border border-dashed border-gray-200 rounded-lg">
      <span className="mr-4 p-2 text-slate-800">{label}</span>
      <span className="mr-4 text-slate-500 text-white">{value}</span>
    </div>
  );
};
