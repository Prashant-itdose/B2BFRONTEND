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
import { apiUrls } from "../../../networkServices/apiEndpoints";
import {fetchPanels } from "../../../utils/helperfunctions";
import CustomPagination from "../../../utils/CustomPagination";
import NoDataMessage from "../../../utils/NoDataMessage";
import { useNavigate } from "react-router-dom";

const ReceiptReprint = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const [bodyData, setBodyData] = useState({ ReceiptDetailnew: [] });
  const [shownodata,setShownodata] = useState(false);
 const [Panels,setPanels]=useState([]);
 const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const navigate=useNavigate();
  const THEAD = [
    "Sr. No.",
    "EntryDateTime",
    "Lab No.",
    "SIN No.",
    "PatientName",
    "Age/Sex",
    "Mobile No.",
  "Gross Amt.",
    "Disc Amt.",
    "Net Amt",
    "Paid Amt",
    "Due Amt.",
    "Client",
    "Action"
    

  ];
  const titleOptions = [
    { label: "Mr", value: "Mr.", gender: "Male" },
    { label: "Mrs", value: "Mrs.", gender: "Female" },
    { label: "Miss", value: "Miss.", gender: "Female" },
    { label: "Master", value: "Master", gender: "Male" },
    { label: "Baby", value: "Baby.", gender: "Female" },
    { label: "B/O", value: "B/O.", gender: "UnKnown" },
    { label: "Dr", value: "Dr.", gender: "UnKnown" },
    { label: "Prof", value: "Prof.", gender: "UnKnown" },
    { label: "Madam", value: "Madam.", gender: "Female" },
    { label: "Sister", value: "Sister.", gender: "Female" },
    { label: "Mohd", value: "Mohd.", gender: "Male" },
    { label: "Mx", value: "Mx", gender: "Female" },
    { label: "Transgendr", value: "Transgendr", gender: "Trans" },
    { label: "Ms", value: "Ms.", gender: "Female" },
  ];
  // const handleListSearch = (data, name, Promo) => {
  //     switch (name) {

  //       case "DoctorName":
  //         const doctorName = data.label.split(' # ')[0];
  // setFieldValue('DoctorName', doctorName);
  // setFieldValue('Doctor_ID', data?.value);
  //         setIndexMatch(0);
  //         setDoctorSuggestion([]);
  //         setDropFalse(false);
  //         break;
  //      setIndexMatch(0);
  //         setDoctorSuggestion([]);

  //         break;
  //       default:
  //         break;
  //     }
  //   };
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Trans", value: "Trans" }]
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    SearchBillPrintAPI('',page); // Trigger API call with the new page
  };

  const SearchBillPrintAPI = async (colorCode, page, pageSize = 25) => {
    const formattedValues = {
      SearchType: values?.SearchType.value,
      FromDate: new Date(values.FromDate).toISOString().split('T')[0],
      ToDate: new Date(values.ToDate).toISOString().split('T')[0],
      Panel_ID:values?.Panel_ID?.value,
      SessionCentreID: 1,
      SessionPanelID: localStorage.getItem('PanelID') ? localStorage.getItem('PanelID') : '',
      ColorCode: colorCode, // Use the renamed parameter here
      PageNo: page,
      PageSize: pageSize
    };
  
    const formData = new FormData();
    for (const key in formattedValues) {
      formData.append(key, formattedValues[key]);
    }
  
    try {
      const dataResponse = await ReceiptDetailnew(formData);
  
      if (dataResponse?.data.status === false) {
        setShownodata(true);
      }
      
      if (dataResponse?.status === 200) {
        if (page === 0) {
          
          setTotalPages(Math.ceil(dataResponse.data.data[0]?.TotalRecord / 25));
        }
        setBodyData((prevState) => ({
          ...prevState,
          ReceiptDetailnew: dataResponse.data.data,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  

  const { handleChange, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: RECEIPT_REPRINT_PAYLOAD,
    onSubmit: async (values, { resetForm }) => {
      SearchBillPrintAPI('',0);
    },
  });
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
  const statusLabels = [
    { status: "1", label: "Full Paid", colorClass: "#00fa9a" },
    { status: "2", label: "Partial Paid", colorClass: "#f6a9d1" },
    { status: "3", label: "Fully UnPaid", colorClass: "#ff457c" },
    { status: "4", label: "Credit", colorClass: "#F0FFF0" },
    { status: "6", label: "Full Refund", colorClass: "#018eff" }
  ];
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

  const handleEditInfo=(index)=>{
    console.log(bodyData?.ReceiptDetailnew[index]?.LabNo)
    navigate('/RegistrationEdit', {
      state: {
        data:bodyData?.ReceiptDetailnew[index]?.LabNo,
        edit:true
      }
    });
  }
  const handleSettlement=()=>{

  }
  const handleCashReceipt=()=>{

  }
  
  useEffect(()=>{
  fetchPanels(setPanels)
  },[])

  return (
    <>
    {
       shownodata && <NoDataMessage show={shownodata} setShow={setShownodata}/>
    }
      <form
        className="card patient_registration border"
        onSubmit={handleSubmit}
      >
        <Heading
          title={"FrontOffice.Re_Print.label.Receipt_Reprint"}
          isBreadcrumb={true}
        />
        <div className="row  g-4 m-2">
          <ReactSelect
            placeholderName={t("Search Type")}
            id={"SearchType"}
            name={"SearchType"}
            searchable={true}
            
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.SearchType}
            dynamicOptions={SEARCHBY}
            handleChange={handleReactSelect}
          />
          <Input
            type="text"
            className="form-control"
            id="SearchValue"
            name="SearchValue"
            onChange={handleChange}
            value={values?.SearchValue}
            
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            lable={t("SearchValue")}
          />
          <DatePicker
            className="custom-calendar"
            id="FromDate"
            name="FromDate"
            handleChange={handleChange}
            value={
              values.FromDate
                ? moment(values?.FromDate, "DD-MMM-YYYY").toDate()
                : values?.FromDate
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
              values.ToDate
                ? moment(values?.ToDate, "DD-MMM-YYYY").toDate()
                : values?.ToDate
            }
            lable={"ToDate"}
            placeholder={VITE_DATE_FORMAT}
            respclass={"col-xl-2 col-md-3 col-sm-4 col-12"}
          />
         
          <ReactSelect
            placeholderName={t("Client")}
            id={"Panel"}
            name={"Panel_ID"}
            searchable={true}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.Panel_ID}
            dynamicOptions={Panels}
            handleChange={handleReactSelect}
          />
          <div className="col-2">
            <button className="btn btn-sm btn-info" onClick={handleSubmit}>
              {"Search"}
            </button>
          </div>
          <div className="row g-4 m-2">
          <div className="d-flex flex-wrap justify-content-center">
            {statusLabels.map(({ status, label, colorClass }) => (
              <div
                key={status}
                className="d-flex align-items-center m-1"
                onClick={() => SearchBillPrintAPI(status,0)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="rounded-circle"
                  style={{
                    width: "12px",
                    height: "12px",
                    marginRight: "4px",
                    backgroundColor: colorClass, // Set background color
                    border: "0.5px solid #000", // Slight border with a neutral color (black or grey)
                  }}
                ></div>
                <span className="btn-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </form>

      <div className="card patient_registration_card my-1 mt-2">
        <ReceiptReprintTable
          THEAD={THEAD}
          tbody={bodyData?.ReceiptDetailnew}
          setBodyData={setBodyData}
          setFieldValue={setFieldValue}
          SearchBillPrintAPI={SearchBillPrintAPI}
          values={values}
          handleCustomSelect={handleCustomSelect}
          handleEditInfo={handleEditInfo}
          handleSettlement={handleSettlement}
           handleCashReceipt={handleCashReceipt}
        />
        {bodyData?.ReceiptDetailnew.length>0&&<CustomPagination
                 totalPages={totalPages}
                 currentPage={currentPage}
                 onPageChange={handlePageChange}
               />}
      </div>
    </>
  );
};

export default ReceiptReprint;
