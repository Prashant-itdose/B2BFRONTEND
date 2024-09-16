import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../../../components/UI/Heading";
import Input from "@app/components/formComponent/Input";
import DatePicker from "@app/components/formComponent/DatePicker";
import { useFormik } from "formik";
import { RECEIPT_REPRINT_PAYLOAD, SEARCHBY } from "../../../utils/constant";
import { Tabfunctionality } from "../../../utils/helpers";
import { ReceiptDetailnew } from "../../../networkServices/opdserviceAPI";
import ReceiptReprintTable from "../../../components/UI/customTable/ReprintTable/ReceiptReprintTable";
import moment from "moment";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { Label } from "rc-easyui";
import axios from "axios";
import MultiSelectComp from "../../../components/formComponent/MultiSelectComp";
import InvoiceReprintTable from "../../../components/UI/customTable/ReprintTable/InvoiceReprintTable";
import { fetchmultiPanels, getmultiCentres } from "../../../utils/helperfunctions";

const InvoiceReprint = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const [formData,setFormdata]=useState({
    FromDate:'',
    ToDate:'',
    CentreID:[],
    PanelID:[]
  })
  const [bodyData, setBodyData] = useState({ ReceiptDetailnew: [] });
 const [Panels,setPanels]=useState([]);
 const [Centers,setCenters]=useState([])
  const THEAD = [
    t("Sr. No."),
    t("InvoiceNo"),
    t("ClientCode"),
    t("ClientName"),
    t("BusinessUnit"),
    
    t("InvoiceDate"),
    t("CreatedBy"),
    t("Share Amt"),
    t("View Invoice"),
    t("View Report"),
    t("Email"),
    t("Log"),
    t("Select")
];

  const SearchBillPrintAPI = async (page = 0, pageSize = 25) => {
    
    const headers = {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data",
      };
    
     const form=new FormData()
  
    form.append('SessionPanelID',localStorage.getItem('panelID'));
  form.append('SessionEmployeeID',localStorage.getItem('employeeId'));
  form.append('InvoiceNo', '');
  form.append('PanelID', formData.PanelID);// Assuming this is empty
  form.append('DateType', 'im.InvoiceDate');
  form.append('FromDate', new Date(formData.FromDate).toISOString().split('T')[0],);
  form.append('ToDate', new Date(formData.ToDate).toISOString().split('T')[0], );
  axios.post("/B2B_API/API/B2B_6/InvoiceRePrintSearch", form, {
    headers: headers,
  })
  .then((res) => {
    if(res.data.status=true)
    {
        setBodyData(prevState => ({
            ...prevState,
            ReceiptDetailnew: res.data.data
          }));
    }
   
  })
  .catch((err) => {
    console.log(err);
  });
  };
  
  
  const handleDateChange = (date, name) => {
    const formattedDate = moment(date).format('DD-MMM-YYYY');
    handleChange({ target: { name, value: formattedDate } });
  };

  // const handleReactSelect = (name, value) => {
  //   if (name === "rblCon") {
  //     setFieldValue(name, value);
  //     SearchBillPrintAPI();
  //   }
  // };

  const handleReactSelect = (name, value) => {
    setFieldValue(name, value);
  };

  const handleCustomSelect = (index, name, value) => {
    const updatedData = bodyData.ReceiptDetailnew?.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFieldValue({ ...bodyData, ReceiptDetailnew: updatedData });
    console.log(updatedData);
  };
 
  useEffect(()=>{
  fetchmultiPanels(setPanels)
  getmultiCentres(setCenters)
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    const selectedNames = selectedOptions
      .map((option) => option.name)
      .join(", ");
    
    setFormdata((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };
  
  const handleSubmit=()=>{
     SearchBillPrintAPI()
    
  }
  

  return (
    <>
      <div
        className="card patient_registration border"
        
      >
        <Heading
          title={t("FrontOffice.Re_Print.label.Receipt_Reprint")}
          isBreadcrumb={true}
        />
        <div className="row  g-4 m-2">
         <DatePicker
            className="custom-calendar"
            id="FromDate"
            name="FromDate"
            handleChange={handleChange}
            value={
              formData.FromDate
                ? moment(formData?.FromDate, "DD-MMM-YYYY").toDate()
                : formData?.FromDate
            }
            lable={"FromDate"}
            placeholder={VITE_DATE_FORMAT}
            respclass={"col-xl-2 col-md-3 col-sm-4 col-12"}
          />
          <DatePicker
            className="custom-calendar"
            id="ToDate"
            name="ToDate"
            handleChange={handleChange}
            value={
              formData.ToDate
                ? moment(formData?.ToDate, "DD-MMM-YYYY").toDate()
                : formData?.ToDate
            }
            lable={"ToDate"}
            placeholder={VITE_DATE_FORMAT}
            respclass={"col-xl-2 col-md-3 col-sm-4 col-12"}
          />
           <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="CentreID"
            placeholderName="Centre"
            dynamicOptions={Centers}
            handleChange={handleMultiSelectChange}
            value={formData.CentreID.map((code) => ({
                code,
                name: Centers.find((item) => item.code === code)
                  ?.name,
              }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="PanelID"
            placeholderName="Panel"
            dynamicOptions={Panels}
            handleChange={handleMultiSelectChange}
            value={formData.PanelID.map((code) => ({
                code,
                name: Panels.find((item) => item.code === code)
                  ?.name,
              }))}
          />
          <div className="col-2">
            <button className="btn btn-sm btn-info" onClick={handleSubmit}>
              {"Search"}
            </button>
          </div>
        </div>
      </div>

      <div className="card patient_registration_card my-1 mt-2">
        {/* <ReceiptReprintTable
          THEAD={THEAD}
          tbody={bodyData?.ReceiptDetailnew}
          setBodyData={setBodyData}
          setFieldValue={setFieldValue}
          SearchBillPrintAPI={SearchBillPrintAPI}
          values={values}
          handleCustomSelect={handleCustomSelect}
        /> */}
        {
        <InvoiceReprintTable 
        THEAD={THEAD}
        tbody={bodyData?.ReceiptDetailnew}/>
        }
      </div>
    </>
  );
};

export default InvoiceReprint;
