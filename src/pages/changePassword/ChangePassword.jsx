import React, { useState } from "react";

import axios from "axios";
import Heading from "../../components/UI/Heading";
import Input from "@app/components/formComponent/Input";
import { toast } from "react-toastify";
import { apiUrls } from "../../networkServices/apiEndpoints";
import {Changepasswordreq } from "../../networkServices/opdserviceAPI";


const ChangePassword = () => {

  const [formData,setFormdata]=useState({
    oldpassword:'',
    newpassword:'',
    confirmpassword:''
  })

  

  const setIsOpen = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }));
  };
  const convertToFormData = (obj) => {
    const formData = new FormData();
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(`Appending ${key}: ${obj[key]}`);
        formData.append(key, obj[key]);
      }
    }
  
    // Debug: Log FormData entries
    console.log('FormData entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    return formData;
  }

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit=async()=>{
      if(formData?.oldpassword.trim().length>0!=""&&(formData?.newpassword==formData?.confirmpassword))
      {
        const data={...formData,SessionEmployeeID:localStorage?.getItem('employeeId')}
      const FormData=convertToFormData(data)
      try {
        const dataResponse = await Changepasswordreq(FormData);
         console.log(dataResponse)
      } catch (error) {
        console.error(error);
      }
      }
      else {
        if(formData?.newpassword!=formData?.confirmpassword)
        {
            toast.error('Passwords dont match')
        }
        else {
            toast.error('Fill all details')
        }
      }
      
      // await dispatch(signInAction(values));
 
  }
  return (
    <>
      
      
        <div className="card patient_registration">
          <Heading
            title={"Change Password"}
            isBreadcrumb={true}
          />
          <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1 p-2">
            {/* <DatePicker
              className="custom-calendar"
              id="DOB"
              name="fromDate"
              lable={"From Date"}
              placeholder={VITE_DATE_FORMAT}
              respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
            />
            <DatePicker
              className="custom-calendar"
              id="DOB"
              name="toDate"
              lable={"To Date"}
              placeholder={VITE_DATE_FORMAT}
              respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
            /> 
            <ReactSelect
              placeholderName={t("FrontOffice.OPD.Confirmation.label.Status")}
              id={"Status"}
              searchable={true}
              respclass="col-xl-2 col-md-4 col-sm-4 col-sm-4 col-12"
              dynamicOptions={typeStatus?.map((item) => {
                return {
                  label: item?.label,
                  value: item?.value,
                };
              })}
              name={"status"}
            />*/}
            <Input
              type="text"
              className="form-control "
              id="UHID"
              name="UHID"
              lable={"User"}
              value={localStorage.getItem('employeeName')}
              placeholder=" "
              required={true}
              respclass="col-xl-2 col-md-2 col-sm-6 col-12"
              disabled={true}
              onChange={handleChange}
            />
            <Input
              type="text"
              className="form-control required-fields"
              id="IPDNO"
              name="oldpassword"
              lable={"Old Password"}
              placeholder=" "
              value={formData?.oldpassword}
              required={true}
              respclass="col-xl-2 col-md-2 col-sm-6 col-12"
              onChange={handleChange}
            />
            <Input
              type="text"
              className="form-control required-fields"
              id="PatientName"
              name="newpassword"
              lable={"New Password"}
              placeholder=" "
              value={formData?.newpassword}
              required={true}
              respclass="col-xl-2 col-md-2 col-sm-6 col-12"
              onChange={handleChange}
            />
            <Input
              type="text"
              className="form-control required-fields"
              id="BillNo"
              value={formData?.confirmpassword}
              name="confirmpassword"
              lable={"Confirm Password"}
              placeholder=" "
              required={true}
              respclass="col-xl-2 col-md-2 col-sm-6 col-12"
              onChange={handleChange}
            />
             <div className=" col-sm-2 col-xl-2">
              <button className="btn btn-sm btn-success" onClick={handleSubmit}>
                {"Change Password"}
              </button>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default ChangePassword;