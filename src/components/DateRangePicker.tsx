"use client";

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

type Props = {
  handleChange: (newDate: string) => void;
  defaultDates?: string;
};

const DateRangePicker = ({ handleChange, defaultDates }: Props) => {
  const [value, setValue] = useState({
    startDate: defaultDates ? new Date(defaultDates.split("~")[0]) : null,
    endDate: defaultDates ? new Date(defaultDates.split("~")[1]) : null,
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    const date = newValue.startDate + "~" + newValue.endDate;
    console.log("date  :>> ", date);
    setValue(newValue);
    handleChange(date);
  };

  return (
    <div>
      <Datepicker useRange={false} value={value} onChange={handleValueChange} />
    </div>
  );
};
export default DateRangePicker;
