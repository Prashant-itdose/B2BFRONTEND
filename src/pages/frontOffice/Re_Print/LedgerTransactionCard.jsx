import React from "react";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const LedgerTransactionCard = ({ bodyData }) => {
  // Define columns for the DataTable
  const columns = [
    { field: 'label', header: 'Informartion' },
    { field: 'value', header: `${bodyData.Summary.TotalText}` }
  ];

  // Data for the DataTable
  const tableData = [
    { label: 'Client', value: bodyData.Summary.ClientName },
    { label: 'Opening Amount', value: bodyData.Summary.OpeningAmount },
    { label: 'Closing Balance', value: bodyData.Summary.ClosingAmount },
    { label: 'Security Amount', value: bodyData.Summary.SecurityAmount },
    { label: 'Testing Charges', value: bodyData.Summary.NonBilledAmount },
    { label: 'Net Payable', value: bodyData.Summary.NetPayable }
  ];

  return (
    
     
      <Panel
       >
        <div className="p-mb-4">
          {/* DataTable for displaying summary */}
          <DataTable value={tableData} responsiveLayout="scroll" className="p-datatable-gridlines">
            {columns.map((col) => (
              <Column key={col.field} field={col.field} header={col.header} />
            ))}
          </DataTable>
        </div>
      </Panel>
    
  );
};

export default LedgerTransactionCard;
