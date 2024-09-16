import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../../../components/UI/Heading";
import Input from "@app/components/formComponent/Input";
import DatePicker from "@app/components/formComponent/DatePicker";
import { useFormik } from "formik";
import { RECEIPT_REPRINT_PAYLOAD, SEARCHBY } from "../../../utils/constant";
import { Tabfunctionality } from "../../../utils/helpers";
import { GetLedgerReport, GetLedgerReportMonthly, GetLedgerTransaction, ReceiptDetailnew } from "../../../networkServices/opdserviceAPI";
import ReceiptReprintTable from "../../../components/UI/customTable/ReprintTable/ReceiptReprintTable";
import moment from "moment";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { Label } from "rc-easyui";
import axios from "axios";
import MultiSelectComp from "../../../components/formComponent/MultiSelectComp";
import InvoiceReprintTable from "../../../components/UI/customTable/ReprintTable/InvoiceReprintTable";
import { fetchmultiPanels, fetchPanels, getCentres, getmultiCentres } from "../../../utils/helperfunctions";
import LedgerReportTable from "../../../components/UI/customTable/ReprintTable/LedgerReportTable";
import { ExportToExcel } from "../../../utils/apiCalls";
import LedgerTransactionTable from "../../../components/UI/customTable/ReprintTable/LedgerTransactionTable";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { headers } from "../../../utils/apiCalls";
import LedgerTransactionCard from "./LedgerTransactionCard";
import LedgerMonthlyTable from "../../../components/UI/customTable/ReprintTable/LedgerMonthlyTable";
import NoDataMessage from "../../../utils/NoDataMessage";
import Tables from "../../../components/UI/customTable";


