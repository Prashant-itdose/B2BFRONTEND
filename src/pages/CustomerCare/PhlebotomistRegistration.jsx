import React, { useEffect, useRef, useState } from "react";
import ReactSelect from "@app/components/formComponent/ReactSelect";
import Input from "@app/components/formComponent/Input";
import { useDispatch } from "react-redux";
import { fetchPanelswithid, getCentresworkorder } from "../../utils/helperfunctions";
import image from "../../assets/image/avatar.gif";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import DatePicker from "../../components/formComponent/DatePicker";
import { Tooltip } from "primereact/tooltip";
import Heading from "../../components/UI/Heading";
import TimePicker from "../../components/formComponent/TimePicker";

export default function PhleboRegistration() {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const dispatch = useDispatch();
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
    DOB: "",
    Doctor_ID: "",
    DoctorName: "",
    Panel_ID: "",
    PanelName: "",
    Discount: 0,
    PanelID: "",
    CentreId: "",
    ReferenceCodeOpd: "",
    mobedit: false,
    years: "",
    days: "",
    months: "",
    IsVip: 0,
    PaymentMode: "",
    profileImage: image,
  });
  const [view,setView]=useState(null)
  const [details,setDetails]=useState({})
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [handleModelData, setHandleModelData] = useState({});
  const [t] = useTranslation();
  const [modalData, setModalData] = useState({});
  const [isuploadDocOpen, setIsuploadDocOpen] = useState(false);
  const [singlePatientData, setSinglePatientData] = useState({});
  const [visible, setVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState([]);
  
  const [renderComponent, setRenderComponent] = useState({
    name: "",
    component: null
  });
  const [addDoc, setAdddoc] = useState(false);

  const [discounts, setDiscounts] = useState({
    discountApprovalList: [],
    discountReasonList: [],
    discamount: "",
    discperc: "",
    netamount:'',
    grossamount:'',
    paidamount:'',
    balanceamount:''
  });

  const [billdetails,setbilldetails]=useState({
    netamount:'',
    grossamount:'',
    paidamount:'',
    balanceamount:''
  })

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
  const [getOldPatientData, setGetOldPatientData] = useState([]);
  const [Panels, setPanels] = useState([]);
  const [Centres, setCenters] = useState([]);
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
  const [payloadData, setPayloadData] = useState({
    panelID: "",
    referalTypeID: "Self",
    referDoctorID: "",
    DepartmentID: "ALL",
    DoctorID: "",
  });
  const inputRef = useRef(null);
  const [testPaymentState, setTestPaymentState] = useState({
    type: "",
    category: "0",
    subCategory: "0",
    searchType: 1,
  });
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [testAddingTableState, setTestAddingTable] = useState([]);
  
  const [preview, setPreview] = useState(null);
  const [isuploadOpen, setIsuploadOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [doctorSuggestion, setDoctorSuggestion] = useState([]);
  const videoRef = useRef();
  const canvasRef = useRef();


  const THEAD = ["Code", "ItemName", "Rate", "Action"];

 
  const handleReactSelect = (name, value) => {
    setFieldValue(name, value);
    if (name == "CentreId") {
      setTestAddingTable([]);
      setFieldValue("PanelID", "");
    }
    if (name == "PanelID") {
      setFieldValue("ReferenceCodeOpd", value?.code);
      setFieldValue("PaymentMode", value?.paymentmode);
      setTestAddingTable([]);
    }
  };

  const handleModel = (
    label,
    width,
    type,
    isOpen,
    Component,
    handleInsertAPI,
    extrabutton
  ) => {
    setHandleModelData({
      label: label,
      width: width,
      type: type,
      isOpen: isOpen,
      Component: Component,
      handleInsertAPI: handleInsertAPI,
      extrabutton: extrabutton ? extrabutton : <></>,
    });
  };
  const handleDoctorSelected = (ID) => {
    setPayloadData({ ...payloadData, DoctorID: ID });
  };

  // useEffect(() => {
  //   setHandleModelData((val) => ({ ...val, modalData: modalData }));
  // }, [modalData]);

  const setIsOpen = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }));
  };

  const closeCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };
  const { handleChange, values, setValues, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: formData,
      onSubmit: async (values, { resetForm }) => {
        // SearchBillPrintAPI();
      },
    });

  // Function to start camera
  // const startCamera = async () => {
  //   try {
  //     setPreview(null);
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     setCameraStream(stream); // Store camera stream
  //     videoRef.current.srcObject = stream;
  //   } catch (err) {
  //     console.error("Error accessing camera:", err);
  //   }
  // };
  const handleListSearch = (data) => {
    const doctorName = data.label.split(" # ")[0];
    setFieldValue("DoctorName", doctorName);
    setFieldValue("Doctor_ID", data.value);
    setDoctorSuggestion([]);
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
  const searchDoctors = (event) => {
    getDoctorlist(event.query);
  };

  const startCamera = async () => {
    try {
      setCameraStream(null);

      console.log("Checking for getUserMedia support...");
      const hasGetUserMedia = !!(
        navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      );
      console.log("getUserMedia support:", hasGetUserMedia);

      if (!hasGetUserMedia) {
        throw new Error("getUserMedia is not supported in this browser");
      }

      console.log("Requesting camera access...");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera access granted");
      setCameraStream(stream); // Store camera stream
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const takePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 200, 150);

    const canvas = canvasRef.current;
    const base64String = canvas.toDataURL("image/png");
    setPreview(base64String);
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

  const handleImageUpload = () => {
    // Upload logic here (e.g., send `image` state to server)
    if (image) {
      // `image` is a File object; convert it to base64 format if needed
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        let base64data = reader.result;
        console.log(base64data); // Base64 format of the image
        // Perform your upload logic (e.g., send `base64data` to server)
      };
    }
  };
  const handlePaymentGateWay = (details) => {
    setPaymentMethod([]);
    setPaymentControlModeState(setData);
  };
  const handleClickEasyUI = (value) => {
    handleSinglePatientData(value);
  };

  const handleSinglePatientData = async (patientDetails) => {
    console.log(patientDetails);
    const calculateAgeYears = (dob) => {
      if (!dob) return 0;
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      // Adjust age if the birth month hasn't occurred yet this year
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    };

    const calculateAgeMonths = (dob) => {
      if (!dob) return 0;
      const birthDate = new Date(dob);
      const today = new Date();
      let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
      months += today.getMonth() - birthDate.getMonth();

      // Adjust months if the birth date hasn't occurred yet this month
      if (today.getDate() < birthDate.getDate()) {
        months--;
      }

      return months;
    };

    const calculateAgeDays = (dob) => {
      if (!dob) return 0;
      const birthDate = new Date(dob);
      const today = new Date();
      const timeDiff = today - birthDate;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return days;
    };

    setFieldValue("PatientID", patientDetails.Patient_ID || "");
    setFieldValue(
      "LedgertransactionID",
      patientDetails.LedgertransactionID || ""
    );
    setFieldValue(
      "LedgertransactionNo",
      patientDetails.LedgertransactionNo || ""
    );
    setFieldValue("Mobile", patientDetails.mobile || "");
    setFieldValue("Title", patientDetails.title || "");
    setFieldValue("PFirstName", patientDetails.PName || "");
    setFieldValue(
      "Gender",
      { label: patientDetails.gender, value: patientDetails?.gender } || ""
    );
    setFieldValue('UHID',patientDetails?.Patient_ID)
    setFieldValue("years", patientDetails?.ageYear || 0);
    setFieldValue("months", patientDetails?.ageMonth || 0);
    setFieldValue("days", patientDetails?.ageDays || 0);
    setFieldValue("Doctor", patientDetails.Doctor || "");
    setFieldValue("Address", patientDetails.house_no || "");
    setFieldValue("Email", patientDetails.email || "");
    setFieldValue("Phone", patientDetails.ContactNo || "");
    setFieldValue("DateOfBirth", patientDetails.dob || "");
    setFieldValue("DOB", new Date(patientDetails.dob));
    setFieldValue("Doctor_ID", patientDetails.Doctor_ID || "");
    setFieldValue("DoctorName", patientDetails.DoctorName || "");
    setFieldValue("Panel_ID", patientDetails.Panel_ID || "");
    setFieldValue("PanelName", patientDetails.PanelName || "");
    setFieldValue("Discount", patientDetails.Discount || 0);
    setFieldValue("mobedit", true);
    setFieldValue("ReferenceCodeOpd", patientDetails.ReferenceCodeOpd || "");
    setGetOldPatientData([]);
  };
  const [documentIds, setDocumentIds] = useState([]);
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
  const deleteDocument = (doc) => {
    const docDetail = documentIds?.filter((val) => val.id !== doc?.id);
    setValues((val) => ({ ...val, documentIds: docDetail }));
    setDocumentIds(docDetail);
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

    handleChange({
      target: { name: "DOB", value: dob.format("YYYY-MM-DD") },
    });
  };
  useEffect(() => {
    if (values?.years || values?.months || values?.days) {
      // Only call the function if at least one value is not empty
      changedobbyage(values?.years, values?.months, values?.days);
    }
  }, [values?.years, values?.months, values?.days]);

  const handleTitleChange = (name, value) => {
    const selectedTitle = titleOptions.find(
      (option) => option.value === value.value
    );

    const selectedGender = genderOptions.find(
      (gender) => gender.value === selectedTitle?.gender
    );
    setFieldValue(name, value);
    setFieldValue(
      "Gender",
      selectedTitle?.gender !== "UnKnown" ? selectedGender : null
    );
  };

  const handleOldPatientSearch = async (e) => {
    if ([13].includes(e.which)) {
      try {
        const form = new FormData();
        form.append("ID", localStorage.getItem("employeeId"));
        form.append("LoginName", localStorage.getItem("employeeName"));
        form.append("SessionCentreID", "1");
        form.append(
          "MobileNo",
          e?.target.name == "Mobile" ? e?.target?.value : ""
        );
        form.append(
          "Patient_ID",
          e?.target.name == "UHID" ? e?.target?.value : ""
        );

        const dataResponse = await Oldpatientsearch(form);
        console.log(dataResponse);
        const modified = dataResponse?.data.data.map((item) => ({
          ...item, 
          modalPatientName: `${item.title} ${item.PName}`, // Combine title and PName
          modalAgeGender: `${item.age} / ${item.gender}`, // Combine age and gender
          modalAddress: `${item.house_no} ${item.Locality} ${item.City} ${item.State} ${item.Country}`, 
        }));
        setGetOldPatientData(modified);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getCentresworkorder(setCenters, setFieldValue);
   
  }, []);
  useEffect(() => {
    if (values?.CentreId?.value)
      fetchPanelswithid(values?.CentreId.value, setPanels, setFieldValue);
    else fetchPanelswithid(values?.CentreId, setPanels, setFieldValue);
  }, [values?.CentreId]);
  ;
  
  useEffect(() => {
    if (discounts.discamount) {
      const totalDiscount = parseFloat(discounts.discamount);
      const totalRates = testAddingTableState.reduce((acc, test) => acc + parseFloat(test.Rate), 0);
  
      if (totalDiscount > totalRates) {
        console.warn("Discount amount exceeds the total sum of Rates.");
        return; 
      }
  
      const discountPerTest = totalDiscount / testAddingTableState.length;
  
      setTestAddingTable((prevState) =>
        prevState.map((test) => ({
          ...test,
          Discount: discountPerTest.toFixed(2),
        }))
      );
    }
  }, [discounts.discamount, testAddingTableState]);
  const handleRowSelect = (data) => {
    setSelectedPatient(data);
    
  };
  
  useEffect(() => {
    if (discounts.discperc) {
      const discountPercentage = parseFloat(discounts.discperc);
  
      setTestAddingTable((prevState) =>
        prevState.map((test) => {
          const discount = (discountPercentage / 100) * parseFloat(test.Rate);
          return {
            ...test,
            Discount: discount.toFixed(2),
          };
        })
      );
    }
  }, [discounts.discperc, testAddingTableState]);
  
  return (
    <>
      {addDoc && (
        <Modal
          modalWidth={"1000px"}
          visible={addDoc}
          setVisible={() => {
            setAdddoc(false);
          }}
          Header="Add Doctor"
        >
          <DoctoModal
            close={() => {
              setAdddoc(false);
            }}
            setFormValue={setFieldValue}
          />
        </Modal>
      )}
      {
       getOldPatientData.length>0 &&(
        
          <OldPatientModal
        visible={getOldPatientData.length>0}
        onHide={() => setGetOldPatientData([])}
        dataBind={getOldPatientData}
        selectedIndex={getOldPatientData.indexOf(selectedPatient)}
        onRowSelect={handleClickEasyUI}
      />
       
       )
      }

      <div className="card patient_registration">
        <Heading isBreadcrumb={true}/>
        <div className="card">
            <Heading title={"PersonalDetails"}/>
        <div className="row pt-2 pl-2 pr-2">
        

        <div className="col-md-11 col-sm-12 ">
          <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1">
            
            
            

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
                respclass="col-12"
                maxLength={10}
                
              />

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

           

           

            <Input
              type="text"
              className="form-control "
              id="Local_Address"
              name="House_No"
              value={values?.House_No}
              onChange={handleChange}
              lable={t("Address")}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              //tabIndex="-1"
              // onKeyDown={Tabfunctionality}
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
           <ReactSelect
              placeholderName={"BloodGroup"}
              id={"BloodGroup"}
              name={"BloodGroup"}
              searchable={true}
              respclass="col-5"
              value={values?.BloodGroup}
              dynamicOptions={[{label:'A Positive',value:'1'},{label:'O Positive',value:'2'}]}
              handleChange={handleReactSelect}
            />
            <Input
              type="text"
              className="form-control"
              id="FatherName"
              name="FatherName"
              value={values?.FatherName}
              onChange={handleChange}
              lable={"Father's Name"}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              showTooltipCount={true}
              onKeyDown={handleAddDocumentIDs}
            />
            <Input
              type="text"
              className="form-control"
              id="ID_Proof_No"
              name="ID_Proof_No"
              value={values?.ID_Proof_No}
              onChange={handleChange}
              lable={"Mother's Name"}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              showTooltipCount={true}
              onKeyDown={handleAddDocumentIDs}
            />
            <Input
              type="text"
              className="form-control"
              id="Qualification"
              name="Qualification"
              value={values?.Qualification}
              onChange={handleChange}
              lable={"Qualification"}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              showTooltipCount={true}
              onKeyDown={handleAddDocumentIDs}
            />
            <Input
              type="text"
              className="form-control"
              id="VehicleNo"
              name="VehicleNo"
              value={values?.VehicleNo}
              onChange={handleChange}
              lable={"VehicleNo"}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              showTooltipCount={true}
              onKeyDown={handleAddDocumentIDs}
            />
           <Input
              type="text"
              className="form-control"
              id="DrivingLicense"
              name="DrivingLicense"
              value={values?.DrivingLicense}
              onChange={handleChange}
              lable={"DrivingLicense"}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              showTooltipCount={true}
              onKeyDown={handleAddDocumentIDs}
            />
            <Input
              type="text"
              className="form-control"
              id="PanNo"
              name="PanNo"
              value={values?.PanNo}
              onChange={handleChange}
              lable={"PanNo"}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              showTooltipCount={true}
              onKeyDown={handleAddDocumentIDs}
            />

            

           
          </div>
        </div>
        {/* <div className="col-1 d-none d-md-block position-relative">
          <div
            style={{
              border: "1px solid grey",
              borderRadius: "5px",
              textAlign: "center",
              width: "67%",
              marginLeft: "10px",
            }}
            className="p-1"
          >
            <img
              height={50}
              // width={116}
              src={values?.profileImage}
              style={{ width: "100%" }}
              onClick={() => setIsuploadOpen(true)}
            />
          </div>
        </div> */}
        <div className="col-1 d-none d-md-block position-relative">
        <div
          style={{
            border: "1px solid grey",
            borderRadius: "5px",
            textAlign: "center",
            width: "67%",
            marginLeft: "10px",
          }}
          className="p-1"
        >
          
          <img
            height={50}
            // width={116}
            src={values?.profileImage}
            style={{ width: "100%" }}
            // alt="Not found"
            onClick={() => setIsuploadOpen(true)}
          />
        </div>
        
      </div>
       
      </div>
        </div>
        <div className="card">
            <Heading title={"WorkDetails"}/>
        <div className="row pt-2 pl-2 pr-2">
        

        <div className="col-md-12 col-sm-12 ">
          <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1">
            
            
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
              lable={"Joinind Date"}
              placeholder={VITE_DATE_FORMAT}
              maxDate={new Date()}
               showicon={true}
              disabled={values?.mobedit}
            />   

           

            <ReactSelect
              placeholderName={"Zone"}
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
             <ReactSelect
              placeholderName={"State"}
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
             <ReactSelect
              placeholderName={"City"}
              isDisabled={
                values?.Genderd?.value === "Male" ||
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

           

           

           

            <Input
              type="text"
              className="form-control "
              id="DevicdId"
              name="DeviceId"
              value={values?.House_No}
              onChange={handleChange}
              lable={"DeviceId"}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              //tabIndex="-1"
              // onKeyDown={Tabfunctionality}
            />
            <Input
              type="text"
              className="form-control "
              id="Username"
              name="Username"
              value={values?.Email}
              onChange={handleChange}
              lable={t("Username")}
              placeholder=" "
              // required={true}
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              // onKeyDown={Tabfunctionality}
              //tabIndex="-1"
             
            />
            <Input
              type="text"
              className="form-control "
              id="Password"
              name="Password"
              value={values?.Password}
              onChange={handleChange}
              lable={t("Password")}
              placeholder=" "
              // required={true}
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              // onKeyDown={Tabfunctionality}
              //tabIndex="-1"
             
            />
           <ReactSelect
              placeholderName={"PhleboSource"}
              id={"PhleboSource"}
              name={"PhleboSource"}
              searchable={true}
              respclass="col-6"
              value={values?.PhleboSource}
              dynamicOptions={[{label:'A Positive',value:'1'},{label:'O Positive',value:'2'}]}
              handleChange={handleReactSelect}
            />
            <ReactSelect
              placeholderName={"Weakoff"}
              id={"Weakoff"}
              name={"Weakoff"}
              searchable={true}
              respclass="col-6"
              value={values?.Weakoff}
              dynamicOptions={[{label:'A Positive',value:'1'},{label:'O Positive',value:'2'}]}
              handleChange={handleReactSelect}
            />
            <div className=" d-flex col-xl-2.5 col-md-3 col-sm-6 col-12">
            <TimePicker
              className=""
              respclass=""
              id="LoginTime"
              name="LoginTime"
              value={values?.LoginTime}
              
              handleChange={handleChange}
              lable={"LoginTime"}
              timeOnly={true}
              placeholder={VITE_DATE_FORMAT}
              maxDate={new Date()}
               showicon={true}
            />  
            <TimePicker
              className=""
              respclass=""
              id="LogOutTime"
              name="LogOutTime"
              value={values?.LoginTime}
              
              handleChange={handleChange}
              lable={"LogOutTime"}
              timeOnly={true}
              placeholder={VITE_DATE_FORMAT}
              maxDate={new Date()}
               showicon={true}
              
            />  
            </div>
            
            

           
          </div>
        </div>
        
       
      </div>
        </div>
       
      </div>

      

      {/* {isuploadDocOpen && (
        <AttachDoumentModal
          isuploadOpen={isuploadDocOpen}
          setIsuploadOpen={setIsuploadDocOpen}
          preview={preview}
          modelHeader={"Upload Patient Document"}
          handleImageChange={handleImageChange}
        />
      )} */}
      {isuploadDocOpen && (
        <AttachDoumentModal
          isuploadOpen={isuploadDocOpen}
          setIsuploadOpen={setIsuploadDocOpen}
          preview={preview}
          modelHeader={"Upload Patient Document"}
          setPreview={setPreview}
          details={details}
          view={view}
          setView={setView}
          
        />
      )}

      {isuploadOpen && (
        <UploadImageModal
          isuploadOpen={isuploadOpen}
          closeCameraStream={closeCameraStream}
          setIsuploadOpen={setIsuploadOpen}
          // preview={preview}
          modalData={{ preview: preview }}
          handleImageChange={handleImageChange}
          startCamera={startCamera}
          videoRef={videoRef}
          cameraStream={cameraStream}
          takePhoto={takePhoto}
          canvasRef={canvasRef}
          handleAPI={(data) => {
            setValues((val) => ({ ...val, profileImage: data?.preview }));
            setIsuploadOpen(false);
            closeCameraStream();
          }}
        />
      )}
    </>
  );
}


