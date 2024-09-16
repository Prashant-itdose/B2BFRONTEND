import React from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "primereact/tooltip"; // If you need tooltips

function Input({
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
  display,
  onChange,
  disabled,
  readOnly,
  defaultValue,
  onBlur,
  inputRef,
  removeFormGroupClass,
  onInput,
  max,
  min,
  showTooltipCount,
  tabIndex,
  error, // New prop for error message
  maxLength, // New prop for max length count
  newStyle = {}
}) {
  const [t] = useTranslation();
  const remainingCount = maxLength ? maxLength - (value?.length || 0) : 0;
  const style = {
    textAlign: display ?? "left",
    ...newStyle
  };
  return (
    <div className={`${respclass} custominputbox`}>
      <div className={removeFormGroupClass ? "" : "form-group"}>
        <input
          type={type}
          className={`${className} ${error ? 'is-invalid' : ''}`} // Add class for error styling
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onKeyDown={onKeyDown}
          onChange={onChange}
          autoComplete="off"
          step={type === "number" ? "0.01" : ""}
          required={required}
          ref={inputRef}
          onBlur={onBlur}
          max={max}
          min={min}
          style={ style}
          onInput={onInput}
          disabled={disabled ? disabled : false}
          tabIndex={tabIndex ? tabIndex : "-1"}
          readOnly={readOnly}
          maxLength={maxLength}
        />
        <label htmlFor={id} className="lable truncate">
          {lable}
        </label>
        {/* Display the remaining count when input type is number */}
       
        {/* Display error message */}
        {error && (
          <div
            className="text-danger"
            style={{ fontSize: '12px', marginTop: '4px' }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
