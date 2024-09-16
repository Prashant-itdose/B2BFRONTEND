import { useFormik } from "formik";
import Input from "../components/formComponent/Input";
import ReactSelect from "../components/formComponent/ReactSelect";
import Heading from "../components/UI/Heading";
import DatePicker from "../components/formComponent/DatePicker";
import { AutoComplete } from "primereact/autocomplete";
import { useRef, useState } from "react";
import Tables from "../components/UI/customTable";
import { SEARCHBY } from "../utils/constant";
import QuotationTable from "../components/UI/customTable/ReprintTable/QuotationTable";
import SupplierAndLocationDetail from "./SupplierAndLocationDetail";
import Stepper from "./Stepper";
import { Steps } from "primereact/steps";
import { Toast } from 'primereact/toast';
import { ProjectModal } from "./ProjectModal";
import { ShippingAddressModal } from "./ShippingAddressModal";
import { Billname } from "./BillNameModal";
const THEAD = [
    "Sr. No.",
    "Quotation No.",
    
    "Item Name",
    
    "Total Amount",
    "Remark",
    "Vendor Name",
    
    "Entry Date From",
    "Entry Date To",
    "Approval Status",
    "Is Dead",
    "Action"
  ];
 const TBODY= [
    {
      "converttosale": 0,
      "qty": 6.000,
      "discountamt": 0,
      "igstper": 18.000,
      "filename": "",
      "remark": "PACS Integration",
      "totalamount": 35400.00000000,
      "projectid": 938,
      "toemail": "arjunnarula26@gmail.com",
      "ccmail": "drarjunnarula@naruladiagnostics.com",
      "EntryDateFrom": "14-Aug-2024",
      "EntryDateTo": "21-Aug-2024",
      "ApprovalStatus": 1,
      "IsDead": 0,
      "rowcolor": "pink",
      "Qutationno": "IISPL/QUOTE/24-25/00444",
      "ProjectID1": 938,
      "itemid": 997331,
      "itemname": "ManDays",
      "NetAmt": 10400.00000,
      "gstamount": 5400.00000,
      "rate": 5000.00000,
      "DiscountAmt1": 0,
      "igstper1": 18.000,
      "VendorName": "NARULA GURUGRAM  (V6.0)",
      "Address": "Gurgaon, Haryana Haryana",
      "VednorStateGstnno": ""
    },
    {
      "converttosale": 1,
      "qty": 1.000,
      "discountamt": 0,
      "igstper": 18.000,
      "filename": "",
      "remark": "Lims softwere dev. & New mc. addition PO NO. - 3430059380 PO Date - 03.08.2024",
      "totalamount": 123900.00000000,
      "projectid": 335,
      "toemail": "somdattad@tatamotors.com",
      "ccmail": "bijan.roy@tatamotors.com",
      "EntryDateFrom": "13-Aug-2024",
      "EntryDateTo": "20-Aug-2024",
      "ApprovalStatus": 2,
      "IsDead": 0,
      "rowcolor": "yellow",
      "Qutationno": "IISPL/QUOTE/24-25/00443",
      "ProjectID1": 335,
      "itemid": 997331,
      "itemname": "ProjectManagement",
      "NetAmt": 123900.00000,
      "gstamount": 18900.00000,
      "rate": 105000.00000,
      "DiscountAmt1": 0,
      "igstper1": 18.000,
      "VendorName": "TATA MOTORS HOSPITAL",
      "Address": "First floor , Auto General office, Plant-2, Telco, Jamshedpur, Jharkhand Jharkhand",
      "VednorStateGstnno": "20AAACT2727Q1ZA"
    },
    {
      "converttosale": 1,
      "qty": 8.000,
      "discountamt": 0,
      "igstper": 18.000,
      "filename": "",
      "remark": "One Time Development Cost Medgenome Pos Machine",
      "totalamount": 42480.00000000,
      "projectid": 1046,
      "toemail": "ziagnosis1gmail.com",
      "ccmail": "support@ziagnosis.com",
      "EntryDateFrom": "13-Aug-2024",
      "EntryDateTo": "20-Aug-2024",
      "ApprovalStatus": 2,
      "IsDead": 0,
      "rowcolor": "yellow",
      "Qutationno": "IISPL/QUOTE/24-25/00442",
      "ProjectID1": 1046,
      "itemid": 997331,
      "itemname": "ManDays",
      "NetAmt": 10980.00000,
      "gstamount": 6480.00000,
      "rate": 4500.00000,
      "DiscountAmt1": 0,
      "igstper1": 18.000,
      "VendorName": "MEDGENOME LABS LTD",
      "Address": "- Delhi",
      "VednorStateGstnno": ""
    },
    {
      "converttosale": 0,
      "qty": 1.000,
      "discountamt": 0,
      "igstper": 18.000,
      "filename": "",
      "remark": "DXH 900",
      "totalamount": 11800.00000000,
      "projectid": 412,
      "toemail": "ssaha.nirnayan@gmail.com",
      "ccmail": "1997.souvikmitra@gmail.com",
      "EntryDateFrom": "13-Aug-2024",
      "EntryDateTo": "20-Aug-2024",
      "ApprovalStatus": 1,
      "IsDead": 0,
      "rowcolor": "pink",
      "Qutationno": "IISPL/QUOTE/24-25/00441",
      "ProjectID1": 412,
      "itemid": 997331,
      "itemname": "Machine Interfacing - Bi",
      "NetAmt": 11800.00000,
      "gstamount": 1800.00000,
      "rate": 10000.00000,
      "DiscountAmt1": 0,
      "igstper1": 18.000,
      "VendorName": "NIRNAYAN HEALTHCARE , KOLKATA",
      "Address": "145 rajarhat road  jyangra kolkata west bangal Select",
      "VednorStateGstnno": "19AAGCN4191G1Z8"
    },
    {
      "converttosale": 0,
      "qty": 8.000,
      "discountamt": 0,
      "igstper": 18.000,
      "filename": "",
      "remark": "allergy report",
      "totalamount": 37760.00000000,
      "projectid": 63,
      "toemail": "dryugam@yahoo.com",
      "ccmail": "saurabhmalan@gmail.com",
      "EntryDateFrom": "13-Aug-2024",
      "EntryDateTo": "20-Aug-2024",
      "ApprovalStatus": 1,
      "IsDead": 0,
      "rowcolor": "pink",
      "Qutationno": "IISPL/QUOTE/24-25/00440",
      "ProjectID1": 63,
      "itemid": 997331,
      "itemname": "ManDays",
      "NetAmt": 9760.00000,
      "gstamount": 5760.00000,
      "rate": 4000.00000,
      "DiscountAmt1": 0,
      "igstper1": 18.000,
      "VendorName": "KOS DIAGNOSTICS, AMBALA",
      "Address": "8RRV+P4G, Nicholson Road, Punjabi Mohalla, Sadar Bazar, Ambala Cantt, Haryana 133005 Select",
      "VednorStateGstnno": "N/A"
    },
    {
      "converttosale": 1,
      "qty": 1.000,
      "discountamt": 0,
      "igstper": 18.000,
      "filename": "",
      "remark": "ESR",
      "totalamount": 13275.00000000,
      "projectid": 21,
      "toemail": "maharishicharak@gmail.com",
      "ccmail": "maharishicharak@gmail.com",
      "EntryDateFrom": "13-Aug-2024",
      "EntryDateTo": "20-Aug-2024",
      "ApprovalStatus": 2,
      "IsDead": 0,
      "rowcolor": "yellow",
      "Qutationno": "IISPL/QUOTE/24-25/00439",
      "ProjectID1": 21,
      "itemid": 997331,
      "itemname": "Machine Interfacing - Uni",
      "NetAmt": 13275.00000,
      "gstamount": 2025.00000,
      "rate": 11250.00000,
      "DiscountAmt1": 0,
      "igstper1": 18.000,
      "VendorName": "CHARAK MEDICAL CENTRE, DELHI",
      "Address": "F-36A, ARYA SAMAJ MANDIR MARG, MANSAROVER GARDEN, New Delhi, Delhi 110015 Select",
      "VednorStateGstnno": "N/A"
    }
  ]
  
  
 const QuoationPayload={
    Project:''
 }
 const dummyTableData = [
    {
      SNo: 1,
      Services: "Service 1",
      SAC: "9987",
      Rate: 100,
      QTY: 2,
      Discount: 0,
      IGST: 0,
      CGST: 9,
      SGST: 9,
      TotalGSTPercent: 18,
      TotalGST: 36,
      NetAmt: 136,
      Remark: "",
    },
    {
      SNo: 2,
      Services: "Service 2",
      SAC: "9986",
      Rate: 200,
      QTY: 1,
      Discount: 10,
      IGST: 0,
      CGST: 9,
      SGST: 9,
      TotalGSTPercent: 18,
      TotalGST: 32.4,
      NetAmt: 222.4,
      Remark: "",
    },
  ];
  const dummyTermsData = [
    { Terms: "Term 1: Payment within 30 days" },
    { Terms: "Term 2: Goods to be delivered by end of the month" },
    // Add more terms as needed
  ];
  const statusLabels = [
    { status: "1", label: "Created", colorClass: "bisque" },
    { status: "2", label: "Checked", colorClass: "pink" },
    { status: "3", label: "Approved", colorClass: "lightgreen" },
    { status: "4", label: "ConverToSales", colorClass: "yellow" },
    { status: "6", label: "Dead", colorClass: "#E2680A" },
    { status: "6", label: "RequestSend", colorClass: "#00cc99" },
    { status: "6", label: "Failes", colorClass: "orange" },
    { status: "6", label: "MailSend", colorClass: "green" },

  ];
  
  
