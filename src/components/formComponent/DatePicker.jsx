import React from "react";
import { Calendar } from "primereact/calendar";

function DatePicker({
  type,
  name,
  className,
  respclass,
  id,
  placeholder,
  lable,
  value,
  onKeyDown,
  required,
  handleChange,
  tabIndex,
  timeOnly,
  maxDate, // Add maxDate as a prop
  disabled,
  showicon
}) {
  return (
    <>
      <div className={respclass} style={{ position: "relative" }}>
        <div className="form-group ">
          <Calendar
            inputId={id}
            id={id}
            showIcon={showicon}
            placeholder={placeholder}
            className={className}
            dateFormat="dd-MM-yy"
            value={value}
            name={name}
            timeOnly={timeOnly}
            onChange={handleChange}
            wrapperClassName="datepicker"
            tabIndex={tabIndex ? tabIndex : "-1"}
            maxDate={maxDate} // Set maxDate here
            disabled={disabled}
          />
          <label
            htmlFor={id}
            className="label lable truncate"
            style={{ fontSize: "5px !important" }}
          >
            {lable}
          </label>
        </div>
      </div>
    </>
  );
}

export default DatePicker;
