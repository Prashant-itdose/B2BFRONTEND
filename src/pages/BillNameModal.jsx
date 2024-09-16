import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import Input from '../components/formComponent/Input';

export function Billname({ show, handleClose, handleSave }) {
  const [shippingAddress, setShippingAddress] = useState('');
  const [saveAsNew, setSaveAsNew] = useState(false);
  const [primary,setprimary]=useState(false)
  const [saveToProject, setSaveToProject] = useState(false);

  const renderFooter = () => (
    <div>
      <Button label="Close" icon="pi pi-times" onClick={handleClose} className="p-button-text" />
      <Button label="Save" icon="pi pi-check" onClick={() => handleSave(shippingAddress, saveAsNew, saveToProject)} autoFocus />
    </div>
  );

  return (
    <Dialog header="Update BillName" visible={show} style={{ width: '40vw' }} footer={renderFooter()} onHide={handleClose}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="shippingAddress">BillName</label>
          <Input
            id="shippingAddress"
            rows="4"
            className="p-inputtext p-component"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder=""
            lable={"BillName"}

          />
        </div>
        <div className="p-field-checkbox">
          <Checkbox inputId="primary" checked={primary} onChange={(e) => setprimary(e.checked)} />
          <label htmlFor="primary">Primary Billname</label>
        </div>
        <div className="p-field-checkbox">
          <Checkbox inputId="saveAsNew" checked={saveAsNew} onChange={(e) => setSaveAsNew(e.checked)} />
          <label htmlFor="saveAsNew">Update Old Billname</label>
        </div>
        <div className="p-field-checkbox">
          <Checkbox inputId="saveToProject" checked={saveToProject} onChange={(e) => setSaveToProject(e.checked)} />
          <label htmlFor="saveToProject">Save to Project</label>
        </div>
      </div>
    </Dialog>
  );
}
