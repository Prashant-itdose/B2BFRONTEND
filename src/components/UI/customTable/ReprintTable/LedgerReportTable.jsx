import React from "react";
import Tables from "..";
import { Tooltip } from "primereact/tooltip";
import { BillPRINTTYPE, ReceiptPRINTTYPE } from "../../../../utils/constant";
 
const LedgerReportTable = (props) => {
  
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
            "Sr. No.":index+1,
      "Centre":ele?.Centre,
      "SalesManager":ele?.Sales_Manager,
      "PaymentMode":ele?.Payment_Mode,
      "ClientCode":ele?.Client_Code,
      "ClientName":ele?.Client_Name,
      "OpeningAmount":ele?.OpeningAmount,
      "CurrentBooking":ele?.CurrentBooking,
      "ReceivedAmount":ele?.ReceivedAmount,
      "ClosingAmount":ele?.ClosingAmount
        }))}
        
        
        tableHeight={"tableHeight"}
      />
    </>
  );
};

export default LedgerReportTable;
