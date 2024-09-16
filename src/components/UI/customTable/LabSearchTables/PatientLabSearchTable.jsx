import React from 'react';
import Tables from '..'; // Adjust the import path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons'; // Import the print icon from Font Awesome

const PatientLabSearchTable = (props) => {
  const { THEAD, tbody = [], handleCustomSelect } = props;

  const handlePrint = (index) => {
    // Define the logic for printing
  };

  return (
    <>
    <Tables
      thead={THEAD}
      tbody={tbody?.map((ele, index) => ({
        "Sr. No.": index + 1,
        "EntryDateTime": ele?.EntryDate,
        "VisitNo.": ele?.LedgerTransactionNo,
        "SIN No.": ele?.BarcodeNo,
        "PatientName": ele?.PName,
        "Age/Sex": ele?.pinfo,
        "Doctor": ele?.DoctorName,
        "Investigation": ele?.ItemName,
        "Select": (
          <input
            type="checkbox"
            name="isSelected"
            checked={ele?.isSelected}
            onChange={(e) =>
              handleCustomSelect(index, "isSelected", e.target.checked)
            }
          />
        ),
        "Print": (
          <>
          <FontAwesomeIcon
              icon={faPrint}
              style={{ color: 'green',marginRight: '8px', cursor: 'pointer' }}
              onClick={() => handlePrint(index, false)}
              title="Print without Header"
            />
            <FontAwesomeIcon
              icon={faPrint}
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => handlePrint(index, true)}
              title="Print with Header"
            />
            
          </>
        ),
        'colorcode': ele?.rowColor
      }))}
      tableHeight={"tableHeight"} // Adjust this according to your requirements
    />
  </>
  
  );
};

export default PatientLabSearchTable;
