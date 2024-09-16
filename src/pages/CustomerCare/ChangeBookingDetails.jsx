import React, { useState } from "react";
import DatePicker from "../../components/formComponent/DatePicker";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Input from "../../components/formComponent/Input";
import Heading from "../../components/UI/Heading";

const ChangeBookingDetails = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;

  const [formData, setFormData] = useState({
    FromDate: "",
    ToDate: "",
    Mobile: "",
    PreBookingId: "",
    Zone: "",
    State: "",
    City: "",
    Phlebotomist: "",
    Type: "",
  });
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="card">
      <Heading
        title={
          (formData?.Type == "1" && "Home Collection Change Phlebotomist") ||
          (formData?.Type == "2" && "Home Collection Change Drop Location") ||
          (formData?.Type == "3" && "Phelebotomist Holiday")
        }
      />
      <div className="row g-4 m-2">
        <ReactSelect
          placeholderName={"Select"}
          id={"Type"}
          name={"Type"}
          respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          value={formData.Type}
          dynamicOptions={[
            { label: "Home Collection Change Phlebotomist", value: 1 },
            { label: "Home Collection Change Drop Location", value: 2 },
            { label: "Phelebotomist Holiday", value: 3 },
          ]}
          handleChange={handleDeliveryChange}
        />
        {formData?.Type == "1" && (
          <>
            <DatePicker
              className="custom-calendar"
              id="FromDate"
              name="FromDate"
              lable="From Date"
              placeholder={VITE_DATE_FORMAT}
              value={formData?.FromDate}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              handleChange={searchHandleChange}
            />
            <DatePicker
              className="custom-calendar"
              id="ToDate"
              name="ToDate"
              lable="To Date"
              placeholder={VITE_DATE_FORMAT}
              value={formData?.ToDate}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              handleChange={searchHandleChange}
            />
            <Input
              type="text"
              className="form-control"
              id="Mobile"
              name="Mobile"
              lable="Mobile"
              onChange={searchHandleChange}
              value={formData?.Mobile}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            />
            <Input
              type="text"
              className="form-control"
              id="PreBookingId"
              name="PreBookingId"
              lable="PreBookingId"
              onChange={searchHandleChange}
              value={formData?.PreBookingId}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            />
            <ReactSelect
              placeholderName={"Zone"}
              id={"Zone"}
              name={"Zone"}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              value={formData.Zone}
              dynamicOptions={[
                { label: "North", value: 1 },
                { label: "South", value: 2 },
                { label: "East", value: 3 },
                {
                  label: "West",
                  value: 4,
                },
              ]}
              handleChange={handleDeliveryChange}
            />
            <ReactSelect
              placeholderName={"State"}
              id={"State"}
              name={"State"}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              value={formData.State}
              dynamicOptions={[
                { label: "Delhi", value: 1 },
                { label: "UP", value: 2 },
                { label: "Bihar", value: 3 },
                {
                  label: "West",
                  value: 4,
                },
              ]}
              handleChange={handleDeliveryChange}
            />
            <ReactSelect
              placeholderName={"City"}
              id={"City"}
              name={"City"}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              value={formData.City}
              dynamicOptions={[
                { label: "NewDelhi", value: 1 },
                { label: "SouthDelhi", value: 2 },
                { label: "WestDelhi", value: 3 },
                {
                  label: "Burari",
                  value: 4,
                },
              ]}
              handleChange={handleDeliveryChange}
            />
            <ReactSelect
              placeholderName={"Phlebotomist"}
              id={"Phlebotomist"}
              name={"Phlebotomist"}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              value={formData.Phlebotomist}
              dynamicOptions={[
                { label: "Phlebotomist1", value: 1 },
                { label: "Phlebotomist2", value: 2 },
              ]}
              handleChange={handleDeliveryChange}
            />
            <div className="col-2">
              <button className="btn btn-sm btn-info">Search</button>
            </div>
          </>
        )}
        {formData?.Type == "2" && (
          <>
            <DatePicker
              className="custom-calendar"
              id="FromDate"
              name="FromDate"
              lable="From Date"
              placeholder={VITE_DATE_FORMAT}
              value={formData?.FromDate}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              handleChange={searchHandleChange}
            />
            <DatePicker
              className="custom-calendar"
              id="ToDate"
              name="ToDate"
              lable="To Date"
              placeholder={VITE_DATE_FORMAT}
              value={formData?.ToDate}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              handleChange={searchHandleChange}
            />
            <Input
              type="text"
              className="form-control"
              id="Mobile"
              name="Mobile"
              lable="Mobile"
              onChange={searchHandleChange}
              value={formData?.Mobile}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            />
            <Input
              type="text"
              className="form-control"
              id="PreBookingId"
              name="PreBookingId"
              lable="PreBookingId"
              onChange={searchHandleChange}
              value={formData?.PreBookingId}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            />
            <ReactSelect
              placeholderName={"Zone"}
              id={"Zone"}
              name={"Zone"}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              value={formData.Zone}
              dynamicOptions={[
                { label: "North", value: 1 },
                { label: "South", value: 2 },
                { label: "East", value: 3 },
                {
                  label: "West",
                  value: 4,
                },
              ]}
              handleChange={handleDeliveryChange}
            />
            <ReactSelect
              placeholderName={"State"}
              id={"State"}
              name={"State"}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              value={formData.State}
              dynamicOptions={[
                { label: "Delhi", value: 1 },
                { label: "UP", value: 2 },
                { label: "Bihar", value: 3 },
                {
                  label: "West",
                  value: 4,
                },
              ]}
              handleChange={handleDeliveryChange}
            />
            <ReactSelect
              placeholderName={"City"}
              id={"City"}
              name={"City"}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              value={formData.City}
              dynamicOptions={[
                { label: "NewDelhi", value: 1 },
                { label: "SouthDelhi", value: 2 },
                { label: "WestDelhi", value: 3 },
                {
                  label: "Burari",
                  value: 4,
                },
              ]}
              handleChange={handleDeliveryChange}
            />
            <ReactSelect
              placeholderName={"Phlebotomist"}
              id={"Phlebotomist"}
              name={"Phlebotomist"}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              value={formData.Phlebotomist}
              dynamicOptions={[
                { label: "Phlebotomist1", value: 1 },
                { label: "Phlebotomist2", value: 2 },
              ]}
              handleChange={handleDeliveryChange}
            />
            <div className="col-2">
              <button className="btn btn-sm btn-info">Search</button>
            </div>
          </>
        )}
        {formData?.Type == "3" && (
          <>
            <ReactSelect
              placeholderName={"State"}
              id={"State"}
              name={"State"}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              value={formData.State}
              dynamicOptions={[
                { label: "Delhi", value: 1 },
                { label: "UP", value: 2 },
                { label: "Bihar", value: 3 },
                {
                  label: "West",
                  value: 4,
                },
              ]}
              handleChange={handleDeliveryChange}
            />
            <ReactSelect
              placeholderName={"City"}
              id={"City"}
              name={"City"}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              value={formData.City}
              dynamicOptions={[
                { label: "NewDelhi", value: 1 },
                { label: "SouthDelhi", value: 2 },
                { label: "WestDelhi", value: 3 },
                {
                  label: "Burari",
                  value: 4,
                },
              ]}
              handleChange={handleDeliveryChange}
            />
            <DatePicker
              className="custom-calendar"
              id="FromDate"
              name="FromDate"
              lable="From Date"
              placeholder={VITE_DATE_FORMAT}
              value={formData?.FromDate}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              handleChange={searchHandleChange}
            />
            <DatePicker
              className="custom-calendar"
              id="ToDate"
              name="ToDate"
              lable="To Date"
              placeholder={VITE_DATE_FORMAT}
              value={formData?.ToDate}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              handleChange={searchHandleChange}
            />
        
            <ReactSelect
              placeholderName={"Phlebotomist"}
              id={"Phlebotomist"}
              name={"Phlebotomist"}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              value={formData.Phlebotomist}
              dynamicOptions={[
                { label: "Phlebotomist1", value: 1 },
                { label: "Phlebotomist2", value: 2 },
              ]}
              handleChange={handleDeliveryChange}
            />
            <div className="col-2">
              <button className="btn btn-sm btn-info">Save</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ChangeBookingDetails;
