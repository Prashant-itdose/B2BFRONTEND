import React from "react";

function HtmlSelect({ option, name, onChange, value }) {
  return (
    <select name={name} onChange={onChange} value={value}>
      {option.map((data, index) => (
        <option key={index} value={data?.value}>
          {data?.label}
        </option>
      ))}
    </select>
  );
}

export default HtmlSelect;
