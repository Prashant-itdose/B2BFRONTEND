import { useFormik } from "formik";
import React, { useState } from "react";
import Input from "../formComponent/Input";
import { SaveDoctorInfo } from "../../networkServices/opdserviceAPI";
import { toast } from "react-toastify";
import { inputBoxValidation } from "../../utils/utils";
import { MOBILE_NUMBER_VALIDATION_REGX } from "../../utils/constant";

const DoctoModal = ({ close,setFormValue }) => {
    const [formData, setFormData] = useState({
      Mobile: "",
      PName: "",
      Address: "",
      Email: "",
    });
    console.log(close)
  
    const [errors, setErrors] = useState({});
    const validateForm = (values) => {
        const errors = {};
        if (!values.PName) {
          errors.PName = "Patient Name is required";
        }
        if (!values.Mobile) {
            errors.Mobile = "Mobile is required";
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
    const handleSave = async () => {
        const err=validateForm(values)
        if (Object.keys(err).length > 0) {
            setErrors(err);
            return;
          }
      const form = new FormData();
      form.append("ID", localStorage.getItem("employeeId"));
      form.append("LoginName", localStorage.getItem("employeeName"));
      form.append(
        "SessionCentreID",
        localStorage.getItem("cetreId") ? localStorage.getItem("cetreId") : "2"
      );
      form.append("DoctorName", values?.PName);
      form.append("Address", values?.Address);
      form.append("Mobile", values?.Mobile);
      form.append("Email", values?.Email);
  
      try {
        const dataResponse = await SaveDoctorInfo(form);
        console.log(dataResponse);
        if (dataResponse.data.status === true) {
          setErrors({});
          setFormValue("DoctorName",dataResponse.data?.DoctorName );
    setFormValue("Doctor_ID", dataResponse.data?.OtherDoctorID);
          toast.success('Doctor Created Successfully');
          close(); // Close the modal
        } else {
          toast.error(dataResponse.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const { handleChange, values, setValues, setFieldValue, handleSubmit } =
      useFormik({
        initialValues: formData,
        onSubmit: async (values, { resetForm }) => {
          // SearchBillPrintAPI();
        },
      });
  
    return (
      <div className="row pt-2 pl-2 pr-2">
        <div className="col-md-12 col-sm-12">
          <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1">
            <Input
              type="text"
              className="form-control required-fields"
              id="First"
              name="PName"
              value={values?.PName}
              onChange={handleChange}
              lable={"Name"}
              placeholder=" "
              error={errors?.PName ? errors?.PName : ""}
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
            />
            <div className= "d-flex">
              <Input
                type="number"
                className="form-control w-100 required-fields"
                id="Mobile"
                name="Mobile"
                value={values?.Mobile}
                onChange={(e) => {
                  inputBoxValidation(
                    MOBILE_NUMBER_VALIDATION_REGX,
                    e,
                    handleChange
                  );
                }}
                
                lable={"Mobile_No"}
                placeholder=" "
               
                 respclass="col-11"
                maxLength={10}
                //tabIndex="1"
              /> 
             <button
        className="col-1 p-0 m-0 d-flex align-items-center justify-content-center"
        style={{
          height: "23.5px",
          border: "none",
          
          cursor: "default",
          color: "white",
          width: "40px", // Adjust size as needed
          fontSize: "14px",
        }}
        disabled
      >
        {10 - (values?.Mobile?.toString().length || 0)}
      </button>
              </div>
            <Input
              type="text"
              className="form-control"
              id="Email"
              name="Email"
              value={values?.Email}
              onChange={handleChange}
              lable={"Email"}
              placeholder=" "
              error={errors?.Email ? errors?.Email : ""}
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
            />
            <Input
              type="text"
              className="form-control"
              id="Local_Address"
              name="Address"
              value={values?.Address}
              onChange={handleChange}
              lable={"Address"}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
            />
            <div className="col-1">
              <button className="button" type="submit" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DoctoModal;
  