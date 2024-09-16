import React, { useEffect } from 'react';


const NoRecordFound = () => {
  useEffect(() => {
    // Unmount the component after 2 seconds
    const timer = setTimeout(() => {
      // Your unmount logic, e.g., setting a state to hide this component
    }, 2000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="no-record-overlay">
      <div className="no-record-message">
        No Records Found
      </div>
    </div>
  );
};

export default NoRecordFound;
