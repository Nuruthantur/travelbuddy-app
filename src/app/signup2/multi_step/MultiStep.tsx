"use client";

import React, { useEffect, useState } from "react";
import StepA from "./StepA";
import StepB from "./StepB";
import StepC from "./StepC";
import StepD from "./StepD";
import { User } from "@/@types/User";

const initialFormData = {
  firstName: "",
  lastName: "",
  userName: "",
  birthDate: "",
  // city: "",
  // state: "",
  aboutYourself: "",
  travelingDates: "",
  travelingDestinations: "",
  hobbies: "",
  email: "",
  password: "",
  agreeToTerms: false,
};

interface MultiStepType {
  user: User | null;
}
const defaultValue: MultiStepType = {
  user: null,
};

const stepsArray = ["1", "2", "3", "4"];

const MultiStep = ({
  showStepNumber,
  handleSubmit,
}: {
  showStepNumber: boolean;
  handleSubmit: any;
}) => {
  const [step, setStep] = useState("1");
  const [formData, setFormData] = useState(initialFormData);
  // const [user, setUser] = (useState < User) | null(null);

  const handleNextStep = () => {
    if (step === "1") setStep("2");
    else if (step === "2") setStep("3");
    else if (step === "3") setStep("4");
  };

  const handlePrevStep = () => {
    if (step === "4") setStep("3");
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
          handleSubmitFormData={handleSubmitFormData}
        />
      ) : null}
    </div>
  );
};

export default MultiStep;
