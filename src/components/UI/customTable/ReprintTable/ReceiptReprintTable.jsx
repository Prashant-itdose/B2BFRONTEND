import React from "react";
import Tables from "..";
import { Dropdown } from "primereact/dropdown"; // Import Dropdown from PrimeReact
import { Menu } from "primereact/menu"; // Import Menu for more options if needed
import ReactSelect from "../../../formComponent/ReactSelect";
import ReactSelectHead from "../../../formComponent/ReactSelectHead";

const ReceiptReprintTable = (props) => {
  const { THEAD, tbody = [], values, handleCustomSelect, handleEditInfo, handleSettlement, handleCashReceipt } = props;

  const options = [
    { label: 'Edit Info', value: 'edit' },
    { label: 'Settle', value: 'settle' },
    { label: 'Print Receipt', value: 'print' },
    { label: 'Fully Paid', value: 'fullyPaid' }
  ];

  console.log("options",options)
  const handleDropdownChange = (e, index) => {
    const action = e.value;
    switch (action) {
      case 'edit':
        handleEditInfo(index);
        break;
      case 'settle':
        handleSettlement(index);
        break;
      case 'print':
        handleCashReceipt(index);
        break;
      case 'fullyPaid':
        handleCustomSelect(index, "isFullyPaid", !tbody[index].isFullyPaid);
        break;
      default:
        break;
    }
   
  };
  const handleReactSelect = (name, value, index) => {
    console.log("Selected Option:", value);
    console.log("Index:", index);
    if (value.value === 'edit') {
        handleEditInfo(index);
    } else if (value.value === 'settle') {
        handleSettlement(index);
    } else if (value.value === 'print') {
        handleCashReceipt(index);
    } else if (value.value === 'fullyPaid') {
        handleCustomSelect(index, "isFullyPaid", !tbody[index].isFullyPaid);
    }
};




  return (
    <>
      <Tables
        thead={THEAD}
        tbody={tbody?.map((ele, index) => ({
          "Sr. No.": index + 1,
          EntryDateTime: ele?.EntryDate,
          "Lab No.": ele?.LabNo,
          "SIN No.": ele?.BarcodeNo,
          PatientName: ele?.PName,
          "Age/Sex": ele?.Pinfo,
          "Mobile No.": ele?.Mobile,
          "Gross Amt.": ele?.GrossAmount,
          "Disc Amt.": ele?.DiscountOnTotal,
          "Net Amt": ele?.NetAmount,
          "Paid Amt": ele?.Amount,
          "Due Amt.": ele?.Due,
          Client: ele?.PanelName,
          Actions: (
            <ReactSelect
                value={null}
                dynamicOptions={options}
                handleChange={(name, value) => handleReactSelect(name, value, index)} // Passing the index here
                placeholder="Select Action"
                className="p-column-dropdown"
            />
        ),
          'colorcode':ele?.rowColor
        }))}
        tableHeight={"tableHeight"}
      />
    </>
  );
};

export default ReceiptReprintTable;
