import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../../../components/UI/Heading";
import Input from "@app/components/formComponent/Input";
import DatePicker from "@app/components/formComponent/DatePicker";
import { useFormik } from "formik";
import { RECEIPT_REPRINT_PAYLOAD, SEARCHBY } from "../../../utils/constant";
import { Tabfunctionality } from "../../../utils/helpers";
import { ReceiptDetailnew } from "../../../networkServices/opdserviceAPI";
import ReceiptReprintTable from "../../../components/UI/customTable/ReprintTable/ReceiptReprintTable";
import moment from "moment";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { Label } from "rc-easyui";
import axios from "axios";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { fetchPanels, getCentres } from "../../../utils/helperfunctions";
import CustomPagination from "../../../utils/CustomPagination";
import NoDataMessage from "../../../utils/NoDataMessage";
import { useNavigate } from "react-router-dom";
import SettlementTable from "../../../components/UI/customTable/ReprintTable/SettlementTable";

const ReceiptSRSSettlement = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const [bodyData, setBodyData] = useState({ ReceiptDetailnew: [] });
  const [shownodata, setShownodata] = useState(false);
  const [Centres, setCenters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const dummyData = [
    {
      "Sr. No.": 1,
      BillDate: "2024-08-01",
      "Lab No.": "L001",
      PatientName: "John Doe",
      Centre: "Central Hospital",
      Client: "Client A",
      Doctor: "Dr. Smith",
      GrossAmount: 1500,
      DiscAmount: 100,
      NetAmount: 1400,
      PaidAmount: 1000,
      DueAmount: 400,
      Select: false,
    },
    {
      "Sr. No.": 2,
      BillDate: "2024-08-02",
      "Lab No.": "L002",
      PatientName: "Jane Smith",
      Centre: "Westside Clinic",
      Client: "Client B",
      Doctor: "Dr. Johnson",
      GrossAmount: 2000,
      DiscAmount: 200,
      NetAmount: 1800,
      PaidAmount: 1800,
      DueAmount: 0,
      Select: false,
    },
    {
      "Sr. No.": 3,
      BillDate: "2024-08-03",
      "Lab No.": "L003",
      PatientName: "Alice Brown",
      Centre: "East Medical Center",
      Client: "Client C",
      Doctor: "Dr. Lee",
      GrossAmount: 2500,
      DiscAmount: 150,
      NetAmount: 2350,
      PaidAmount: 2000,
      DueAmount: 350,
      Select: false,
    },
    {
      "Sr. No.": 4,
      BillDate: "2024-08-04",
      "Lab No.": "L004",
      PatientName: "Bob White",
      Centre: "Southside Health",
      Client: "Client D",
      Doctor: "Dr. Patel",
      GrossAmount: 1800,
      DiscAmount: 180,
      NetAmount: 1620,
      PaidAmount: 1500,
      DueAmount: 120,
      Select: false,
    },
    {
      "Sr. No.": 5,
      BillDate: "2024-08-05",
      "Lab No.": "L005",
      PatientName: "Charlie Green",
      Centre: "North Clinic",
      Client: "Client E",
      Doctor: "Dr. Nguyen",
      GrossAmount: 2200,
      DiscAmount: 220,
      NetAmount: 1980,
      PaidAmount: 1980,
      DueAmount: 0,
      Select: false,
    },
  ];

  const navigate = useNavigate();
  const THEAD = [
    "Sr. No.",
    "BillDate",
    "Lab No.",
    "PatientName",
    "Centre",
    "Client",
    "Doctor",
    "GrossAmount",
    "DiscAmount",
    "NetAmount",
    "PaidAmount",
    "DueAmount",
    "Select",
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    SearchBillPrintAPI("", page); // Trigger API call with the new page
  };

  const SearchBillPrintAPI = async (colorCode, page, pageSize = 25) => {
    const formattedValues = {
      SearchType: values?.SearchType.value,
      FromDate: new Date(values.FromDate).toISOString().split("T")[0],
      ToDate: new Date(values.ToDate).toISOString().split("T")[0],
      Panel_ID: 252,
      SessionCentreID: 1,
      SessionPanelID: localStorage.getItem("PanelID")
        ? localStorage.getItem("PanelID")
        : "",
      ColorCode: colorCode, // Use the renamed parameter here
      PageNo: page,
      PageSize: pageSize,
    };

    const formData = new FormData();
    for (const key in formattedValues) {
      formData.append(key, formattedValues[key]);
    }

    try {
      const dataResponse = await ReceiptDetailnew(formData);

      if (dataResponse?.data.status === false) {
        setShownodata(true);
      }

      if (dataResponse?.status === 200) {
        if (page === 0) {
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

  const { handleChange, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: RECEIPT_REPRINT_PAYLOAD,
    onSubmit: async (values, { resetForm }) => {
      SearchBillPrintAPI("", 0);
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
  const statusLabels = [
    { status: "1", label: "Full Paid", colorClass: "#00fa9a" },
    { status: "2", label: "Partial Paid", colorClass: "#f6a9d1" },
    { status: "3", label: "Fully UnPaid", colorClass: "#ff457c" },
    { status: "4", label: "Credit", colorClass: "#F0FFF0" },
    { status: "6", label: "Full Refund", colorClass: "#018eff" },
  ];
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

  const handleEditInfo = (index) => {
    console.log(bodyData?.ReceiptDetailnew[index]?.LabNo);
    navigate("/RegistrationEdit", {
      state: {
        data: bodyData?.ReceiptDetailnew[index]?.LabNo,
        edit: true,
      },
    });
  };
  const handleSettlement = () => {};
  const handleCashReceipt = () => {};

  useEffect(() => {
    getCentres(setCenters);
  }, []);

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
          title={"FrontOffice.Re_Print.label.Receipt_Reprint"}
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

          <ReactSelect
            placeholderName={t("Client")}
            id={"Panel"}
            name={"Panel_ID"}
            searchable={true}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.Panel_ID}
            dynamicOptions={Centres}
            handleChange={handleReactSelect}
          />
          <div className="col-2">
            <button className="btn btn-sm btn-info" onClick={handleSubmit}>
              {"Search"}
            </button>
          </div>
          {/* <div className="row g-4 m-2">
          <div className="d-flex flex-wrap justify-content-center">
            {statusLabels.map(({ status, label, colorClass }) => (
              <div
                key={status}
                className="d-flex align-items-center m-1"
                onClick={() => SearchBillPrintAPI(status,0)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="rounded-circle"
                  style={{
                    width: "12px",
                    height: "12px",
                    marginRight: "4px",
                    backgroundColor: colorClass, // Set background color
                    border: "0.5px solid #000", // Slight border with a neutral color (black or grey)
                  }}
                ></div>
                <span className="btn-sm">{label}</span>
              </div>
            ))}
          </div>
        </div> */}
        </div>
      </form>

      <div className="card patient_registration_card my-1 mt-2">
        <SettlementTable
          THEAD={THEAD}
          tbody={dummyData}
          setBodyData={setBodyData}
          setFieldValue={setFieldValue}
          SearchBillPrintAPI={SearchBillPrintAPI}
          values={values}
          handleCustomSelect={handleCustomSelect}
          handleEditInfo={handleEditInfo}
          handleSettlement={handleSettlement}
          handleCashReceipt={handleCashReceipt}
        />
        {dummyData.length > 0 && (
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <div className="card patient_registration_card my-1 mt-2">
        <Heading title={"Payment Details"} />
        <div className="row g-4 mt-2 p-1">
          <Input
            className="form-control"
            respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            lable="Item"
          />
          <ReactSelect
            placeholderName={"PayBy"}
            name="PayBy"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <Input
            className="form-control"
            respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            lable="Paid Amount"
          />
          <Input
            className="form-control"
            respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            lable="Balance Amount"
          />
          <Input
            className="form-control"
            respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            lable="Currency Round"
          />
          <Input
            className="form-control"
            respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            lable="Currency"
          />
          <Input
            className="form-control"
            respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            lable="Payment Mode"
          />
          <Input 
          style={{marginLeft:"10px"}}
          type="checkbox"
          />
          <label className="ml-2">Refund</label>
        </div>
      </div>
    </>
  );
};

export default ReceiptSRSSettlement;