const QuotationMaster=()=>{
    const [activeIndex, setActiveIndex] = useState(0);
    const toast = useRef(null);
    const items = [
        {
            label: 'Create/Select Project',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'First Step', detail: event.item.label });
            }
        },
        {
            label: 'Select Shipping Address',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Second Step', detail: event.item.label });
            }
        },
        {
            label: 'Add Items',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Third Step', detail: event.item.label });
            }
        },
        {
            label: 'Add Terms&Conditions',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Third Step', detail: event.item.label });
            }
        },
        
        {
            label: 'QuotationSaved',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Last Step', detail: event.item.label });
            }
        }
    ];
    const { VITE_DATE_FORMAT } = import.meta.env;
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [showaddressModal, setShowaddressModal] = useState(false);
  const [showbillname, setShowbillname] = useState(false);
 
  // Function to handle opening the modal for adding a new project
  const handleNewProjectModal = () => {
    setShowNewProjectModal(true);
  };
  const handleCloseProjectModal = () => setShowNewProjectModal(false);
  
  const handleSaveProject = (projectName, addresses, billNames) => {
    // Handle saving the new project with the entered data
    console.log('Project Name:', projectName);
    console.log('Addresses:', addresses);
    console.log('Bill Names:', billNames);
    setShowNewProjectModal(false);
  };
  const handleAddBillName=()=>{
    setShowbillname(true)
  }
  const handleAddShippingAddress=()=>{
    setShowaddressModal(true)
  }

 
    const [filter,setFilter]=useState(false)
    const [itemsearch,setItemseacrh]=useState({})
    const handleReactSelect = (name, value) => {
        setFieldValue(name, value);
      };
      const { handleChange, values, setFieldValue, handleSubmit } = useFormik({
        initialValues: QuoationPayload,
        onSubmit: async (values, { resetForm }) => {
          
        },
      });
      const handleAutocompleteChange=()=>{

      }
      const handleTermSelect=()=>{

      }
