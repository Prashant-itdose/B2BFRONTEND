import React, { useRef, useState } from 'react';
import Table from 'react-bootstrap/Table';

function Tables({ thead, tbody, fs, getRowClass, style, tableHeight }) {
  const isMobile = window.innerWidth <= 768;
  const activeRowRef = useRef(null);

  // Function to handle row click
  const handleRowClick = (rowRef, rowColor) => {
    // Reset the previous active row style if it exists
    if (activeRowRef.current) {
      activeRowRef.current.style.backgroundColor = activeRowRef.current.dataset.originalColor || '';
    }
    // Set the new active row style
    if (rowRef) {
      rowRef.dataset.originalColor = rowColor; // Store the original color in a data attribute
      rowRef.style.backgroundColor = 'lightblue';
      activeRowRef.current = rowRef;
    }
  };

  return (
    tbody?.length > 0 && (
      <div
        id="no-more-tables"
        style={style}
        className={`${tableHeight} custom-scrollbar TabScroll`}
      >
        <div className="row">
          <div className="col-12">
            <Table className="mainTable pt-2 pl-2 pr-2" bordered>
              <thead style={{ zIndex: 1 }}>
                <tr>
                  {thead?.map((headData, index) => (
                    <th
                      key={index}
                      style={{ width: headData?.width ? headData?.width : '' }}
                    >
                      {headData?.name ? headData?.name : headData} &nbsp;
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tbody?.map((ele, index) => {
                  const rowColor = ele.colorcode || '';
                  const keys = Object.keys(ele).filter(key => key !== "colorcode"); 
                  
                  // Exclude colorcode
                   // Use colorcode if present
                    console.log(rowColor)
                  return (
                    <tr
                      key={index}
                      
                      style={{ backgroundColor: `${rowColor}` }}
                      onClick={(e) => handleRowClick(e.currentTarget, rowColor)}
                      ref={el => {
                        if (el) {
                          ele.ref = el;
                        }
                      }}
                    >
                      {keys?.map((bodyData, inx) => (
                        <td
                          key={inx}
                          data-title={
                            thead[inx]?.name ? thead[inx]?.name : thead[inx]
                          }
                        >
                          {ele[bodyData]?.label
                            ? ele[bodyData]?.label
                            : ele[bodyData]}
                          {isMobile && <>&nbsp;</>}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  );
}


export default Tables;
