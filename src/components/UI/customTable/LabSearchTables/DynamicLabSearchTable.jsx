import React from "react";
import Tables from ".."; // Adjust the import path as needed
import { Tooltip } from "primereact/tooltip"; // Make sure to import and use Tooltip correctly

const DynamicLabSearchTable = (props) => {
  const { THEAD, tbody = [], values, handleCustomSelect } = props;

  const handleViewInvoice = () => {
    // Define the logic for viewing invoice
  };

  const handleViewReport = () => {
    // Define the logic for viewing report
  };

  const handleEmail = () => {
    // Define the logic for sending email
  };

  const handleLog = () => {
    // Define the logic for handling logs
  };

  return (
    <>
      <Tables
        thead={THEAD}
        tbody={tbody?.map((ele, index) => ({
          "Sr. No.": index + 1,
          "EntryDateTime": ele?.EntryDate,
          "Lab No.": ele?.LedgerTransactionNo,
          "SIN No.": ele?.BarcodeNo,
          "PatientName": ele?.PName,
          "Age/Sex": ele?.pinfo,
          "Centre": ele?.centre,
          "RateType": ele?.PanelName,
          "Doctor": ele?.DoctorName,
          "DoctorMobile": ele?.DocMob,
          "PRO": ele?.PRO,
          "Department": ele?.Dept,
          "Investiagtion": ele?.ItemName,
          "Source": ele?.PatientSource,
          "View": (
            <button onClick={() => handleViewInvoice(index)}>View</button>
          ),
          "ClinicalHistory": ele?.ClinicalHistory,
           
          "DocumentUpload": ele?.DocUploded,
          "Barcode Reprint": (
            <button onClick={() => handleEmail(index)}>Reprint</button>
          ),
          "Remarks": ele?.Remarks,
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
          "colorcode": ele?.rowColor, // Ensure this line is included
        }))}
        tableHeight={"tableHeight"} // Adjust this according to your requirements
      />
    </>
  );
};

export default DynamicLabSearchTable;
