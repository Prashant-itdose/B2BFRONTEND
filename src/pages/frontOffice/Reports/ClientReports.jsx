


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
import { fetchmultiPanels, fetchMultiPanelswithid, getmultiCentres } from "../../../utils/helperfunctions";
import { GetClientReport, MonthlySummary, ReceiptDetailnew, ReportSummary, SinglelineSummary } from "../../../networkServices/opdserviceAPI";
import Tables from "../../../components/UI/customTable";
import NoDataMessage from "../../../utils/NoDataMessage";
import {InvestigationTable, PatientTable, ReportTable} from "./GetClientTable";
import { ExportToExcel, ExportToExcelitem, ExportToExcelPatient } from "../../../utils/apiCalls";

const ClientReports = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [MultiCenters,setMultiCentres]=useState([]);
      const [MultiPanels,setMultiPanels]=useState([])
      const [bodyData,setBodyData]=useState([])
      
  const [formdataled, setFormDataled] = useState({
    FromDate: moment().format("DD-MMM-YYYY"),
    ToDate: moment().format("DD-MMM-YYYY"),
    CentreID:[],
    PanelID:[],
    DateType:{label:'RegistrationDate',value:"plo.date"},
    isHeader: false,
     
  });
  const [radio, setRadio] = useState({ type: 'Net' });
  const [shownodata,setShownodata]=useState(false)
  const itemsPerPage = 25; // You can adjust this number
  const [currentPage, setCurrentPage] = useState(1);

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

 
  const handleRadioChange = (e) => {
    setRadio({ type: e.target.value });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const LINETHEAD = [
    'S.No',
    'ClientName',
    'NetAmount',
    'ReceivedAMount',
    'BalanceAmount'
  ];
  const MonthlyHead=[

  ];
  function transformData(dataArray) {
    const result = [];
  
    dataArray.forEach(item => {
      // Check if the centre already exists in the result array
      let centre = result.find(centre => centre.Centre === item.Centre);
  
      if (!centre) {
        centre = {
          Centre: item.Centre,
          Clients: []
        };
        result.push(centre);
      }
  
      // Find or create the client within the centre
      let client = centre.Clients.find(client => client.ClientName === item.ClientName);
      if (!client) {
        client = {
          ClientName: item.ClientName,
          Patients: []
        };
        centre.Clients.push(client);
      }
  
      // Add the patient to the client
      client.Patients.push({
        PatientName: item.PName,
        AgeGender: item.Age,
        Doctor: item.DoctorName,
        VisitNo:item?.LedgerTransactionNo,
        Items: item.ItemName,
        BillingType: item.BillType,
        NetAmount: item.Amount
      });
    }); 
   
    return result;
  }
  
 
  
  
  
  const DateTypes=[{
    label:'SingleLineSummary',value:'0'},
    {label:'MonthlyWise',value:"1"},
   {label:'PatientWise',value:'2'},
    {label:'ItemWise',value:'3'}
   ]
  
  const handleSubmit=()=>{
    // SearchLedgerSinglelineAPI()

   }
//    const SearchLedgerSinglelineAPI = async (page = 0, pageSize = 25) => {
      
//     const form=new FormData()
 
//    form.append('SessionPanelID','');
 
//  form.append('SessionCentreID',1)
//  form.append('DateType','io.EntryDate'),
// //  form.append('Panel_ID',formdataled?.PanelID)
// //  form.append('CentreID',formdataled?.CentreID)// Assuming this is empty
//  form.append('Panel_ID','')
//  form.append('CentreID','')
//  form.append('FromDate', new Date(formdataled.FromDate).toISOString().split('T')[0],);
//  form.append('ToDate', new Date(formdataled.ToDate).toISOString().split('T')[0], );
//  try {
//      const dataResponse = await GetClientReport(form);
//      console.log(dataResponse);
//      if (dataResponse?.data.status === true) {
//        setBodyData((prevState) => ({
//          ...prevState,
//          ReceiptDetailnew: dataResponse.data.data,
//        }));
       
//      }
//      if(dataResponse.data.status==false)
//      {
//     setShownodata(true)
          
//      }
//    } catch (error) {
//      console.error(error);
//    }
//  };
const handleChangestat = (e) => {
    const { name, value } = e.target;
    const selectedDate = moment(value, "DD-MMM-YYYY");
     console.log(formdataled)
    if (formdataled?.ReportType.value == '3') {
      if (name === 'FromDate') {
        const toDate = moment(formdataled.ToDate, "DD-MMM-YYYY");
        console.log(toDate)
        if (toDate.isAfter(selectedDate.clone().add(1, 'month'))) {
          
          formdataled.ToDate = selectedDate.clone().add(1, 'month').format("DD-MMM-YYYY");
        }
      } else if (name === 'ToDate') {
        const fromDate = moment(formdataled.FromDate, "DD-MMM-YYYY");
        if (fromDate.isBefore(selectedDate.clone().subtract(1, 'month'))) {
         
          formdataled.FromDate = selectedDate.clone().subtract(1, 'month').format("DD-MMM-YYYY");
        }
      }
    }
    else if (formdataled?.ReportType.value == '2') {
        if (name === 'FromDate') {
          const toDate = moment(formdataled.ToDate, "DD-MMM-YYYY");
          console.log(toDate)
          if (toDate.isAfter(selectedDate.clone().add(3, 'month'))) {
            
            formdataled.ToDate = selectedDate.clone().add(3, 'month').format("DD-MMM-YYYY");
          }
        } else if (name === 'ToDate') {
          const fromDate = moment(formdataled.FromDate, "DD-MMM-YYYY");
          if (fromDate.isBefore(selectedDate.clone().subtract(3, 'month'))) {
           
            formdataled.FromDate = selectedDate.clone().subtract(3, 'month').format("DD-MMM-YYYY");
          }
        }
      }
      else {
        if (name === 'FromDate') {
            const toDate = moment(formdataled.ToDate, "DD-MMM-YYYY");
            console.log(toDate)
            if (toDate.isAfter(selectedDate.clone().add(6, 'month'))) {
              
              formdataled.ToDate = selectedDate.clone().add(6, 'month').format("DD-MMM-YYYY");
            }
          } else if (name === 'ToDate') {
            const fromDate = moment(formdataled.FromDate, "DD-MMM-YYYY");
            if (fromDate.isBefore(selectedDate.clone().subtract(6, 'month'))) {
             
              formdataled.FromDate = selectedDate.clone().subtract(6, 'month').format("DD-MMM-YYYY");
            }
          }
      }
  
    setFormDataled({
      ...formdataled,
      [name]: value
    });
  };
  
const handleReactSelect = (name, value) => {
if(name=='ReportType') setBodyData([])
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
  // fetchmultiPanels(setMultiPanels)
getmultiCentres(setMultiCentres)
},[])
useEffect(()=>{
    fetchMultiPanelswithid(formdataled?.CentreID,setMultiPanels,setFormDataled)
},[formdataled?.CentreID])

