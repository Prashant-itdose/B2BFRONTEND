import Input from "@app/components/formComponent/Input";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactSelect from "../formComponent/ReactSelect";
import PaymentTable from "../UI/customTable/paymentTable";
import Modal from "../modalComponent/Modal";
import {
  BindPaymentModePanelWise,
  GetConversionFactor,
  LoadCurrencyDetail,
  getBankMaster,
  getConvertCurrency,
} from "../../networkServices/PaymentGatewayApi";
import {
  handleReactSelectDropDownOptions,
  inputBoxValidation,
  notify,
  reactSelectOptionList,
} from "../../utils/utils";
import {
  AMOUNT_REGX,
  OBJECT_PAYMENTMODE,
  ROUNDOFF_VALUE,
} from "../../utils/constant";
import store from "../../store/store";
import { fetchBanks, getDisocuntBy } from "../../utils/helperfunctions";


const PaymentGateway = (props) => {
  const {
    screenType,
    setScreenType,
    button,
    paymentMethod,
    setPaymentMethod,
    discounts,
    setDiscounts,
    payloadData,
    testAddingTableState
  } = props;
  console.log(testAddingTableState);
  const [bankdetails,setbankdetails]=useState([])
  const [t] = useTranslation();
  const [paymenttable,setpaymenttable]=useState([])
 const [updatedpayment,setupdatedpayment]=useState([])
  const [dropDown, setDropDown] = useState({
    currencyDetail: [],
    getBindPaymentMode: [],
    getBankMasterData: [],
    getMachineData: [],
  });
  const [showMessage, setShowMessage] = useState(false);

  const [discountby,setdiscountby]=useState([])
 
  const [currencyData, setCurrencyData] = useState({
    getConvertCurrecncyValue: null,
    selectedCurrency: null,
    apivalue: null,
    notation: null,
    defaultCurrency: null,
  });
  const [formdata,setformData]=useState({
    PaymentMode:''
  })

  const [handleModelData, setHandleModelData] = useState({});

  const handleModel = (label, width, type, isOpen, Component) => {
    setHandleModelData({
      label: label,
      width: width,
      type: type,
      isOpen: isOpen,
      Component: Component,
    });
  };

  const setIsOpen = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }));
  };

  /**
   *
   * @param {API Call Conversion factor} data
   */
  const handleGetConversionFactor = async (data) => {
    const { CountryID } = data;
    try {
      const apiResponse = await GetConversionFactor(CountryID);
      return apiResponse?.data;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {API Call Convert Currency} data
   */
  const handlegetConvertCurrency = async (data, balanceAmount) => {
    const { CountryID } = data;
    try {
      const data = await getConvertCurrency(CountryID, balanceAmount);
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Function to add payment mode
  const handleAddPaymentMode = async (e, currencyData) => {
    if (
      paymentMethod.some(
        (data) =>
          data?.PaymentMode === e.label &&
          data?.PaymentModeID === e.value &&
          data?.S_CountryID === currencyData?.defaultCurrency
      )
    ) {
      return store.dispatch(notify("paymentMode is already exist!", "error"));
    }
    const addObject = { ...OBJECT_PAYMENTMODE };
    const appendData = Number(e.value) === 4 ? [] : [...paymentMethod];

    addObject.PaymentMode = e.label;
    addObject.PaymentModeID = e.value;

    addObject.S_Amount =
      Number(e.value) === 4 ? 0 : currencyData?.getConvertCurrecncyValue;

    addObject.BaseCurrency = currencyData?.notation;

    addObject.S_Notation = currencyData?.selectedCurrency;

    addObject.C_Factor = currencyData?.apivalue;

    addObject.Amount = parseFloat(
      Number(addObject.S_Amount) * Number(addObject.C_Factor)
    ).toFixed(ROUNDOFF_VALUE);

    appendData.push(addObject);

    settleValue(appendData, currencyData);
    setPaymentMethod(appendData);
  };


  /**
   *
   * @param {React Select Handle Change}
   * @param {is handle change per meri handleGetConversionFactor & handlegetConvertCurrency yeh dono api call ho rahi hai...}
   * @param {isme handleAddPaymentMode() yeh function table add kar raha hai}
   */

  const currencyfunctionCall = async (e) => {
    const data = await handleGetConversionFactor(e);

    const { balanceAmountValue } = calculateNetAmountAndRoundOff(
      screenType?.billAmount,
      Number(screenType?.discountAmount),
      screenType?.constantMinimumPayableAmount,
      paymentMethod
    );

    debugger
    const secondData = await handlegetConvertCurrency(e, balanceAmountValue);

    OBJECT_PAYMENTMODE.S_Currency = e.label;
    OBJECT_PAYMENTMODE.S_CountryID = e.value;

    return { data, secondData };
  };

  const PaymentModefunctionCall = async (e, currencyData) => {
    if (e.label && e.value) {
      await handleAddPaymentMode(e, currencyData);
    } else {
      settleValue(paymentMethod, currencyData);
    }
  };

  const handleReactChange = (name, selectedOption) => {
    // Update state or form data based on the selected option

    if (name === 'PaymentMode') {
      const selectedPaymentMode = paymentMethod?.find(method => method.value === selectedOption.value);
    
      if (selectedPaymentMode) {
        // Check if the payment mode already exists in the payment table
        const isExisting = paymenttable.some(item => item.value === selectedPaymentMode.value);
    
        if (isExisting) {
          // Show message if the payment mode already exists
          setShowMessage(true);
          // Hide the message after a short delay
          setTimeout(() => setShowMessage(false), 3000);
        } else {
          // Add the selected payment method to the payment table if it doesn't already exist
          setpaymenttable([...paymenttable, selectedPaymentMode]);
        }
      }
    }
    
    setformData({
      ...formdata,
      [name]: selectedOption ? selectedOption.value : null,
    });
  };
  

  // Payment Control  API Implement...

  const fetchCurrencyDetail = async () => {
    try {
      const data = await LoadCurrencyDetail();
      return data?.data;
    } catch (error) {
      console.error("Failed to load currency detail:", error);
    }
  };

  const fetchPaymentMode = async () => {
    try {
      const data = await BindPaymentModePanelWise({
        PanelID: screenType?.panelID,
      });
      return data?.data;
    } catch (error) {
      console.error("Failed to load currency detail:", error);
    }
  };

  const fetchGetBankMaster = async () => {
    try {
      const data = await getBankMaster();
      return data?.data;
    } catch (error) {
      console.error("Failed to load currency detail:", error);
    }
  };

  const fetchGetSwipMachine = async () => {
    try {
      const data = await GetSwipMachine();
      return data?.data;
    } catch (error) {
      console.error("Failed to load currency detail:", error);
    }
  };

  const FetchAllDropDown = async () => {
    try {
      const response = await Promise.all([
        fetchCurrencyDetail(),
        fetchPaymentMode(),
        fetchGetBankMaster(),
        fetchGetSwipMachine(),
      ]);

      setDropDown({
        ...dropDown,
        currencyDetail: response[0],
        getBindPaymentMode: response[1],
        getBankMasterData: response[2],
        getMachineData: response[3],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   FetchAllDropDown();

  //   return () => {
  //     OBJECT_PAYMENTMODE.S_Currency = "";
  //     OBJECT_PAYMENTMODE.S_CountryID = "";
  //   };
  // }, []);

  // Function to check and return the net amount or minimum payable amount
  const checkerNetAmountandPatientPayable = (
    netAmount,
    minimumPayableAmount
  ) => {
    if (netAmount > minimumPayableAmount) {
      return minimumPayableAmount;
    } else {
      return netAmount;
    }
  };

  // Function to calculate various amounts including net amount, round off, etc.
  const calculateNetAmountAndRoundOff = (
    grossAmount,
    DiscountAmount,
    constantMinimumPayableAmount,
    paymentModeList
  ) => {
    const netAmount = Math.round(
      parseFloat(grossAmount) - parseFloat(DiscountAmount)
    ).toFixed(ROUNDOFF_VALUE);

    const minimumPayableAmount = checkerNetAmountandPatientPayable(
      netAmount,
      constantMinimumPayableAmount
    );

    const roundOff = (
      netAmount -
      (parseFloat(grossAmount) - parseFloat(DiscountAmount))
    ).toFixed(ROUNDOFF_VALUE);

    const { discountPercentage } = calculateDiscountPercentage(
      parseFloat(DiscountAmount).toFixed(ROUNDOFF_VALUE),
      grossAmount
    );

    const panelPayable = (netAmount - minimumPayableAmount).toFixed(
      ROUNDOFF_VALUE
    );

    const paidAmount = findPaidAmount(paymentModeList).toFixed(ROUNDOFF_VALUE);

    const balanceAmount = (minimumPayableAmount - paidAmount).toFixed(
      ROUNDOFF_VALUE
    ); // paidamount;

    const coPayAmount = (
      screenType?.coPayAmount ? Number(screenType?.coPayAmount) : 0.0
    ).toFixed(ROUNDOFF_VALUE);

    const coPayPercent = (
      screenType?.coPayPercent ? Number(screenType?.coPayPercent) : 0.0
    ).toFixed(ROUNDOFF_VALUE);

    return {
      roundOffValue: roundOff,
      netAmountValue: netAmount,
      panelPayableValue: panelPayable,
      paidAmountValue: paidAmount,
      minimumPayableAmountValue: minimumPayableAmount,
      balanceAmountValue: balanceAmount,
      discountPercentageValue: discountPercentage.toFixed(ROUNDOFF_VALUE),
      coPayAmount: coPayAmount,
      coPayPercent: coPayPercent,
    };
  };

  // Function to calculate discount percentage
  const calculateDiscountPercentage = (discountAmount, grossAmount) => {
    const discountPercentage =
      grossAmount > 0
        ? ((discountAmount * 100) / grossAmount).toFixed(ROUNDOFF_VALUE)
        : (0.0).toFixed(ROUNDOFF_VALUE);
    return { discountPercentage: Number(discountPercentage) };
  };

  // Function to calculate discount amount based on percentage
  const calculateDiscountAmount = (percentage, grossAmount) => {
    return ((grossAmount * percentage) / 100).toFixed(ROUNDOFF_VALUE);
  };

  // Function to calculate co-pay percentage

  const calculateCoPayPercent = (copay, netAmount) => {
    const discountPercentage = ((copay * 100) / netAmount).toFixed(
      ROUNDOFF_VALUE
    );
    return discountPercentage;
  };

  // Function to calculate co-pay amount based on percentage

  const calaculateCoPayAmount = (coPayPercent, netAmount) => {
    return (netAmount * coPayPercent) / 100;
  };

  // Function to find total paid amount from the payment mode list

  const findPaidAmount = (paymentModeList) => {
    return paymentModeList?.length > 0
      ? paymentModeList?.reduce(
          (acc, current) => acc + Number(current?.Amount),
          0
        )
      : 0;
  };

  // Function to handle change in co-pay percentage amount

  const handleCoPayPercentageAmt = (e) => {
    const { name, value } = e.target;
    setPaymentMethod([]);
    if (value <= 100) {
      const copayAmount = calaculateCoPayAmount(value, screenType?.netAmount);
      const {
        roundOffValue,
        netAmountValue,
        panelPayableValue,
        paidAmountValue,
        balanceAmountValue,
        discountPercentageValue,
        minimumPayableAmountValue,
      } = calculateNetAmountAndRoundOff(
        screenType?.billAmount,
        Number(screenType?.discountAmount),
        Number(copayAmount)
          ? Number(copayAmount)
          : screenType?.constantMinimumPayableAmount,
        paymentMethod
      );

      setScreenType({
        ...screenType,
        roundOff: roundOffValue,
        netAmount: netAmountValue,
        panelPayable: panelPayableValue,
        balanceAmount: balanceAmountValue,
        discountPercentage: discountPercentageValue,
        minimumPayableAmount: minimumPayableAmountValue,
        paidAmount: paidAmountValue,
        coPayAmount: copayAmount,
        [name]: value,
      });
    }
  };

  // Function to settle values in the screen type state

  const settleValue = async (paymentModeList, currencyDatas) => {
    const {
      roundOffValue,
      netAmountValue,
      panelPayableValue,
      balanceAmountValue,
      paidAmountValue,
      discountPercentageValue,
      minimumPayableAmountValue,
      coPayAmount,
      coPayPercent,
    } = calculateNetAmountAndRoundOff(
      screenType?.billAmount,
      Number(screenType?.discountAmount),
      screenType?.constantMinimumPayableAmount,
      paymentModeList
    );
    setScreenType({
      ...screenType,
      roundOff: roundOffValue,
      netAmount: netAmountValue,
      panelPayable: panelPayableValue,
      balanceAmount: balanceAmountValue,
      paidAmount: paidAmountValue,
      discountPercentage: discountPercentageValue,
      minimumPayableAmount: minimumPayableAmountValue,
      coPayAmount: coPayAmount,
      coPayPercent: coPayPercent,
    });

    const data = await handlegetConvertCurrency(
      { CountryID: currencyDatas?.defaultCurrency },
      balanceAmountValue
    );

    const finalData = {
      ...currencyDatas,
      getConvertCurrecncyValue: data,
    };

    setCurrencyData(finalData);
  };

  // Function to handle change in various amounts

  const handleCoPayAmount = (e) => {
    const { name, value } = e.target;
    setPaymentMethod([]);
    if (value <= screenType?.netAmount) {
      const copayPercentageValue = calculateCoPayPercent(
        Number(value),
        screenType?.netAmount
      );
      const {
        roundOffValue,
        netAmountValue,
        panelPayableValue,
        paidAmountValue,
        balanceAmountValue,
        discountPercentageValue,
        minimumPayableAmountValue,
      } = calculateNetAmountAndRoundOff(
        screenType?.billAmount,
        Number(screenType?.discountAmount),
        Number(value)
          ? Number(value)
          : screenType?.constantMinimumPayableAmount,
        paymentMethod
      );

      setScreenType({
        ...screenType,
        roundOff: roundOffValue,
        netAmount: netAmountValue,
        panelPayable: panelPayableValue,
        balanceAmount: balanceAmountValue,
        discountPercentage: discountPercentageValue,
        paidAmount: paidAmountValue,
        minimumPayableAmount: minimumPayableAmountValue,
        coPayPercent: copayPercentageValue,
        [name]: value,
      });
    }
  };

  const handleChangeDiscountAmt = async (e) => {
    const { name, value } = e.target;
    const floatValue = value;
    setPaymentMethod([]);
    debugger;

    if (
      Number(floatValue).toFixed(ROUNDOFF_VALUE) <=
      Number(screenType?.billAmount)
    ) {
      const {
        roundOffValue,
        netAmountValue,
        panelPayableValue,
        balanceAmountValue,
        paidAmountValue,
        discountPercentageValue,
        minimumPayableAmountValue,
      } = calculateNetAmountAndRoundOff(
        screenType?.billAmount,
        Number(floatValue),
        screenType?.constantMinimumPayableAmount,
        []
      );

      setScreenType({
        ...screenType,
        roundOff: roundOffValue,
        netAmount: netAmountValue,
        panelPayable: panelPayableValue,
        paidAmount: paidAmountValue,
        balanceAmount: balanceAmountValue,
        discountPercentage: discountPercentageValue,
        minimumPayableAmount: minimumPayableAmountValue,
        coPayAmount: 0.0,
        coPayPercent: 0.0,
        [name]: floatValue,
      });
    }
  };

  const handleChangeDiscount = (e) => {
    let { name, value } = e.target;
    if (name === "discountPercentage") {
      value =
        value > discounts?.Eligible_DiscountPercent
          ? discounts?.Eligible_DiscountPercent
          : value;
    }
    setPaymentMethod([]);
    if (value <= 100) {
      const amount = calculateDiscountAmount(value, screenType?.billAmount);
      const {
        roundOffValue,
        netAmountValue,
        panelPayableValue,
        balanceAmountValue,
        paidAmountValue,
        minimumPayableAmountValue,
      } = calculateNetAmountAndRoundOff(
        screenType?.billAmount,
        Number(amount),
        screenType?.constantMinimumPayableAmount,
        []
      );

      setScreenType({
        ...screenType,
        discountAmount: amount,
        roundOff: roundOffValue,
        netAmount: netAmountValue,
        panelPayable: panelPayableValue,
        paidAmount: paidAmountValue,
        balanceAmount: balanceAmountValue,
        minimumPayableAmount: minimumPayableAmountValue,
        coPayAmount: 0.0,
        coPayPercent: 0.0,
        [name]: value,
      });
    }
  };

  const handlePaymentTableChange = (name, value, index) => {
    console.log(name, value, index);

    // Create a copy of the current paymenttable state
    const updatedPaymentTable = [...paymenttable];

    // Update the specific field in the corresponding row
    updatedPaymentTable[index][name] = value;

    // Update the state with the modified payment table
    setpaymenttable(updatedPaymentTable);
};

  

  const handlePaymentRemove = (index) => {
    const data = [...paymenttable];
    // Create a new array excluding the item at the specified index
    const filterData = data.filter((_, ind) => ind !== index);

    // Ensure at least one item remains in the array
    if (filterData.length === 0 && paymenttable.length > 0) {
        // Keep the last item if the array is about to become empty
        filterData.push(paymenttable[0]);
    }

    // Update the state with the filtered data
    setpaymenttable(filterData);
};


  useEffect(() => {
    asyncEffect();
  }, [screenType?.constantMinimumPayableAmount, screenType?.billAmount]);

  const asyncEffect = async () => {
    if (
      dropDown?.currencyDetail?.length > 0 &&
      dropDown?.getBindPaymentMode?.length > 0
    ) {
      const data = handleReactSelectDropDownOptions(
        dropDown?.currencyDetail,
        "Currency",
        "CountryID"
      )?.find((ele) => ele?.IsBaseCurrency);

      const secondData = dropDown?.getBindPaymentMode.find(
        (ele) => ele?.PaymentModeID === Number(screenType?.autoPaymentMode)
      );

      const response1 = await currencyfunctionCall(data);

      const finalResponse = {
        selectedCurrency: data.Currency,
        apivalue: response1?.data,
        notation: data.B_Currency,
        getConvertCurrecncyValue: response1?.secondData,
        defaultCurrency: data.value,
        defaultPaymentMode: screenType?.autoPaymentMode,
      };

      await PaymentModefunctionCall(
        {
          label: secondData?.PaymentMode,
          value: secondData?.PaymentModeID,
        },
        finalResponse
      );
    }
  };

  const handleBlurFunction = async () => {
    debugger;
    // document.getElementById("defaultPaymentMode").value = null;
    const data = handleReactSelectDropDownOptions(
      dropDown?.currencyDetail,
      "Currency",
      "CountryID"
    )?.find((ele) => ele?.IsBaseCurrency);

    const secondData = dropDown?.getBindPaymentMode.find(
      (ele) => ele?.PaymentModeID === Number(screenType?.autoPaymentMode)
    );
    // // document.getElementById("defaultCurrency").value = data?.value;
    const response1 = await currencyfunctionCall(data);

    const finalResponse = {
      selectedCurrency: data.Currency,
      apivalue: response1?.data,
      notation: data.B_Currency,
      getConvertCurrecncyValue: response1?.secondData,
      defaultCurrency: data.value,
      defaultPaymentMode: null,
    };

    await PaymentModefunctionCall(
      {
        label: secondData?.PaymentMode,
        value: secondData?.PaymentModeID,
      },
      finalResponse
    );
  };

  const handlePaymentModeDropdOwnFilter = (dropdownData, type) => {
    switch (type) {
      case 1:
        return dropdownData.filter((item) => item?.IsForRefund === 1);
      case 2:
        return dropdownData.filter((item) => item?.IsForAdvance === 1);
      case 3:
        return dropdownData.filter((item) => item?.PaymentModeID !== 4);
      default:
        return dropdownData;
    }
  };

 

  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    const data = value
      ? Number(
          Number(value).toFixed(ROUNDOFF_VALUE) - screenType?.paidAmount
        ).toFixed(ROUNDOFF_VALUE)
      : "";
    setScreenType({ ...screenType, [name]: data });
  };
  const filterpaymentmethod = () => {
    if (payloadData?.PaymentMode) {
      let filteredPaymentMethods = paymentMethod; // Default to all methods
       
      if (payloadData.PaymentMode === 'Cash') {
        filteredPaymentMethods = paymentMethod.filter(
          (method) => method.label !== 'Credit'
        );
      
        // Find the payment method with label 'Cash'
        const cashPaymentMethod = paymentMethod.find(
          (method) => method.label === 'Cash'
        );
      
        if (cashPaymentMethod) {
          // Update the payment methods and form data
          setupdatedpayment(filteredPaymentMethods);
          setformData({ ...formdata, PaymentMode: cashPaymentMethod.value });
          setpaymenttable([...paymenttable, cashPaymentMethod]);
        }

      } else if(payloadData.PaymentMode=='Credit') {
        // Filter based on specific payment modes
        setformData({...formdata,PaymentMode:-1})
        filteredPaymentMethods = paymentMethod.filter(
          (method) => method.label == 'Credit'
        );
        setupdatedpayment(filteredPaymentMethods);
      }
    }
  };
    console.log(paymenttable,formdata)

  useEffect(()=>{
     filterpaymentmethod()
     getDisocuntBy(setdiscountby)
  },[])
  
  useEffect(()=>{
     fetchBanks(setbankdetails)
  },[])

  return (
    <>
   <div className="row mt-1">
   <div className="d-flex col-md-12" style={{ position: 'relative' }}>
  <ReactSelect
    placeholderName={"PaymentMode"}
    searchable={true}
    name="PaymentMode"
    id="defaultPaymentMode"
    dynamicOptions={updatedpayment}
    value={formdata?.PaymentMode}
    handleChange={handleReactChange}
    isDisabled={updatedpayment?.length === 1}
    respclass="col-5"
  />
   {showMessage && (
  <div
    className="blinking"
    style={{
      marginLeft: '10px', // Space between dropdown and message
      color: 'red',
      fontSize: '0.875rem',
      fontWeight: 'bold',
    }}
  >
    Payment Mode already added
  </div>
)}

</div>


  {paymenttable?.length >0 && <div className="col-12 mt-1">
    <PaymentTable
      getBankMasterData={bankdetails}
      getMachineData={[]}
      tbody={paymenttable}
      handleChange={handlePaymentTableChange}
      handlePaymentRemove={handlePaymentRemove}
    />
  </div>}
</div>

{/* Conditionally render discount-related inputs */}
{formdata?.PaymentMode !== -1 && (
  <div className="row mt-1">
    <div className="col-12">
      <div className="table-responsive">
        <table className="table table-bordered table-sm">
          <tbody>
            <tr>
              <td style={{ width: '25%' }}>
                <Input
                  type="number"
                  className="form-control"
                  id="discAmount"
                  name="discAmount"
                  lable="Disc.Amount"
                  value={discounts?.discamount}
                  onChange={(e) => {
                    setDiscounts((prev) => ({
                      ...prev,
                      discamount: e.target.value,
                      discperc: e.target.value ? "" : prev.discperc,
                    }));
                  }}
                  disabled={discounts?.discperc !== ""}
                  placeholder=""
                  respclass="col-12"
                />
              </td>
              <td style={{ width: '25%' }}>
                <Input
                  type="number"
                  className="form-control"
                  id="discperc"
                  name="discperc"
                  lable="Disc.Percent"
                  value={discounts?.discperc}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value <= 100) {
                      setDiscounts((prev) => ({
                        ...prev,
                        discperc: value,
                        discamount: value ? "" : prev.discamount,
                      }));
                    }
                  }}
                  respclass="col-12"
                  placeholder=""
                  disabled={discounts?.discamount !== ""}
                />
              </td>
              <td style={{ width: '25%' }}>
                <ReactSelect
                  placeholderName="Discount By"
                  searchable={true}
                  name="DiscountBy"
                  id="DiscountBy"
                  dynamicOptions={discountby}
                  value={formdata?.DiscountBy}
                  handleChange={handleReactChange}
                  placeholder=""
                  respclass="col-12"
                />
              </td>
            
              <td colSpan="3" style={{ width: '25%' }}>
                <Input
                  type="text"
                  className="form-control"
                  id="DiscountReason"
                  name="DiscountReason"
                  lable="Disc Reason"
                  value={screenType?.balanceAmount}
                  placeholder=""
                  respclass="col-12"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

<div className="row mt-1 mb-1">
  <div className="col-12">
    <div className="table-responsive">
      <table className="table table-bordered table-sm">
        <tbody>
          <tr>
            <td style={{ width: '25%' }}>
              <Input
                type="text"
                className="form-control"
                id="grossAmount"
                name="grossAmount"
                lable="Gross Amount"
                value={screenType?.netAmount}
                disabled={true}
                respclass="col-12"
                placeholder=""
              />
            </td>
            <td style={{ width: '25%' }}>
              <Input
                type="text"
                className="form-control"
                id="netAmount"
                name="netAmount"
                lable="Net Amount"
                value={screenType?.netAmount}
                disabled={true}
                respclass="col-12"
                placeholder=""
              />
            </td>
            {formdata?.PaymentMode !== -1 && (
              <td style={{ width: '25%' }}>
                <Input
                  type="text"
                  className="form-control"
                  id="paidAmount"
                  name="paidAmount"
                  lable="Paid Amount"
                  value={screenType?.netAmount}
                  disabled={true}
                  respclass="col-12"
                  placeholder=""
                />
              </td>
            )}
            <td style={{ width: '25%' }}>
              <Input
                type="text"
                className="form-control"
                id="balanceAmount"
                name="balanceAmount"
                lable="Balance Amount"
                value={screenType?.balanceAmount}
                disabled={true}
                respclass="col-12"
                placeholder=""
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>



  {handleModelData?.isOpen && (
    <Modal
      visible={handleModelData?.isOpen}
      setVisible={setIsOpen}
      modalWidth={handleModelData?.width}
      Header={t(handleModelData?.label)}
    >
      {handleModelData?.Component}
    </Modal>
  )}
</>

  ) 
};

export default PaymentGateway;
