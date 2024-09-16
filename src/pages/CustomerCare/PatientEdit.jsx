import React, { useState } from "react";
import Input from "../../components/formComponent/Input";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import Tables from "../../components/UI/customTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Heading from "../../components/UI/Heading";
import ReactSelect from "../../components/formComponent/ReactSelect";
import DatePicker from "../../components/formComponent/DatePicker";

const PatientEdit = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const SearchPAYLOAD = {
    Mobile: "",
    UHID: "",
    PatientName: "",
    Age: "",
    DOB: "",
    Gender: "",
    HouseNo: "",
    State: "",
    City: "",
    Locality: "",
    PinCode: "",
    EmailId: "",
    Landmark: "",
    Year: "",
    Month: "",
    Day: "",
  };
  const [bodyData, setBodyData] = useState([]);
  const { handleChange, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: SearchPAYLOAD,
    onSubmit: async (values, { resetForm }) => {
      SearchBillPrintAPI(0);
    },
  });
  const handleAddDocumentIDs = (e) => {
    if (e.key === "Enter") {
      let docIDs = documentIds?.find(
        (item) =>
          item?.id === e.target.value ||
          item?.name?.value === values?.documentName?.value
      );
      let validDocLength = parseInt(
        values?.documentName?.value?.split("#")[1]
          ? values?.documentName?.value?.split("#")[1]
          : 0
      );
      if (!values?.documentName?.label) {
        notify("Please Select Document id", "error");
      } else if (!e.target.value) {
        notify("Document Can't Be Empty", "error");
      } else if (docIDs?.id) {
        notify("This Document  Has Already Added", "error");
      } else if (e.target.value?.length !== validDocLength) {
        notify(
          `${values?.documentName?.label} must be ${validDocLength} digit `,
          "error"
        );
      } else {
        setDocumentIds((val) => [
          ...val,
          { name: values?.documentName, id: e.target.value },
        ]);
        let ids = [...documentIds];
        ids.push({ name: values?.documentName, id: e.target.value });
        setValues((val) => ({
          ...val,
          ID_Proof_No: "",
          documentName: "",
          documentIds: ids,
        }));
      }
      handleKeyDown(e);
    }
  };
  const THEAD = [
    "Log",
    "#",
    "UHID",
    "Patient Name",
    "Age/Gender",
    "Mobile No",
    "Locality",
    "City",
    "State",
    "Pincode",
    "Reg Date",
    "Last HC Status",
  ];
  const tabledata1 = [
    {
      SNo: 1,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "PRASHANT SINGHAL",
      NoOfDays: 0,
      Dates: "",
      Action: "View",
    },
    {
      SNo: 2,
      MonthYear: "Sep-2024",
      Team: "Machine Team",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "PANKAJ PATHAK",
      NoOfDays: 4,
      Dates: "07,14,21,28",
      Action: "View",
    },
    {
      SNo: 3,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Aman Srivastav",
      NoOfDays: 6,
      Dates: "05,06,07,14,21,28",
      Action: "View",
    },
    {
      SNo: 4,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Sneh Jaiswal",
      NoOfDays: 2,
      Dates: "07,21",
      Action: "View",
    },
    {
      SNo: 5,
      MonthYear: "Sep-2024",
      Team: "Machine Team",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "RAHUL NAGAR",
      NoOfDays: 3,
      Dates: "14,04,07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(tabledata1?.length / rowsPerPage);
  const currentData = tabledata1?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleReactSelect = (name, value) => {
    setFieldValue(name, value);
  };
  const handleTitleChange = (name, value) => {
    const selectedTitle = titleOptions.find(
      (option) => option.value === value.value
    );
  };
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Trans", value: "Trans" },
  ];
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

  const [tableVisible, setTableVisible] = useState(true);

  return (
    <>
      <div className="card">
        <div className="row g-4 m-2">
          <Input
            type="number"
            className="form-control"
            id="Mobile"
            name="Mobile"
            onChange={handleChange}
            value={values?.Mobile}
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            lable={t("Mobile")}
          />
          <div className="col-2">
            <button className="btn btn-sm btn-info">Search</button>
          </div>
        </div>
      </div>

      {tableVisible ? (
        <div className="card">
          <Heading
            title={"Patient List"}
            secondTitle={
              <div className="d-flex flex-wrap align-items-center">
                <div
                  className="d-flex "
                  style={{ justifyContent: "flex-start", alignItems: "center" }}
                >
                  <div
                    className="legend-circle"
                    style={{
                      backgroundColor: "#FFC0CB",
                      borderColor: "#FFC0CB",
                      cursor: "pointer",
                    }}
                  ></div>
                  <span
                    className="legend-label"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {t("AB Not Required")}
                  </span>
                </div>
              </div>
            }
          />
          <Tables
            thead={THEAD}
            tbody={currentData?.map((ele, index) => ({
              Log: (currentPage - 1) * rowsPerPage + index + 1,
              "#": (
                <button
                  className="btn btn-xs btn-info"
                  onClick={() => {
                    setTableVisible(false);
                  }}
                >
                  Select
                </button>
              ),
              UHID: ele?.UHID,
              "Patient Name": ele?.PatientName,
              "Age/Gender": ele?.Age / ele?.Gender,
              "Mobile No": ele?.Mobile,
              Locality: ele?.Locality,
              City: ele?.City,
              State: ele?.State,
              Pincode: ele?.PinCode,
              "Reg Date": ele?.Date,
              "Last HC Status": ele?.Status,
            }))}
            tableHeight={"tableHeight"}
          />
          <div className="pagination ml-auto">
            <div>
              <button
                className="btn btn-sm btn-info"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-sm btn-info"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="card">
            <Heading title="Update Patient Details" />
            <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1">
              <div className="d-flex m-0 p-0">
                <Input
                  type="number"
                  className="form-control w-100 m-0 p-0"
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
                  disabled={values?.mobedit}
                  lable={t("FrontOffice.OPD.patientRegistration.Mobile_No")}
                  placeholder=" "
                  onKeyDown={(e) => {
                    handleOldPatientSearch(e);
                  }}
                  respclass="col-11"
                  maxLength={10}
                />

                <button
                  // className="col-1 p-0 m-0 d-flex align-items-center justify-content-center"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    height: "23px",
                    border: "none",
                    cursor: "default",
                    color: "white",
                    // width: "40px", // Adjust size as needed
                    fontSize: "14px",
                    borderRadius: "3px",
                    marginRight: "3px",
                  }}
                  disabled
                >
                  {10 - (values?.Mobile?.toString().length || 0)}
                </button>

                {/* Search Icon for Mobile */}
                <button
                  className="p-0 m-0 d-flex align-items-center justify-content-center d-sm-none"
                  style={{
                    height: "23.5px",
                    border: "none",
                    backgroundColor: "transparent",
                    color: "grey",
                    cursor: "pointer",
                    fontSize: "18px",
                    width: "40px", // Adjust size as needed
                    borderRadius: "5px",
                  }}
                  onClick={(e) => {
                    handleOldPatientSearch(e);
                  }}
                >
                  <i className="pi pi-search"></i>
                </button>
              </div>
              <Input
                type="text"
                className="form-control "
                id="Barcode"
                name="UHID"
                value={values?.UHID}
                lable={t("FrontOffice.OPD.patientRegistration.Barcode")}
                placeholder=" "
                respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                onChange={handleChange}
                disabled={values?.mobedit}
                onKeyDown={(e) => {
                  handleOldPatientSearch(e);
                }}
                // inputRef={inputRef}
              />
              <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
                <div className="row">
                  <ReactSelect
                    placeholderName={"Title"}
                    dynamicOptions={titleOptions}
                    // id={"Title"}
                    name="Title"
                    // inputClass="required-fields"
                    inputId="Title"
                    value={values?.Title}
                    handleChange={handleTitleChange}
                    searchable={true}
                    respclass="col-5 "
                    requiredClassName="required-fields"
                    // onKeyDown={Tabfunctionality}
                    //tabIndex="2"
                    isDisabled={values?.mobedit}
                  />

                  <Input
                    type="text"
                    className="form-control required-fields"
                    id="First"
                    name="PFirstName"
                    value={values?.PFirstName}
                    onChange={handleChange}
                    lable={"Name"}
                    placeholder=" "
                    respclass="col-7"
                    disabled={values?.mobedit}

                    //tabIndex="3"
                  />
                </div>
              </div>

              <ReactSelect
                placeholderName={"Gender"}
                isDisabled={
                  values?.Gender?.value === "Male" ||
                  values?.Gender?.value === "Female" ||
                  values?.mobedit
                    ? true
                    : false
                }
                id="Gender"
                dynamicOptions={genderOptions}
                name="Gender"
                value={values?.Gender?.value}
                handleChange={handleReactSelect}
                respclass="col-5"
                requiredClassName={`required-fields ${values?.Gender === "Male" || values?.Gender === "Female" ? "disable-focus" : ""}`}

                //tabIndex="4"
              />

              <DatePicker
                className="custom-calendar"
                respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                id="DOB"
                name="DOB"
                value={values?.DOB ? moment(values?.DOB).toDate() : ""}
                // handleChange={handleChange}
                handleChange={(e) => {
                  getAgeByDateOfBirth(e, handleChange);
                }}
                lable={"DOB"}
                placeholder={VITE_DATE_FORMAT}
                maxDate={new Date()}
                showicon={true}
                disabled={values?.mobedit}
              />

              {localStorage.getItem("AgeType") == 0 && (
                <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
                  <div className="row">
                    <Input
                      type="text"
                      className="form-control required-fields"
                      id="Age"
                      name="Age"
                      value={values?.Age}
                      onChange={(e) => {
                        ageValidation(
                          /^\d{0,2}(\.\d{0,2})?$/,
                          e,
                          handleChange,
                          values?.AgeType?.value
                            ? values?.AgeType?.value
                            : values?.AgeType
                        );
                      }}
                      lable={t("FrontOffice.OPD.patientRegistration.Age")}
                      placeholder=" "
                      respclass="col-5"
                      disabled={values?.mobedit}
                      //tabIndex="5"
                    />

                    <ReactSelect
                      placeholderName={t(
                        "FrontOffice.OPD.patientRegistration.Type"
                      )}
                      id="Type"
                      name="AgeType"
                      value={values?.AgeType}
                      handleChange={handleReactSelect}
                      dynamicOptions={AGE_TYPE}
                      searchable={true}
                      respclass="col-7"
                      isDisabled={values?.mobedit}
                      //tabIndex="-1"
                    />
                  </div>
                </div>
              )}

              {localStorage.getItem("AgeType") == 1 && (
                <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
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
                      disabled={values?.mobedit}
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
                      disabled={values?.mobedit}
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
                      disabled={values?.mobedit}
                    />
                  </div>
                </div>
              )}

              <Input
                type="text"
                className="form-control "
                id="Local_Address"
                name="House_No"
                value={values?.House_No}
                onChange={handleChange}
                lable={t("Address")}
                placeholder=" "
                disabled={values?.mobedit && !formData?.updateaddress}
                respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                //tabIndex="-1"
                // onKeyDown={Tabfunctionality}
              />
              <ReactSelect
                placeholderName={"State"}
                isDisabled={values?.mobedit && !formData?.updateaddress}
                id="Gender"
                dynamicOptions={genderOptions}
                name="Gender"
                handleChange={handleReactSelect}
                respclass="col-5"
                requiredClassName={`required-fields ${values?.Gender === "Male" || values?.Gender === "Female" ? "disable-focus" : ""}`}

                //tabIndex="4"
              />
              <ReactSelect
                placeholderName={"City"}
                isDisabled={values?.mobedit && !formData?.updateaddress}
                id="Gender"
                dynamicOptions={[genderOptions]}
                name="Gender"
                handleChange={handleReactSelect}
                respclass="col-5"
                requiredClassName={`required-fields ${values?.Gender === "Male" || values?.Gender === "Female" ? "disable-focus" : ""}`}

                //tabIndex="4"
              />
              <ReactSelect
                placeholderName={"Location"}
                isDisabled={values?.mobedit && !formData?.updateaddress}
                id="Gender"
                dynamicOptions={genderOptions}
                name="Gender"
                handleChange={handleReactSelect}
                respclass="col-5"
                requiredClassName={`required-fields ${values?.Gender === "Male" || values?.Gender === "Female" ? "disable-focus" : ""}`}

                //tabIndex="4"
              />
              <Input
                type="text"
                className="form-control"
                id="ID_Proof_No"
                name="ID_Proof_No"
                value={values?.ID_Proof_No}
                onChange={handleChange}
                disabled={values?.mobedit && !formData?.updateaddress}
                lable={"LandMark"}
                placeholder=" "
                respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                showTooltipCount={true}
                onKeyDown={handleAddDocumentIDs}
              />
              <Input
                type="text"
                className="form-control"
                id=""
                naarme="ID_Proof_No"
                value={values?.ID_Proof_No}
                onChange={handleChange}
                lable={"Pincode"}
                disabled={values?.mobedit && !formData?.updateaddress}
                placeholder=" "
                respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                showTooltipCount={true}
              />
              <Input
                type="text"
                className="form-control "
                id="Email"
                name="Email"
                value={values?.Email}
                onChange={handleChange}
                lable={t("Email")}
                placeholder=" "
                // required={true}
                respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                // onKeyDown={Tabfunctionality}
                //tabIndex="-1"
                disabled={values?.mobedit}
              />
              <div className="col-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => {
                    openSlot(true);
                  }}
                >
                  {"Update Details"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default PatientEdit;
