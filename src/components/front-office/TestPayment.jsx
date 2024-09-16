import i18n from "@app/utils/i18n";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactSelect from "../formComponent/ReactSelect";
import Button from "../formComponent/Button";
import { AutoComplete } from "primereact/autocomplete";

import {
  AddInvestigation,
  ReactSelectisDefaultValue,
  calculateBillAmount,
  filterByType,
  filterByTypes,
  notify,
} from "../../utils/utils";
import { ROUNDOFF_VALUE, SEARCH_BY_TEST } from "../../utils/constant";
import Confirm from "../modalComponent/Confirm";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../modalComponent/Modal";
import CPOEModal from "../modalComponent/Utils/CPOEModal";
import InvestigationModal from "../modalComponent/Utils/InvestigationModal";
import { BindTestslist } from "../../networkServices/opdserviceAPI";
import { formatDateToYYYYMMDD } from "../../utils/helperfunctions";

function TestPayment({
  testPaymentState,
  setTestPaymentState,
  payloadData,
  singlePatientData,
  setTestAddingTable,
  testAddingTableState,
  handlePaymentGateWay,
  TestData,
  handleDoctorSelected,
}) {
  const dispatch = useDispatch();

  let getCheckedData = [];
  const { BindResource } = useSelector((state) => state?.CommonSlice);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [dropDownState, setDropDown] = useState({
    RoleWiseOPDServiceBookingControlData: [],
  });

  const [confirmBoxvisible, setConfirmBoxvisible] = useState({
    show: false,
    alertMessage: "",
    lableMessage: "",
    chidren: "",
  });

  const [modalHandlerState, setModalHandlerState] = useState({
    header: null,
    show: false,
    size: null,
    component: null,
    footer: null,
  });

  const handlegetCheckedData = (rowData) => {
    getCheckedData = rowData?.filter((row, index) => row?.isChecked);
  };

  const handleInvestigationSlot = (data) => {
    setModalHandlerState({
      header: "Investigation Slot",
      show: true,
      size: "95vw",
      footer: <></>,
      component: (
        <div>
          <InvestigationModal
            data={data}
            handleSetData={(e) => handleAddInvestigationSlot(e, data)}
          />
        </div>
      ),
    });
  };

  useEffect(() => {
    if (
      TestData.length > 0 &&
      Object.keys(singlePatientData).length > 0 &&
      payloadData?.panelID?.value &&
      payloadData?.panelID?.panelCurrencyFactor
    ) {
      handleAddInvestigation(TestData);
    }
  }, [TestData, singlePatientData, payloadData?.panelID]);

  const handleAddInvestigation = async (getCheckedData) => {
    if (getCheckedData.length > 0) {
      try {
        const test = [];
        for (const data of getCheckedData) {
          const modifiedData = AddInvestigation(data);

          const addtesting = await testAddingObject(
            modifiedData,
            0,
            data?.PatientTest_ID,
            1,
            1,
            0
          );

          test.push({ ...addtesting, DoctorID: modifiedData?.DoctorID });
        }

        // handlePaymentGateWay(
        //   calculateBillAmount(
        //     [...test, ...testAddingTableState],
        //     BindResource?.isReceipt,
        //     singlePatientData?.OPDAdvanceAmount,
        //     false,
        //     1,
        //     0.0,
        //     payloadData?.panelID?.value === 1 ? 1 : 0,
        //     0
        //   )
        // );
        const finalData = [...test, ...testAddingTableState];
       console.log(finalData)
        setTestAddingTable(finalData);

        handleDoctorSelected(finalData[0].DoctorID);
        console.log("All investigations validated successfully.");
      } catch (error) {
        console.error("Error validating investigation:", error);
      }
    } else {
      console.log("No data to validate.");
    }
  };

  const handleModalState = () => {
    setModalHandlerState({
      show: true,
      header: "Prescription Search",
      size: "70vw",
      component: (
        <CPOEModal
          singlePatientData={singlePatientData}
          handlegetCheckedData={handlegetCheckedData}
        />
      ),
      footer: (
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <div>Done Investigation</div>
            <div>
              <Button
                name={"Add Investigation"}
                className={"btn btn-sm btn-primary mx-1"}
                handleClick={handleAddInvestigation}
              />

              <Button
                name={"Close"}
                className={"btn btn-sm btn-primary mx-1"}
              />
            </div>
          </div>
        </div>
      ),
    });
  };

  const handleGetLoadOPD_All_ItemsLabAutoComplete = async (payload) => {
    try {
      const data = await BindTestslist(payload);
      console.log(data)
      return data?.data;
    } catch (error) {
      console.log(error, "error`");
    }
  }; 
  const getGender=()=>{
    if(payloadData?.Gender.value=='Male')return 'M'
    if(payloadData?.Gender.value=='Female') return 'F'
    if(payloadData?.Gender.value=='Trans') return 'T'

  }
  const search = async (event) => {
    console.log(payloadData)
    const form=new FormData();
    // form.append('ID',localStorage.getItem('employeeId'))
    // form.append('LoginName',localStorage.getItem('employeeName'))
    // form.append('ReferenceCodeOPD',payloadData?.ReferenceCodeOpd)
    // form.append('Gender',getGender())
    // form.append('MemberShipCardNo','')
    // form.append('DiscountTypeID','')
    // form.append('PanelType','B2B')
    // form.append('SearchType',testPaymentState?.searchType.value?testPaymentState?.searchType.value:testPaymentState?.searchType)
    // form.append('TestName',value)
    // form.append('Panel_Id',payloadData?.PanelID?.value)
    // form.append('PrescribeDate','2024-08-23')
    // form.append('PanelID_MRP',payloadData?.PanelID?.value)
    // form.append('DeptID','')
    // form.append('DOB',formatDateToYYYYMMDD(payloadData?.DOB))

    //DUMMY PAYLOAD
    form.append('ID',1)
    form.append('LoginName','ITDOSE TEAM')
    form.append('ReferenceCodeOPD',78)
    form.append('Gender','B')
    form.append('MemberShipCardNo','')
    form.append('DiscountTypeID','')
    form.append('PanelType','B2B')
    form.append('SearchType',1)
    form.append('TestName',value)
    form.append('Panel_Id',78)
    form.append('PrescribeDate','2024-08-23')
    form.append('PanelID_MRP',78)
    form.append('DeptID','')
    form.append('SessionCentreId',1)
    form.append('DOB',formatDateToYYYYMMDD(payloadData?.DOB))



const item = await handleGetLoadOPD_All_ItemsLabAutoComplete(form);
   console.log(item)
    setItems(item.data);
  };

  const itemTemplate = (item) => {
    
    return (
      <div
        className="p-clearfix"
        //  onClick={() => validateInvestigation(item)}
      >
        <div style={{ float: "left", fontSize: "12px", width: "100%" }}>
          {item?.label}
        </div>
      </div>
    );
  };

  const FetchAllDropDown = async () => {
    try {
      const response = await Promise.all([
        GetRoleWiseOPDServiceBookingControls(),
      ]);

      setDropDown({
        RoleWiseOPDServiceBookingControlData: response[0]?.data,
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleReactSelect = (name, e) => {
    const { value } = e;
    setTestPaymentState({
      ...testPaymentState,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   FetchAllDropDown();
  //   dispatch(GetAllDoctor());
  // }, []);

  const handleMakeStringToArray = (...rest) => {
    const data = rest?.reduce((acc, current) => {
      let splitStr = current?.value.split(",");
      let resultArray = splitStr.map((str) => str.replace(/'/g, ""));
      acc[current?.returnName] = resultArray;
      return acc;
    }, {});
    return data;
  };

  const handleGetPackageExpirayDate = async (PackageID, TnxTypeID) => {
    if (TnxTypeID != "23") {
      return true;
    }
    try {
      const data = await GetPackageExpirayDate(PackageID);
      return data?.data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleGetValidateDoctorMap = async (itemID, labType) => {
    if (labType === "OPD") {
      try {
        const data = await GetValidateDoctorMap(itemID);
        return data?.data;
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      return true;
    }
  };

  const handleGetValidateDoctorLeave = async (itemID) => {
    try {
      const data = await GetValidateDoctorLeave(itemID);
      return data?.data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleGetDiscountWithCoPay = async (
    itemID,
    panelID,
    PatientTypeID,
    memberShipCardNo
  ) => {
    try {
      const data = await GetDiscountWithCoPay(
        itemID,
        panelID,
        PatientTypeID,
        memberShipCardNo
      );
      return data?.data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleGetAlreadyPrescribeItem = async (PatientID, itemID) => {
    try {
      const data = await getAlreadyPrescribeItem(PatientID, itemID);
      return data?.data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleGetBindLabInvestigationRate = async (
    panelID,
    ItemID,
    TID,
    IPDCaseTypeID,
    panelCurrencyFactor
  ) => {
    try {
      const data = await GetBindLabInvestigationRate(
        panelID,
        ItemID,
        TID,
        IPDCaseTypeID,
        panelCurrencyFactor
      );
      return data?.data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleGetAppointmentCount = async (
    tnxType,
    DoctorID,
    AppointedDate
  ) => {
    if (tnxType === "5") {
      try {
        const data = await GetAppointmentCount(DoctorID, AppointedDate);
        return data?.data ?? "00";
      } catch (error) {
        console.log(error, "error");
      }
    }
  };

  const handleBindPackageItemDetailsNew = async (TnxTypeID, packageID) => {
    if (TnxTypeID === "23") {
      try {
        const data = await BindPackageItemDetailsNew(packageID);
        return data?.data;
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      return [];
    }
  };

  

  const handleApiCallforTestAdding = async (modifiedData) => {
    const packageData = await handleBindPackageItemDetailsNew(
      modifiedData?.TnxTypeID,
      modifiedData?.Type_ID
    );

    modifiedData.PackageTable = packageData;

    const tokenData = await handleGetAppointmentCount(
      value?.tnxType,
      value?.type_ID,
      modifiedData?.AppointedDate
    );

    modifiedData.Token = tokenData;

    // first Api
    const data = await handleGetPackageExpirayDate(
      modifiedData?.Type_ID,
      modifiedData?.TnxTypeID
    );

    if (data) {
      // SecondApi
      const secondData = await handleGetValidateDoctorMap(
        modifiedData?.val,
        modifiedData?.LabType
      );

      if (secondData) {
        // third Api

        const thirdData = await handleGetValidateDoctorLeave(modifiedData?.val);

        if (!thirdData) {
          // fourth APi
          const fouthData = await handleGetAlreadyPrescribeItem(
            singlePatientData?.PatientID,
            modifiedData?.val
          );

          const userDecision = await new Promise((resolve) => {
            if (Object.keys(fouthData)?.length > 0) {
              setConfirmBoxvisible({
                show: true,
                lableMessage: <div>Do You Want To Prescribe Again ?</div>,
                alertMessage: (
                  <div>
                    This Service is Already Prescribed By{" "}
                    <span style={{ color: "blue", fontWeight: 700 }}>
                      {fouthData?.UserName}{" "}
                    </span>
                    Date on{" "}
                    <span style={{ color: "blue", fontWeight: 700 }}>
                      {fouthData?.EntryDate}
                    </span>
                  </div>
                ),
                chidren: (
                  <div>
                    <button
                      className="btn btn-sm btn-primary mx-1"
                      onClick={() => {
                        setConfirmBoxvisible({
                          show: false,
                          alertMessage: "",
                          lableMessage: "",
                          chidren: "",
                        });
                        resolve(true); // Prescribe Again
                      }}
                    >
                      Prescribe Again
                    </button>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => {
                        setConfirmBoxvisible({
                          show: false,
                          alertMessage: "",
                          lableMessage: "",
                          chidren: "",
                        });
                        resolve(false); // Cancel
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ),
              });
            } else {
              resolve(true); // No need to confirm, proceed with prescribing
            }
          });

          if (Object.keys(fouthData).length === 0 || userDecision) {
            //orcondition confirmation modal
            // Fifth Api
            const fifthData = await handleGetDiscountWithCoPay(
              modifiedData?.val,
              payloadData?.panelID?.value,
              singlePatientData?.PatientTypeID,
              singlePatientData?.MemberShipCardNo
            );

            const sixthData = await handleGetBindLabInvestigationRate(
              String(payloadData?.panelID?.value),
              String(modifiedData?.val),
              "",
              "",
              String(payloadData?.panelID?.panelCurrencyFactor)
            );

            modifiedData.discountPercentage = fifthData?.OPDPanelDiscPercent;

            modifiedData.IsPanelWiseDiscount =
              Number(fifthData?.OPDPanelDiscPercent) > 0 ? 1 : 0;
            modifiedData.coPaymentPercent = fifthData?.OPDCoPayPercent;

            modifiedData.IsPayable = fifthData?.IsPayble;

            modifiedData.salesID = "";

            modifiedData.IsDiscountEnable = true;

            modifiedData.Rate = sixthData?.Rate ?? 0;
            modifiedData.constantRate = modifiedData.Rate;
            modifiedData.ScheduleChargeID = sixthData?.ScheduleChargeID ?? 0;
            modifiedData.ID = sixthData?.ID ?? 0;
            modifiedData.ItemCode = sixthData?.ItemCode ?? "";
            modifiedData.ItemDisplayName = sixthData?.ItemDisplayName
              ? sixthData?.ItemDisplayName.trim() === ""
                ? modifiedData?.label
                : sixthData?.ItemDisplayName
              : modifiedData?.label;

            modifiedData.discountAmount =
              Number(modifiedData.Rate) *
              Number(modifiedData?.defaultQty) *
              Number(modifiedData?.discountPercentage) *
              0.01;

            modifiedData.amount =
              Number(modifiedData?.Rate) * Number(modifiedData?.defaultQty) -
              modifiedData?.discountAmount;

            modifiedData.GSTAmount = Number(
              modifiedData.amount * modifiedData.GstPer * 0.01
            ).toFixed(ROUNDOFF_VALUE);

            modifiedData.coPaymentAmount = (
              modifiedData.amount *
              modifiedData?.coPaymentPercent *
              0.01
            ).toFixed(ROUNDOFF_VALUE);

            modifiedData.panelID = payloadData?.panelID?.value;

            modifiedData.grossAmount =
              Number(modifiedData?.Rate) * Number(modifiedData?.defaultQty);

            modifiedData.PayableAmount =
              modifiedData?.IsPayable === "1"
                ? modifiedData?.amount
                : modifiedData?.coPaymentAmount;

            return modifiedData;
          }
        }
      }
    }
  };

  const testAddingObject = async (
    value,
    isUrgent,
    presribedID,
    defaultQty,
    isCpoeOrOnline,
    appointmentID
  ) => {
    const AppointTypeDropDown = filterByTypes(
      dropDownState?.RoleWiseOPDServiceBookingControlData,
      [6],
      ["TypeID"],
      "TextField",
      "ValueField",
      "IsDefault"
    );

    const checker = testAddingTableState.some(
      (row) => row?.val === value?.item_ID
    );

    if (checker) {
      notify("Test Allready Exist!", "error");
      return;
    }

    const modifiedData = {
      label: value?.autoCompleteItemName,
      val: value?.item_ID,
      isadvance: value?.isadvance,
      IsOutSource: value?.isOutSource,
      ItemCode: value?.itemCode,
      Type_ID: value?.type_ID,
      LabType: value?.labType,
      TnxTypeID: value?.tnxType,
      SubCategoryID: value?.subCategoryID,
      sampleType: value?.sample,
      TypeName: value?.typeName,
      rateEditAble: value?.rateEditable,
      isMobileBooking: 0,
      CategoryID: value?.categoryid,
      SubCategory: value?.subCategory,
      isSlotWiseToken: value?.isSlotWisetoken,
      appointmentID: appointmentID,
      GstType: value?.gstType,
      IgstPercent: value?.iGSTPercent,
      CgstPercent: value?.cGSTPercent,
      SgstPercent: value?.sGSTPercent,
      GstPer: Number(value?.gstPer).toFixed(ROUNDOFF_VALUE),
      isUrgent: isUrgent,
      presribedID: presribedID,
      defaultQty: defaultQty,
      isCpoeOrOnline: isCpoeOrOnline,
      AppointedType: AppointTypeDropDown,
      AppointedDate: moment().format("YYYY-MM-DD"),
      DoctorID: "",
      typeOfApp: ReactSelectisDefaultValue(AppointTypeDropDown, "extraColomn")
        ?.value,
    };

    const apiCallData = await handleApiCallforTestAdding(modifiedData);

    return apiCallData;
  };

  // const setTestAddingTableAfterPanelChange = async () => {
  //   try {
  //     const test = [];
  //     for (const data of testAddingTableState) {
  //       const apiCallData = await handleApiCallforTestAdding(data);
  //       test.push(apiCallData);
  //     }

  //     handlePaymentGateWay(
  //       calculateBillAmount(
  //         test,
  //         BindResource?.isReceipt,
  //         singlePatientData?.OPDAdvanceAmount,
  //         false,
  //         1,
  //         0.0,
  //         payloadData?.panelID?.value === 1 ? 1 : 0,
  //         0
  //       )
  //     );
  //     setTestAddingTable(test);
  //     console.log("All investigations validated successfully.");
  //   } catch (error) {
  //     console.error("Error validating investigation:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (payloadData?.panelID?.value && testAddingTableState.length > 0) {
  //     setTestAddingTableAfterPanelChange();
  //   }
  // }, [payloadData?.panelID?.value]);

  const handleAddInvestigationSlot = (data) => {
    const AddRow = [data, ...testAddingTableState];
    handlePaymentGateWay(
      calculateBillAmount(
        AddRow,
        BindResource?.isReceipt,
        singlePatientData?.OPDAdvanceAmount,
        false,
        0,
        0.0,
        payloadData?.panelID?.value === 1 ? 1 : 0,
        0
      )
    );
    setTestAddingTable(AddRow);

    setModalHandlerState({
      header: null,
      show: false,
      size: null,
      component: null,
      footer: null,
    });
  };

  const validateInvestigation = async (e) => {
    const { value } = e;
  
    // Logging the input value
    console.log(value);
  
    // Get the current state of the table
    const data = [...testAddingTableState];
    console.log(data);
  
    // Create a new test object to be added
    const newTest = {
      Code: value.value, // Assuming value.value is the code
      ItemName: value.label, // Assuming value.label is the item name
      View: (
        <i
          className="fa fa-eye"
          aria-hidden="true"
          onClick={() => handlePackageDetails(data.length)} // Adjust index as needed
        ></i>
      ),
      MRP: value.MRP.split("#")[0], // Using the first part of the MRP string
      Rate: value.Rate.split("#")[0], // Using the first part of the Rate string
      Qty: 1, // Default quantity is 1
      Discount: value.DiscPer.toString(), // Assuming DiscPer is the discount percentage
      Amount: (parseFloat(value.Rate.split("#")[0]) * 0.9).toFixed(2), // Calculate amount after 10% discount (example calculation)
      DeliveryDate:value?.DeliveryDate, // Example delivery date, adjust as needed
      IsUrgent: <input type="checkbox" checked={false} />, // Default is unchecked
      IsSelfCollection: <input type="checkbox" checked={false} />, // Default is unchecked
      Remove: (
        <i
          className="fa fa-trash text-danger text-center"
        // Adjust index as needed
        />
      ),
    };
  
    // Append the new test object to the current state
    const updatedData = [...data, newTest];
  
    // Update the state with the new data
    setTestAddingTable(updatedData);
  

  
    // Handle the payment gateway and bill calculation (assuming these functions are defined elsewhere)
    // handlePaymentGateWay(
    //   calculateBillAmount(
    //     updatedData,
    //     BindResource?.isReceipt,
    //     singlePatientData?.OPDAdvanceAmount,
    //     false,
    //     0,
    //     0.0,
    //     payloadData?.panelID?.value === 1 ? 1 : 0,
    //     0
    //   )
    // );
  };
  

  const handleCategoryFilter = useCallback(
    (id) => {
      const handleConfigId = (id) => {
        switch (id) {
          case 2:
            return { value: ["25"], label: ["ConfigID"] };
          case 3:
            return { value: [["6", "20"]], label: ["ConfigID"] };
          case 4:
            return { value: ["5"], label: ["ConfigID"] };
          case 9:
            return { value: ["3", "3"], label: ["ConfigID", "CategoryID"] };
          case 10:
            return { value: ["3", "7"], label: ["ConfigID", "CategoryID"] };
          case 11:
            return { value: ["23"], label: ["ConfigID"] };
          case 12:
            return { value: ["7"], label: ["ConfigID"] };
          case 10000:
            return { value: ["-1"], label: ["ConfigID"] };
          case 100:
            const { ConfigID } =
              dropDownState?.RoleWiseOPDServiceBookingControlData?.find(
                (ele) => ele?.TypeID === 1
              );

            const { filterConfigID } = handleMakeStringToArray({
              value: ConfigID,
              returnName: "filterConfigID",
            });

            return {
              value: [filterConfigID],
              label: ["ConfigID"],
            };
          default:
            return { value: [], label: [] };
        }
      };

      const { value, label } = handleConfigId(id);

      return filterByTypes(
        dropDownState?.RoleWiseOPDServiceBookingControlData,
        [3, ...value],
        ["TypeID", ...label],
        "TextField",
        "ValueField"
      );
    },
    [testPaymentState?.type]
  );

  const handleTypeFilter = useMemo(() => {
    if (dropDownState?.RoleWiseOPDServiceBookingControlData.length > 0) {
      const data = filterByType(
        dropDownState?.RoleWiseOPDServiceBookingControlData,
        2,
        "TypeID",
        "TextField",
        "ValueField"
      );

      setTestPaymentState({
        ...testPaymentState,
        type: data[0]?.value,
      });

      return data;
    }
  }, [dropDownState?.RoleWiseOPDServiceBookingControlData]);
  
  const checkcondition=()=>{
    console.log(payloadData)
    if(payloadData?.PanelID==''||payloadData.DOB=="")
    {
      return true
    }
    else 
     {
    return false
     }
  }
  return (
    <>
      
          <div className="d-flex">
            <div className="form-group w-25 mr-1">
              <ReactSelect
                placeholderName={i18n.t(
                  "FrontOffice.OPD.testPayment.label.Search"
                )}
                id="Search"
                searchable={true}
                dynamicOptions={SEARCH_BY_TEST}
                value={testPaymentState?.searchType}
                name={"searchType"}
                handleChange={handleReactSelect}
              />
            </div>
            <div
              className="form-group w-100"
              id="searchtest"
              style={{ position: "relative" }}
            >
              <AutoComplete
                value={value}
                suggestions={items}
                completeMethod={search}
                className="w-100"
                onSelect={(e) => validateInvestigation(e)}
                id="searchtest"
                onChange={(e) => {
                  const data =
                    typeof e.value === "object"
                      ? e?.value?.autoCompleteItemName
                      : e.value;
                  setValue(data);
                }}
                placeholder={checkcondition() ? 'Enter Age to enable':'Search Test'}
                itemTemplate={itemTemplate}
                disabled={checkcondition()}
              />

              <label htmlFor={"searchtest"} className="lable searchtest">
                Search Test
              </label>
            </div>
          </div>
       
       
      

      {confirmBoxvisible?.show && (
        <Confirm
          alertMessage={confirmBoxvisible?.alertMessage}
          lableMessage={confirmBoxvisible?.lableMessage}
          confirmBoxvisible={confirmBoxvisible}
        >
          {confirmBoxvisible?.chidren}
        </Confirm>
      )}

      {modalHandlerState?.show && (
        <Modal
          visible={modalHandlerState?.show}
          setVisible={() =>
            setModalHandlerState({
              show: false,
              component: null,
              size: null,
            })
          }
          modalWidth={modalHandlerState?.size}
          Header={modalHandlerState?.header}
          footer={modalHandlerState?.footer}
        >
          {modalHandlerState?.component}
        </Modal>
      )}
    </>
  );
}

export default TestPayment;
