import DateRangePicker from "@/components/DateRangePicker";
import React from "react";

function StepC({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
  handleDateChange,
}: {
  formData: any;
  handleChangeInput: any;
  handlePrevStep: any;
  handleNextStep: any;
  handleDateChange: any;
}) {
  return (
    <div>
      <h1 className="m-2 pt-4 text-xl font-bold text-blue-900 text-center">
        ADDITIONAL INFORMATION
      </h1>
      <div className="m-2 mt-4 text-black text-lg">
        <div className="sm:col-span-3 mt-2">
          <label
            htmlFor="travelingDates"
            className=" block text-sm font-medium leading-6 text-gray-900"
          >
            Traveling Dates
          </label>
          <div>
            <DateRangePicker
              defaultDates={
                formData.travelingDates ? formData.travelingDates : undefined
              }
              handleChange={handleDateChange}
            />
          </div>
        </div>
        {/* <label>Traveling Dates</label>

        <input
          type="date"
          name="travelingDates"
          value={formData.travelingDates}
          onChange={(e) => handleChangeInput(e)}
          className="w-full mb-3 mr-1 outline-none bg-white border border-grey-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        <label>Traveling Dates</label> */}
        {/* <DateRangePicker
        value={{ value: formData.travelingDates }}
        onChange={(dates: any) =>
          handleChangeInput({
            target: { name: "travelingDates", value: dates },
          })
        }
      /> */}

        <label>Traveling Destinations</label>
        <input
          type="text"
          name="travelingDestinations"
          value={formData.travelingDestinations}
          onChange={(e) => handleChangeInput(e)}
          className="w-full mb-3 outline-none bg-white border border-grey-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        <label className="mt-3">Hobbies</label>
        <input
          type="text"
          name="hobbies"
          value={formData.hobbies}
          onChange={(e) => handleChangeInput(e)}
          className="w-full mb-3 outline-none bg-white border border-grey-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
        <label className="mt-3">About Yourself</label>
        <input
          type="text"
          name="aboutYourself"
          value={formData.aboutYourself}
          onChange={(e) => handleChangeInput(e)}
          className="w-full rows-2 mb-3 outline-none bg-white border border-grey-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
      </div>
      <div className="m-2 mt-6 flex btn-xs text-lg font-bold justify-between items-center">
        <button
          className="bg-indigo-200 px-4 py-2 rounded-xl"
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

export default StepC;
