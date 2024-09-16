import React, { useEffect, useRef, useState } from "react";


import { useTranslation } from "react-i18next";
import { Button } from 'primereact/button';
import { FaUpload, FaEye } from 'react-icons/fa';


import moment from "moment/moment";

import Input from "../../components/formComponent/Input";

import Heading from "../../components/UI/Heading";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { SearchPatient } from "../../networkServices/opdserviceAPI";
import {
  autocompleteOnBlur,
  emptyformData,
  fillFormWithData,
} from "../../utils/helperfunctions";
import DoctorInput from "../../components/formComponent/DoctorInput";
import { useLocation } from "react-router-dom";
import { AutoComplete } from "primereact/autocomplete";
import Tables from "../../components/UI/customTable";
import ViewModal from "./ViewModal";
import AttachmentModal from "./AttachmentModal";

const THEAD = [
  "Sr. No.",
  "VisitID",
  
  "Barcode No.",
  "PatientName",
  
  "Age/Gender",
  "TestName",
  "RegistrationDate",
];
export default function PatientSearch() {
  const [cameraStream, setCameraStream] = useState(null);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const [view,setView]=useState(null)
  const [LTNo, setLTNO] = useState("");
  const [preview, setPreview] = useState(null);
  const location = useLocation();
  const [patientdetails,setpatientdetails]=useState({details:[],doctdata:[]})
  const [formData, setformData] = useState({
    PatientID: "",
    LedgertransactionID: "",
    LedgertransactionNo: "",
    Mobile: "",
    Title: "",
    PName: "",
    Gender: "",
    years: "",
    months: "",
    days: "",
    Doctor: "",
    Address: "",
    Email: "",
    Phone: "",
    DateOfBirth: "",
    Doctor_ID: "",
    DoctorName: "",
    Panel_ID: "",
    PanelName: "",
    Discount: 0,
  });
  const [details,setDetails]=useState({})
  const [isuploadDocOpen, setIsuploadDocOpen] = useState(false);
  const [isViewdocopen,setViewdocopen]=useState(false)


  const { handleChange, values, setValues, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: formData,
      onSubmit: async (values, { resetForm }) => {
        SearchBillPrintAPI();
      },
    });

  const handleGenderChange = (selectedOption) => {
    console.log(selectedOption);
    handleReactSelect(selectedOption);
    const filtered = titleOptions.filter(
      (option) => option.gender === selectedOption.label
    );
    setFilteredTitles(filtered);
    handleReactSelect({ target: { name: "Title", value: null } });
  };

  const handleReactSelect = (name, value) => {
    setFieldValue(name, value);
  };

  const handleSearch = async () => {
    if (LTNo.length > 0) {
      const formData = new FormData();
      formData.append("VisitID", LTNo);
      formData.append("SessionEmployeeID", localStorage.getItem("employeeId"));
      formData.append(
        "SessionCentreID",
        localStorage.getItem("CentreId") ? localStorage.getItem("CentreId") : 1
      );
      

      try {
        const dataResponse = await SearchPatient(formData);
        console.log(dataResponse);
        if (dataResponse.data.status == true) {
          setpatientdetails({
            details:dataResponse.data.data,
            doctdata:dataResponse.data.data_document
          })
        }else {
          toast.error(dataResponse.data.message)
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Enter Lab No.");
    }
  };
  const handleSearchnav = async (labno) => {
    const formData = new FormData();
    setLTNO(labno)
    formData.append("LedgertransactionNo", labno);
    formData.append("SessionEmployeeID", localStorage.getItem("employeeId"));
    formData.append(
      "SessionCentreID",
      localStorage.getItem("CentreId") ? localStorage.getItem("CentreId") : 1
    );
    formData.append("SessonPanelID", localStorage.getItem("panelID"));

    try {
      const dataResponse = await SearchInfo(formData);
      console.log(dataResponse);
      if (dataResponse.data.status == true) {
        fillFormWithData(dataResponse.data.data[0], setFieldValue);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSelectChange = (selectedOption, { name }) => {
    console.log(selectedOption);
    setformData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value,
    }));
  };
  const getAgeByDateOfBirth = (e, handleChange) => {
    const dob = moment(e.target.value);
    const now = moment();
    const years = now.diff(dob, "years");
    dob.add(years, "years");
    const months = now.diff(dob, "months");
    dob.add(months, "months");
    const days = now.diff(dob, "days");

    handleChange({ target: { name: "years", value: years } });
    handleChange({ target: { name: "months", value: months } });
    handleChange({ target: { name: "days", value: days } });

    handleChange(e);
  };
  const changedobbyage = (years, months, days) => {
    const dob = moment()
      .subtract(years, "years")
      .subtract(months, "months")
      .subtract(days, "days");
    console.log(dob);
    handleChange({
      target: { name: "DateOfBirth", value: dob.format("YYYY-MM-DD") },
    });
  };


  const extractAgeComponents = (ageString) => {
    const match = ageString.match(/(\d+)\s*Y\s*(\d+)\s*M\s*(\d+)\s*D/);
    if (match) {
      return {
        years: match[1],
        months: match[2],
        days: match[3],
      };
    }
    return {
      years: "",
      months: "",
      days: "",
    };
  };
  const validateForm = (values) => {
    const errors = {};
    if (!values.PName) {
      errors.PName = "Patient Name is required";
    }

    if (!values.Gender) {
      errors.Gender = "Gender is required";
    }
    if (values.Mobile.length > 0) {
      if (!/^\d{10}$/.test(values.Mobile)) {
        errors.Mobile = "Mobile number must be exactly 10 digits";
      }
    }
    if (values.Email.length > 0) {
      if (!/\S+@\S+\.\S+/.test(values.Email)) {
        errors.Email = "Invalid email address";
      }
    }
    return errors;
  };

 

 

 

  


  // Handle AutoComplete's search method

  const openWebcam = async () => {
    try {
      // Check if mediaDevices and getUserMedia are available
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const constraints = {
          video: {
            facingMode: 'environment' // Use back camera if available
          }
        };
  
        // Request access to the camera
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
  
        // Create a video element to display the camera feed
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.zIndex = '9999'; // Ensure video is on top
  
        // Append the video element to the body
        document.body.appendChild(video);
      } else {
        console.error('getUserMedia is not supported by your browser.');
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };
  const handleImageChange = (e) => {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];
  closeCameraStream();
  reader.onloadend = () => {
    // setImage(file);
    setPreview(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};
const closeCameraStream = () => {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    setCameraStream(null);
  }
};

  return (
    <>
    {isuploadDocOpen && (
        <AttachmentModal
          isuploadOpen={isuploadDocOpen}
          setIsuploadOpen={setIsuploadDocOpen}
          preview={preview}
          modelHeader={"Upload Patient Document"}
          setPreview={setPreview}
          details={details}
          view={view}
          setView={setView}
          handleSearch={handleSearch}
        />
      )}
      {isViewdocopen && (
        <ViewModal
          isuploadOpen={isViewdocopen}
          setIsuploadOpen={setViewdocopen}
          preview={preview}
          modelHeader={"View Patient Documents"}
          setPreview={setPreview}
          details={details}
          view={view}
          setView={setView}
          handleSearch={handleSearch}
        />
      )}
  
      
      <div className="m-2 spatient_registration_card">
      <Heading title={"Edit Info"} isBreadcrumb={true} />
        <div className="card patient_registration">
          
          <div className="row pt-2 pl-2 pr-2">
            <div className="col-md-12 col-sm-12 ">
            <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1 g-2">
  <div className="col-xl-2.5 col-md-3 col-sm-6 col-12 position-relative">
    <Input
      type="text"
      className="form-control required-fields"
      id="LabNo"
      name="LabNo"
      value={LTNo}
      lable={t("VisitID/Barcode No.")}
      placeholder=" "
      respclass="w-100"
      onChange={(e) => setLTNO(e.target.value)}
    />
    <i
      className="pi pi-barcode"
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
      onClick={openWebcam} // Function to open the webcam
      title="Scan Barcode" // Tooltip added here
    />
  </div>

  <div className="col-12 d-flex gap-2">
    <button className="btn btn-sm btn-info" onClick={handleSearch}>
      {"Search"}
    </button>
    
  </div>
</div>
</div>
          </div>
          <div className="card patient_registration_card my-1 mt-2">
          <Tables
        thead={THEAD}
        tbody = {patientdetails?.details?.map((ele, index) => ({
            "Sr. No.": index + 1,
            "Visit ID": (
              <div className="d-flex align-items-center">
                <span>{ele?.LedgerTransactionNo}</span>
                <Button
                  icon={<FaUpload />}
                  className="p-button-text"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#007ad9', // Adjust color as needed
                    border: 'none'
                  }}
                  onClick={() =>{ setDetails(ele)
                     setIsuploadDocOpen(true)
                     setView(false);}
                    }
                     
                  title="Upload Document"
                />
                {patientdetails?.doctdata.length > 0 && (
                  <Button
                    icon={<FaEye />}
                    className="p-button-text"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#007ad9', // Adjust color as needed
                      border: 'none'
                    }}
                    onClick={() =>{ setDetails(patientdetails?.doctdata)
                      setView(true);
                      setViewdocopen(true)}}
                    title="View Documents"
                  />
                )}
              </div>
            ),
            "Barcode No.": ele?.BarcodeNo,
            "Patient Name": ele?.PName,
            "Age/Gender": `${ele?.Age}/${ele?.Gender}`,
            "Test Name": ele?.InvestigationName,
            "Registration Date": ele?.RegDate,
        }))}
        tableHeight={"tableHeight"}
      />
          </div>
        </div>
      </div>
    </>
  );
}


