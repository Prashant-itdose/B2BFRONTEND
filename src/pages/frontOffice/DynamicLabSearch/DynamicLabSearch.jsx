import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Heading from "../../../components/UI/Heading";
import Input from "@app/components/formComponent/Input";
import InvoiceReprintTable from '../../../components/UI/customTable/ReprintTable/InvoiceReprintTable';
import DynamicLabSearchTable from '../../../components/UI/customTable/LabSearchTables/DynamicLabSearchTable';
import { headers } from '../../../utils/apiCalls';
import { toast } from 'react-toastify';
import { apiUrls } from '../../../networkServices/apiEndpoints';
 // Ensure this is the correct import

const DynamicLabSearch = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const location = useLocation();
  const [Sample, setSample] = useState('');
  const [bodyData, setBodyData] = useState([]);

  // Extract data from location state
  useEffect(() => {
    if (location.state) {
      setSample(location.state.sample);
      setBodyData(location.state.data);
    }
  }, [location.state]);

  const THEAD = [
    "Sr. No.",
    "EntryDateTime",
    "Lab No.",
    "SIN No.",
    "PatientName",
    "Age/Sex",
    "Centre",
    "RateType",
    "Doctor",
    "DoctorMobile",
    "PRO",
    "Department",
    "Investiagtion",
    "Source",
    "View",
    "ClinicalHistory",
     "DocumentUpload",
    "Barcode Reprint",
    "Remarks",
    "Select"
  ];

 

  const statusLabels = [
    { status: '1', label: 'New', colorClass: 'bg-primary' },
    { status: '2', label: 'Sample Col.', colorClass: 'bg-success' },
    { status: '3', label: 'Dept Receive', colorClass: 'bg-secondary' },
    { status: '7', label: 'Tested', colorClass: 'bg-warning' },
    { status: '8', label: 'Approved', colorClass: 'bg-info' },
    { status: '9', label: 'Printed', colorClass: 'bg-primary' },
    { status: '10', label: 'Hold', colorClass: 'bg-dark' },
    { status: '13', label: 'Dispatched', colorClass: 'bg-danger' },
    { status: '13', label: 'Rejected', colorClass: 'bg-danger' }
  ];

  const handleDynamiclabsearch=()=>{
    if(Sample.length>3)
    {
      const form=new FormData();
      form.append('DynamicSearch',Sample)
      form.append('SessionPanelID',localStorage.getItem('PanelId')?localStorage.getItem('PanelId'):''),
      form.append('SessionCentreID',localStorage.getItem('CentreId')?localStorage.getItem('CentreId'):''),
      form.append('SessionEmployeeID',localStorage.getItem('employeeId')?localStorage.getItem('employeeId'):'')
      axios.post(apiUrls?.DynamicSearch, form, {
        headers,
        })
        .then((res) => {

            
          if(res?.data?.status==true)
          {
            setBodyData(res.data.data)
    
          }
          if(res?.data?.status==false)
          {  
            toast.error(res?.data?.message)
            setBodyData([])
          }
          else if(res?.data?.status==false)
            {
              toast.error(res?.data?.message)
            }
         })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
        toast.error('Enter Valid Sample Entry')
    }
    
    

  }
console.log(bodyData)
  return (
    <>
      <div className="card patient_registration border">
        <Heading title={"Dynamic Lab Search"} />
        <div className="row g-4 m-2">
          <Input
            type="text"
            className="form-control required-fields"
            id="LabNo"
            name="LabNo"
            value={Sample}
            lable={"SIN No./Visit ID/Mobile No./UHID No./BiopsyNo"}
            placeholder=" "
            respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
            onChange={(e) => setSample(e.target.value)}
          />
          <div className="col-1">
            <button className="btn btn-sm btn-info" onClick={handleDynamiclabsearch}>
              {"Search"}
            </button>
          </div>
          <div className="col-1">
            <label className="switch">
              <input type="checkbox" id="flexCheckDefault" />
              <span className="slider"></span>
            </label>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Header
            </label>
          </div>
          <div className="col-2">
            <button className="btn btn-sm btn-info" onClick={handleDynamiclabsearch} style={{ margin: '2px' }}>
              {"Print"}
            </button>
            <button className="btn btn-sm btn-info" onClick={handleDynamiclabsearch} style={{ margin: '2px' }}>
              {"Preview"}
            </button>
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            {statusLabels.map(({ status, label, colorClass }) => (
              <div
                key={status}
                className="d-flex align-items-center m-1"
                onClick={() => handleDynamiclabsearch(status)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className={`rounded-circle ${colorClass}`}
                  style={{ width: '10px', height: '10px', marginRight: '3px' }}
                ></div>
                <span className="btn-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card patient_registration_card my-1 mt-2">
        {
            bodyData.length>0 && <DynamicLabSearchTable THEAD={THEAD} tbody={bodyData} />
        }
        
      </div>
    </>
  );
};

export default DynamicLabSearch;
