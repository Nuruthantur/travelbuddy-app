"use client";

import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import User from "@/@types/User";

export interface newUserValues {
  email: string;
  password: string;
  userName: string;
  userPicture: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  travelingDates: string;
  travelingDestinations: string;
  hobbies: string;
  aboutYourSelf: string;
  agreeToTerms: boolean;
}

const initialFormData: newUserValues = {
  email: "",
  password: "",
  userName: "",
  userPicture: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  travelingDates: "",
  travelingDestinations: "",
  hobbies: "",
  aboutYourSelf: "",
  agreeToTerms: false,
};

interface MultiStepType {
  user: User | null;
  profilePicture: string;
  setProfilePicture: React.Dispatch<React.SetStateAction<string>>;
}
const defaultValue: MultiStepType = {
  user: null,
  profilePicture: "",
  setProfilePicture: () => {},
};

const stepsArray = ["1", "2", "3", "4", "5"];

const MultiStep = ({
  showStepNumber,
  handleSubmit,
}: {
  showStepNumber: boolean;
  handleSubmit: any;
}) => {
  const [step, setStep] = useState("1");
  const [formData, setFormData] = useState(initialFormData);

  const handleNextStep = () => {
    if (step === "1") setStep("2");
    else if (step === "2") setStep("3");
    else if (step === "3") setStep("4");
    else if (step === "4") setStep("5");
  };

  const handlePrevStep = () => {
    if (step === "5") setStep("4");
    else if (step === "4") setStep("3");
    else if (step === "3") setStep("2");
    else if (step === "2") setStep("1");
  };

  const handleChangeInput = (event: {
    target: { name: any; checked: any; value: any };
  }) => {
    const fieldName = event.target.name;
    let fieldValue;
    if (fieldName === "agreeToTerms") {
      fieldValue = event.target.checked;
    } else {
      fieldValue = event.target.value;
    }
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  const handleDateChange = (newDate: string) => {
    setFormData({
      ...formData,
      travelingDates: newDate,
    });
  };
  const handleSubmitFormData = () => {
    if (!formData.agreeToTerms) {
      alert("You must agree to the terms and conditions");
    } else {
      handleSubmit(formData);
    }
  };

  const renderTopStepNumbers = () => {
    if (!showStepNumber) {
      return null;
    }

    return (
      <div className="step_container m-6 mb-4 flex justify-between">
        {stepsArray.map((item) => (
          <div
            key={item}
            className={`step w-8 h-8 flex justify-center bg-white text-base font-bold text-black items-center border-2 rounded-full ${
              parseInt(item) <= parseInt(step) ? "active_step" : ""
            }`}
            onClick={() => setStep(item)}
          >
            {item}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  return (
    <div className="mt-6">
      {renderTopStepNumbers()}
      {step === "1" ? (
        <Step1
          formData={formData}
          handleChangeInput={handleChangeInput}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "2" ? (
        <Step2
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "3" ? (
        <Step3
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "4" ? (
        <Step4
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleDateChange={handleDateChange}
        />
      ) : null}
      {step === "5" ? (
        <Step5
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleSubmitFormData={handleSubmitFormData}
        />
      ) : null}
      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="font-semibold leading-6 text-slate-950 ">
          <b>Log In</b>
        </a>
      </p>
    </div>
  );
};

export default MultiStep;
