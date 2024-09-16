import React, { useCallback } from "react";
import Tables from "..";
import HtmlSelect from "../../../formComponent/HtmlSelect";
import Input from "../../../formComponent/Input";
import ReactSelect from "../../../formComponent/ReactSelect";
import DatePicker from "../../../formComponent/DatePicker";

function PaymentTable(props) {
  const {
    getBankMasterData,
    tbody,
    handleChange,
    handlePaymentRemove,
    getMachineData,
  } = props;

  const THEAD = [
    "PaymentMode",
    "PaidAmount",
     "ChequeNo",
     "ChequeDate",
    "BankName",
     "Action",
  ]; 
  console.log('Paymenttable',tbody)

  const settleValue = (row, index) => {
    const tableData = {
        PaymentMode: null,
        PaidAmount: null,
        ChequeDate:null,
        ChequeNo: null,
        BankName: null,
        Action: null,
    };

    // Set PaymentMode
    tableData.PaymentMode = row?.label;

    // Set PaidAmount input field
    tableData.PaidAmount = (
        <Input
            className="form-control"
            value={row?.S_Amount}
            removeFormGroupClass={true}
            name="S_Amount"
            onChange={(e) => handleChange(e, index)}
        />
    );

    // Conditionally set ChequeNo input field
    if (row?.IsChequeNoShow === 1) {
        tableData.ChequeNo = (
            <Input
                // className="table-input"
                className="form-control"
                value={row?.ChequeNo || ""}
                removeFormGroupClass={true}
                name="ChequeNo"
                placeholder="Number"
                onChange={(e) => handleChange(e, index, 'ChequeNo')}
            />
        );
    }
    if (row?.IsChequeDateShow === 1) {
      tableData.ChequeDate = (
          <DatePicker
              className="table-date"
              value={row?.ChequeNo || ""}
              removeFormGroupClass={true}
              name="ChequeNo"
              placeholder="Date"
              showicon={false}
              onChange={(e) => handleChange(e, index, 'ChequeNo')}
          />
      );
  }


    // Conditionally set BankName dropdown
    if (row?.IsBankShow === 1) {
      tableData.BankName = (
          <ReactSelect
              dynamicOptions={getBankMasterData}
              value={row?.BankName ? { label: row?.BankName, value: row?.BankName } : null}
              handleChange={(selectedOption) => handleChange('BankName',selectedOption, index)}
              placeholder="Select Bank"
          />
      );
  }
  

    // Set Action
    tableData.Action = (
        <i
            className="fa fa-trash text-danger text-center"
            aria-hidden="true"
            onClick={() => handlePaymentRemove(index)}
        ></i>
    );

    return tableData;
};
console.log(tbody)

  return (
    <>
      <Tables
        thead={THEAD}
        style={{ maxHeight: "150px" }}
        tbody={tbody?.map((row, index) => {
          const {
            PaymentMode,
      PaidAmount,
      ChequeNo,
      ChequeDate,
      BankName,
      Action,
          } = settleValue(row, index);
          return {
            PaymentMode,
            PaidAmount,
            ChequeNo,
            ChequeDate,
            BankName,
            Action,
          };
        })}
      />
    </>
  );
}

export default PaymentTable;
