


import React, { useEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import Input from "../../../components/formComponent/Input";
import { useTranslation } from "react-i18next";
import DatePicker from "../../../components/formComponent/DatePicker";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import MultiSelectComp from "../../../components/formComponent/MultiSelectComp";
import TimePicker from "../../../components/formComponent/TimePicker";
import { useFormik } from "formik";
import {
  getBindDetailUser,
  getBindTypeOfTnx,
} from "../../../networkServices/ReportsAPI";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { print_Type } from "../../../utils/constant";
import { fetchmultiPanels, getmultiCentres } from "../../../utils/helperfunctions";
import { GetClientReport, ReceiptDetailnew } from "../../../networkServices/opdserviceAPI";
import Tables from "../../../components/UI/customTable";
import NoDataMessage from "../../../utils/NoDataMessage";

const CollectionReport = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [MultiCenters,setMultiCentres]=useState([]);
      const [MultiPanels,setMultiPanels]=useState([])
      const [bodyData,setBodyData]=useState({ReceiptDetailnew:[]})
  const [formdataled, setFormDataled] = useState({
    FromDate: moment().format("DD-MMM-YYYY"),
    ToDate: moment().format("DD-MMM-YYYY"),
    CentreID:[],
    PanelID:[],
    DateType:{label:'RegistrationDate',value:"plo.date"},
    isHeader: false,
     
  });
  const [shownodata,setShownodata]=useState(false)
  const itemsPerPage = 25; // You can adjust this number
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = bodyData?.ReceiptDetailnew.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bodyData?.ReceiptDetailnew.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const THEAD = [
    'S.No',
    'ReceiptNo',
    'VisitNo',
    'ClientCode', 
     'ClientName',
     'Amount',
    'EntryDate', 
     'EntryByName',
     'Remarks',
     'PaymentMode', 
    'DepositeDate', 
     'EntryType'
  ];
  
  
  const DateTypes=[{
    label:'ApprovedDate',value:'plo.ApprovedDate'},
    {label:'RegistrationDate',value:"plo.date"},
    {
    label:'SampleReceivingDate',value:'plo.SampleReceiveDate'}
   ]
  
  const handleSubmit=()=>{
    SearchLedgerSinglelineAPI()
   }
   const SearchLedgerSinglelineAPI = async (page = 0, pageSize = 25) => {
      
    const form=new FormData()
 
   form.append('SessionPanelID','');
 
 form.append('SessionCentreID',1)
 form.append('DateType','io.EntryDate'),
//  form.append('Panel_ID',formdataled?.PanelID)
//  form.append('CentreID',formdataled?.CentreID)// Assuming this is empty
 form.append('Panel_ID','')
 form.append('CentreID','')
 form.append('FromDate', new Date(formdataled.FromDate).toISOString().split('T')[0],);
 form.append('ToDate', new Date(formdataled.ToDate).toISOString().split('T')[0], );
 try {
     const dataResponse = await GetClientReport(form);
     console.log(dataResponse);
     if (dataResponse?.data.status === true) {
       setBodyData((prevState) => ({
         ...prevState,
         ReceiptDetailnew: dataResponse.data.data,
       }));
       
     }
     if(dataResponse.data.status==false)
     {
    setShownodata(true)
          
     }
   } catch (error) {
     console.error(error);
   }
 };
 const handleChangestat = (e) => {
  const { name, value } = e.target;
  setFormDataled((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
const handleReactSelect = (name, value) => {
  setFormDataled((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};


const handleMultiSelectChange = (name, selectedOptions) => {
  const selectedValues = selectedOptions.map((option) => option.code);
  const selectedNames = selectedOptions
    .map((option) => option.name)
    .join(", ");
  
  setFormDataled((prev) => ({
    ...prev,
    [`${name}`]: selectedValues,
  }));
};
useEffect(()=>{
  fetchmultiPanels(setMultiPanels)
getmultiCentres(setMultiCentres)
},[])
  return (
    <>
    {
       shownodata && <NoDataMessage show={shownodata} setShow={setShownodata}/>
    }
    <div className="card patient_registration border">
      <Heading title={"Client Deposit Report"} isBreadcrumb />
      <div className="row g-4 m-2" >
      <>
      <ReactSelect
            placeholderName={"DateType"}
            id={"DateType"}
            name={"DateType"}
            lable={"DateType"}
            searchable={true}
            defaultValue={{label:'ApprovedDate',value:'plo.ApprovedDate'}}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={formdataled?.DateType}
            dynamicOptions={DateTypes}
            handleChange={handleReactSelect}
          />
   <MultiSelectComp
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="CentreID"
              placeholderName="Centre"
              dynamicOptions={MultiCenters}
              handleChange={handleMultiSelectChange}
              value={formdataled.CentreID.map((code) => ({
                  code,
                  name: MultiCenters.find((item) => item.code === code)
                    ?.name,
                }))}
            />
            <MultiSelectComp
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="PanelID"
              placeholderName="Client"
              dynamicOptions={MultiPanels}
              handleChange={handleMultiSelectChange}
              value={formdataled.PanelID.map((code) => ({
                  code,
                  name: MultiPanels.find((item) => item.code === code)
                    ?.name,
                }))}
            />
           <DatePicker
              className="custom-calendar"
              id="FromDate"
              name="FromDate"
              handleChange={handleChangestat}
              value={
                formdataled.FromDate
                  ? moment(formdataled?.FromDate, "DD-MMM-YYYY").toDate()
                  : formdataled?.FromDate
              }
              lable={"FromDate"}
              placeholder={VITE_DATE_FORMAT}
              respclass={"col-xl-2 col-md-3 col-sm-4 col-12"}
            />
            <DatePicker
              className="custom-calendar"
              id="ToDate"
              name="ToDate"
              handleChange={handleChangestat}
              value={
                formdataled.ToDate
                  ? moment(formdataled?.ToDate, "DD-MMM-YYYY").toDate()
                  : formdataled?.ToDate
              }
              lable={"ToDate"}
              placeholder={VITE_DATE_FORMAT}
              respclass={"col-xl-2 col-md-3 col-sm-4 col-12"}
            />
   </>
   
  <button className="btn btn-sm btn-info" onClick={handleSubmit}>
    {"Search"}
  </button>

       
      
        
       
      </div>
      <div className="row g-4 m-2">
      <Tables
        style={{ width: "100%" }}
        thead={THEAD}
        tbody={currentItems?.map((ele, index) => ({
          "S.No.": indexOfFirstItem + index + 1,
          "ReceiptNo": ele?.ReceiptNo,
          "VisitNo": ele?.VisitNo,
          "ClientCode": ele?.Panel_Code,
          "ClientName": ele?.Company_Name,
          "Amount": ele?.Amount,
          "EntryDate": ele?.EntryDate,
          "EntryByName": ele?.EntryByName,
          "Remarks": ele?.Remarks,
          "PaymentMode": ele?.PaymentMode,
          "DepositeDate": ele?.DepositeDate,
          "EntryType": ele?.EntryType,
        }))}
        tableHeight={"tableHeight"}
      />

      {/* Pagination Component */}
      <CustomPaginationfront
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    
  </div>
    </div>
     
    
   </>
  );
};

export default CollectionReport;

const CustomPaginationfront = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Ensure totalPages is a valid number greater than 0
  if (totalPages <= 0) {
    return null; // or return some other UI indicating no pages
  }

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="pagination-button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <i className="fas fa-chevron-right"></i>
      </button>

     
    </div>
  );
};