return(
  
   <> 
    { !filter && 
    <> 
     <ShippingAddressModal show={showaddressModal}
     handleClose={()=>{
        setShowaddressModal(false)
     }} handleSave={()=>{
        setShowaddressModal(false)
     }}/>
     <ProjectModal
        show={showNewProjectModal}
        handleClose={handleCloseProjectModal}
        handleSave={handleSaveProject}
      />
      <Billname show={showbillname}
      handleClose={()=>{
        setShowbillname(false)
      }} handleSave={()=>{setShowbillname(false)}}/>
       
     <div  className="card item_detail border">
     
        <Heading title={"Save Quotation"}/>
        <div className="row d-4 m-2">
        <Toast ref={toast} />
        <Steps
                model={items} 
                activeIndex={activeIndex} 
                onSelect={(e) => setActiveIndex(e.index)} 
                readOnly={false} 
                style={{ width: '100%' }}  // Full width stepper
            />
            </div>
        
     </div>
     <div className="card">
     <Heading title={"Supplier and Location Details"}/>
     <div className="row g-4 m-2">
  {/* Project Dropdown with Edit and Add Icons */}
  <div className="col-xl-2 col-md-4 col-sm-6 col-12 d-flex align-items-center">
    <ReactSelect
      placeholderName={"Project"}
      id={"Project"}
      name={"Project"}
      searchable={true}
      respclass="flex-grow-1"
      value={values?.Project}
      dynamicOptions={[{ label: 'Dummyproj', value: '' }]}
      handleChange={handleReactSelect}
    />
    <div className="ml-2 d-flex">
      <i
        className="pi pi-pencil mr-1"
        style={{ cursor: 'pointer' }}
        onClick={handleNewProjectModal}
      />
      <i
        className="pi pi-plus"
        style={{ cursor: 'pointer' }}
        onClick={handleNewProjectModal}
      />
    </div>
  </div>

  {/* Shipping Address Text Area with Edit and Add Icons */}
  <div className="col-xl-2 col-md-4 col-sm-6 col-12 d-flex align-items-center">
    <textarea
      className="form-control flex-grow-1"
      id="ShippingAddress"
      name="ShippingAddress"
      onChange={handleChange}
      value={values?.ShippingAddress}
      placeholder="Enter Shipping Address"
      rows="3"
    />
    <div className="ml-2 d-flex flex-column">
      <i
        className="pi pi-pencil mb-1"
        style={{ cursor: 'pointer' }}
        onClick={handleAddShippingAddress}
      />
      
    </div>
  </div>

  {/* Bill Name Input with Edit and Add Icons */}
  <div className="col-xl-2 col-md-4 col-sm-6 col-12 d-flex align-items-center">
    <Input
      type="text"
      className="form-control flex-grow-1"
      id="BillName"
      name="BillName"
      onChange={handleChange}
      value={values?.BillName}
      respclass="col-12"
      lable={"Bill Name"}
    />
    <div className="ml-2 d-flex flex-column">
      <i
        className="pi pi-pencil mb-1"
        style={{ cursor: 'pointer' }}
        onClick={handleAddBillName}
      />
      
    </div>
  </div>

  {/* From Date Picker */}
  <div className="col-xl-2 col-md-3 col-sm-4 col-12">
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
      lable={"From Date"}
      placeholder={VITE_DATE_FORMAT}
      respclass="col-12"
    />
  </div>

  {/* To Date Picker */}
  <div className="col-xl-2 col-md-3 col-sm-4 col-12">
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
      lable={"To Date"}
      placeholder={VITE_DATE_FORMAT}
      respclass="col-12"
    />
  </div>

  {/* PO Number Input */}
  <div className="col-xl-2 col-md-3 col-sm-4 col-12">
    <Input
      type="text"
      className="form-control"
      id="PONumber"
      name="PONumber"
      onChange={handleChange}
      value={values?.PONumber}
      respclass="col-12"
      lable={"PO No."}
    />
  </div>
</div>

     </div>
     

      
{/* 
      <div className="card item_detail border">
  <Heading title={"Item Detail"} />
  <div className="row g-4 m-2">
    
    <AutoComplete
      placeholder={"Search Item"}
      id={"ServiceSearch"}
      name={"ServiceSearch"}
      handleChange={handleAutocompleteChange}
      value={itemsearch}
      className="col-xl-4 col-md-6 col-sm-12 col-12"
      style={{marginBottom:'5px'}}
    />
   
    

    <Tables
      thead={[
        "S.No.",
        "Services",
        "SAC",
        "Rate",
        "QTY",
        "Discount %",
        "IGST %",
        "CGST %",
        "SGST %",
        "Total GST %",
        "Total GST",
        "NetAmt",
        "Remark",
        "#",
      ]}
      tbody={dummyTableData?.map((row, index) => {
        const totalGST = ((row.Rate * row.QTY * 18) / 100).toFixed(2);
        const netAmount = (
          parseFloat(totalGST) +
          parseFloat(row.Rate * row.QTY)
        ).toFixed(2);

        return {
          "S.No.": index + 1,
          Services: row.Services,
          SAC: row.SAC,
          Rate: (
            <input
              type="number"
              value={row.Rate}
              onChange={(e) => handleRateChange(e, index)}
            />
          ),
          QTY: (
            <input
              type="number"
              value={row.QTY}
              onChange={(e) => handleQtyChange(e, index)}
            />
          ),
          "Discount %": row.Discount,
          "IGST %": 9,
          "CGST %": 9,
          "SGST %": 0,
          "Total GST %": 18,
          "Total GST": totalGST,
          NetAmt: netAmount,
          Remark: (
            <input
              type="text"
              value={row.Remark}
              onChange={(e) => handleRemarkChange(e, index)}
            />
          ),
          "#": (
            <i
              className="fa fa-trash text-danger"
              aria-hidden="true"
              onClick={() => handleDeleteRow(index)}
            />
          ),
        };
      })}
      style={{
        maxHeight: "185px",
        overflowY: "auto",
      }}
    />
  </div>
</div>
<div className="card terms_conditions border">
  <Heading title={"Terms and Conditions"} />
  <div className="row g-4 m-2">
    <ReactSelect
      placeholderName={"Select Term"}
      id={"TermSelect"}
      name={"TermSelect"}
      searchable={true}
      respclass="col-xl-4 col-md-6 col-sm-12 col-12"
      value={values?.SelectTerm}
      dynamicOptions={[{ label: "Term 1", value: "Term 1" }, { label: "Term 2", value: "Term 2" }]}
      handleChange={handleTermSelect}
    />

    <Tables
      thead={["S.No.", "Terms", "#"]}
      tbody={dummyTermsData?.map((row, index) => {
        return {
          "S.No.": index + 1,
          Terms: row.Terms,
          "#": (
            <i
              className="fa fa-trash text-danger"
              aria-hidden="true"
              onClick={() => handleDeleteTerm(index)}
            />
          ),
        };
      })}
      style={{
        maxHeight: "185px",
        overflowY: "auto",
      }}
    />
  </div>
</div> */}
<div className=" card patient_registration border">
   <div className="row g-4 m-2">
   <button type="button" className="btn btn-primary">
    Save
  </button>
  <button type="button" style={{marginLeft:'5px'}} className="btn btn-secondary">
    Reset
  </button>
  <a onClick ={()=>{
    setFilter(true)
  }}className="btn btn-link">
    Back to List
  </a>
    </div> 
  
</div> </> }

{filter && <div
        className="card patient_registration border"
        
      >
        <Heading title={"SearchQuotations"} />
        <div className="row  g-4 m-2">
       <Input
            type="text"
            className="form-control"
            id="SearchValue"
            name="PO No"
            onChange={handleChange}
            value={values?.PONO}
            
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            lable={"PO No"}
          />
          <ReactSelect
            placeholderName={"Project"}
            id={"Project"}
            name={"Project"}
            searchable={true}
            
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.SearchType}
            dynamicOptions={SEARCHBY}
            handleChange={handleReactSelect}
          />
          <ReactSelect
            placeholderName={"Item"}
            id={"Itemt"}
            name={"Item"}
            searchable={true}
            
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.SearchType}
            dynamicOptions={SEARCHBY}
            handleChange={handleReactSelect}
          />
          <ReactSelect
            placeholderName={"Vertical"}
            id={"Vertical"}
            name={"Vertical"}
            searchable={true}
            
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.SearchType}
            dynamicOptions={SEARCHBY}
            handleChange={handleReactSelect}
          />
           <ReactSelect
            placeholderName={"Team"}
            id={"Team"}
            name={"Team"}
            searchable={true}
            
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.SearchType}
            dynamicOptions={SEARCHBY}
            handleChange={handleReactSelect}
          />
          <ReactSelect
            placeholderName={"Wing"}
            id={"Wing"}
            name={"Wing"}
            searchable={true}
            
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.SearchType}
            dynamicOptions={SEARCHBY}
            handleChange={handleReactSelect}
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
            placeholderName={"Status"}
            id={"Status"}
            name={"Status"}
            searchable={true}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.status}
            dynamicOptions={[{}]}
            handleChange={handleReactSelect}
          />
          <div className="col-xl-2 col-md-4 col-sm-6 col-12">
            <button className="btn btn-sm btn-info" onClick={handleSubmit}>
              {"Search"}
            </button>
            <a onClick ={()=>{
    setFilter(false)
  }}className="btn btn-link">
    Save Quotation 
  </a>
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
        <QuotationTable THEAD={THEAD} tbody={TBODY}/>
        </div>
}
    </> 
)
}

export default QuotationMaster;