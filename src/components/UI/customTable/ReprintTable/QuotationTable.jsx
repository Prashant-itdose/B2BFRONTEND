import React from "react";
import Tables from "..";
import ReactSelect from "../../../formComponent/ReactSelect";

const QuotationTable = (props) => {
  const { THEAD, tbody, handleCustomSelect, handleEditInfo, handleSettlement, handleCashReceipt } = props;

  const options = [
    { label: 'Edit Info', value: 'edit' },
    { label: 'Settle', value: 'settle' },
    { label: 'Print Receipt', value: 'print' },
    { label: 'Fully Paid', value: 'fullyPaid' }
  ];

  const handleReactSelect = (name, value, index) => {
    switch (value.value) {
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
        handleCustomSelect(index, "isFullyPaid", !tbody[index].IsDead);
        break;
      default:
        break;
    }
  };

  // Transform TBODY data for the table
  const formattedTBody = tbody.map((ele, index) => ({
    "Sr. No.": index + 1,
    "Quotation No.": ele.Qutationno,
   "Item Name": ele.itemname,
    
   
    "Total Amount": ele.totalamount,
    "Remark": ele.remark,
    "Vendor Name": ele.VendorName,
    
    "Entry Date From": ele.EntryDateFrom,
    "Entry Date To": ele.EntryDateTo,
    "Approval Status": ele.ApprovalStatus,
    "Is Dead": ele.IsDead,
    "Action": (
      <ReactSelect
          value={null}
          dynamicOptions={options}
          handleChange={(name, value) => handleReactSelect(name, value, index)} // Passing the index here
          placeholder="Select Action"
          className="p-column-dropdown"
      />
    ),
    colorcode: ele.rowcolor // Apply color from TBODY
  }));

  return (
    <Tables
      thead={THEAD}
      tbody={formattedTBody}
      tableHeight={"tableHeight"}
      rowStyle={(row) => ({
        backgroundColor: row.colorcode || 'transparent', // Apply background color based on colorcode
      })}
    />
  );
};

export default QuotationTable;