const fetchItems=()=>{
    if(formdataled?.ReportType?.value==0){
        return [{ClientName:'xyz',Net:'100',Rec:'50',Balance:'50'}]
    }
    if(formdataled?.ReportType?.value==1)
    {
         return [{Clientname:'XYX',netaug:100,netjul:100,netjun:500,netmay:2500,netapr:780,recaug:25,recjul:45,recjun:23,recmay:34,recaprl:150,pcountapr:23,pcountmay:26,pcountjun:12,pcountjul:21,pcountaug:12}]
    }
    if(formdataled?.ReportType?.value==2)
    {
        return [
            {
              Centre: "ABC",
              Clients: [
                {
                  ClientName: "Client A",
                  Patients: [
                    {
                      PatientName: "John Doe",
                      AgeGender: "30/M",
                      Doctor: "Dr. Smith",
                      Items: "Blood Test",
                      BillingType:'',
                      NetAmount: 500
                    },
                    {
                      PatientName: "Jane Doe",
                      AgeGender: "28/F",
                      Doctor: "Dr. Adams",
                      Items: "X-Ray",
                      BillingType:'',
                      NetAmount: 300
                    }
                  ]
                },
                {
                  ClientName: "Client B",
                  Patients: [
                    {
                      PatientName: "Alice Brown",
                      AgeGender: "45/F",
                      Doctor: "Dr. Johnson",
                      Items: "MRI",
                      NetAmount: 1200,
                      BillingType:'',
                    }
                  ]
                },
                {
                  ClientName: "Client C",
                  Patients: [
                    {
                      PatientName: "Bob White",
                      AgeGender: "55/M",
                      Doctor: "Dr. Patel",
                      Items: "CT Scan",
                      NetAmount: 800
                    }
                  ]
                }
              ]
            },
            {
              Centre: "XYZ",
              Clients: [
                {
                  ClientName: "Client D",
                  Patients: [
                    {
                      PatientName: "Charlie Green",
                      AgeGender: "40/M",
                      Doctor: "Dr. Lee",
                      Items: "Ultrasound",
                      NetAmount: 400
                    },
                    {
                      PatientName: "Diana Black",
                      AgeGender: "35/F",
                      Doctor: "Dr. Evans",
                      Items: "Blood Test",
                      NetAmount: 200
                    }
                  ]
                },
                {
                  ClientName: "Client E",
                  Patients: [
                    {
                      PatientName: "Edward Gray",
                      AgeGender: "50/M",
                      Doctor: "Dr. Kim",
                      Items: "X-Ray",
                      NetAmount: 350
                    }
                  ]
                },
                {
                  ClientName: "Client F",
                  Patients: [
                    {
                      PatientName: "Fiona White",
                      AgeGender: "32/F",
                      Doctor: "Dr. Brown",
                      Items: "CT Scan",
                      NetAmount: 900
                    }
                  ]
                },
                {
                  ClientName: "Client G",
                  Patients: [
                    {
                      PatientName: "George Blue",
                      AgeGender: "27/M",
                      Doctor: "Dr. Davis",
                      Items: "MRI",
                      NetAmount: 1100
                    }
                  ]
                },
                {
                  ClientName: "Client H",
                  Patients: [
                    {
                      PatientName: "Hannah Gold",
                      AgeGender: "29/F",
                      Doctor: "Dr. Moore",
                      Items: "Ultrasound",
                      NetAmount: 450
                    }
                  ]
                }
              ]
            }
          ];
          
    }
    if(formdataled?.ReportType?.value==3)
    {
        return [
            {
              Centre: "ABC",
              Clients: [
                {
                  ClientName: "Client A",
                  Patients: [
                    {
                      PatientName: "John Doe",
                      AgeGender: "30/M",
                      Doctor: "Dr. Smith",
                      BillingType:'',
                      Items: [
                        { TestName: "Blood Test", NetAmount: 500 },
                        { TestName: "Urine Test", NetAmount: 200 }
                      ]
                    },
                    {
                      PatientName: "Jane Doe",
                      AgeGender: "28/F",
                      Doctor: "Dr. Adams",
                      BillingType:'',
                      Items: [
                        { TestName: "X-Ray", NetAmount: 300 }
                      ]
                    }
                  ]
                },
                {
                  ClientName: "Client B",
                  Patients: [
                    {
                      PatientName: "Alice Brown",
                      AgeGender: "45/F",
                      Doctor: "Dr. Johnson",
                      BillingType:'',
                      Items: [
                        { TestName: "MRI", NetAmount: 1200 }
                      ]
                    }
                  ]
                },
                {
                  ClientName: "Client C",
                  Patients: [
                    {
                      PatientName: "Bob White",
                      AgeGender: "55/M",
                      Doctor: "Dr. Patel",
                      BillingType:'',
                      Items: [
                        { TestName: "CT Scan", NetAmount: 800 }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              Centre: "XYZ",
              Clients: [
                {
                  ClientName: "Client D",
                  Patients: [
                    {
                      PatientName: "Charlie Green",
                      AgeGender: "40/M",
                      Doctor: "Dr. Lee",
                      BillingType:'',
                      Items: [
                        { TestName: "Ultrasound", NetAmount: 400 },
                        { TestName: "Blood Test", NetAmount: 150 }
                      ]
                    },
                    {
                      PatientName: "Diana Black",
                      AgeGender: "35/F",
                      Doctor: "Dr. Evans",
                      BillingType:'',
                      Items: [
                        { TestName: "Blood Test", NetAmount: 200 }
                      ]
                    }
                  ]
                },
                {
                  ClientName: "Client E",
                  Patients: [
                    {
                      PatientName: "Edward Gray",
                      AgeGender: "50/M",
                      Doctor: "Dr. Kim",
                      BillingType:'',
                      Items: [
                        { TestName: "X-Ray", NetAmount: 350 }
                      ]
                    }
                  ]
                },
                {
                  ClientName: "Client F",
                  Patients: [
                    {
                      PatientName: "Fiona White",
                      AgeGender: "32/F",
                      Doctor: "Dr. Brown",
                      BillingType:'',
                      Items: [
                        { TestName: "CT Scan", NetAmount: 900 }
                      ]
                    }
                  ]
                },
                {
                  ClientName: "Client G",
                  Patients: [
                    {
                      PatientName: "George Blue",
                      AgeGender: "27/M",
                      Doctor: "Dr. Davis",
                      BillingType:'',
                      Items: [
                        { TestName: "MRI", NetAmount: 1100 }
                      ]
                    }
                  ]
                },
                {
                  ClientName: "Client H",
                  Patients: [
                    {
                      PatientName: "Hannah Gold",
                      AgeGender: "29/F",
                      Doctor: "Dr. Moore",
                      BillingType:'',
                      Items: [
                        { TestName: "Ultrasound", NetAmount: 450 }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
          
    }
}
function transformdata(dataArray) {
  const result = [];

  dataArray.forEach(item => {
    // Split ItemName by comma to handle multiple items
    const itemNames = item.ItemName.split(',');

    itemNames.forEach(testName => {
      // Trim the testName to remove any extra spaces
      testName = testName.trim();

      // Find or create the Centre
      let centre = result.find(c => c.Centre === item.Centre);
      if (!centre) {
        centre = {
          Centre: item.Centre,
          Clients: []
        };
        result.push(centre);
      }

      // Find or create the Client within the Centre
      let client = centre.Clients.find(c => c.ClientName === item.ClientName);
      if (!client) {
        client = {
          ClientName: item.ClientName,
          Patients: []
        };
        centre.Clients.push(client);
      }

      // Find or create the Patient within the Client
      let patient = client.Patients.find(p => p.PatientName === item.PName);
      if (!patient) {
        patient = {
          PatientName: item.PName,
          AgeGender: item.Age, // Extracting Age and Gender
          Doctor: item.DoctorName,
          VisitNo:item?.LedgerTransactionNo,
          BillingType: item.BillType || '',
          Items: []
        };
        client.Patients.push(patient);
      }

      // Add the Test Item to the Patient's Items array
      patient.Items.push({
        TestName: testName,
        NetAmount: item.Amount / itemNames.length ,
        BillType:item?.BillType// Divide the total amount equally among the items
      });
    });
  });
  console.log(result)

  return result;
}
const getDocumentinexcel=()=>{
     
    if(['0','1'].includes(formdataled?.ReportType?.value))
    {
      ExportToExcel(bodyData)
    }
    else if(formdataled?.ReportType?.value=='3')
    {
      ExportToExcelitem(bodyData)
    }
    else {
      ExportToExcelPatient(bodyData)
    }
    
}
const getApifunction=()=>{
   if(formdataled?.ReportType?.value==0)
   {
    return SinglelineSummary;
   }
   if(formdataled?.ReportType?.value==1)
   {
    return MonthlySummary;
   }
   if(formdataled?.ReportType?.value==2||formdataled?.ReportType?.value==3){
    return ReportSummary
   }
}
const searchBillPrintApi = async () => {
    
  
    const formData = new FormData();

      formData?.append('FromDate',new Date(formdataled.FromDate).toISOString().split('T')[0])
      formData?.append('ToDate',new Date(formdataled.ToDate).toISOString().split('T')[0])
      formData?.append('Panel_Id',formdataled?.PanelID)
      formData?.append('CentreID',formdataled?.CentreID)
     if(formdataled?.ReportType?.value==1) formData?.append('Type',radio?.type=='Net'?'NetAmount':'PatientCount')
      if(formdataled?.ReportType?.value==2) formData?.append('Type','PatientWise')
      if(formdataled?.ReportType?.value==3) formData?.append('Type','ItemWise')
      formData?.append('SessionEmployeeID',localStorage?.getItem('employeeId'))
      formData?.append('SessionLoginName',localStorage?.getItem('employeeName'))
try 
{      
    const dataResponse = await getApifunction()(formData)
      
  
      if (dataResponse?.data.status === false) {
       
      }
      
      if (dataResponse?.data?.status === true) {
        if(dataResponse?.data?.data.length==0) 
          {setShownodata(true);}
        else {
          if(formdataled?.ReportType?.value==2)
          {
             const data=transformData(dataResponse?.data?.data)
             setBodyData(data)
          }
          else if(formdataled?.ReportType?.value==3) {
            setBodyData(transformdata(dataResponse?.data?.data))
          }
          else {
            setBodyData(dataResponse?.data?.data)
          }
          
        }
            
      }
    } catch (error) {
      console.error(error);
    }
  };
useEffect(()=>{
  searchBillPrintApi()
},[radio])
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
            placeholderName={"ReportType"}
            id={"ReportType"}
            name={"ReportType"}
            lable={"ReportType"}
            searchable={true}
            
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={formdataled?.ReportType}
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
   
 
  <div className="col-sm-2">
            <button className="btn btn-sm btn-success" onClick={searchBillPrintApi}>
              Search
            </button>
            <button style={{ marginLeft: '5px' }} className="btn btn-sm btn-success" onClick={() => {getDocumentinexcel()}}>
              Download
            </button>
          </div>

       
      
        
       
      </div>
      {['0','1'].includes(formdataled?.ReportType?.value) && <div className="row g-4 m-2">
        <ReportTable ReportType={formdataled?.ReportType?.value} 
        tabletype={radio?.type}
        currentItems={bodyData}
        onRadioChange={handleRadioChange}/>
      </div>}
      {formdataled?.ReportType?.value=='2' && <div className="row g-4 m-2">
        <PatientTable
        currentItems={bodyData}
        onRadioChange={handleRadioChange}/>
      </div>}
      {
        formdataled?.ReportType?.value=='3'&& 
        <div className="row g-4 m-2">
        <InvestigationTable
        currentItems={bodyData}
        />
      </div>
      }

      {/* <div className="row g-4 m-2">
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

      
      <CustomPaginationfront
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    
  </div> */}
    </div>
     
    
   </>
  );
};

export default ClientReports;

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