const LEDGER_PAYLOAD = {
    FromDate: moment().format("DD-MMM-YYYY"),
    ToDate: moment().format("DD-MMM-YYYY"),
    SearchType: "",
    SearchValue: "",
    PanelID: [],
    CentreID:[]
  };
  const LedgerTransaction = () => {
    const { VITE_DATE_FORMAT } = import.meta.env;
    const [t] = useTranslation();
    const [shownodata,setShownodata] = useState(false);
    const [formData,setFormdata]=useState({
        FromDate: moment().format("DD-MMM-YYYY"),
        ToDate: moment().format("DD-MMM-YYYY"),
        CentreID:[],
        PanelID:[]
      })
      const [MultiCenters,setMultiCentres]=useState([]);
      const [MultiPanels,setMultiPanels]=useState([])
    const [formdataled, setFormDataled] = useState({
        FromDate: moment().format("DD-MMM-YYYY"),
        ToDate: moment().format("DD-MMM-YYYY"),
        CentreID: '',
        PanelID:'',
        isHeader: false,
        LedgerType:{Label:'LedgerTransaction',value:1} // Initial value
      });
    const [bodyData, setBodyData] = useState({Summary:{},table:[]});
   const [Panels,setPanels]=useState([]);
   const [Centers,setCenters]=useState([])
    const THEAD = [
      "BillDate",
      "InvoiceNo",
      "Particulas",
      "DebitAmount",
      "CreditAmount",
      ""
    ];
    const MONTHLYTHEAD=[
        "Month",
        "Date",
        "InvoiceNo",
        "Net",
        "DepositAmount",
        "Closing"
    ]
    const SINGLELINEHEAD = [
        "Sr. No.",
        "Centre",
        "SalesManager",
        "PaymentMode",
        "ClientCode",
        "ClientName",
        "OpeningAmount",
        "CurrentBooking",
        "ReceivedAmount",
        "ClosingAmount"
    ];
  
    const SearchBillPrintAPI = async (state) => {
        const form = new FormData();
        form.append('PanelID', 252); // Static PanelID for now
      
        // Format dates to 'YYYY-MM-DD'
        const formatDate = (date) => new Date(date).toISOString().split('T')[0];
        form.append('FromDate', formatDate(values.FromDate));
        form.append('ToDate', formatDate(values.ToDate));
      
        // Function to determine the API call based on state value
        const getApiFunction = (state) => {
            console.log(state)
          if (state.value === 1) {
            return GetLedgerTransaction;
          } else if (state.value === 2) {
            return GetLedgerReportMonthly;
          }
          else if(state.value==0)
          {
            return GetLedgerReport;
          }

          
        };
      
        try {
          const apiFunction = getApiFunction(values?.LedgerType);
      
          if (!apiFunction) {
            console.error('Invalid state value provided');
            return;
          }
      
          const dataResponse = await apiFunction(form);
          console.log(dataResponse);
      
          if (dataResponse?.data.status === true&&dataResponse?.data.message=="LedgerReport_Statement") {

            setBodyData((prevState) => ({
              ...prevState,
              Summary: dataResponse.data?.Summary?.[0],
              table: dataResponse?.data.Detailed,
            }));
          }
          if(dataResponse?.data.status==true && dataResponse?.data.message=="")
          { console.log(dataResponse)
            setBodyData((prevState) => ({
                ...prevState,
                table: dataResponse?.data.data,
                Summary:{}
              }));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      const { handleChange, values, setFieldValue } = useFormik({
        initialValues: formdataled,
        onSubmit: async (values, { resetForm }) => {
          SearchBillPrintAPI(0);
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
  
    const handleReactSelect = (name, value) => {
        console.log(name,value)
        if(name=='LedgerType') setBodyData({Summary:'',table:[]})
        setFieldValue(name, value);
      };

      const handleReactLedgertype = (selectedOption) => {
        console.log("Selected LedgerType:", selectedOption);
        setFormDataled((prevData) => ({
          ...prevData,
          LedgerType: selectedOption, // Make sure to set the entire selected option object
        }));
      };
    
  
    const handleCustomSelect = (index, name, value) => {
      const updatedData = bodyData.ReceiptDetailnew?.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      );
      setFieldValue({ ...bodyData, ReceiptDetailnew: updatedData });
      console.log(updatedData);
    };
    const handleChangestat = (e) => {
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
    
   
    useEffect(()=>{
     fetchmultiPanels(setMultiPanels);
     getmultiCentres(setMultiCentres)
     fetchPanels(setPanels)
    },[])
    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [name]: value,
    //   }));
    // };
    const handlecheckbox=()=>{
        setFormDataled({...formdataled,['isHeader']:!formdataled?.isHeader})
    }
   
    
    const SearchLedgerSinglelineAPI = async (page = 0, pageSize = 25) => {
      
         const form=new FormData()
      
        form.append('SessionPanelID',localStorage.getItem('panelID'));
      form.append('SessionEmployeeID',localStorage.getItem('employeeId'));
      form.append('GroupBy','Panel');
      form.append('PanelID','122,95')
      form.append('CentreID',1)// Assuming this is empty
      form.append('FromDate', new Date(formData.FromDate).toISOString().split('T')[0],);
      form.append('ToDate', new Date(formData.ToDate).toISOString().split('T')[0], );
      try {
          const dataResponse = await GetLedgerReport(form);
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
    
    const handleSubmit=()=>{
     if(values?.LedgerType.value==0)
     {
        SearchLedgerSinglelineAPI()
     }
     else {
        SearchBillPrintAPI()
     }
      
      
    }
    const handleExcel=()=>{

        ExportToExcel(bodyData?.ReceiptDetailnew)
    }
    console.log(bodyData)
  
    return (
      <>
      {
       shownodata && <NoDataMessage show={shownodata} setShow={setShownodata}/>
    }
        <div
          className="card patient_registration border"
          
        >
          <Heading
            title={t("FrontOffice.Re_Print.label.Receipt_Reprint")}
            isBreadcrumb={true}
          />
          <div className="row  g-4 m-2">
          <ReactSelect
  placeholderName={t("LedgerType")}
  id={"LedgerType"}
  name={"LedgerType"}
  respclass="col-xl-2 col-md-4 col-sm-6 col-12"
  defaultValue={{ label: "Ledger Transaction", value: 1 }} // Default selection
  value={values.LedgerType} // This should be an object like { label: "Ledger Transaction", value: 1 }
  dynamicOptions={[
    { label: "Ledger Statement", value: 0 },
    { label: "Ledger Transaction", value: 1 },
    { label: "Monthly Ledger", value: 2 },
  ]}
  handleChange={handleReactSelect} // Passes the selected option to the handler
/> 
{
  values?.LedgerType.value==0 ?(
   <>
   <MultiSelectComp
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="CentreID"
              placeholderName="Centre"
              dynamicOptions={MultiCenters}
              handleChange={handleMultiSelectChange}
              value={formData.CentreID.map((code) => ({
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
              value={formData.PanelID.map((code) => ({
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
              handleChange={handleChangestat}
              value={
                formData.ToDate
                  ? moment(formData?.ToDate, "DD-MMM-YYYY").toDate()
                  : formData?.ToDate
              }
              lable={"ToDate"}
              placeholder={VITE_DATE_FORMAT}
              respclass={"col-xl-2 col-md-3 col-sm-4 col-12"}
            />
   </>
  ) :(
   <>
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
            name={"PanelID"}
            searchable={true}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.PanelID}
            dynamicOptions={Panels}
            handleChange={handleReactSelect}
          />
   </>
  ) 
}
            
             
             <div className="col-2 d-flex">
  <button className="btn btn-sm btn-info" onClick={handleSubmit}>
    {"Search"}
  </button>
  <button className="btn btn-sm btn-info" onClick={handleSubmit} style={{ marginLeft: '8px' }}>
    {"Print"}
  </button>
  
  <div className="form-check ml-3" style={{ marginLeft: '12px' }}>
    <input
      type="checkbox"
      className="form-check-input"
      id="isHeaderCheckbox"
      name="isSelected"
      checked={formdataled?.isHeader}
      onChange={handlecheckbox}
    />
    <label className="form-check-label" htmlFor="isHeaderCheckbox" style={{ marginLeft: '4px' }}>
      {"Print Header"}
    </label>
  </div>
</div>
          </div>
        </div>
        <div className="card patient_registration_card my-1 mt-2">
        {bodyData?.Summary && Object.keys(bodyData.Summary).length > 0 ? (

  
    <LedgerTransactionCard bodyData={bodyData}/>
  ) : null}


  {values?.LedgerType.value==1&&<LedgerTransactionTable
    THEAD={THEAD}
    tbody={bodyData?.table}
    // Other props as needed
  />}
   {values?.LedgerType.value==2 &&<LedgerMonthlyTable THEAD={MONTHLYTHEAD}
    tbody={bodyData?.table} />}
    {
       values?.LedgerType.value ==0 && <>
      
       <Tables
         thead={SINGLELINEHEAD}
         tbody = {bodyData.ReceiptDetailnew?.map((ele, index) => ({
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
    }
</div>


      </>
    );
  };

export default LedgerTransaction;
