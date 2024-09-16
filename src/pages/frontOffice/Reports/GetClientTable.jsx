import React from 'react';
import Tables from '../../../components/UI/customTable';
 // Assuming Tables component is imported
 import { RadioButton } from 'primereact/radiobutton';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { useSelector } from 'react-redux';

export const ReportTable = ({ ReportType, tabletype,currentItems, indexOfFirstItem,onRadioChange }) => {
  // Define the headers for different report types
  console.log(currentItems)
  const months = currentItems && currentItems.length > 0
    ? Object.keys(currentItems[0]).filter(key => key.includes('-24'))
    : [];

    const BASE_HEADERS = ['S.No.', 'ClientName'];
    let THEAD = ReportType === '1' ? [...BASE_HEADERS, ...months] : ['S.No.','Centre' ,'Client','GrossAmount','DiscountAmount','NetAmount','ReceivedAmount','BalanceAmount'];
  

  // Define the table body based on ReportType
  const tbodyData = currentItems?.map((ele, index) => {
    switch (ReportType) {
      case '0': // SingleLineSummary
        return {
          "S.No.": index + 1,
          'Centre':ele?.Centre,
          'Client':ele?.ClientName,
          'GrossAmount':ele?.GrossAmount,
          'DiscountAmount':ele?.DiscountAmount,
          "NetAmount": ele?.NetAmount,
          "ReceivedAmount": ele?.ReceivedAmount,
          "BalanceAmount": ele?.BalanceAmount,
         
        };
        case '1': // MonthlyWise
        if (tabletype === 'Net') {
          return {
            "S.No.": index + 1,
            'ClientName': ele?.ClientName,
            ...months.reduce((acc, month) => ({ ...acc, [month]: ele[month]||0 }), {})
          };
        } else if (tabletype === 'Received') {
          return {
            "S.No.": index + 1,
            'ClientName': ele?.ClientName,
            ...months.reduce((acc, month) => ({ ...acc, [month]: ele[month] }), {})
          };
        } else if (tabletype === 'PatientCount') {
          return {
            "S.No.": index + 1,
            'ClientName': ele?.ClientName,
            ...months.reduce((acc, month) => ({ ...acc, [month]: ele[month]||0}), {})
          };
        }
        break;
      // ItemWise
        return {
          "S.No.": indexOfFirstItem + index + 1,
          "ItemCode": ele?.ItemCode,
          "ItemName": ele?.ItemName,
          "Quantity": ele?.Quantity,
          "Amount": ele?.Amount,
        };
      default:
        return {};
    }
  });

  return (
    <>
    {ReportType === '1' && (
        <div className=" d-flex ">
          <div className="col-12  ">
            <label >
              <input
                type="radio"
                name="reportOption"
                value="Net"
                checked={tabletype === 'Net'}
                onChange={onRadioChange} // Replace with appropriate handler
              /> Net
            </label>
          
          
            <label className='ml-3'>
              <input
                type="radio"
                name="reportOption"
                value="Received"
                checked={tabletype === 'Received'}
                onChange={onRadioChange} // Replace with appropriate handler
              /> Received
            </label>
         
          
            <label className='ml-3'>
              <input
                type="radio"
                name="reportOption"
                value="PatientCount"
                checked={tabletype === 'PatientCount'}
                onChange={onRadioChange} // Replace with appropriate handler
              /> Patient Count
            </label>
          
        </div>
        </div>
      )}
    <Tables
      style={{ width: "100%" }}
      thead={THEAD}
      tbody={tbodyData}
      tableHeight={"tableHeight"}
    />
    </>
    
  );
};



export const PatientTable = ({ currentItems, indexOfFirstItem }) => {
    const THEAD = ['S.No.', 'PatientName', 'Age/Gender', 'Doctor','VisitNo','Items', 'NetAmount'];
    const screenSize = useSelector((state) => state.ui.screenSize);
    const tbodyData = [];
    console.log(currentItems);
  
    currentItems?.forEach((centre, centreIndex) => {
      // Add a row for each Centre with modern color styling
     {screenSize ? tbodyData.push({
        "S.No.": <span style={{ fontWeight: 'bold'}}>{`Centre: ${centre?.Centre}`}</span>,
        "PatientName": '', 
        "Age/Gender": '',
        "Doctor": '',
        'VisitNo':'',
        "Items": '',
        "NetAmount": '',
        "colorcode":'#91e3eb'
        
      }):tbodyData.push({
        "S.No.": (
            <td
                colSpan={isSmallScreen ? THEAD.length : 1} 
                style={{ backgroundColor: '#91e3eb', fontWeight: 'bold' }}
            >
                Centre: {centre?.Centre}
            </td>
        ),
    });};
  
      centre?.Clients?.forEach((client, clientIndex) => {
        // Initialize the total amount for each client
        let totalAmount = 0;
  
        // Add a row for each Client within the Centre
        tbodyData.push({
          "S.No.": <span style={{ fontWeight: '600' }}>{`${client?.ClientName}`}</span>,
          "PatientName": '', 
          "Age/Gender": '',
          "Doctor": '',
          'VisitNo':'',
          "Items": '',
          "NetAmount": '',
          
        });
  
        client?.Patients?.forEach((patient, patientIndex) => {
          // Calculate the running total of NetAmount
          totalAmount += parseFloat(patient?.NetAmount || 0);
  
          // Add a row for each Patient within the Client
          tbodyData.push({
            "S.No.":  <span style={{ display: 'block', textAlign: 'center' }}>{patientIndex + 1}</span>,
            "PatientName": <span style={{ fontWeight: 'normal' }}>{patient?.PatientName}</span>,
            "Age/Gender": patient?.AgeGender,
            "Doctor": patient?.Doctor,
            'VisitNo':patient?.VisitNo,
            "Items": patient?.Items,
            "NetAmount": patient?.NetAmount,
          });
        });
  
        // Add a summary row for the total NetAmount of the current client
        tbodyData.push({
          "S.No.": '', 
          "PatientName": '',
          "Age/Gender": '',
          "Doctor": '',
          'VisitNo':'',
          "Items": <span style={{ fontWeight: '600', textAlign: 'right', float: 'right'}}>Total</span>,
          "NetAmount": <span style={{ fontWeight: 'bold' }}>{totalAmount.toFixed(2)}</span>,
        });
      });
    });
  
    return (
      <Tables
        style={{ width: "100%" }}
        thead={THEAD}
        tbody={tbodyData}
        tableHeight={"tableHeight"}
      />
    );
  };

