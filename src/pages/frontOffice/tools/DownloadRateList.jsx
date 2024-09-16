import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../../../components/UI/Heading";
import ReactSelect from "@app/components/formComponent/ReactSelect";
import { toast } from "react-toastify";
import { ExportToExcel } from "../../../utils/apiCalls";
import { fetchPanels } from "../../../utils/helperfunctions";
import { DownloadRate } from "../../../networkServices/opdserviceAPI";
import Tables from "../../../components/UI/customTable";
import Input from "../../../components/formComponent/Input";
const testData = [
  { DeptName: "Cardiology", ItemID: "1001", testcode: "C1001", ItemName: "ECG", MRP: 500, PatientRate: 450 },
  { DeptName: "Neurology", ItemID: "1002", testcode: "N1002", ItemName: "EEG", MRP: 1000, PatientRate: 950 },
  { DeptName: "Radiology", ItemID: "1003", testcode: "R1003", ItemName: "X-Ray Chest", MRP: 300, PatientRate: 280 },
  { DeptName: "Pathology", ItemID: "1004", testcode: "P1004", ItemName: "Blood Test", MRP: 200, PatientRate: 180 },
  { DeptName: "Oncology", ItemID: "1005", testcode: "O1005", ItemName: "Biopsy", MRP: 2500, PatientRate: 2400 },
  { DeptName: "Dermatology", ItemID: "1006", testcode: "D1006", ItemName: "Skin Allergy Test", MRP: 1500, PatientRate: 1400 },
  { DeptName: "Cardiology", ItemID: "1007", testcode: "C1007", ItemName: "Stress Test", MRP: 1200, PatientRate: 1150 },
  { DeptName: "Orthopedics", ItemID: "1008", testcode: "O1008", ItemName: "Bone Density Test", MRP: 2000, PatientRate: 1900 },
  { DeptName: "Neurology", ItemID: "1009", testcode: "N1009", ItemName: "Nerve Conduction Study", MRP: 2200, PatientRate: 2100 },
  { DeptName: "Gastroenterology", ItemID: "1010", testcode: "G1010", ItemName: "Endoscopy", MRP: 1800, PatientRate: 1700 },
  { DeptName: "Urology", ItemID: "1011", testcode: "U1011", ItemName: "Kidney Function Test", MRP: 1000, PatientRate: 950 },
  { DeptName: "Gynecology", ItemID: "1012", testcode: "G1012", ItemName: "Pap Smear", MRP: 600, PatientRate: 550 },
  { DeptName: "Ophthalmology", ItemID: "1013", testcode: "O1013", ItemName: "Eye Exam", MRP: 800, PatientRate: 750 },
  { DeptName: "Pulmonology", ItemID: "1014", testcode: "P1014", ItemName: "Lung Function Test", MRP: 1300, PatientRate: 1250 },
  { DeptName: "Endocrinology", ItemID: "1015", testcode: "E1015", ItemName: "Thyroid Function Test", MRP: 700, PatientRate: 650 },
  { DeptName: "Cardiology", ItemID: "1016", testcode: "C1016", ItemName: "Holter Monitor", MRP: 2500, PatientRate: 2400 },
  { DeptName: "Radiology", ItemID: "1017", testcode: "R1017", ItemName: "CT Scan", MRP: 3000, PatientRate: 2900 },
  { DeptName: "Neurology", ItemID: "1018", testcode: "N1018", ItemName: "MRI Brain", MRP: 3500, PatientRate: 3400 },
  { DeptName: "Cardiology", ItemID: "1019", testcode: "C1019", ItemName: "Echocardiogram", MRP: 1800, PatientRate: 1700 },
  { DeptName: "Gastroenterology", ItemID: "1020", testcode: "G1020", ItemName: "Colonoscopy", MRP: 2000, PatientRate: 1900 },
  { DeptName: "Radiology", ItemID: "1021", testcode: "R1021", ItemName: "Ultrasound Abdomen", MRP: 1500, PatientRate: 1400 },
  { DeptName: "Pathology", ItemID: "1022", testcode: "P1022", ItemName: "Urine Test", MRP: 200, PatientRate: 180 },
  { DeptName: "Oncology", ItemID: "1023", testcode: "O1023", ItemName: "PET Scan", MRP: 5000, PatientRate: 4800 },
  { DeptName: "Cardiology", ItemID: "1024", testcode: "C1024", ItemName: "Cardiac MRI", MRP: 4000, PatientRate: 3900 },
  { DeptName: "Neurology", ItemID: "1025", testcode: "N1025", ItemName: "Cerebral Angiogram", MRP: 4500, PatientRate: 4400 },
  { DeptName: "Dermatology", ItemID: "1026", testcode: "D1026", ItemName: "Mole Mapping", MRP: 1000, PatientRate: 950 },
  { DeptName: "Ophthalmology", ItemID: "1027", testcode: "O1027", ItemName: "Glaucoma Test", MRP: 900, PatientRate: 850 },
  { DeptName: "Orthopedics", ItemID: "1028", testcode: "O1028", ItemName: "Spine MRI", MRP: 3500, PatientRate: 3400 },
  { DeptName: "Pulmonology", ItemID: "1029", testcode: "P1029", ItemName: "Chest CT", MRP: 3000, PatientRate: 2900 },
  { DeptName: "Endocrinology", ItemID: "1030", testcode: "E1030", ItemName: "Glucose Tolerance Test", MRP: 1200, PatientRate: 1100 },
  { DeptName: "Cardiology", ItemID: "1031", testcode: "C1031", ItemName: "Coronary Angiography", MRP: 5500, PatientRate: 5400 },
  { DeptName: "Radiology", ItemID: "1032", testcode: "R1032", ItemName: "MRI Spine", MRP: 3500, PatientRate: 3400 },
  { DeptName: "Neurology", ItemID: "1033", testcode: "N1033", ItemName: "Nerve Biopsy", MRP: 2500, PatientRate: 2400 },
  { DeptName: "Gastroenterology", ItemID: "1034", testcode: "G1034", ItemName: "Liver Function Test", MRP: 800, PatientRate: 750 },
  { DeptName: "Urology", ItemID: "1035", testcode: "U1035", ItemName: "Prostate Biopsy", MRP: 3000, PatientRate: 2900 },
  { DeptName: "Gynecology", ItemID: "1036", testcode: "G1036", ItemName: "Mammography", MRP: 2000, PatientRate: 1900 },
  { DeptName: "Ophthalmology", ItemID: "1037", testcode: "O1037", ItemName: "Retina Scan", MRP: 1500, PatientRate: 1400 },
  { DeptName: "Pulmonology", ItemID: "1038", testcode: "P1038", ItemName: "Bronchoscopy", MRP: 2500, PatientRate: 2400 },
  { DeptName: "Endocrinology", ItemID: "1039", testcode: "E1039", ItemName: "Insulin Level Test", MRP: 700, PatientRate: 650 },
  { DeptName: "Cardiology", ItemID: "1040", testcode: "C1040", ItemName: "Tilt Table Test", MRP: 1500, PatientRate: 1400 },
  { DeptName: "Radiology", ItemID: "1041", testcode: "R1041", ItemName: "PET CT", MRP: 5000, PatientRate: 4800 },
  { DeptName: "Neurology", ItemID: "1042", testcode: "N1042", ItemName: "Sleep Study", MRP: 3000, PatientRate: 2900 },
  { DeptName: "Gastroenterology", ItemID: "1043", testcode: "G1043", ItemName: "Hepatitis Test", MRP: 1200, PatientRate: 1100 }]

