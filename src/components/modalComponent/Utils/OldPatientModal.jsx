import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Input from "../../formComponent/Input";

const OldPatientModal = ({ visible, onHide, dataBind, selectedIndex, onRowSelect }) => {
  useEffect(() => {
    if (selectedIndex !== null && selectedIndex >= 0 && selectedIndex < dataBind.length) {
      const selectedRow = document.querySelector(`.p-datatable-tbody > tr:nth-child(${selectedIndex + 1})`);
      selectedRow?.classList.add("selected-row");
    }
  }, [selectedIndex, dataBind]);

  const actionTemplate = (rowData) => (
    // <button
    //   label="Select"
    //   className="btn button-sm"
    //   onClick={() => onRowSelect(rowData)}
    //   style={{ padding: "5px 10px", borderRadius: "3px", fontSize: "0.875rem" }}
    // />
    <button className="button" type="submit" onClick={() => onRowSelect(rowData)}>
                  Select
                </button>
  );

  const addressTemplate = (rowData) => (
    `${rowData.house_no} ${rowData.Locality} ${rowData.City} ${rowData.State} ${rowData.Country}`
  );

  const footer = (
    <div style={{ textAlign: 'right' }}>
      <Button label="Close" icon="pi pi-times" onClick={onHide} className="p-button-text" />
    </div>
  );

  console.log("Data Bind:", dataBind); // Debugging

  return (
    <Dialog 
      visible={visible} 
      onHide={onHide} 
      style={{ width: '80vw', maxWidth: '900px' }} 
      header="Old Patient Data"
    //   footer={footer}
      breakpoints={{ '960px': '75vw', '640px': '90vw' }}
    >
      <div style={{ padding: "1px" }}>
        <DataTable
          value={dataBind}
          paginator
          rows={10}
          scrollable
          style={{ maxHeight: "250px", width: "100%" }}
          selectionMode="single"
          onRowSelect={(e) => onRowSelect(e.data)}
          rowClassName={(data, index) => index === selectedIndex ? "selected-row" : ""}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          dataKey="Patient_ID"
        >
          <Column field="Patient_ID" header="UHID" style={{ width: "10%" }} />
          <Column field="modalPatientName" header="Patient Name" style={{ width: "20%" }} />
          <Column field="mobile" header="Contact No." style={{ width: "15%" }} />
          <Column field="modalAgeGender" header="Age/Gender" style={{ width: "15%" }} />
          <Column header="Address" body={addressTemplate} style={{ width: "30%" }} />
          <Column header="Action" body={actionTemplate} style={{ textAlign: "center", width: "10%" }} />
        </DataTable>
      </div>
    </Dialog>
  );
};

export default OldPatientModal;
