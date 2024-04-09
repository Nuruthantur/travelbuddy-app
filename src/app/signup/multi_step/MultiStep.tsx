"use client";

import React, { useEffect, useState } from "react";
import StepA from "./StepA";
import StepB from "./StepB";
import StepC from "./StepC";
import StepD from "./StepD";
import StepE from "./StepE";
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
        <StepA
          formData={formData}
          handleChangeInput={handleChangeInput}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "2" ? (
        <StepB
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "3" ? (
        <StepC
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "4" ? (
        <StepD
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleDateChange={handleDateChange}
        />
      ) : null}
      {step === "5" ? (
        <StepE
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleSubmitFormData={handleSubmitFormData}
        />
      ) : null}
    </div>
  );
};

export default MultiStep;
