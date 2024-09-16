import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Import the edit icon
import Tables from '../../../components/UI/customTable'; // Custom Table component
import { faStar, faEye } from '@fortawesome/free-solid-svg-icons'; 

const CollectionTable = (props) => {
  const { THEAD, tbody } = props;
  const [expandedRow, setExpandedRow] = useState(null); // State to track the expanded row index

  const toggleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index); // Toggle expansion for the clicked row
  };

  // Map tbody and add an edit icon and expandable row
  const enhancedTbody = tbody?.reduce((acc, ele, index) => {
    // Main row (the data row)
    acc.push({
      "Sr. No.": (
        <>
          {index + 1}
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => toggleExpandRow(index)} // Click to toggle expansion
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
        </>
      ),
      "CreatedDate": ele?.EntryDateTime,
      "CreatedBy": ele?.EntryByName,
      "AppDate": ele?.AppDate,
      "PrebookingID": ele?.PreBookingId,
      "MobileNo": ele?.Mobile,
      "PatientName": ele?.PatientName,
      "City": ele?.City,
      "Location": ele?.Locality,
      "Pincode": ele?.PinCode,
      "Route": ele?.RouteName,
      "PhleboDetails": `${ele?.PhleboName}/${ele?.PMobile}`,
      "DropLocation": ele?.Centre,
    });

    
    if (expandedRow === index) {
        acc.push({
          expandedRow:<ExpandedRowContent ele={ele} /> 
        });
      }

    return acc;
  }, []);
  console.log(enhancedTbody)
  return (
    <>
      <Tables
        thead={THEAD}
        tbody={enhancedTbody}
        tableHeight={"tableHeight"} // Adjust this according to your requirements
      />
    </>
  );
};

export default CollectionTable;


const ExpandedRowContent = ({ ele }) => {
  const [showHappyCode, setShowHappyCode] = useState(false); // Toggle Happy Code visibility

  const handleViewLog = () => {
    // Define the logic for viewing the log
    alert(`Viewing log for: ${ele.PatientName}`);
  };

  const handleToggleHappyCode = () => {
    setShowHappyCode(!showHappyCode); // Toggle the visibility of Happy Code
  };

  return (
    <div style={{ padding: '10px' }}>
      {/* Current Status */}
      <h5>Current Status: {ele.CurrentStatus || "Pending"}</h5>

      {/* View Log Button */}
      <button className="btn btn-primary" onClick={handleViewLog}>
        <FontAwesomeIcon icon={faEye} /> View Log
      </button>

      {/* Happy Code (Hidden by default) */}
      <div style={{ marginTop: '10px' }}>
        <button className="btn btn-secondary" onClick={handleToggleHappyCode}>
          {showHappyCode ? 'Hide Happy Code' : 'Show Happy Code'}
        </button>
        {showHappyCode && (
          <p style={{ marginTop: '10px' }}>Happy Code: {ele.HappyCode || 'N/A'}</p>
        )}
      </div>

      {/* Phlebo and Patient Ratings */}
      <div style={{ marginTop: '20px' }}>
        <h6>Phlebo Rating: 
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} color={i < ele.PhleboRating ? 'gold' : 'grey'} />
          ))}
        </h6>
        <h6>Patient Rating: 
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} color={i < ele.PatientRating ? 'gold' : 'grey'} />
          ))}
        </h6>
      </div>

      {/* Table of Tests Booked */}
      <div style={{ marginTop: '20px' }}>
        <h5>Tests Booked</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ItemId</th>
              <th>ItemName</th>
              <th>ItemType</th>
              <th>Rate</th>
              <th>DiscAmt</th>
              <th>NetAmt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ele.Tests?.map((test, index) => (
              <tr key={index}>
                <td>{test.ItemId}</td>
                <td>{test.ItemName}</td>
                <td>{test.ItemType}</td>
                <td>{test.Rate}</td>
                <td>{test.DiscAmt}</td>
                <td>{test.NetAmt}</td>
                <td>
                  <button className="btn btn-sm btn-info">Edit</button>
                  <button className="btn btn-sm btn-danger ml-2">Cancel</button>
                  <button className="btn btn-sm btn-warning ml-2">Reschedule</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



