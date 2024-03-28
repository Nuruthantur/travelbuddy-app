"use client";

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DateRangePicker = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <Datepicker useRange={false} value={value} onChange={handleValueChange} />
  );
};
export default DateRangePicker;