const DownloadRateList = () => {
  const [t] = useTranslation();
  const [PanelId, setPanelId] = useState(null);
  const [Panels, setPanels] = useState([]);
  const [tableData, setTableData] = useState([]); // Original data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const itemsPerPage = 25; // You can adjust this number
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredData?.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (type) => {
    if (PanelId == null) {
      toast.error("Please Select Client");
    } else {
      const formData = new FormData();
      formData.append("Panel_Id", PanelId?.value);
      const dataResponse = await DownloadRate(formData);

      if (dataResponse?.status === 200) {
        if (type === "down") {
          ExportToExcel(dataResponse.data.data);
        }
        if (type === "table") {
          const combinedData = [...dataResponse.data.data, ...testData];
          setTableData(combinedData); // Set tableData to the full response initially
          setFilteredData(combinedData); // Also set filteredData initially to the full response
          setCurrentPage(1); // Reset to the first page
        }
      }
    }
  };

  const THEAD = [
    "S.No.",
    "Department",
    "TestCode",
    "TestName",
    "MRP",
    "PatientRate",
  ];

  const handlePanel = (name, value) => {
    setPanelId(value);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
        // If the search query is empty, reset the filtered data to the original table data
        setFilteredData(tableData);
    } else {
        const filtered = tableData.filter((item) =>
            item.testcode.toLowerCase().includes(query) ||
            item.ItemName.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to the first page after search
    }
  };

  useEffect(() => {
    fetchPanels(setPanels);
  }, []);

  return (
    <>
      <div className="card patient_registration">
        <Heading
          title={t("FrontOffice.Tools.label.Manage_Debit_Credit_Note")}
          isBreadcrumb={true}
        />
        <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1 p-2">
          <ReactSelect
            placeholderName={t("Client")}
            id={"Panel"}
            name={"Panel_ID"}
            searchable={true}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={PanelId}
            dynamicOptions={Panels}
            handleChange={handlePanel}
          />
          <div className="col-sm-2">
            <button className="btn btn-sm btn-success" onClick={() => { handleSubmit('table') }}>
              Search
            </button>
            <button style={{ marginLeft: '5px' }} className="btn btn-sm btn-success" onClick={() => { handleSubmit('down') }}>
              Download
            </button>
          </div>
          {tableData.length > 0 && (
            <div className="col-sm-4">
              <Input
                type="text"
                className="form-control"
                lable="Search by Code or Test Name"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          )}
        </div>
      </div>

    
        <div className="row g-4 m-2">
          <Tables
            style={{ width: "100%" }}
            thead={THEAD}
            tbody={currentItems?.map((ele, index) => ({
              "S.No.": indexOfFirstItem + index + 1, // Adjusting serial number based on pagination
              "Department": ele?.DeptName,
              "TestCode": ele?.testcode,
              "TestName": ele?.ItemName,
              "MRP": ele?.MRP,
              "PatientRate": ele?.PatientRate,
            }))}
            tableHeight={"tableHeight"}
          />
          <CustomPaginationfront
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
    
    </>
  );
};

export default DownloadRateList;

const CustomPaginationfront = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Ensure totalPages is a valid number greater than 0
  if (totalPages <= 0) {
    return null; // or return some other UI indicating no pages
  }

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="pagination-button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};
