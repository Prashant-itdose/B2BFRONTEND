import React, { useState } from "react";
import Tables from "..";
import Modal from "../../../modalComponent/Modal";
import SlotModal from "../../../modalComponent/Utils/SlotModal";
import HtmlSelect from "../../../formComponent/HtmlSelect";
import { useSelector } from "react-redux";
import CustomSelect from "../../../formComponent/CustomSelect";
import Input from "../../../formComponent/Input";
import { ROUNDOFF_VALUE } from "../../../../utils/constant";
import { calculateBillAmount, debounce } from "../../../../utils/utils";
import { Tooltip } from "primereact/tooltip";
import PackageDetails from "../../../modalComponent/Utils/PackageDetails";
import InvestigationModal from "../../../modalComponent/Utils/InvestigationModal";
import { Row } from "react-bootstrap";
import urgent from "../../../../assets/image/urgent1.gif"


function TestAddingTable(props) {
  const {
    THEAD,
    bodyData,
    setBodyData,
    handlePaymentGateWay,
    singlePatientData,
    discounts,
    payloadData
  } = props;

  const [modalData, setModalData] = useState({
    show: false,
    component: null,
    size: null,
    header: null,
  });
  const { BindResource, GetAllDoctorList } = useSelector(
    (state) => state?.CommonSlice
  );

  const handleCustomSelect = (index, name, e) => {
    let data = [...bodyData];
    data[index][name] = e.value;
    setBodyData(data);
  };

  const handleDeleteRow = (index) => {
    let data = [...bodyData];
    console.log(data)
    data.splice(index, 1);
    const amount = calculateBillAmount(
      data,
      BindResource?.isReceipt,
      singlePatientData?.OPDAdvanceAmount,
      false,
      1,
      0.0,
      1,
      1
    );
    // handlePaymentGateWay(amount);
    setBodyData(data);
  };

  const handleCalculation = (modifiedData) => {
    if (Number(modifiedData?.discountPercentage)) {
      modifiedData.discountAmount =
        Number(modifiedData.Rate) *
        Number(modifiedData?.defaultQty) *
        Number(modifiedData?.discountPercentage) *
        0.01;
    } else {
      modifiedData.discountPercentage = (
        (modifiedData.discountAmount * 100) /
        modifiedData.grossAmount
      ).toFixed(ROUNDOFF_VALUE);
    }

    modifiedData.amount =
      Number(modifiedData?.Rate) * Number(modifiedData?.defaultQty) -
      modifiedData?.discountAmount;

    modifiedData.coPaymentAmount = (
      modifiedData.amount *
      modifiedData?.coPaymentPercent *
      0.01
    ).toFixed(ROUNDOFF_VALUE);

    modifiedData.GSTAmount = Number(
      modifiedData.amount * modifiedData.GstPer * 0.01
    ).toFixed(ROUNDOFF_VALUE);

    modifiedData.grossAmount =
      Number(modifiedData?.Rate) * Number(modifiedData?.defaultQty);

    modifiedData.PayableAmount =
      modifiedData?.IsPayable === "1"
        ? modifiedData?.amount
        : modifiedData?.coPaymentAmount;

    return modifiedData;
  };

  const debouncedHandlePaymentGateWay = (data) => {
    const amount = calculateBillAmount(
      data,
      BindResource?.isReceipt,
      singlePatientData?.OPDAdvanceAmount,
      false,
      1,
      0.0,
      1,
      1
    );
    handlePaymentGateWay(amount);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    let data = [...bodyData];
    let modifiedData = data[index];
    if (name === "discountPercentage") {
      modifiedData[name] =
        value > discounts?.Eligible_DiscountPercent
          ? discounts?.Eligible_DiscountPercent
          : value;
    } else {
      modifiedData[name] = value;
    }
    const resultData = handleCalculation(modifiedData);
    data[index] = resultData;
    debouncedHandlePaymentGateWay(data);
    setBodyData(data);
  };

 

  const handletypeOfApp = async (e, index) => {
    const { name, value } = e.target;
    let data = [...bodyData];
    let modifiedData = data[index];
    modifiedData[name] = value;

    if (value !== "2") {
      handleSlotModal(index);
    } else {
      const appointmentData = await handleWalkInData(modifiedData);
      modifiedData.AppointedDateTime = appointmentData;
    }
    data[index] = modifiedData;
    debouncedHandlePaymentGateWay(
      data.filter((ele) => Number(ele[name]) === 2)
    );
    setBodyData(data);
  };

  const handleSlotModal = (index) => {
    setModalData({
      show: true,
      component: (
        <div>
          <SlotModal
            data={{ ...bodyData[index], Item: bodyData[index]?.label }}
            handleSetData={(e) => handleSetData(e, index)}
          />
        </div>
      ),
      size: "95vw",
      header: "Doctor Slot",
    });
  };

  const handleInvestigationSlot = (index) => {
    setModalData({
      show: true,
      component: (
        <div>
          <InvestigationModal
            data={bodyData[index]}
            handleSetData={(e) => handleSetData(e, index)}
          />
        </div>
      ),
      size: "90vw",
      header: "Investigation Slot",
    });
  };

  const handlePackageData = (modifiedData, index) => {
    
    const data = [...bodyData];
    data[index] = modifiedData;

  
    setModalData({
      show: true,
      component: (
        <div>
          <PackageDetails
            data={data[index]}
            handlePackageData={(e) => handlePackageData(e, index)}
          />
        </div>
      ),
      size: "70vw",
      header: "Package Details",
    });
    setBodyData(data);
  };

  const handlePackageDetails = (index) => {
     console.log(index)
    setModalData({
      show: true,
      component: (
        <div>
          <PackageDetails
            data={bodyData[index]}
            handlePackageData={(e) => handlePackageData(e, index)}
          />
        </div>
      ),
      size: "70vw",
      header: "Package Details",
    });
  };

  const handleSetData = (modifiedData, index) => {
    const data = [...bodyData];
    data[index] = modifiedData;
    setBodyData(data);
    setModalData({
      show: false,
      component: null,
      header: null,
      size: null,
    });
  };

  const handleSplit = (data, replace, byreplace) => {
    return data ? data?.replace(replace, byreplace) : data;
  };

  const SlotComponent = ({ index, row }) => {
    // tnxtypeID===5
    return (
      <>
        <Tooltip
          target={`#appointMent${index}`}
          position="mouse"
          content={handleSplit(row?.AppointedDateTime, "#", " ")}
          event="hover"
          className="ToolTipCustom"
        />
        <i
          class="fa fa-calendar"
          aria-hidden="true"
          id={`appointMent${index}`}
          onClick={() => handleSlotModal(index)}
        ></i>
      </>
    );
  };

  const InvestigationSlot = ({ index, row }) => {
    // categoryID===7
    return (
      <>
        <Tooltip
          target={`#InvestigationSlot${index}`}
          position="mouse"
          content={handleSplit(row?.AppointedDateTime, "#", " ")}
          event="hover"
          className="ToolTipCustom"
        />
        <i
          class="fa fa-calendar"
          aria-hidden="true"
          id={`InvestigationSlot${index}`}
          onClick={() => handleInvestigationSlot(index)}
        ></i>
      </>
    );
  };

  // const settleFunction = (row, index) => {
  //   let tableData = {
  //     Slot: null,
  //     type: null,
  //     Code: null,
  //     PackageView: null,
  //     ItemName: null,
  //     Token: null,
  //     Doctor: null,
  //     GstType: null,
  //     GstPer: null,
  //     Rate: null,
  //     Qty: null,
  //     Rate:null,
  //     DiscountPercentage: null,
  //     DisAmount: null,
  //     amount: null,
  //     GSTAmount: null,
  //     PayableAmount: null,
  //     Checkbox: null,
  //     action: null,
  //   };

  //   // slot condition

  //   if (
  //     row?.CategoryID === "7" &&
  //     // BindResource?.IsInvestigationAppointment === "1" &&
  //     row?.isMobileBooking === 1
  //   ) {
  //     tableData.Slot = <i class="fa fa-calendar" aria-hidden="true"></i>;
  //   } else if (
  //     row?.CategoryID === "7" &&
  //     // BindResource?.IsInvestigationAppointment === "1" &&
  //     row?.isMobileBooking === 0
  //   ) {
  //     tableData.Slot = <InvestigationSlot index={index} row={row} />; // popup function 1
  //   } else if (row?.TnxTypeID === "5") {
  //     tableData.Slot = <SlotComponent index={index} row={row} />; // popup function 2
  //   }

  //   // type Condition
  //   if (row?.TnxTypeID === "5") {
  //     tableData.type = (
  //       <HtmlSelect
  //         option={row?.AppointedType}
  //         value={row?.typeOfApp}
  //         name="typeOfApp"
  //         onChange={(e) => handletypeOfApp(e, index)}
  //       /> //handleChange && popup function 1
  //     );
  //   }

  //   // code
  //   tableData.ItemCode = row?.ItemCode;

  //   // PackageView

  //   if (row?.TnxTypeID === "23") {
  //     tableData.PackageView = (
  //       <button
  //         className="btn btn-sm text-white"
  //         onClick={() => handlePackageDetails(index)}
  //       >
  //         +
  //       </button>
  //     ); //bindpackageItemDetailnew api call
  //   }

  //   // ItemName

  //   tableData.ItemDisplayName = row?.ItemDisplayName;

  //   // last Token Number;

  //   tableData.Token = (
  //     <div style={{ color: "#f9183f", fontWeight: 800, textAlign: "center" }}>
  //       {row?.Token}
  //     </div>
  //   );

  //   // Doctor

  //   if (row?.TnxTypeID !== "5" && row?.TnxTypeID !== "23") {
  //     tableData.Doctor = (
  //       <CustomSelect
  //         option={GetAllDoctorList}
  //         value={row?.DoctorID}
  //         placeHolder="Select Doctor"
  //         name="DoctorID"
  //         onChange={(name, e) => handleCustomSelect(index, name, e)}
  //       />
  //     );
  //   }

  //   // GstType

  //   tableData.GstType = <div>{row?.GstType}</div>;

  //   // GstPer

  //   tableData.GstPer = <div className="text-right">{row?.GstPer}</div>;

  //   // Rate

  //   tableData.Rate = (
  //     <Input
  //       type="number"
  //       className="table-input"
  //       name={"Rate"}
  //       removeFormGroupClass={true}
  //       display={"right"}
  //       onChange={(e) => handleInputChange(e, index)}
  //       value={row?.Rate}
  //       disabled={row?.constantRate > 0 ? row?.rateEditAble : false}
  //     />
  //   );

  //   // Qty

  //   tableData.Qty = (
  //     <Input
  //       type="number"
  //       className="table-input"
  //       value={row?.defaultQty}
  //       removeFormGroupClass={true}
  //       name={"defaultQty"}
  //       display={"right"}
  //       onChange={(e) => handleInputChange(e, index)}
  //       max={row?.defaultQty}
  //       disabled={["23", "5"].includes(row?.TnxTypeID) ? true : false}
  //     />
  //   );

  //   // DiscountPercentage
  //   tableData.DiscountPercentage = (
  //     <Input
  //       type="number"
  //       className="table-input"
  //       name={"discountPercentage"}
  //       removeFormGroupClass={true}
  //       value={row?.discountPercentage}
  //       display={"right"}
  //       onChange={(e) => handleInputChange(e, index)}
  //       max={100}
  //       disabled={
  //         [2].includes(Number(row?.typeOfApp)) ? !row?.IsDiscountEnable : true
  //       }
  //     />
  //   );

  //   // DisAmount

  //   tableData.DisAmount = (
  //     <Input
  //       type="number"
  //       className="table-input"
  //       removeFormGroupClass={true}
  //       display={"right"}
  //       name="discountAmount"
  //       value={row?.discountAmount}
  //       disabled={
  //         [2].includes(Number(row?.typeOfApp)) ? !row?.IsDiscountEnable : true
  //       }
  //       onChange={(e) => handleInputChange(e, index)}
  //     />
  //   );

  //   // amount

  //   tableData.amount = (
  //     <div className="text-right">
  //       {Number(row?.amount).toFixed(ROUNDOFF_VALUE)}
  //     </div>
  //   );

  //   // GSTAmount

  //   tableData.GSTAmount = <div className="text-right"> {row?.GSTAmount}</div>;

  //   // PayableAmount

  //   tableData.PayableAmount = (
  //     <div className="text-right">{row?.PayableAmount}</div>
  //   );

  //   // Checkbox
  //   if (!["5", "23", "20"].includes(row?.TnxTypeID)) {
  //     tableData.Checkbox = <input type="checkbox" />;
  //   }

  //   // action
  //   tableData.action = (
  //     <i
  //       class="fa fa-trash text-danger text-center "
  //       aria-hidden="true"
  //       onClick={() => handleDeleteRow(index)}
  //     />
  //   );

  //   return tableData;
  // };
  const handleDiscountChange=()=>{

  }
  const handleQtyChange=()=>{
    
  }
  const settleFunction = (row, index) => {
    const isCashPayment = payloadData?.PaymentMode === "Cash";
  
    return {
      Code: row.Code || "",
      ItemName: row.ItemName || "",
      View: (
        <i
          className="fa fa-eye"
          aria-hidden="true"
          onClick={() => handlePackageDetails(row)}
        ></i>
      ),
      MRP: row.MRP,
      Rate: row.Rate,
      Qty: (
        <select
          value={row.Qty || 1}
          onChange={(e) => handleQtyChange(e, index)}
          style={{ width: "60px" }}
        >
          {[...Array(5).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      ),
      Discount: isCashPayment ? (
        <Input
          type="text"
          value={row.Discount || "0"}
          onChange={(e) => handleDiscountChange(e, index)}
          style={{ width: "50px" }}
        />
      ) : (
        row.Discount || "0"
      ),
      Amount: row.Rate - row.Discount,
      DeliveryDate: row?.DeliveryDate,
      IsUrgent: <input type="checkbox" checked={false} />,
      IsSelfCollection: <input type="checkbox" checked={false} />,
      Remove: (
        <i
          className="fa fa-trash text-danger text-center"
          aria-hidden="true"
          onClick={() => handleDeleteRow(index)}
        />
      ),
    };
  };
  
  
  
  // Example utility function to calculate the amount
  const calculateAmount = (rate, qty = 1, discount = 0) => {
    const amount = rate * qty;
    const discountedAmount = amount - (amount * discount) / 100;
    return discountedAmount.toString();
  };
  
  // Example utility function to get the current date
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  
  

  
  
 

  return (
    <div className="card patient_registration_card my-1">
      <Tables
  thead={["Code", "Item Name", "View", "MRP", "Rate", "Qty", "Discount", "Amount", "Delivery Date",<img
    src={urgent}
    alt="Urgent"
    title="IsUrgent"
    style={{ width: "10px", height: "10px" }}
  />, "Is Self Collection", "Remove"]}
  style={{
    maxHeight: "185px",
  }}
  tbody={bodyData?.map((row, index) => {
    const {
      Code,
      ItemName,
      View,
      MRP,
      Rate,
      Qty,
      Discount,
      Amount,
      DeliveryDate,
      IsUrgent,
      IsSelfCollection,
      Remove,
    } = settleFunction(row, index);

    return {
      Code,
      ItemName,
      View,
      MRP,
      Rate,
      Qty,
      Discount,
      Amount,
      DeliveryDate,
      IsUrgent,
      IsSelfCollection,
      Remove,
    };
  })}
/>



      {modalData?.show && (
        <Modal
          visible={modalData?.show}
          setVisible={() =>
            setModalData({
              show: false,
              component: null,
              size: null,
            })
          }
          modalWidth={modalData?.size}
          Header={modalData?.header}
          footer={<></>}
        >
          {modalData?.component}
        </Modal>
      )}
    </div>
  );
}

export default TestAddingTable;
