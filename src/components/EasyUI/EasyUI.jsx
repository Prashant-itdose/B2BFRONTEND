import React, { useEffect } from "react";
import { DataGrid, GridColumn } from "rc-easyui";

const EasyUI = ({ dataBind, dataColoum, onClick, selectedIndex }) => {
  useEffect(() => {
    // Reset classes for all rows
    const rows = document.querySelectorAll(".datagrid-body .datagrid-row");
    rows.forEach((row) => {
      row.classList.remove("selected-row"); // Remove selected-row class from all rows
    });

    // Apply class to the selected row
    if (selectedIndex !== null && selectedIndex >= 0 && selectedIndex < dataBind.length) {
      const selectedRow = rows[selectedIndex];
      selectedRow.classList.add("selected-row"); // Add selected-row class to the selected row
    }
  }, [selectedIndex, dataBind]);

  return (
    <div style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}>
      <DataGrid
        style={{ maxHeight: 250 }}
        pagination
        selectionMode="single"
        onRowClick={(rowData) => onClick(rowData)}
        data={dataBind}
        pagePosition="bottom"
        pageOptions={{
          layout: [
            "list",
            "sep",
            "first",
            "prev",
            "next",
            "last",
            "sep",
            "refresh",
            "sep",
            "manual",
            "info",
          ],
        }}
      >
        
        {dataColoum?.map((data, index) => (
        
          <GridColumn
            key={index}
            field={data.field}
            title={data.title}
            cellRender={(rowData) =>
              
              data.render ? data.render(rowData) : rowData[data.field]
            }
          />
        ))}

      </DataGrid>
    </div>
  );
};

export default EasyUI;