// Assuming you have a Tables component

export const InvestigationTable = ({ currentItems }) => {
    const THEAD = ['S.No.', 'PatientName', 'Age/Gender', 'Doctor','VisitNo','ItemName','BillingType','NetAmount'];
    const screenSize = useSelector((state) => state.ui.screenSize);
    const isSmallScreen = screenSize === 'xs' || screenSize === 'lg'; // Adjust condition based on your breakpoints
    const tbodyData = [];
  console.log(currentItems)
  currentItems?.forEach((centre) => {
    // Add a row for each Centre with modern color styling
    if (!isSmallScreen) {
        tbodyData.push({
            "S.No.": (
                <td colSpan={THEAD.length} style={{ backgroundColor: '#91e3eb', fontWeight: 'bold' }}>
                    Centre: {centre?.Centre}
                </td>
            ),
            "PatientName": '', 
            "Age/Gender": '',
            "Doctor": '',
            'VisitNo':'',
            "ItemName": '',
            "BillingType":'',
            "NetAmount": '',
        });
    } else {
        tbodyData.push({
            "S.No.": <span style={{ fontWeight: 'bold' }}>{`Centre: ${centre?.Centre}`}</span>,
            "PatientName": '', 
            "Age/Gender": '',
            "Doctor": '',
            'VisitNo':'',
            "ItemName": '',
            "NetAmount": '',
            "BillingType":'',
            "colorcode": '#91e3eb'
        });
    }

    centre?.Clients?.forEach((client) => {
        // Initialize the total amount for each client
        let totalAmount = 0;

        // Add a row for each Client within the Centre
        tbodyData.push({
            "S.No.": <span style={{ fontWeight: '600' }}>{`${client?.ClientName}`}</span>,
            "PatientName": '', 
            "Age/Gender": '',
            "Doctor": '',
            'VisitNo':'',
            "ItemName": '',
            "BillingType":'',
            "NetAmount": '',
        });

        client?.Patients?.forEach((patient, patientIndex) => {
            let isFirstItemForPatient = true; // Flag to check if it's the first item for the patient
            
            patient?.Items?.forEach((item) => {
                totalAmount += parseFloat(item?.NetAmount || 0);

                // Add a row for each Item within the Patient
                tbodyData.push({
                    "S.No.": isFirstItemForPatient 
                        ? <span style={{ display: 'block', textAlign: 'center' }}>{patientIndex + 1}</span>
                        : '', // Show S.No. only for the first item of the patient
                    "PatientName": isFirstItemForPatient ? <span style={{ fontWeight: 'normal' }}>{patient?.PatientName}</span> : '',
                    "Age/Gender": isFirstItemForPatient ? patient?.AgeGender : '',
                    "Doctor": isFirstItemForPatient ? patient?.Doctor : '',
                    // 
                     "VisitNo":isFirstItemForPatient?patient?.VisitNo:'',
                    
                    "ItemName": <span style={{ fontWeight: 'normal' }}>{item?.TestName}</span>,
                    "BillingType": item?.BillType,
                    "NetAmount": <span style={{ fontWeight: 'normal' }}>{item?.NetAmount.toFixed(2)}</span>,
                });

                isFirstItemForPatient = false; // After the first item, this flag is set to false
            });
        });

        // Add a summary row for the total NetAmount of the current client
        tbodyData.push({
            "S.No.": '', 
            "PatientName": '',
            "Age/Gender": '',
            "Doctor": '',
            'VisitNo':'',
            "ItemName": '',
            "BillingType":<span style={{ fontWeight: '600', textAlign: 'right', float: 'right' }}>Total</span>,
            "NetAmount": <span style={{ fontWeight: 'bold' }}>{totalAmount.toFixed(2)}</span>,
        });
    });
});


    return (
        <Tables
            style={{ width: "100%" }}
            thead={THEAD}
            tbody={tbodyData}
            tableHeight={"tableHeight"}
        />
    );
};



