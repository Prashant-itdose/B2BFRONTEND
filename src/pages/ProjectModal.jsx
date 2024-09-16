import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

export function ProjectModal({ show, handleClose, handleSave }) {
  const [projectName, setProjectName] = useState('');
  const [addresses, setAddresses] = useState([{ value: '', primary: false }]);
  const [billNames, setBillNames] = useState([{ value: '', primary: false }]);

  const handleAddAddress = () => setAddresses([...addresses, { value: '', primary: false }]);
  const handleAddBillName = () => setBillNames([...billNames, { value: '', primary: false }]);

  const handleAddressChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].value = value;
    setAddresses(updatedAddresses);
  };

  const handleBillNameChange = (index, value) => {
    const updatedBillNames = [...billNames];
    updatedBillNames[index].value = value;
    setBillNames(updatedBillNames);
  };

  const handlePrimaryAddressChange = (index) => {
    const updatedAddresses = addresses.map((address, i) => ({
      ...address,
      primary: i === index,
    }));
    setAddresses(updatedAddresses);
  };

  const handlePrimaryBillNameChange = (index) => {
    const updatedBillNames = billNames.map((billName, i) => ({
      ...billName,
      primary: i === index,
    }));
    setBillNames(updatedBillNames);
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  const handleRemoveBillName = (index) => {
    const updatedBillNames = billNames.filter((_, i) => i !== index);
    setBillNames(updatedBillNames);
  };

  const renderFooter = () => (
    <div>
      <Button label="Close" icon="pi pi-times" onClick={handleClose} className="p-button-text" />
      <Button label="Save Project" icon="pi pi-check" onClick={() => handleSave(projectName, addresses, billNames)} autoFocus />
    </div>
  );

  return (
    <Dialog header="Add New Project" visible={show} style={{ width: '50vw' }} footer={renderFooter()} onHide={handleClose}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            className="p-inputtext p-component"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        <div className="p-field">
          <label>Shipping Addresses</label>
          {addresses.map((address, index) => (
            <div key={index} className="p-inputgroup mb-2">
              <input
                type="text"
                className="p-inputtext p-component"
                value={address.value}
                onChange={(e) => handleAddressChange(index, e.target.value)}
              />
              <Checkbox
                checked={address.primary}
                onChange={() => handlePrimaryAddressChange(index)}
                className="p-ml-2"
              />
              <Button icon="pi pi-trash" className="p-button-text p-ml-2" onClick={() => handleRemoveAddress(index)} />
            </div>
          ))}
          <Button label="Add Another Address" className="p-button-text" onClick={handleAddAddress} />
        </div>

        <div className="p-field">
          <label>Bill Names</label>
          {billNames.map((billName, index) => (
            <div key={index} className="p-inputgroup mb-2">
              <input
                type="text"
                className="p-inputtext p-component"
                value={billName.value}
                onChange={(e) => handleBillNameChange(index, e.target.value)}
              />
              <Checkbox
                checked={billName.primary}
                onChange={() => handlePrimaryBillNameChange(index)}
                className="p-ml-2"
              />
              <Button icon="pi pi-trash" className="p-button-text p-ml-2" onClick={() => handleRemoveBillName(index)} />
            </div>
          ))}
          <Button label="Add Another Bill Name" className="p-button-text" onClick={handleAddBillName} />
        </div>
      </div>
    </Dialog>
  );
}
