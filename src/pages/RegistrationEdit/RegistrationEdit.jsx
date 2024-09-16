import React, { useEffect, useRef, useState } from "react";

import LabeledInput from "@app/components/formComponent/LabeledInput";
import { Tabfunctionality } from "../../utils/helpers";
import { useTranslation } from "react-i18next";

import {
  BindCityBystateByDistrict,
  BindDistrictByCountryByState,
  BindStateByCountry,
  ageValidation,
  filterByType,
  filterByTypes,
  inputBoxValidation,
  notify,
} from "../../utils/utils";
import {
  AGE_TYPE,
  BIND_TABLE_OLDPATIENTSEARCH,
  BIND_TABLE_OLDPATIENTSEARCH_REG,
  MOBILE_NUMBER_VALIDATION_REGX,
  PAYMENT_OBJECT,
} from "../../utils/constant";

import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";

import moment from "moment/moment";
import { findAgeByDOB } from "../../networkServices/directPatientReg";
import Input from "../../components/formComponent/Input";
import ReactSelect from "../../components/formComponent/ReactSelect";
import DatePicker from "../../components/formComponent/DatePicker";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import Heading from "../../components/UI/Heading";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  GetDoctorlist,
  SaveInfo,
  SearchInfo,
} from "../../networkServices/opdserviceAPI";
import {
  autocompleteOnBlur,
  emptyformData,
  fillFormWithData,
} from "../../utils/helperfunctions";
import DoctorInput from "../../components/formComponent/DoctorInput";
import { useLocation } from "react-router-dom";
import { AutoComplete } from "primereact/autocomplete";

