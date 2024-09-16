import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";

import { OnlinePaymentValidationSchema } from './OnlineSchema';
import RazorPay from "./RazorPay";
import moment from "moment";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Input from "../../components/formComponent/Input";
import Heading from "../../components/UI/Heading";
import { useFormik } from "formik";
const initialData={
  CentreId:'',
  FromDate:moment().format("DD-MMM-YYYY"),
  ToDate:moment().format("DD-MMM-YYYY"),
  Remarks:'abc',
  Amount:500
}

const OnlinePaymentPage = () => {
  const [Panels,setPanels]=useState([])
  const [centres,setcentres]=useState([])
  const [payload, setPayload] = useState({
    RateTypeName: "",
    RateTypeId: "",
    Amount: "",
    Remarks: "",
    save: false,
    currency: "INR",
  });
  const [rateType, setRateType] = useState([]);
  //   const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErros] = useState({});
  const [isRazorPayOpen, setIsRazorPayOpen] = useState(false);
  const [paymenyId, setPaymentId] = useState({
    receipt: "",
    key_id: "",
    key_secret: "",
  });
  const getAccessRateType = () => {
    axios
      .get("/api/v1/RateType/getAccessRateType")
      .then((res) => {
        let data = res.data.message;
        let RateType = data.map((ele) => {
          return {
            value: ele.RateTypeID,
            label: ele.Rate,
          };
        });
        RateType.unshift({ label: "Select RateType", value: "" });
        setRateType(RateType);
      })
      .catch((err) => console.log(err));
  };
  //   const GetKeyData = (id) => {
  //     axios
  //       .post("/api/v1//", {
  //         CompanyId: id,
  //       })
  //       .then((res) => {
  //         let data = res?.data?.message;
  //         setTableData(data);
  //       })
  //       .catch((err) => toast.error("No Data Found"));
  //   };

  
  const saveData = (data) => {
    setIsRazorPayOpen(false)
    setLoading(false);
    setPayload({
      RateTypeName: "",
      RateTypeId: "",
      Amount: "",
      Remarks: "",
      save: false,
      currency: "INR",
    });
    setPaymentId({
      receipt: "",
      key_id: "",
      key_secret: "",
    });
    setErros({});
  };
  const IsOnlinePayment = () => {
    // axios
    //   .get("/api/v1/RazorPay/Otherpayment")
    //   .then((res) => {
    //     console.log(res);
    //     if (res?.data?.payment_capture == 1) {
    //       setIsRazorPayOpen(true);

    //       setPaymentId({
    //         receipt: res?.data?.receipt,
    //         key_id: res?.data?.key_id,
    //         key_secret: res?.data?.key_secret,
    //       });
    //     } else {
    //       toast.error("You have not right to do Online Payment");
    //     }
    //   })
    //   .catch((err) =>
    //     toast.error(
    //       err?.data?.response?.message
    //         ? err?.data?.response?.message
    //         : "Error Occur"
    //     )
    //   );
    setIsRazorPayOpen(true);
      setPaymentId({
        receipt: '79a3bbea-ba82-4c10-a641-aa53e8b1b099',
        key_id: 'CHCkASDLn\u0000v\u0005\u0002e]odP`\u0004[U\\',
        key_secret:'J56YYY3XltUbNJeTr5av4EOS',
      });
  };
  const HandleSubmit = () => {
    IsOnlinePayment()
  };

  
  const { handleChange, values, setFieldValue, handleSubmit } = useFormik({
    initialValues:initialData,
  });
  const handleReset = () => {
    setPayload({
      RateTypeName: "",
      RateTypeId: "",
      Amount: "",
      Remarks: "",
      save: false,
      currency: "INR",
    });
    setErros({});
  };
  const handleReactSelect = (name, value) => {
    setFieldValue(name, value);
    if (name == "CentreId") {
      
      setFieldValue("PanelID", "");
    }
    
  };
  
  const { t } = useTranslation();
  return (
    <>
      {isRazorPayOpen && (
        <RazorPay
          AnotherPageCommonFunction={saveData}
          IsOpen={isRazorPayOpen}
          payload={{
            ...payload,
            amount: payload?.Amount,
            currency: "INR",
            tnx_type: "Client",
            receipt: paymenyId?.receipt,
            key_id: paymenyId?.key_id,
            key_secret: paymenyId?.key_secret,
            AdvanceAmtDate: moment(new Date()).format("DD-MMM-YYYY"),
            BankName: "",
            ChequeDate: "",
            ChequeNo: "",
            CreditCardNo: "",
            CreditDebit: "",
            CreditNote: "1",
            DraftNo: "",
            InvoiceNo: "",
            PaymentMode: "Online Payment",
            paymentModeID: "124",
            RateTypeID: payload.RateTypeId,
            ReceivedAmt: payload?.Amount,
            ReceiveDate: moment(new Date()).format("DD-MMM-YYYY"),
            Remarks: "Online",
            TransactionId: "",
            Type: "",
            InvoiceAmount: payload?.Amount,
          }}
          setIsRazorPayOpen={setIsRazorPayOpen}
        />
      )}
      <div className="card patient_registration border">
      <Heading
          title={"Online Payment"}
          isBreadcrumb={false}
        />
        <div className="row g-4 m-2">
         
          <ReactSelect
            placeholderName={"Centre"}
            id={"Centre"}
            name={"CentreId"}
            searchable={true}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.CentreId}
            dynamicOptions={centres}
            handleChange={handleReactSelect}
          />
          <ReactSelect
                placeholderName={t("Client")}
                id={"Panel"}
                name={"PanelID"}
                searchable={true}
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                value={values?.PanelID}
                dynamicOptions={Panels}
                handleChange={handleReactSelect}
              />
              <Input
                    type="text"
                    className="form-control required-fields"
                    id="First"
                    name="Remarks"
                    value={values?.Remarks}
                    onChange={handleChange}
                    lable={"Remarks"}
                    placeholder=" "
                    respclass=""
                />
                <Input
                    type="text"
                    className="form-control required-fields"
                    id="First"
                    name="Amount"
                    value={values?.Amount}
                    onChange={handleChange}
                    lable={"Amount"}
                    placeholder=" "
                    respclass=""
                />
                <div className="col-2">
            <button className="btn btn-sm btn-info" onClick={HandleSubmit}>
              {"PayAmount"}
            </button>
          </div>
         </div>
      </div>
      
      {/* <div className="box">
        <div className="box-body">
          <div
            className="box-body divResult boottable table-responsive"
            id="no-more-tables"
          >
            <div className="row">
              <table
                className="table table-bordered table-hover table-striped tbRecord"
                cellPadding="{0}"
                cellSpacing="{0}"
              >
                <thead className="cf text-center" style={{ zIndex: 99 }}>
                  <tr>
                    <th className="text-center">{t("S.No")}</th>
                    <th className="text-center">{t("Rate Type Name")}</th>
                    <th className="text-center">{t("Amount")}</th>{" "}
                    <th className="text-center">{t("Remarks")}</th>
                  </tr>
                </thead>
                {tableData?.length > 0 && (
                  <tbody>
                    {tableData.map((ele, index) => (
                      <>
                        <tr key={ele?.RouteId}>
                          <td data-title="S.No" className="text-center">
                            {index + 1}
                          </td>
                          <td data-title="RateTypeName" className="text-center">
                            {ele?.RateTypeName}
                          </td>
                          <td data-title="Amount" className="text-center">
                            {ele?.Amount}
                          </td>
                          <td data-title="Remarks" className="text-center">
                            {ele?.Remarks}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default OnlinePaymentPage;
