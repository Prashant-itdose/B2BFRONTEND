import React, { useState } from "react";
import Input from "../components/formComponent/Input";
import { Link } from "react-router-dom";
import Accordion from "@app/components/UI/Accordion";
// import { CentreMasterSchema } from "./Schemas";
import CompanyTable from "../components/UI/customTable/CompanyTable";

const CompanyMaster = () => {
  const [showScreen, setShowScreen] = useState(true);
  const [formData, setFormData] = useState({
    CompanyName: "",
    CompanyCode: "",
    IsActive: true,
    GSTApplicable: true,
    GSTNo: "",
    PanNo: "",
    PathScanURL: "",
    PathScanUserCount: "",
    DocApprovalURL: "",
    DocApprovalCount: "",
    BankName: "",
    BeneficiaryName: "",
    BankAccountNo: "",
    IFSCCode: "",
    UserName: "",
    Password: "",
    EmailID: "",
    MobileNo: "",
  });
  const [searchFormdata, setsearchformdata] = useState({
    CompanyName: "",
    CompanyCode: "",
  });
  const [tabledata, settabledata] = useState([]);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setsearchformdata({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const error = CentreMasterSchema(formData);
    setErrors(error);
    console.log(error);
    // Validation and submit logic here
  };
  const handleSearch = () => {
    settabledata([
      {
        CompanyCode: "ITD",
        CompanyName: "ITDOSE",
        CompanyId: 1,
      },
      {
        CompanyCode: "OLV",
        CompanyName: "OLIVEHEALTHCARE",
        CompanyId: 2,
      },
      {
        CompanyCode: "BLY",
        CompanyName: "BAILEY",
        CompanyId: 3,
      },
      {
        CompanyCode: "GEN",
        CompanyName: "GENOMI",
        CompanyId: 4,
      },
    ]);
  };

  const handleReset = () => {
    setFormData({
      CompanyName: "",
      CompanyCode: "",
      IsActive: true,
      GSTApplicable: true,
      GSTNo: "",
      PanNo: "",
      PathScanURL: "",
      PathScanUserCount: "",
      DocApprovalURL: "",
      DocApprovalCount: "",
      BankName: "",
      BeneficiaryName: "",
      BankAccountNo: "",
      IFSCCode: "",
      UserName: "",
      Password: "",
      EmailID: "",
      MobileNo: "",
    });
    setErrors({});
  };
  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? 1 : 0 });
  };
  const setEdit = () => {
    settabledata([]);
    setShowScreen(true);
  };

  return (
    <>
      {showScreen ? (
        <>
          <div className="card-header">
            <h4 className="card-title w-100 d-flex justify-content-between">
              <>
                <div className="">Company Master</div>
                <Link
                  style={{ marginRight: "15px" }}
                  onClick={() => {
                    setShowScreen(false);
                  }}
                >
                  BacktoList
                </Link>
              </>
            </h4>
          </div>
          <div className="row  g-4 pt-2 pl-2 pr-2">
            
              <div className="row">
                <Input
                  type="text"
                  className="form-control required-fields"
                  id="CompanyName"
                  name="CompanyName"
                  value={formData?.CompanyName}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"CompanyName"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />

                <Input
                  type="text"
                  className="form-control required-fields"
                  id="CompanyCode"
                  name="CompanyCode"
                  value={formData?.CompanyCode}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"CompanyCode"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />

                {/* <Input
                    type="text"
                    className="form-control"
                    name="GSTApplicable"
                    value={formData?.GSTApplicable}
                    onChange={handleInputChange}
                    readOnly={true}
                    lable={"GSTApplicable"}
                    placeholder=" "
                    respclass="col-4"
                  /> */}

                <Input
                  type="text"
                  className="form-control"
                  name="GSTNo"
                  id="GSTNo"
                  value={formData?.GSTNo}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"GSTNo"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control"
                  name="PanNo"
                  id="PanNo"
                  value={formData?.PanNo}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"PanNumber"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control"
                  name="PathScanURL"
                  id="PathScanURL"
                  value={formData?.PathScanURL}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"PathScanURL"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control"
                  name="PathScanUserCount"
                  id="PathScanUserCount"
                  value={formData?.PathScanUserCount}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"PathScanUserCount"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control"
                  name="DocApprovalURL"
                  id="DocApprovalURL"
                  value={formData?.DocApprovalURL}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"DocApprovalURL"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control"
                  name="DocApprovalCount"
                  id="DocApprovalCount"
                  value={formData?.DocApprovalCount}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"DocApprovalCount"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control"
                  name="BankName"
                  id="BankName"
                  value={formData?.BankName}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"BankName"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control"
                  name="BeneficiaryName"
                  id="BeneficiaryName"
                  value={formData?.BeneficiaryName}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"BeneficiaryName"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control"
                  name="BankAccountNo"
                  id="BankAccountNo"
                  value={formData?.BankAccountNo}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"BankAccountNo"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control"
                  id="IFSCCode"
                  name="IFSCCode"
                  value={formData?.IFSCCode}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"IFSCCode"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control"
                  name="UserName"
                  id="UserName"
                  value={formData?.UserName}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"UserName"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  id="Password"
                  className="form-control"
                  name="Password"
                  value={formData?.Password}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"Password"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control required-fields"
                  id="EmailID"
                  name="EmailID"
                  value={formData?.EmailID}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"EmailID"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <Input
                  type="text"
                  className="form-control required-fields"
                  name="MobileNo"
                  id="MobileNo"
                  value={formData?.MobileNo}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"MobileNo"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-12"
                />
                <div className="col-xl-2 col-md-3 col-sm-4 col-12 d-flex">
                <button className="btn btn-primary btn-sm  w-50 ml-1" type="button">Save</button>
                <button className="btn btn-danger btn-sm  w-50 ml-1" type="button">Reset</button>
                </div>
                
              </div>
            
          </div>
        </>
      ) : (
        <>
          
          <div className="card-header">
            <h4 className="card-title w-100 d-flex justify-content-between">
              <>
                <div className="">Company List</div>
                <Link
                  style={{ marginRight: "15px" }}
                  onClick={() => {
                    setShowScreen(true);
                  }}
                >
                  Create
                </Link>
              </>
            </h4>
          </div>
          <div className="row  g-4 pt-2 pl-2 pr-2">
            <div className="row">
            <div className="d-flex">
            <Input
                  type="text"
                  className="form-control"
                  id="CompanyName"
                  name="CompanyName"
                  value={formData?.CompanyName}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"CompanyName"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-4"
                />

                <Input
                  type="text"
                  className="form-control "
                  id="CompanyCode"
                  name="CompanyCode"
                  value={formData?.CompanyCode}
                  onChange={handleInputChange}
                  readOnly={true}
                  lable={"CompanyCode"}
                  placeholder=" "
                  respclass="col-xl-2 col-md-3 col-sm-4 col-4"
                />
                <button className="btn btn-primary btn-sm  w-50 ml-1" type="button" onClick={handleSearch}>Search</button>
                </div>
                </div>
                

                {/* <Input
                    type="text"
                    className="form-control"
                    name="GSTApplicable"
                    value={formData?.GSTApplicable}
                    onChange={handleInputChange}
                    readOnly={true}
                    lable={"GSTApplicable"}
                    placeholder=" "
                    respclass="col-4"
                  /> */}
            
               
                
            
          </div>
              {
            tabledata.length>0&&(
                <CompanyTable tbody={tabledata}/>
            )
          }
        </>
      )}
    </>
  );
};

export default CompanyMaster;
