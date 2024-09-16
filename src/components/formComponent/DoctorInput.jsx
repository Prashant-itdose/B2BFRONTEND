import React, { useState, useEffect } from "react";

function DoctorInput({
  value,
  onChange,
  setFieldValue,
  fetchDoctorSuggestions,
  doctorSuggestion,
  respclass,
  label,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) {
        fetchDoctorSuggestions(inputValue).then((suggestions) => {
          setShowDropdown(true);
        });
      } else {
        setShowDropdown(false);
      }
    }, 300); // Debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const handleSelect = (selectedDoctor) => {
    setFieldValue("DoctorName", selectedDoctor.label.split(" # ")[0]); // Extract name
    setFieldValue("DoctorId", selectedDoctor.value);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(e); // If you need to propagate this to formik or parent component
  };

  return (
    <div className={`${respclass} custominputbox`}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
          placeholder=" "
          autoComplete="off"
        />
        <label htmlFor="Doctor" className="label truncate">
          {label}
        </label>
        {showDropdown && doctorSuggestion.length > 0 && (
          <ul className="suggestion-data">
            {doctorSuggestion.map((data, index) => (
              <li
                key={index}
                onClick={() => handleSelect(data)}
                className="suggestion-item"
              >
                {data.label.split(" # ")[0]} {/* Display only the doctor's name */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DoctorInput;
