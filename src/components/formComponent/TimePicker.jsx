import React, { useState } from "react";
import { Calendar } from "primereact/calendar";

const TimePicker = (props) => {
  const {
    respclass,
    placeholderName,
    value,
    handleChange,
    name,
    lable,
    id,
    className,
  } = props;
  // value={value ? new Date(`1970-01-01T${value}`) : new Date(`1970-01-01T00:00:00`)}
  return (
    <>
      <div className={respclass} style={{ position: "relative" }}>
        <Calendar
          id="calendar-timeonly"
          style={{ width: "100%", marginBottom: "6px" }}
          wrapperClassName="datepicker"
          className={className}
          value={value}
          onChange={handleChange}
          timeOnly
          hourFormat="12"
          placeholder={placeholderName}
          name={name}
        />

        <label
          htmlFor={id}
          className="label lable truncate time_Lable"
          style={{ fontSize: "5px !important" }}
        >
          {lable}
        </label>
      </div>
    </>
  );
};

export default TimePicker;
