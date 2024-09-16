import React, { useState } from 'react';

import moment from 'moment';
import ReactSelect from '../components/formComponent/ReactSelectHead';
import Input from '../components/formComponent/Input';
import DatePicker from '../components/formComponent/DatePicker';
import Modal from '../components/modalComponent/Modal';
import Heading from '../components/UI/Heading';

const SupplierLocationDetail = ({ values, handleReactSelect, handleChange }) => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const { VITE_DATE_FORMAT } = import.meta.env;
  // Function to handle opening the modal for adding a new project
  const handleNewProjectModal = () => {
    setShowNewProjectModal(true);
  };

  // Function to handle closing the new project modal
  const handleCloseNewProjectModal = () => {
    setShowNewProjectModal(false);
  };

  // Function to handle opening the modal for editing the shipping address
  const handleEditAddressModal = () => {
    setShowEditAddressModal(true);
  };

  // Function to handle closing the edit address modal
  const handleCloseEditAddressModal = () => {
    setShowEditAddressModal(false);
  };

  return (
    <div className="card patient_registration border">
      <Heading title={"Supplier And Location Detail"} />

      <div className="row g-4 m-2">
        {/* Project Dropdown with Add New Project Button */}
        <div className="col-xl-2 col-md-4 col-sm-6 col-12 d-flex align-items-center">
          <ReactSelect
            placeholderName={"Project"}
            id={"Project"}
            name={"Project"}
            searchable={true}
            respclass='col-10'
            value={values?.Project}
            dynamicOptions={[{ label: 'Dummyproj', value: '' }]}
            handleChange={handleReactSelect}
          />
          <button
            type="button"
            className="btn btn-link p-0"
            style={{ marginLeft: '8px' }}
            onClick={handleNewProjectModal}
          >
            <i className="pi pi-plus" style={{ fontSize: '1rem' }}></i>
          </button>
        </div>

        {/* Supplier State Dropdown */}
        <div className="col-xl-2 col-md-4 col-sm-6 col-12">
          <ReactSelect
            placeholderName={"SupplierState"}
            id={"SupplierState"}
            name={"Supplier"}
            searchable={true}
            respclass="col-12"
            value={values?.Supplier}
            dynamicOptions={[{ label: 'State', value: '' }]}
            handleChange={handleReactSelect}
          />
        </div>

        {/* GstNo Input */}
        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <Input
            type="text"
            className="form-control"
            id="GstNo"
            name="GstNo"
            onChange={handleChange}
            value={values?.GstNo}
            respclass="col-12"
            lable={"Gst No."}
          />
        </div>

        {/* Address Input */}
        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <Input
            type="text"
            className="form-control"
            id="Address"
            name="Address"
            onChange={handleChange}
            value={values?.Address}
            respclass="col-12"
            lable={"Address"}
          />
        </div>

        {/* Bill Name Input */}
        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <Input
            type="text"
            className="form-control"
            id="BillName"
            name="BillName"
            onChange={handleChange}
            value={values?.BillName}
            respclass="col-12"
            lable={"Bill Name"}
          />
        </div>

        {/* From Date Picker */}
        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
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
            lable={"From Date"}
            placeholder={VITE_DATE_FORMAT}
            respclass="col-12"
          />
        </div>

        {/* To Date Picker */}
        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
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
            lable={"To Date"}
            placeholder={VITE_DATE_FORMAT}
            respclass="col-12"
          />
        </div>

        {/* PO Number Input */}
        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <Input
            type="text"
            className="form-control"
            id="PONumber"
            name="PONumber"
            onChange={handleChange}
            value={values?.PONumber}
            respclass="col-12"
            lable={"PO No."}
          />
        </div>
      </div>

      {/* Modal for Adding a New Project */}
      <Modal visible={showNewProjectModal} onHide={handleCloseNewProjectModal} header="Add New Project">
        {/* New project form content goes here */}
        <p>Form for adding a new project.</p>
        <button type="button" onClick={handleCloseNewProjectModal}>
          Close
        </button>
      </Modal>

      {/* Modal for Editing Shipping Address */}
      <Modal visible={showEditAddressModal} onHide={handleCloseEditAddressModal} header="Edit Shipping Address">
        {/* Edit address form content goes here */}
        <p>Form for editing shipping address.</p>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="saveToProjectCheckbox" />
          <label className="form-check-label" htmlFor="saveToProjectCheckbox">
            Save to Project
          </label>
        </div>
        <button type="button" onClick={handleCloseEditAddressModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default SupplierLocationDetail;
