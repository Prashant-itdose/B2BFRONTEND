import React from "react";
import Tables from "..";
import { Tooltip } from "primereact/tooltip";
import { BillPRINTTYPE, ReceiptPRINTTYPE } from "../../../../utils/constant";
 
const LedgerMonthlyTable = (props) => {
  
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
            
       "Month":ele?.Month,
                "Date":ele?.Date,
                "InvoiceNo":ele?.InvoiceNo,
                "Net":ele?.Net,
                "DepositAmount":ele?.DepositAmount,
                "Closing":ele?.Closing
            }))}
        
        
        tableHeight={"tableHeight"}
      />
    </>
  );
};

export default LedgerMonthlyTable;
