import React from "react";
import Tables from "..";
import { Tooltip } from "primereact/tooltip";
import { BillPRINTTYPE, ReceiptPRINTTYPE } from "../../../../utils/constant";
 
const LedgerTransactionTable = (props) => {
  
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
            
       "BillDate":ele?.BillDate,
                "InvoiceNo":ele?.invoiceno,
                "Particulas":ele?.period,
                "DebitAmount":ele?.debit,
                "CreditAmount":ele?.credit,
                "LineWiseClosing":ele?.LineWiseClosing
            }))}
        
        
        tableHeight={"tableHeight"}
      />
    </>
  );
};

export default LedgerTransactionTable;
