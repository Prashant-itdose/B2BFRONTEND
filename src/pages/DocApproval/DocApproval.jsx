import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUpload, FaEye, FaFileAlt } from 'react-icons/fa';
import moment from "moment/moment";

import Input from "../../components/formComponent/Input";
import ReactSelect from "../../components/formComponent/ReactSelect";
import DatePicker from "../../components/formComponent/DatePicker";
import axios from "axios";
import Heading from "../../components/UI/Heading";
import {
  autocompleteOnBlur,
  emptyformData,
  fetchmultiPanels,
  fillFormWithData,
  getmultiCentres,
} from "../../utils/helperfunctions";
import Tables from "../../components/UI/customTable";
import MultiSelectComp from "../../components/formComponent/MultiSelectComp";
import { Dialog } from "primereact/dialog";
import ResultEntry from "./ResultEntry";

const PTHEAD = [
  "Barcode No.",
  "VisitNo",
  "PatientName",
   "Age/Gender",
  "TestName",
];

const DocApproval=()=>{
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const [formData,setFormdata]=useState({
    FromDate:moment().format("DD-MMM-YYYY"),
    ToDate:moment().format("DD-MMM-YYYY"),
    CentreID:[],
    Department:[],
    BarcodeNo:'',
  })
  const [showModal, setShowModal] = useState(false);
  const [resultentryMode,setResultentryMode]=useState(false);
  const [resultentrydetails,setResultentrydetails]=useState([])
  const [selectedData, setSelectedData] = useState(null);

  const handleIconClick = (data) => {

    fetchSearchDetails(data?.centreID)
    setSelectedData(data);
    setShowModal(true);
  };
  const fetchSearchDetails=(id)=>{

    const headers = {
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "multipart/form-data",
    };
  
   const form=new FormData()

  form.append('SessionCentreID',localStorage.getItem('centreid')?localStorage.getItem('centreid'):1);
form.append('SessionEmployeeID',localStorage.getItem('employeeId'));
form.append('CentreID',id)
form.append('DepartmentID',formData?.Department)
form.append('AccessDepartment',''),
form.append('BarcodeNo',formData?.BarcodeNo)
form.append('LedgerTransactionNo','')
form.append('FromDate', new Date(formData.FromDate).toISOString().split('T')[0],);
form.append('ToDate', new Date(formData.ToDate).toISOString().split('T')[0], );
axios.post("/B2B_API/API/DocApproval/LedgerTransactionNo_Search", form, {
  headers: headers,
})
.then((res) => {
  if(res.data.status=true)
  {
      setBodyData(prevState => ({
          ...prevState,
          patientdetails: res.data.data
        }));
  }
 
})
.catch((err) => {
  console.log(err);
});
  }

  const hideDialog = () => {
    setShowModal(false);
  };
  const [bodyData, setBodyData] = useState({ ReceiptDetailnew: [],patientdetails:[] });
 const [Departments,setDepartments]=useState([]);
 const [Centers,setCenters]=useState([])
  const THEAD = [
    "Sr. No.",
    "Centre",
    'ApprovalPending'
  ];


  const SearchBillPrintAPI = async (page = 0, pageSize = 25) => {
    
    const headers = {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data",
      };
    
     const form=new FormData()
  
    form.append('SessionCentreID',localStorage.getItem('centreid')?localStorage.getItem('centreid'):1);
  form.append('SessionEmployeeID',localStorage.getItem('employeeId'));
 form.append('CentreID',formData?.CentreID)
 form.append('DepartmentID',formData?.Department)
 form.append('AccessDepartment',''),
 form.append('BarcodeNo',formData?.BarcodeNo)
 form.append('LedgerTransactionNo','')
  form.append('FromDate', new Date(formData.FromDate).toISOString().split('T')[0],);
  form.append('ToDate', new Date(formData.ToDate).toISOString().split('T')[0], );
  axios.post("/B2B_API/API/DocApproval/Centre_Search", form, {
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
  const handleDocumentIconClick=(ele)=>{
    console.log(ele)
    fetchResultEntry(ele)
    setResultentryMode(true)
  }
  const fetchResultEntry=(ele)=>{
    const headers = {
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "multipart/form-data",
    };
  
   const form=new FormData()

  form.append('SessionCentreID',localStorage.getItem('centreid')?localStorage.getItem('centreid'):1);
form.append('SessionEmployeeID',localStorage.getItem('employeeId'));
form.append('CentreID','')
form.append('DepartmentID',formData?.Department)
form.append('AccessDepartment',''),
form.append('BarcodeNo',formData?.BarcodeNo)
form.append('LedgerTransactionNo',ele?.VisitNo)
form.append('FromDate', new Date(formData.FromDate).toISOString().split('T')[0],);
form.append('ToDate', new Date(formData.ToDate).toISOString().split('T')[0], );
form.append('TestID',ele?.TestID)
form.append('AgeInDays',ele?.AGE_in_Days)
form.append('Gender',ele?.Gender)


axios.post("B2B_API/API/DocApproval/Details_Search", form, {
  headers: headers,
})
.then((res) => {
  if(res.data.status=true)
  {
     setResultentrydetails(res.data.data);
     setShowModal(false)
      
  }
 
})
.catch((err) => {
  console.log(err);
});
  }
  useEffect(()=>{
  fetchDepartments(setDepartments)
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
          isBreadcrumb={true}
          title={"Doctor Approval Search"}
          mode={resultentryMode}
        />
       {!resultentryMode &&<> <div className="row  g-4 m-2">
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
            maxDate={moment(formData?.ToDate, "DD-MMM-YYYY").toDate()}
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
            name="Department"
            placeholderName="Department"
            dynamicOptions={Panels}
            handleChange={handleMultiSelectChange}
            value={formData.Department.map((code) => ({
                code,
                name: Panels.find((item) => item.code === code)
                  ?.name,
              }))}
          />
          <Input
            type="text"
            className="form-control"
            id="SearchValue"
            name="BarcodeNo"
            onChange={handleChange}
            value={formData?.BarcodeNo}
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            lable={t("BarcodeNo")}
          />
          <div className="col-2">
            <button className="btn btn-sm btn-info" onClick={handleSubmit}>
              {"Search"}
            </button>
          </div>
        </div>
      

     
        
        
         <Tables
         thead={THEAD}
         tbody={bodyData?.ReceiptDetailnew?.map((ele, index) => ({
           "Sr. No.": index + 1,
           'Centre': ele?.centre,
           'ApprovalPending': (
             <>
               {ele?.ApprovedTest}
               {ele?.ApprovedTest > 0 && (
                 <FaEye 
                   style={{ marginLeft: '8px', cursor: 'pointer' }} 
                   onClick={() => handleIconClick(ele)} 
                 />
               )}
             </>
           )
         }))}
         tableHeight={"tableHeight"}
       /></>}
        {
          resultentryMode && 
          <ResultEntry Departments={[...new Set(resultentrydetails.map(item => item.Dept))]}
          ResultData={resultentrydetails}
          setResultentrydetails={setResultentrydetails}
          setResultentryMode={setResultentryMode}
          setShowModal={setShowModal}
          />
        }
        
      </div>
      <Dialog header="Pending Test Details" visible={showModal} style={{ width: '80vw' }} onHide={()=>{
        setShowModal(false)
      }}>
         <Tables
  thead={PTHEAD}
  tbody={bodyData?.patientdetails?.map((ele, index) => ({
    'BarcodeNo': ele?.VialID,
    'VisitNO': (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {ele?.VisitNo}
        <FaFileAlt
          style={{ marginLeft: '8px', cursor: 'pointer' }} 
          onClick={() => handleDocumentIconClick(ele)}
        />
      </div>
    ),
    'PatientName': ele?.PatientName,
    'Age/Gender': ele?.AgeSex,
    'TestName': ele?.TestName,
  }))}
  tableHeight={"tableHeight"}
/>
        
      </Dialog>
    </>
  );
}
export default DocApproval


