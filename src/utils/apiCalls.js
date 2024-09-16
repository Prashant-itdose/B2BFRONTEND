import * as XLSX from "xlsx"; // Import the xlsx library
import * as FileSaver from "file-saver";

export const headers = {
  "Accept": "application/json",
  "Authorization": `Bearer ${localStorage.getItem('token')}`,
  "Content-Type": "multipart/form-data",
};

export const ExportToExcel = async (dataExcel) => {
  const filetype =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  // Convert JSON data to a worksheet
  const ws = XLSX.utils.json_to_sheet(dataExcel);

  // Create a new workbook and append the worksheet
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

  // Generate an Excel file in array format
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Create a Blob from the Excel buffer
  const data = new Blob([excelBuffer], { type: filetype });

  // Save the Excel file using FileSaver
  FileSaver.saveAs(data, "excel" + fileExtension);
};
export const ExportToExcelitem = async (dataExcel) => {
  const filetype =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  // Flatten the JSON data into a row-per-item structure
  const flattenedData = [];

  dataExcel.forEach((centre) => {
    centre.Clients.forEach((client) => {
      client.Patients.forEach((patient) => {
        patient.Items.forEach((item) => {
          flattenedData.push({
            Centre: centre.Centre,
            ClientName: client.ClientName,
            PatientName: patient.PatientName,
            AgeGender: patient.AgeGender,
            Doctor: patient.Doctor,
            TestName: item.TestName,
            NetAmount: item.NetAmount,
          });
        });
      });
    });
  });
  console.log(flattenedData)

  // Convert the flattened data to a worksheet
  const ws = XLSX.utils.json_to_sheet(flattenedData);

  // Create a new workbook and append the worksheet
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

  // Generate an Excel file in array format
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Create a Blob from the Excel buffer
  const data = new Blob([excelBuffer], { type: filetype });

  // Save the Excel file using FileSaver
  FileSaver.saveAs(data, "dataExport" + fileExtension);
};
export const ExportToExcelPatient = async (dataExcel) => {
  const filetype =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
   console.log(dataExcel)
  // Flatten the JSON data into a row-per-item structure
  const flattenedData = dataExcel.flatMap(centre =>
    centre.Clients.flatMap(client =>
      client.Patients.flatMap(patient =>
        patient.map(item => ({
          Centre: centre.Centre,
          VisitNo:patient?.VisitNo,
          ClientName: client.ClientName,
          PatientName: patient.PatientName,
          AgeGender: patient.AgeGender,
          Doctor: patient.Doctor,
          TestName:patient.Items,
          NetAmount: pat.NetAmount,
        }))
      )
    )
  );

  console.log(flattenedData);

  // Convert the flattened data to a worksheet
  const ws = XLSX.utils.json_to_sheet(flattenedData);

  // Create a new workbook and append the worksheet
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

  // Generate an Excel file in array format
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Create a Blob from the Excel buffer
  const data = new Blob([excelBuffer], { type: filetype });

  // Save the Excel file using FileSaver
  FileSaver.saveAs(data, "dataExport" + fileExtension);
};
