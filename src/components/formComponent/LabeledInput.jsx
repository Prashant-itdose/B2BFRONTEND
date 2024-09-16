import { Tooltip } from "primereact/tooltip";
import React, { useCallback } from "react";

function LabeledInput({ label, value, className }) {
  const renderValue = useCallback(
    (value) => {
      if (value?.length > 27) {
        return (
          <>
            <Tooltip
              target={`#labelInput-${label.replace(/[^A-Za-z0-9]+/g, "")}`}
              position="top"
              content={value}
              event="hover"
            />
            <div className="labelPicker">{label}</div>
            <div
              className="valueName"
              id={`labelInput-${label.replace(/[^A-Za-z0-9]+/g, "")}`}
            >
              {value.substring(0, 27) + "..."}
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="labelPicker">{label}</div>
            <div className="valueName">{value}</div>
          </>
        );
      }
    },
    [value]
  );

  return (
    <div className={className} style={{ position: "relative" }}>
      {renderValue(value)}
    </div>
  );
}

export default LabeledInput;
