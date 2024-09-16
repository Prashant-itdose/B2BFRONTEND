import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import Tables from '../../components/UI/customTable';
import Input from '../../components/formComponent/Input';
import ReactSelect from '../../components/formComponent/ReactSelect';
import { Label } from 'rc-easyui';

const ResultEntry = ({
ResultData,
 setResultentrydetails,
 setResultentryMode,
 setShowModal

}) => {
  
  const getHighlightClass = (rowData) => {
    if (parseFloat(rowData?.Value) > parseFloat(rowData?.MaxValue)) return 'high';
    if (parseFloat(rowData?.Value) < parseFloat(rowData?.MinValue)) return 'low';
    return '';
  };
  
  const processData = (data) => {
    // Step 1: Group data by DeptName and InvName
    const groupedByDept = data.reduce((acc, item) => {
      // Keep the existing isSelected value if it exists, otherwise default to false
      const updatedItem = {
        ...item,
        isSelected: item.isSelected ?? false,
      };
  
      if (!acc[updatedItem.DeptName]) {
        acc[updatedItem.DeptName] = { sequence: updatedItem.Dept_Sequence, invNames: {} };
      }
      if (!acc[updatedItem.DeptName].invNames[updatedItem.InvName]) {
        acc[updatedItem.DeptName].invNames[updatedItem.InvName] = [];
      }
      acc[updatedItem.DeptName].invNames[updatedItem.InvName].push(updatedItem);
      return acc;
    }, {});
  
    // Step 2: Sort departments by Dept_Sequence
    const sortedDepts = Object.entries(groupedByDept).sort(
      ([, deptA], [, deptB]) => deptA.sequence - deptB.sequence
    );
  
    // Step 3: Process the sorted departments into the desired structure
    return sortedDepts.flatMap(([dept, { invNames }]) => [
      {
        "Select": <span style={{ fontWeight: 'bold' }}>Department : {dept}</span>,
        "TestName": '', 
        "Value": "",
        'Flag': "",
        'Mac Reading': "",
        'MachineName': "",
        'MinValue': "",
        'MaxValue': "",
        'Display Reading': "",
      },
      ...Object.entries(invNames).flatMap(([invName, items]) => [
        {
          // Checkbox to select all observations under this invName
          "Select": (
            <input
              type="checkbox"
              onChange={(e) => handleSelectAll(items, e.target.checked)}
            />
          ),
          "TestName": <span style={{ fontWeight: 'bold' }}>Investigation : {invName}</span>, 
          "Value": "",
          'Flag': "",
          'Mac Reading': "",
          'MachineName': "",
          'MinValue': "",
          'MaxValue': "",
          'Display Reading': "",
        },
        ...items.map((item) => ({
          // Checkbox to select this particular item
          "Select": (
            <input
              type="checkbox"
              checked={item.isSelected} // use the existing isSelected value
              onChange={(e) => handleItemSelect(item, e.target.checked)}
            />
          ),
          "TestName": item.LabObservationName || '', 
          "Value": item.ReportType === 1 ? (
            <Input
              type="text"
              className="form-control"
              value={item.Value}
              onChange={(e) => handleValueChange(item, e.target.value)}
            />
          ) : (
            <button
              type="button"
              className="btn btn-link"
              onClick={() => openModal(item)}
            >
              Edit
            </button>
          ),
          'Flag': item.Flag || '',
          'Mac Reading': item.MacReading || '',
          'MachineName': item.machinename || '',
          'MinValue': item.MinValue || '',
          'MaxValue': item.MaxValue || '',
          'Display Reading': item.DisplayReading || '',
          'colorcode': item?.Status,
        }))
      ])
    ]);
};

  
  
const handleSelectAll = (items, isSelected) => {
    const investigationId = items[0]?.Investigation_ID; // Assuming all items in the group have the same Investigation_ID
    
    // Update all items with the same InvestigationID to have the same isSelected value
    setResultentrydetails(prevValues =>
      prevValues.map(item =>
        item.Investigation_ID === investigationId
          ? { 
              ...item, 
              isSelected: isSelected 
            }
          : item
      )
    );
  };
  const handleItemSelect = (id, isSelected) => {
    id.isSelected = isSelected;
    setResultentrydetails(prevValues =>
        prevValues.map(item =>
            item.LabObservationName === id?.LabObservationName

                ? { 
                    ...item, 
                    isSelected:isSelected 
                }
                : item 
        )
    );
  };
  
  

  const handleValueChange = (id, newValue) => {
    // Parse the new value, min value, and max value to numbers
    console.log(id)
    const parsedNewValue = parseFloat(newValue);
    const parsedMinValue = parseFloat(id.MinValue);
    const parsedMaxValue = parseFloat(id.MaxValue);
    console.log(parsedNewValue)
    // Determine the flag based on the new value
    let newFlag = 'Normal'; // Default flag
    if (parsedNewValue < parsedMinValue) {
        newFlag = 'Low';
    } else if (parsedNewValue > parsedMaxValue) {
        newFlag = 'High';
    }
    else if(isNaN(parsedNewValue))
    {
        newFlag=''
    }
    

    // Update the state with the new value and flag
    setResultentrydetails(prevValues =>
        prevValues.map(item =>
            item.LabObservationName === id?.LabObservationName

                ? { 
                    ...item, 
                    Value: newValue, 
                    Flag: newFlag // Update the flag based on the new value
                }
                : item // Keep other items unchanged
        )
    );
};
console.log(ResultData)


  
  return (
    <div className='card patient_registration border'>
      <div className='container-fluid' style={{ padding: '10px' }}>
        
      <div className='row'>
  <div className='col-sm-2'>
    <span className='info-label' style={{ fontWeight: 'bold' }}>BarCode No:</span>
    <span className='info-value'></span>
  </div>
  <div className='col-sm-2'>
    <span className='info-label' style={{ fontWeight: 'bold' }}>Visit No:</span>
    <span className='info-value'>{ResultData[0]?.LabNo}</span>
  </div>
  <div className='col-sm-2'>
    <span className='info-label' style={{ fontWeight: 'bold' }}>Patient Name:</span>
    <span className='info-value'></span>
  </div>
  <div className='col-sm-2'>
    <span className='info-label' style={{ fontWeight: 'bold' }}>Age/Sex:</span>
    <span className='info-value'></span>
  </div>
</div>
<Tables 
           thead={[
            "Select",
            "TestName",
            "Value",
            'Flag',
            'Mac Reading',
            'MachineName',
            'Min Value',
            'Max Value',
            'Display Reading'
          ]} 
          tbody={processData(ResultData)}/>
          <div className="row ">
 <div className='col-sm-2'>
 <ReactSelect
      dynamicOptions={[{label:'Dummy1',value:''}]} 
      className="react-select-container" 
      
      placeholder="Doctor" 
    />
 </div>
    <div className="col-sm-4 col-md-4 col-lg-3 d-flex  align-items-center mt-2 mt-md-0">
    <button 
      className="btn btn-sm btn-info"
      style={{margin:'1px'}}
      onClick={() => { /* Add your save logic here */ }}
    >
      Save
    </button>
    <button 
    style={{margin:'1px'}}
      className="btn btn-sm btn-success"
      onClick={() => { /* Add your approve logic here */ }}
    >
      Approve
    </button>
    <button 
      className="btn btn-sm btn-info"
      style={{margin:'1px'}}
      onClick={() => { /* Add your reset logic here */ }}
    >
      Reset
    </button>
    <button 
    style={{margin:'1px'}}
      className="btn btn-sm btn-info"
      onClick={() => { 
        setShowModal(true);
        setResultentryMode(false);
      }}
    >
      Main List
    </button>
  </div>
</div>
          
        

        {/* Add buttons and functionality as needed */}
        
          
        
      </div>
    </div>
  );
};

export default ResultEntry;