export default function RegistrationEdit() {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const [LTNo, setLTNO] = useState("");
  const location = useLocation();
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
  const inputRef = useRef(null);
  const [dropFalse, setDropFalse] = useState(false);
  const [indexMatch, setIndexMatch] = useState(0);
  const [errors, seterrors] = useState({});
  const [doctorSuggestion, setDoctorSuggestion] = useState([]);

  const titleOptions = [
    { label: "Mr", value: "Mr.", gender: "Male" },
    { label: "Mrs", value: "Mrs.", gender: "Female" },
    { label: "Miss", value: "Miss.", gender: "Female" },
    { label: "Master", value: "Master", gender: "Male" },
    { label: "Baby", value: "Baby.", gender: "Female" },
    { label: "B/O", value: "B/O.", gender: "UnKnown" },
    { label: "Dr", value: "Dr.", gender: "UnKnown" },
    { label: "Prof", value: "Prof.", gender: "UnKnown" },
    { label: "Madam", value: "Madam.", gender: "Female" },
    { label: "Sister", value: "Sister.", gender: "Female" },
    { label: "Mohd", value: "Mohd.", gender: "Male" },
    { label: "Mx", value: "Mx", gender: "Female" },
    { label: "Transgendr", value: "Transgendr", gender: "Trans" },
    { label: "Ms", value: "Ms.", gender: "Female" },
  ];
  // const handleListSearch = (data, name, Promo) => {
  //     switch (name) {

  //       case "DoctorName":
  //         const doctorName = data.label.split(' # ')[0];
  // setFieldValue('DoctorName', doctorName);
  // setFieldValue('Doctor_ID', data?.value);
  //         setIndexMatch(0);
  //         setDoctorSuggestion([]);
  //         setDropFalse(false);
  //         break;
  //      setIndexMatch(0);
  //         setDoctorSuggestion([]);

  //         break;
  //       default:
  //         break;
  //     }
  //   };
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Trans", value: "Trans" },
  ];
  const handleIndex = (e) => {
    const { name } = e.target;
    switch (name) {
      case "DoctorName":
        switch (e.which) {
          case 38:
            if (indexMatch !== 0) {
              setIndexMatch(indexMatch - 1);
            } else {
              setIndexMatch(doctorSuggestion.length - 1);
            }
            break;
          case 40:
            if (doctorSuggestion.length - 1 === indexMatch) {
              setIndexMatch(0);
            } else {
              setIndexMatch(indexMatch + 1);
            }
            break;
          case 13:
            handleListSearch(doctorSuggestion[indexMatch], name);
            setIndexMatch(0);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };
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
      formData.append("LedgertransactionNo", LTNo);
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
  useEffect(() => {
    console.log(values?.DateOfBirth);
  }, [values?.DateOfBirth]);
  useEffect(() => {
    changedobbyage(values?.years, values?.months, values?.days);
  }, [values?.years, values?.months, values.days]);

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

  const handleSave = async () => {
    const errors = validateForm(values);

    if (Object.keys(errors).length > 0) {
      seterrors(errors);
      return;
    }

    const form = new FormData();
    form.append("LedgertransactionNo", values?.LabNo);
    form.append("Patient_ID", values?.PatientID);
    form.append("SessionPanelID", "");
    form.append("SessionEmployeeID", localStorage.getItem("employeeId"));
    form.append("SessionLoginName", localStorage.getItem("employeeName"));
    form.append(
      "SessionCentreID",
      localStorage.getItem("cetreId") ? localStorage.getItem("cetreId") : "2"
    );
    form.append("Title", "Mr.");
    form.append("PName", values?.PName);
    form.append("Gender", values?.Gender);
    form.append("DoctorID", values?.Doctor_ID);
    form.append("DoctorName", values?.DoctorName);
    form.append("Address", values?.Address);
    form.append("Mobile", values?.Mobile);
    form.append("Email", values?.Email);
    form.append("AgeYear", values?.years);
    form.append("AgeMonth", values?.months);
    form.append("AgeDays", values?.days);
    form.append("DOB", values?.DateOfBirth);
    form.append("Age", `${values?.years}Y${values?.months}M${values?.days}D`);

    try {
      const dataResponse = await SaveInfo(form);
      console.log(dataResponse);
      if (dataResponse.data.status == true) {
        setLTNO("");
        emptyformData(setFieldValue);
        toast.success("Info Updated Successfully");
        seterrors({})
      }
    } catch (error) {
      console.error(error);
    }
  };

  const titleGenderMap = [
    { Title: "Mr.", Gender: "Male" },
    { Title: "Mrs.", Gender: "Female" },
    { Title: "Miss.", Gender: "Female" },
    { Title: "Master", Gender: "Male" },
    { Title: "Baby.", Gender: "Female" },
    { Title: "B/O.", Gender: "" },
    { Title: "Dr.", Gender: "" },
    { Title: "Prof.", Gender: "" },
    { Title: "Madam.", Gender: "Female" },
    { Title: "Sister.", Gender: "Female" },
    { Title: "Mohd.", Gender: "Male" },
    { Title: "Mx", Gender: "Female" },
    { Title: "Transgendr", Gender: "Trans" },
    { Title: "Ms", Gender: "Female" },
  ];

  useEffect(() => {
    if (values?.Title) {
      const selectedTitle = titleGenderMap.find(
        (item) => item.Title == values.Title.value
      );
      console.log(selectedTitle);
      if (selectedTitle) {
        console.log(selectedTitle);
        setFieldValue("Gender", selectedTitle.Gender);
      }
    }
  }, [values?.Title]);
  // const getDoctorlist=async()=>{
  //     let form=new FormData();
  //     form.append('ID',localStorage?.getItem('employeeId'));
  //     form.append('SessionCentreID',1)
  //     form.append('SessionPanelID',1)
  //     form.append('DoctorName',values?.DoctorName)

  //     try {
  //         const dataResponse = await GetDoctorlist(form);
  //         setDoctorSuggestion(dataResponse.data.data)
  //         // }
  //     } catch (error) {
  //         console.error(error);
  //     }
  // }
  useEffect(() => {
    getDoctorlist();
  }, [values?.DoctorName]);
  useEffect(() => {
    console.log(location.state)
    if (location.state.edit) {
      console.log(location.state);
      
      handleSearchnav(location.state.data);
    }
  }, [location.state]);

  const itemTemplate = (item) => {
    return (
      <div
        className="p-clearfix"
        // onClick={() => validateInvestigation(item, 0, 0, 1, 0)}
      >
        <div style={{ float: "left", fontSize: "12px", width: "100%" }}>
          {item?.autoCompleteItemName}
        </div>
      </div>
    );
  };
  const getDoctorlist = async (query) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("employeeId"));
    form.append("SessionCentreID", 1);
    form.append("SessionPanelID", 1);
    form.append("DoctorName", query);

    try {
      const dataResponse = await GetDoctorlist(form);
      setDoctorSuggestion(dataResponse.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle AutoComplete's search method
  const searchDoctors = (event) => {
    getDoctorlist(event.query);
  };

  // Handle selection from suggestions
  const handleListSearch = (data) => {
    const doctorName = data.label.split(" # ")[0];
    setFieldValue("DoctorName", doctorName);
    setFieldValue("Doctor_ID", data.value);
    setDoctorSuggestion([]);
  };

  return (
    <>
     
      <Heading title={"Edit Info"} isBreadcrumb={true} />
        <div className="card patient_registration">
          
          <div className="row pt-2 pl-2 pr-2">
            <div className="col-md-12 col-sm-12 ">
              <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1">
                <Input
                  type="text"
                  className="form-control required-fields"
                  id="LabNo"
                  name="LabNo"
                  value={LTNo}
                  lable={t("LabNo.")}
                  placeholder=" "
                  respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                  onChange={(e) => setLTNO(e.target.value)}
                  // inputRef={inputRef}
                />
                <div className="col-4" style={{ marginBottom: "4px" }}>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={handleSearch}
                  >
                    {"Search"}
                  </button>
                </div>
              </div>
            </div>

            {values?.PatientID != "" && (
              <div className="col-md-12 col-sm-12 ">
                <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1">
                  <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
                    <div className="row">
                      <ReactSelect
                        placeholderName={"Title"}
                        dynamicOptions={titleOptions}
                        name="Title"
                        inputId="Title"
                        value={values?.Title}
                        handleChange={handleReactSelect}
                        searchable={true}
                        respclass="col-5"
                        requiredClassName="required-fields"
                        error={errors?.Title ? errors?.Title : ""}
                      />
                      <Input
                        type="text"
                        className="form-control required-fields"
                        id="First"
                        name="PName"
                        value={values?.PName}
                        onChange={handleChange}
                        label={"PatientName"}
                        placeholder=" "
                        respclass="col-7"
                        error={errors?.PName ? errors?.PName : ""}
                      />
                    </div>
                  </div>

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

                  <ReactSelect
                    placeholderName={"Gender"}
                    id="Gender"
                    inputId="Gender"
                    dynamicOptions={genderOptions}
                    name="Gender"
                    value={values?.Gender}
                    handleChange={handleReactSelect}
                    searchable={true}
                    respclass="col-5"
                    requiredClassName={`required-fields ${values?.Gender === "Male" || values?.Gender === "Female" ? "disable-focus" : ""}`}
                    DropdownIndicator={true}
                    isDisabled={[
                      "Mr.",
                      "Mrs.",
                      "Miss.",
                      "Master",
                      "Baby.",
                      "Madam.",
                      "Sister.",
                      "Mohd.",
                      "Mx",
                      "Transgendr",
                      "Ms",
                    ].includes(values?.Title || values?.Title?.value)}
                  />

                  <DatePicker
                    className="custom-calendar"
                    respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                    id="DOB"
                    name="DOB"
                    value={
                      values?.DateOfBirth
                        ? moment(values?.DateOfBirth).toDate()
                        : ""
                    }
                    handleChange={(e) => {
                      getAgeByDateOfBirth(e, handleChange);
                    }}
                    lable={"DOB"}
                    placeholder="YYYY-MM-DD"
                  />

                  {localStorage.getItem('AgeType')==1 && <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
                    <div className="row">
                      <Input
                        type="number"
                        className="form-control"
                        id="years"
                        name="years"
                        value={values?.years}
                        onChange={handleChange}
                        lable={"Years"}
                        placeholder=""
                        respclass="col-4"
                      />
                      <Input
                        type="number"
                        className="form-control"
                        id="months"
                        name="months"
                        value={values?.months}
                        onChange={handleChange}
                        lable={"Months"}
                        placeholder=""
                        respclass="col-4"
                      />
                      <Input
                        type="number"
                        className="form-control"
                        id="days"
                        name="days"
                        value={values?.days}
                        onChange={handleChange}
                        lable={"Days"}
                        placeholder=""
                        respclass="col-4"
                      />
                    </div>
                  </div>}

                  <AutoComplete
                    value={values?.DoctorName}
                    suggestions={doctorSuggestion}
                    className="col-xl-2.5 col-md-3 col-sm-6 col-12"
                    completeMethod={searchDoctors}
                    field="label" // Assuming 'label' is the field to display in suggestions
                    placeholder="Doctor"
                    id="Doctor"
                    name="DoctorName"
                    autoComplete="off"
                    onChange={(e) => {
                      setFieldValue("DoctorName", e.value);
                    }}
                    onSelect={(e) => handleListSearch(e.value)}
                    inputRef={inputRef}
                    // Optional: Adds a dropdown button to see all suggestions
                  />

                  {/* <div className="input-group-append">
                  <button
                    className=" btn-primary btn-sm"
                    id="NewReferDoc"
                    type="button"
                    onClick={handleShow}
                  >
                    <i className="fa fa-plus-circle fa-sm"></i>
                  </button>
                </div> */}

                  <Input
                    type="text"
                    className="form-control"
                    id="Address"
                    name="Address"
                    value={values?.Address}
                    onChange={handleChange}
                    lable={"Address"}
                    placeholder=" "
                    respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                  />

                  <Input
                    type="text"
                    className="form-control"
                    id="Email"
                    name="Email"
                    value={values?.Email}
                    onChange={handleChange}
                    lable={"Email"}
                    placeholder=" "
                    respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                    error={errors?.Email ? errors?.Email : ""}
                  />
                  <div className="col-4" style={{ marginBottom: "4px" }}>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={handleSave}
                    >
                      {"Update"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      
    </>
  );
}
