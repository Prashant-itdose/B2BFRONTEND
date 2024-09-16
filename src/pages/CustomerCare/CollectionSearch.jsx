import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../../components/UI/Heading";
import Input from "@app/components/formComponent/Input";
import DatePicker from "@app/components/formComponent/DatePicker";
import { useFormik } from "formik";
import { SEARCHBY } from "../../utils/constant";

import { LabDetailnew } from "../../networkServices/opdserviceAPI";
import moment from "moment";
import ReactSelect from "@app/components/formComponent/ReactSelect";
import NoDataMessage from "../../utils/NoDataMessage";
import CustomPagination from "../../utils/CustomPagination";
import CollectionTable from "./tables/CollectionTable";
// import Pagination from "../../../utils/Pageination";
const DummyData = [
  {
    PaymentMode: "Cash",
    CouponId: 0,
    CouponCode: "",
    IsCoupon: 0,
    DoctorId: 0,
    DiscReason: "",
    PreBookingCentreID: 1201,
    RouteName: "NEWASHOK1",
    PhlebotomistId: 64,
    EntryDateTime: "25-Jun-2024 01:59 PM",
    EntryByName: "ITD-Admin",
    PMobile: "9717857416",
    Remarks: "",
    AppDate: "26-Jun-2024 08:00 AM",
    PreBookingId: 942,
    Mobile: "8851475359",
    Patient_ID: "7307",
    PatientName: "Mr.ARUN",
    Age: "22 Y 0 M 0 D",
    Gender: "Male",
    Locality: "Pankha road",
    City: "Central Delhi",
    State: "Delhi",
    PinCode: "110001",
    Centre: "Auto Lab centre",
    PatientRating: "",
    PatientFeedback: "",
    phelborating: "",
    phelbofeedback: "",
    CheckInDateTime: "",
    BookedDate: "",
    Vip: 0,
    HardCopyRequired: 0,
    FinalDoneDate: "",
    CStatus: "Pending",
    CurrentStatusDate: "25-Jun-2024 01:59 PM",
    PhleboName: "saurabhitdose",
    VisitId: "",
    AlternateMobileNo: "8989899898",
    Client: "",
    SourceofCollection: "1",
    Doctor: "Selff",
    FileName: "",
    CancelReason: "",
    CancelByName: null,
    CancelDateTime: null,
    CancelRemarks: "",
    RequestedRemarks: "",
    RequestDate: "",
    House_No: "wz-93",
    Landmark: "",
    VerificationCode: "6964",
    PhelboType: "Permanent Phelbo",
    PhelboSource: "Franchise",
  },
  {
    PaymentMode: "Cash",
    CouponId: 0,
    CouponCode: "",
    IsCoupon: 0,
    DoctorId: 0,
    DiscReason: "",
    PreBookingCentreID: 439,
    RouteName: "r109",
    PhlebotomistId: 263,
    EntryDateTime: "06-Sep-2024 12:06 PM",
    EntryByName: "ITD-Admin",
    PMobile: "9717857415",
    Remarks: "",
    AppDate: "07-Sep-2024 09:00 AM",
    PreBookingId: 943,
    Mobile: "9717857415",
    Patient_ID: "1917",
    PatientName: "Mr.VIPIN",
    Age: "25 Y 0 M 7 D ",
    Gender: "Male",
    Locality: "rajivchwk",
    City: "Central Delhi",
    State: "Delhi",
    PinCode: "110002",
    Centre: "Shroff",
    PatientRating: "",
    PatientFeedback: "",
    phelborating: "",
    phelbofeedback: "",
    CheckInDateTime: "",
    BookedDate: "",
    Vip: 0,
    HardCopyRequired: 0,
    FinalDoneDate: "",
    CStatus: "Pending",
    CurrentStatusDate: "06-Sep-2024 12:06 PM",
    PhleboName: "Vipin",
    VisitId: "",
    AlternateMobileNo: "9717857411",
    Client: "",
    SourceofCollection: "1",
    Doctor: "Self",
    FileName: "",
    CancelReason: "",
    CancelByName: null,
    CancelDateTime: null,
    CancelRemarks: "",
    RequestedRemarks: "",
    RequestDate: "",
    House_No: "aaaa",
    Landmark: "aaaa",
    VerificationCode: "9007",
    PhelboType: "Permanent Phelbo",
    PhelboSource: "Lab",
  },
  {
    PaymentMode: "Cash",
    CouponId: 0,
    CouponCode: "",
    IsCoupon: 0,
    DoctorId: 837,
    DiscReason: "abc",
    PreBookingCentreID: 439,
    RouteName: "r109",
    PhlebotomistId: 263,
    EntryDateTime: "06-Sep-2024 12:08 PM",
    EntryByName: "ITD-Admin",
    PMobile: "9717857415",
    Remarks: "abc",
    AppDate: "07-Sep-2024 09:15 AM",
    PreBookingId: 944,
    Mobile: "9717857415",
    Patient_ID: "1917",
    PatientName: "Mr.VIPIN",
    Age: "25 Y 0 M 7 D ",
    Gender: "Male",
    Locality: "rajivchwk",
    City: "Central Delhi",
    State: "Delhi",
    PinCode: "110002",
    Centre: "Shroff",
    PatientRating: "",
    PatientFeedback: "",
    phelborating: "",
    phelbofeedback: "",
    CheckInDateTime: "",
    BookedDate: "",
    Vip: 0,
    HardCopyRequired: 0,
    FinalDoneDate: "",
    CStatus: "Pending",
    CurrentStatusDate: "06-Sep-2024 12:08 PM",
    PhleboName: "Vipin",
    VisitId: "",
    AlternateMobileNo: "9717857415",
    Client: "",
    SourceofCollection: "1",
    Doctor: "Selff",
    FileName: "",
    CancelReason: "",
    CancelByName: null,
    CancelDateTime: null,
    CancelRemarks: "",
    RequestedRemarks: "",
    RequestDate: "",
    House_No: "aaaa",
    Landmark: "aaaa",
    VerificationCode: "5640",
    PhelboType: "Permanent Phelbo",
    PhelboSource: "Lab",
  },
  {
    PaymentMode: "Cash",
    CouponId: 0,
    CouponCode: "",
    IsCoupon: 0,
    DoctorId: 0,
    DiscReason: "",
    PreBookingCentreID: 9,
    RouteName: "Rout-1",
    PhlebotomistId: 260,
    EntryDateTime: "11-Sep-2024 12:53 PM",
    EntryByName: "ITD-Admin",
    PMobile: "9430978818",
    Remarks: "qwq",
    AppDate: "12-Sep-2024 08:00 AM",
    PreBookingId: 945,
    Mobile: "9540374619",
    Patient_ID: "1189",
    PatientName: "Mr.GAGAN RAJPUT",
    Age: "20 Y 11 M 14 D ",
    Gender: "Male",
    Locality: "Dadri",
    City: "Greator Noida",
    State: "UTTAR PRADESH",
    PinCode: "203207",
    Centre: "Itdose",
    PatientRating: "",
    PatientFeedback: "",
    phelborating: "",
    phelbofeedback: "",
    CheckInDateTime: "",
    BookedDate: "",
    Vip: 0,
    HardCopyRequired: 0,
    FinalDoneDate: "",
    CStatus: "Pending",
    CurrentStatusDate: "11-Sep-2024 12:53 PM",
    PhleboName: "Raj Kamal",
    VisitId: "",
    AlternateMobileNo: "2948729742",
    Client: "",
    SourceofCollection: "2",
    Doctor: "Selff",
    FileName: "",
    CancelReason: "",
    CancelByName: null,
    CancelDateTime: null,
    CancelRemarks: "",
    RequestedRemarks: "",
    RequestDate: "",
    House_No: "G-5",
    Landmark: "ShivGorakhMandir",
    VerificationCode: "6908",
    PhelboType: "Permanent Phelbo",
    PhelboSource: "Lab",
  },
];
const CollectionSearch = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;

  const [details, setDetails] = useState({
    pagesize: 25,
    totalcount: 100,
  });

  const [t] = useTranslation();
  const [shownodata, setShownodata] = useState(false);
  const [bodyData, setBodyData] = useState({ ReceiptDetailnew: DummyData });
  const [Panels, setPanels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(); // Update this based on the total number of pages from API

  const handlePageChange = (page) => {
    setCurrentPage(page);
    SearchBillPrintAPI(page); // Trigger API call with the new page
  };
  const SearchPAYLOAD = {
    FromDate: moment().format("DD-MMM-YYYY"),
    ToDate: moment().format("DD-MMM-YYYY"),
    SearchType: null,
    SearchValue: "",
    DateType: {
      label: "ApprovedDate",
      value: "plo.ApprovedDate",
    },
    isHeader: false,
  };
  const DateTypes = [
    {
      label: "ApprovedDate",
      value: "plo.ApprovedDate",
    },
    { label: "RegistrationDate", value: "plo.date" },
    {
      label: "SampleReceivingDate",
      value: "plo.SampleReceiveDate",
    },
  ];
  const THEAD = [
    "Sr. No.",
    "CreatedDate",
    "CreatedBy",
    "AppDate",
    "PrebookingID",
    "MobileNo",
    "PatientName",
    "City",
    "Location",
    "Pincode",
    "Route",
    "PhleboDetails",
    "DropLocation",
  ];

  const SearchBillPrintAPI = async (page, status, pageSize = 25) => {
    const formattedValues = {
      ...values,
      SearchType: values?.SearchType != null ? values.SearchType.value : "",
      SearchValue: values.SearchValue,
      DateType: values.DateType.value,
      FromDate: new Date(values.FromDate).toISOString().split("T")[0],
      ToDate: new Date(values.ToDate).toISOString().split("T")[0],
      Panel_ID: "",
      SessionCentreID: 1,
      SessionPanelID: localStorage.getItem("PanelID")
        ? localStorage.getItem("PanelID")
        : "",
      ColorCode: status,
      PageNo: page,
      PageSize: pageSize,
    };

    const formData = new FormData();
    for (const key in formattedValues) {
      formData.append(key, formattedValues[key]);
    }

    try {
      const dataResponse = await LabDetailnew(formData);
      console.log(dataResponse);
      if (dataResponse?.data.status == false) {
        setShownodata(true);
      }
      if (dataResponse?.status === 200) {
        if (page == 0) {
          setTotalPages(Math.ceil(dataResponse.data.data[0]?.TotalRecord / 25));
        }
        setBodyData((prevState) => ({
          ...prevState,
          ReceiptDetailnew: dataResponse.data.data,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const statusLabels = [
    { status: "1", label: "Pending", colorClass: "white" },
    { status: "2", label: "Rescheduled", colorClass: "rgb(178 222 237)" },
    { status: "14", label: "CheckIn", colorClass: "rgb(244, 244, 165)" },
    { status: "3", label: "Completed", colorClass: "rgb(144, 238, 144)" },
    { status: "7", label: "Booking Completed", colorClass: "rgb(0, 255, 255)" },
    {
      status: "8",
      label: "Reschedule Request",
      colorClass: "rgb(147, 112, 219)",
    },
    { status: "9", label: "Cancelled", colorClass: "rgb(231, 84, 128)" },
  ];

  const { handleChange, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: SearchPAYLOAD,
    onSubmit: async (values, { resetForm }) => {
      SearchBillPrintAPI(0);
    },
  });
  const handleDateChange = (date, name) => {
    const formattedDate = moment(date).format("DD-MMM-YYYY");
    handleChange({ target: { name, value: formattedDate } });
  };

  // const handleReactSelect = (name, value) => {
  //   if (name === "rblCon") {
  //     setFieldValue(name, value);
  //     SearchBillPrintAPI();
  //   }
  // };

  const handleReactSelect = (name, value) => {
    setFieldValue(name, value);
  };

  const handleCustomSelect = (index, name, value) => {
    const updatedData = bodyData.ReceiptDetailnew?.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFieldValue({ ...bodyData, ReceiptDetailnew: updatedData });
    console.log(updatedData);
  };

  return (
    <>
      {shownodata && (
        <NoDataMessage show={shownodata} setShow={setShownodata} />
      )}
      <form
        className="card patient_registration border"
        onSubmit={handleSubmit}
      >
        <Heading
          title={t("FrontOffice.Re_Print.label.Receipt_Reprint")}
          isBreadcrumb={true}
        />
        <div className="row  g-4 m-2">
          <ReactSelect
            placeholderName={t("Search Type")}
            id={"SearchType"}
            name={"SearchType"}
            searchable={true}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.SearchType}
            dynamicOptions={[
              {
                label: "AppId",
                value: "0",
              },
              {
                label: "EntryDate",
                value: "1",
              },
              {
                label: "AppDate",
                value: "2",
              },
              {
                label: "LastStatus",
                value: "3",
              },
            ]}
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
          <Input
            type="text"
            className="form-control"
            id="MobileNo."
            name="MobileNo"
            onChange={handleChange}
            value={values?.Mobile}
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            lable={t("Mobile")}
            placeholder=""
          />
          <Input
            type="text"
            className="form-control"
            id="PrebookingNo."
            name="PrebookingNo."
            onChange={handleChange}
            value={values?.Mobile}
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            lable={"PrebookingNo."}
            placeholder=""
          />
          <Input
            type="text"
            className="form-control"
            id="PatientName"
            name="PatientName"
            onChange={handleChange}
            value={values?.Mobile}
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            lable={"PatientName"}
            placeholder=""
          />
          <ReactSelect
            placeholderName={"Zone"}
            id={"Zone"}
            name={"Zone"}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            // Default selection
            value={values.Zone} // This should be an object like { label: "Ledger Transaction", value: 1 }
            dynamicOptions={[
              { label: "North", value: 1 },
              { label: "South", value: 2 },
              { label: "East", value: 3 },
              {
                label: "West",
                value: 4,
              },
            ]}
            handleChange={handleReactSelect} // Passes the selected option to the handler
          />
          <ReactSelect
            placeholderName={"State"}
            id={"State"}
            name={"State"}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            // Default selection
            value={values.State} // This should be an object like { label: "Ledger Transaction", value: 1 }
            dynamicOptions={[
              { label: "Delhi", value: 1 },
              { label: "UP", value: 2 },
              { label: "Bihar", value: 3 },
              {
                label: "West",
                value: 4,
              },
            ]}
            handleChange={handleReactSelect} // Passes the selected option to the handler
          />
          <ReactSelect
            placeholderName={"City"}
            id={"City"}
            name={"City"}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            // Default selection
            value={values.City} // This should be an object like { label: "Ledger Transaction", value: 1 }
            dynamicOptions={[
              { label: "NewDelhi", value: 1 },
              { label: "SouthDelhi", value: 2 },
              { label: "WestDelhi", value: 3 },
              {
                label: "Burari",
                value: 4,
              },
            ]}
            handleChange={handleReactSelect} // Passes the selected option to the handler
          />

          <ReactSelect
            placeholderName={"Location"}
            id={"Location"}
            name={"Location"}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            // Default selection
            value={values.Location} // This should be an object like { label: "Ledger Transaction", value: 1 }
            dynamicOptions={[
              { label: "NewDelhi", value: 1 },
              { label: "SouthDelhi", value: 2 },
              { label: "WestDelhi", value: 3 },
              {
                label: "Burari",
                value: 4,
              },
            ]}
            handleChange={handleReactSelect} // Passes the selected option to the handler
          />
          <ReactSelect
            placeholderName={"DropLocation"}
            id={"DropLocation"}
            name={"DropLocation"}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            // Default selection
            value={values.Location} // This should be an object like { label: "Ledger Transaction", value: 1 }
            dynamicOptions={[
              { label: "NewDelhi", value: 1 },
              { label: "SouthDelhi", value: 2 },
              { label: "WestDelhi", value: 3 },
              {
                label: "Burari",
                value: 4,
              },
            ]}
            handleChange={handleReactSelect} // Passes the selected option to the handler
          />
          <ReactSelect
            placeholderName={"Route"}
            id={"Route"}
            name={"Route"}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            // Default selection
            value={values.Route} // This should be an object like { label: "Ledger Transaction", value: 1 }
            dynamicOptions={[
              { label: "NewDelhi", value: 1 },
              { label: "SouthDelhi", value: 2 },
              { label: "WestDelhi", value: 3 },
              {
                label: "Burari",
                value: 4,
              },
            ]}
            handleChange={handleReactSelect} // Passes the selected option to the handler
          />
          <ReactSelect
            placeholderName={"Phlebo"}
            id={"Phlebo"}
            name={"Phlebo"}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            // Default selection
            value={values.Phlebo} // This should be an object like { label: "Ledger Transaction", value: 1 }
            dynamicOptions={[
              { label: "NewDelhi", value: 1 },
              { label: "SouthDelhi", value: 2 },
              { label: "WestDelhi", value: 3 },
              {
                label: "Burari",
                value: 4,
              },
            ]}
            handleChange={handleReactSelect} // Passes the selected option to the handler
          />

          <div className="col-2 d-flex align-items-center">
            <button className="btn btn-sm btn-info" onClick={handleSubmit}>
              {"Search"}
            </button>
            <button
              className="btn btn-sm btn-info"
              onClick={handleSubmit}
              style={{ marginLeft: "8px" }}
            >
              {"Print"}
            </button>
          </div>
          {statusLabels.map(({ status, label, colorClass }) => (
            <div
              key={status}
              className="col-sm-auto d-flex align-items-center flex-wrap"
              onClick={() => SearchBillPrintAPI(0, status)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="rounded-circle"
                style={{
                  width: "12px",
                  height: "12px",
                  marginRight: "8px",
                  backgroundColor: colorClass,
                  border: "0.1px solid grey",
                  borderRadius: "50%",
                }}
              ></div>
              <span className="btn-sm text-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </form>

      <div className="card patient_registration_card my-1 mt-2">
        {/* <PatientLabSearchTable
          THEAD={THEAD}
          tbody={bodyData?.ReceiptDetailnew}
          setBodyData={setBodyData}
          setFieldValue={setFieldValue}
          SearchBillPrintAPI={SearchBillPrintAPI}
          values={values}
          handleCustomSelect={handleCustomSelect}
        /> */}
        {/* <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={details?.totalcount}
                pageSize={details?.pagesize}
                onPageChange={(page) => setCurrentPage(page)}
              /> */}

        <CollectionTable THEAD={THEAD} tbody={bodyData?.ReceiptDetailnew} />
      </div>
    </>
  );
};

export default CollectionSearch;
