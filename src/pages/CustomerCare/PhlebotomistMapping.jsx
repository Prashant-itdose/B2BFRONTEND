import React, { useEffect, useState } from "react";
import DatePicker from "../../components/formComponent/DatePicker";
import Heading from "../../components/UI/Heading";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Input from "../../components/formComponent/Input";
import Tables from "../../components/UI/customTable";


const PhlebotomistMapping = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  
  const [formData,setFormdata]=useState({
   Zone:'',
   State:'',
   City:'',
   Location:'',
   Type:''
  })
  const [bodyData, setBodyData] = useState({ ReceiptDetailnew: [] });
 const [Panels,setPanels]=useState([]);
 const [Centers,setCenters]=useState([])
  const THEAD = [
   "Sr. No.",
   "Zone",
    "State",
    "City",
    "Location",
];

  const SearchBillPrintAPI = async (page = 0, pageSize = 25) => {
    
   
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
    setFormdata({...formData,[name]:value})
  };

  const handleCustomSelect = (index, name, value) => {
    const updatedData = bodyData.ReceiptDetailnew?.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFieldValue({ ...bodyData, ReceiptDetailnew: updatedData });
    console.log(updatedData);
  };
 
  useEffect(()=>{
  
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
 console.log(formData)

  return (
    <>
      <div
        className="card patient_registration border"
        
      >
        <Heading
          title={"LocationMaster"}
          isBreadcrumb={true}
        />
        <div className="row  g-4 m-2">
        


<ReactSelect
 placeholderName={"Zone"}
 id={"Zone"}
 name={"Zone"}
 respclass="col-xl-2 col-md-4 col-sm-6 col-12"
  // Default selection
 value={formData.Zone} // This should be an object like { label: "Ledger Transaction", value: 1 }
 dynamicOptions={[
   { label: "North", value: 1 },
   { label: "South", value: 2 },
   { label: "East", value: 3 },
   {
    label:'West',value:4
   }
 ]}
 handleChange={handleReactSelect} // Passes the selected option to the handler
/> 
<ReactSelect
 placeholderName={"State"}
 id={"State"}
 name={"State"}
 respclass="col-xl-2 col-md-4 col-sm-6 col-12"
  // Default selection
 value={formData.State} // This should be an object like { label: "Ledger Transaction", value: 1 }
 dynamicOptions={[
   { label: "Delhi", value: 1 },
   { label: "UP", value: 2 },
   { label: "Bihar", value: 3 },
   {
    label:'West',value:4
   }
 ]}
 handleChange={handleReactSelect} // Passes the selected option to the handler
/> 
<ReactSelect
 placeholderName={"City"}
 id={"City"}
 name={"City"}
 respclass="col-xl-2 col-md-4 col-sm-6 col-12"
  // Default selection
 value={formData.City} // This should be an object like { label: "Ledger Transaction", value: 1 }
 dynamicOptions={[
   { label: "NewDelhi", value: 1 },
   { label: "SouthDelhi", value: 2 },
   { label: "WestDelhi", value: 3 },
   {
    label:'Burari',value:4
   }
 ]}
 handleChange={handleReactSelect} // Passes the selected option to the handler
/> 
<div className="col-2">
<button className="btn btn-sm btn-info" onClick={handleSubmit}>
              Search
            </button>
</div>





     
        </div>
      </div>
      <div className="card patient_registration_card my-1 mt-2">
       <CollectionLocationTable />
        
      </div>
    
    </>
  );
};

export default PhlebotomistMapping

const CollectionLocationTable = () => {
    const [rows, setRows] = useState([
        { City: 'Nehru Place',Area:'GovindPuri' ,Pincode: '110046',Route:'',Phlebo:'',DropLocation:'' }
    ]);
  
    // TimeSlot dropdown options
    const timeSlotOptions = [
      { label: 'Morning', value: 'morning' },
      { label: 'Afternoon', value: 'afternoon' },
      { label: 'Evening', value: 'evening' }
    ];
  
    // Add a new row
    const handleAddRow = () => {
      setRows([
        ...rows,
        { City: 'Nehru Place',Area:'GovindPuri' ,Pincode: '110046',Route:'',Phlebo:'',DropLocation:'' }
      ]);
    };
  
    // Remove a row
    const handleRemoveRow = (index) => {
      const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
      setRows(updatedRows);
    };
  
    // Handle input changes
    const handleInputChange = (e, index, field) => {
      const updatedRows = [...rows];
      updatedRows[index][field] = e.target.value;
      setRows(updatedRows);
    };
  
    // Handle TimeSlot dropdown change
    const handleSelectChange = (e, index) => {
      const updatedRows = [...rows];
      updatedRows[index].timeSlot = e.value;
      setRows(updatedRows);
    };
  
    // Table header data
    const thead = [
      { name: "S.No" },
      { name: "City" },
      { name: "Area" },
      { name: "Pincode" },
      { name: "Route" },
      { name: "Phlebo" },
      { name: "DropLocation" },
      
    ];
  
    // Table body data mapped to match the structure required by Tables component
    const tbody = rows?.map((row, index) => ({
      'S.No':index+1,
      City:row.City,
      Area:row.Area,
      Pincode:row.Pincode,
      "Route": (
        <ReactSelect
          type="time"
          value={row.startTime}
          onChange={(e) => handleInputChange(e, index, "startTime")}
        />
      ),
      "Phlebo": (
        <ReactSelect
          type="time"
          value={row.closeTime}
          onChange={(e) => handleInputChange(e, index, "closeTime")}
        />
      ),
      "DropLocation": (
        <ReactSelect
          value={row.avgTime}
          onChange={(e) => handleInputChange(e, index, "avgTime")}
          placeholder="Average Time"
          lable={"Time"}
        />
      ),
      
    }));
  
    return (
      <>
        <Tables
          thead={thead}
          tbody={tbody}
          tableHeight="tableHeight"
        />
      </>
    );
  };

