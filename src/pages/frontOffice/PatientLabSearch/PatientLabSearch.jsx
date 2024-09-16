import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../../../components/UI/Heading";
import Input from "@app/components/formComponent/Input";
import DatePicker from "@app/components/formComponent/DatePicker";
import { useFormik } from "formik";
import { RECEIPT_REPRINT_PAYLOAD, SEARCHBY } from "../../../utils/constant";
import { Tabfunctionality } from "../../../utils/helpers";
import {
  LabDetailnew,
  ReceiptDetailnew,
} from "../../../networkServices/opdserviceAPI";
import ReceiptReprintTable from "../../../components/UI/customTable/ReprintTable/ReceiptReprintTable";
import moment from "moment";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { Label } from "rc-easyui";
import axios from "axios";
import PatientLabSearchTable from "../../../components/UI/customTable/LabSearchTables/PatientLabSearchTable";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import NoDataMessage from "../../../utils/NoDataMessage";
import CustomPagination from "../../../utils/CustomPagination";
// import Pagination from "../../../utils/Pageination";

const PatientLabSearch = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;

  const [details, setDetails] = useState({
    pagesize: 25,
    totalcount: 100,
  });

  const [t] = useTranslation();
  const [shownodata, setShownodata] = useState(false);
  const [bodyData, setBodyData] = useState({ ReceiptDetailnew: [] });
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
    "EntryDateTime",
    "VistNo.",
    "SIN No.",
    "PatientName",
    "Age/Sex",
    "Doctor",
    "Investigation",
    "Select",
    "Print",
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
          setTotalPages(
            Math.ceil(dataResponse.data.data[0]?.TotalRecord / 25)
          );
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
    { status: "1", label: "New", colorClass: "#CC99FF" },
    { status: "2", label: "Sample Collected", colorClass: "bisque" },
    { status: "14", label: "Sample Rejected", colorClass: "#FF0000" },
    { status: "3", label: "Dept Receive", colorClass: "white" },
    { status: "7", label: "Tested", colorClass: "#FFC0CB" },
    { status: "8", label: "Approved", colorClass: "#90EE90" },
    { status: "9", label: "Printed", colorClass: "#00FFFF" },
    { status: "10", label: "Hold", colorClass: "#FFFF00" },
    { status: "13", label: "Dispatched", colorClass: "#44A3AA" },
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
            dynamicOptions={SEARCHBY}
            handleChange={handleReactSelect}
          />
          <Input
            type="text"
            className="form-control"
            id="SearchValue"
            name="SearchValue"
            onChange={handleChange}
            value={values?.SearchValue}
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            lable={t("SearchValue")}
          />
          <ReactSelect
            placeholderName={"DateType"}
            id={"DateType"}
            name={"DateType"}
            lable={"DateType"}
            searchable={true}
            defaultValue={{ label: "ApprovedDate", value: "plo.ApprovedDate" }}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.DateType}
            dynamicOptions={DateTypes}
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

            <div className="form-check ml-3" style={{ marginLeft: "12px" }}>
              <input
                type="checkbox"
                className="form-check-input"
                id="isHeaderCheckbox"
                name="isSelected"
                checked={values?.isHeader}
                onChange={() => setFieldValue("isHeader", !values?.isHeader)}
              />
              <label
                className="form-check-label"
                htmlFor="isHeaderCheckbox"
                style={{ marginLeft: "4px" }}
              >
                {"Header"}
              </label>
            </div>
          </div>
        </div>
        <div className="container">
  <div className="row g-2 m-2 justify-content-center">
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
borderRadius:"50%"
          }}
        ></div>
        <span className="btn-sm text-nowrap">{label}</span>
      </div>
    ))}
  </div>
</div>

      </form>

      <div className="card patient_registration_card my-1 mt-2">
        <PatientLabSearchTable
          THEAD={THEAD}
          tbody={bodyData?.ReceiptDetailnew}
          setBodyData={setBodyData}
          setFieldValue={setFieldValue}
          SearchBillPrintAPI={SearchBillPrintAPI}
          values={values}
          handleCustomSelect={handleCustomSelect}
        />
        {/* <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={details?.totalcount}
                pageSize={details?.pagesize}
                onPageChange={(page) => setCurrentPage(page)}
              /> */}
        {bodyData?.ReceiptDetailnew.length > 0 && (
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default PatientLabSearch;
