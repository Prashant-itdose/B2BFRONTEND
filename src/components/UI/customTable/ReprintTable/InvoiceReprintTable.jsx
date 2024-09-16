import React from "react";
import Tables from "..";
import { Tooltip } from "primereact/tooltip";
import { BillPRINTTYPE, ReceiptPRINTTYPE } from "../../../../utils/constant";
 
const InvoiceReprintTable = (props) => {
  
  const { THEAD, tbody = [], values, handleCustomSelect } = props;
  const handleViewInvoice=()=>{

  }
  const handleViewReport=()=>{

  }
  const handleEmail=()=>{

  }
  const handleLog=()=>{

  }
  
  return (
    <>
      
      <Tables
        thead={THEAD}
        tbody = {tbody?.map((ele, index) => ({
            "Sr. No.": index + 1,
            "InvoiceNo": ele?.InvoiceNo,
            "ClientCode": ele?.Panel_Code,
            "ClientName": ele?.PanelName,
            "BusinessUnit": ele?.Centre,
            "InvoiceDate": ele?.DATE,
            "CreatedBy": ele?.InvoiceCreatedBy,
            "Share Amt": ele?.ShareAmt,
            "View Invoice": (
                <button onClick={() => handleViewInvoice(index)}>View Invoice</button>
            ),
            "View Report": (
                <button onClick={() => handleViewReport(index)}>View Report</button>
            ),
            "Email": (
                <button onClick={() => handleEmail(index)}>Email</button>
            ),
            "Log": (
                <button onClick={() => handleLog(index)}>Log</button>
            ),
            "Select": (
                <input
                    type="checkbox"
                    name="isSelected"
                    checked={ele?.isSelected}
                    onChange={(e) => handleCustomSelect(index, "isSelected", e.target.checked)}
                />
            ),
        }))}
        
        
        tableHeight={"tableHeight"}
      />
    </>
  );
};

export default InvoiceReprintTable;
