import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faRoute, faBuilding, faCalendar, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import TestPayment from "../../components/front-office/TestPayment";
import TestAddingTable from "../../components/UI/customTable/frontofficetables/TestAddingTable";
import { useFormik } from "formik";
import Tables from "../../components/UI/customTable";
import PaymentGateway from "../../components/front-office/PaymentGateway";
import HomeCollectionCard from "./HomeCollectionCard";
import Input from "../../components/formComponent/Input";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { useSelector } from "react-redux";
import moment from "moment";

const data = [
    {
        route: "NEWASHOK1@199",
        centreid: 1201,
        PanelID: 1201,
        CentreCode: "A12",
        email: "priyamsingh964842@gmail.com",
        centre: "Auto Lab centre",
        ID: 259,
        Name: "Vipin Rawat",
        mobile: "9717857415",
        istemp: 0,
        LoginTime: "08:00",
        LogoutTime: "18:00",
        WeakOff: "",
        FromDate: "16-05-2024",
        ToDate: "18-05-2024"
    },
    {
        route: "NEWASHOK1@199",
        centreid: 1201,
        PanelID: 1201,
        CentreCode: "A12",
        email: "priyamsingh964842@gmail.com",
        centre: "Auto Lab centre",
        ID: 181,
        Name: "Gagan Rajput",
        mobile: "7913691811",
        istemp: 0,
        LoginTime: "08:00",
        LogoutTime: "18:04",
        WeakOff: "Sunday",
        FromDate: "18-07-2024",
        ToDate: "18-07-2024"
    },
];

const slots = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30",
    "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
    "06:00", "06:30", "07:00", "07:30", "08:00"
];
const THEAD = ["Code", "ItemName", "Rate", "Action"];
const PhleboSlotLayout = ({ values }) => {
    console.log(values)
    const [discounts, setDiscounts] = useState({
        discountApprovalList: [],
        discountReasonList: [],
        discamount: "",
        discperc: "",
        netamount:'',
        grossamount:'',
        paidamount:'',
        balanceamount:''
      });
      const screenSize = useSelector((state) => state.ui.screenSize);
      const [slotselected,setslotSelected]=useState(null)
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [billdetails, setbilldetails] = useState({
        netamount: '',
        grossamount: '',
        paidamount: '',
        balanceamount: ''
    });
    const [testAddingTableState, setTestAddingTable] = useState([]);
    const [testPaymentState, setTestPaymentState] = useState({
        type: "",
        category: "0",
        subCategory: "0",
        searchType: 1,
    });

    const handleSlotClick = (index,slot) => {
        setslotSelected(slot)
        setSelectedRowIndex(index);
    };
    const { handleChange, formdata, setValues, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {},
      onSubmit: async (values, { resetForm }) => {
        // SearchBillPrintAPI();
      },
    });
console.log(screenSize)
    const renderPhlebosdesktop = () => {
        return data.map((phlebo, index) => (
            <div
                key={index}
                style={{
                    marginBottom: '0.5em',
                    padding: '0.5em',
                    boxShadow: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                }}
            >
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* Phlebo Info */}
                    <div
    style={{
        flex: '1 1 25%',
        borderRight: '1px solid #ddd',
        padding: '1em',
        fontFamily: '"Source Sans Pro", sans-serif',
        background: 'linear-gradient(135deg, #f0f4ff, #d4e0ff)', // Gradient background
        borderRadius: '8px', // Smooth rounded edges
        // Soft shadow for a modern touch
    }}
>
    <h4
        style={{
            margin: '0',
            fontSize: '0.8rem', // Slightly larger for readability
            fontWeight: 'bold',
            color: '#333' // Darker text for contrast
        }}
    >
        <FontAwesomeIcon
            icon={faUser}
            style={{ marginRight: '0.3em', color: '#007bff' }} // Accent color for icons
        />
        {phlebo.Name}
    </h4>
    <p
        style={{
            margin: '0.5em 0',
            fontSize: '0.75rem',
            color: '#555' // Softer grey for additional text
        }}
    >
        {phlebo.mobile}
    </p>

    <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.3rem',
            fontSize: '0.5rem',
            alignItems: 'center'
        }}
    >
        <span
            style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '0.1em 0.2em',
                borderRadius: '5px',
                fontWeight: '100'
            }}
        >
            <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '0.2em', fontSize: '0.65rem' }} />
            {phlebo.centre}
        </span>
        <span
            style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '0.1em 0.2em',
                borderRadius: '5px',
                fontWeight: '100'
            }}
        >
            <FontAwesomeIcon icon={faRoute} style={{ marginRight: '0.2em', fontSize: '0.65rem' }} />
            {phlebo.route}
        </span>
        <span
            style={{
                backgroundColor: '#ffc107',
                color: 'white',
                padding: '0.1em 0.2em',
                borderRadius: '5px',
                fontWeight: '100'
            }}
        >
            <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.2em', fontSize: '0.65rem' }} />
            In: {phlebo.LoginTime}
        </span>
        <span
            style={{
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '0.1em 0.2em',
                borderRadius: '5px',
                fontWeight: '100'
            }}
        >
            <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.2em', fontSize: '0.65rem' }} />
            Out: {phlebo.LogoutTime}
        </span>
        <span
            style={{
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '0.1em 0.2em',
                borderRadius: '5px',
                fontWeight: '100'
            }}
        >
            <FontAwesomeIcon icon={faCalendar} style={{ marginRight: '0.2em', fontSize: '0.65rem' }} />
            {phlebo.WeakOff ? `Off: ${phlebo.WeakOff}` : 'No Week Off'}
        </span>
        {phlebo.FromDate && phlebo.ToDate && (
            <span
                style={{
                    backgroundColor: '#ffc107',
                    color: 'white',
                    padding: '0.2em 0.5em',
                    borderRadius: '5px',
                    fontWeight: '100'
                }}
            >
                <FontAwesomeIcon icon={faCalendarTimes} style={{ marginRight: '0.2em', fontSize: '0.65rem' }} />
                Holiday: {phlebo.FromDate} - {phlebo.ToDate}
            </span>
        )}
    </div>
</div>



                    {/* Slot Selection or TestPayment */}
                    <div
    style={{
        flex: '1 1 70%',
        padding: '0.5em',
        display: 'flex', // Use flex to split the area into two halves
        gap: '0.5em'     // Adds spacing between two columns
    }}
>
    {selectedRowIndex === index ? (
       <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        
       {/* Header section */}
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h5
        style={{
            fontSize: '0.7rem',
            marginBottom: '0.1em',
            fontFamily: 'Source Sans Pro',
            textAlign: 'center',
            flex: '1',
        }}
    >
        Test Selection and Billing
    </h5>

    {/* Icon for going back to the slot selection page */}
    <div
        style={{ cursor: 'pointer' }}
        onClick={() => setSelectedRowIndex(null)}
        title="Back to slots"  // Tooltip text
    >
        <FontAwesomeIcon
            icon={faArrowLeft}  // Using the correct imported icon
            style={{ fontSize: '1rem', color: 'var(--bg-color)' }}  // Customize the icon size and color
        />
    </div>
</div>


       
       {/* Flex section with two columns */}
       <div style={{ display: 'flex', gap: '1em' }}>
           
           {/* Left column (TestPayment and Table) */}
           <div style={{ flex: '1 1 50%' }}>
               <TestPayment
                   testPaymentState={testPaymentState}
                   setTestPaymentState={setTestPaymentState}
                   payloadData={values}
                   setTestAddingTable={setTestAddingTable}
                   testAddingTableState={testAddingTableState}
                   TestData={[]}
                   setbilldetails={setbilldetails}
               />
               <Tables 
                   thead={THEAD}
                   tbody={testAddingTableState?.map((item) => ({
                       'Code': item?.Code,
                       'Name': item?.ItemName,
                       'Amount': item?.Amount,
                       'Action': item?.Remove
                   }))}
               />
           </div>
           
           {/* Right column (Inputs and Dropdowns) */}
           <div style={{ flex: '1 1 50%', display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
               
               <div style={{ flex: '1 1 25%' }}>
                   <Input
                       name="alternateMobile"
                       className="form-control"
                       lable="Alternate Mobile"
                       onChange={handleChange}
                       value={values.alternateMobile || ""}
                   />
               </div>

               <div style={{ flex: '1 1 25%' }}>
                   <ReactSelect
                       name="sourceOfCollection"
                       label="Source of Collection"
                       placeholderName="Source of Collection"
                       options={[{ label: 'Walk-in', value: 'walkin' }, { label: 'Home Collection', value: 'home' }]}
                       value={values.sourceOfCollection}
                       handleChange={setFieldValue}
                   />
               </div>

               <div style={{ flex: '1 1 25%' }}>
                   <Input
                       name="remarks"
                       className="form-control"
                       lable="Remarks"
                       onChange={handleChange}
                       value={values.remarks || ""}
                   />
               </div>

               <div style={{ flex: '2 1 25%' }}>
                   <ReactSelect
                       name="paymentMode"
                       label="Payment Mode"
                       placeholderName="Payment Mode"
                       options={[{ label: 'Cash', value: 'cash' }, { label: 'Card', value: 'card' }, { label: 'Online', value: 'online' }]}
                       value={values.paymentMode}
                       handleChange={setFieldValue}
                   />
               </div>

               <div style={{ flex: '2 1 25%' }}>
                   <Input
                       name="totalAmount"
                       lable="Total Amount"
                       className="form-control"
                       disabled={true}
                       onChange={handleChange}
                       value={values.totalAmount || ""}
                   />
               </div>

               <div style={{ flex: '2 1 25%' }}>
                   <Input
                       name="discountAmount"
                       className="form-control"
                       lable="Discount Amount"
                       onChange={handleChange}
                       value={values.discountAmount || ""}
                   />
               </div>

               <div style={{ flex: '3 1 25%' }}>
                   <Input
                       name="discountPercent"
                       className="form-control"
                       lable="Discount Percent"
                       onChange={handleChange}
                       value={values.discountPercent || ""}
                   />
               </div>

               <div style={{ flex: '3 1 25%' }}>
                   <ReactSelect
                       name="discountBy"
                       lable="Discount By"
                       placeholderName="DiscountBy"
                       options={[{ label: 'Seasonal', value: 'seasonal' }, { label: 'Promotional', value: 'promo' }]}
                       value={values.discountReason}
                       handleChange={setFieldValue}
                   />
               </div>

               <div style={{ flex: '3 1 25%' }}>
                   <Input
                       name="discountReason"
                       className="form-control"
                       lable="Discount Reason"
                       onChange={handleChange}
                       value={values.discountBy || ""}
                   />
               </div>

               <div style={{ flex: '1 1 100%', textAlign: 'right' }}>
                   <button
                       style={{
                           padding: '0.5em 2em',
                           fontSize: '0.85rem',
                           backgroundColor: 'var(--bg-color)',
                           color: '#fff',
                           border: 'none',
                           borderRadius: '5px',
                           cursor: 'pointer',
                       }}
                       onClick={() => {
                           setslotSelected(null);
                           setSelectedRowIndex(null);
                       }}
                   >
                       {`Book slot for ${slotselected} on ${moment(values?.appointmentdate, 'DD-MM-YYYY').format('DD MMM YYYY')}`}
                   </button>
               </div>

           </div>
       </div>
   </div>

    ) : (
        <div>
            <h5
                style={{
                    fontSize: '0.9rem',
                    marginBottom: '0.3em'
                }}
            >
                Slots
            </h5>
           
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.2em'
                }}
            >
               {slots.map((slot, slotIndex) => (
    <span
        key={slotIndex}
        style={{
            padding: '0.3em 0.5em',
            fontSize: '0.25rem',
            margin: '0.1em',
            cursor: 'pointer',
            backgroundColor: '#f0f0f0',
            borderRadius: '0.2em',
            userSelect: 'none',
            minWidth: '100px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius:'4px',
            alignItems: 'center',
            position: 'relative',
            border: '1px solid #ddd',
            height: '25px' // Adjust height as per need
        }}
        onClick={() => handleSlotClick(index, slot)} // Handle row selection
    >
        {/* Slot time */}
        <div style={{ zIndex: 2 }}>{slot}</div>
        
        {/* Vertical lines */}
        <div 
            style={{ 
                position: 'absolute', 
                left: '33%', 
                height: '100%', 
                borderLeft: '1px solid #e0e0e0'
            }} 
        />
        <div 
            style={{ 
                position: 'absolute', 
                left: '66%', 
                height: '100%', 
                borderLeft: '1px solid #e0e0e0'
            }} 
        />
    </span>
))}



            </div>
        </div>
    )}
</div>

                </div>
            </div>
        ));
    };
    const renderPhlebos = () => {
        return data.map((phlebo, index) => (
            <div
                key={index}
                style={{
                    marginBottom: '0.5em',
                    padding: '0.5em',
                    boxShadow: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                }}
            >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
                    {/* Phlebo Info */}
                    <div
                        style={{
                            flex: '1 1 100%', // Full width on mobile
                            padding: '1em',
                            fontFamily: '"Source Sans Pro", sans-serif',
                            background: 'linear-gradient(135deg, #f0f4ff, #d4e0ff)',
                            borderRadius: '8px',
                        }}
                    >
                        <h4
                            style={{
                                margin: '0',
                                fontSize: '1rem', // Larger text for mobile readability
                                fontWeight: 'bold',
                                color: '#333',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                style={{ marginRight: '0.3em', color: '#007bff' }}
                            />
                            {phlebo.Name}
                        </h4>
                        <p
                            style={{
                                margin: '0.5em 0',
                                fontSize: '0.85rem',
                                color: '#555',
                            }}
                        >
                            {phlebo.mobile}
                        </p>
    
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5em',
                                fontSize: '0.75rem',
                                alignItems: 'center',
                            }}
                        >
                            <span
                                style={{
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    padding: '0.2em 0.5em',
                                    borderRadius: '5px',
                                    fontWeight: '500',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faBuilding}
                                    style={{ marginRight: '0.3em' }}
                                />
                                {phlebo.centre}
                            </span>
                            <span
                                style={{
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    padding: '0.2em 0.5em',
                                    borderRadius: '5px',
                                    fontWeight: '500',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faRoute}
                                    style={{ marginRight: '0.3em' }}
                                />
                                {phlebo.route}
                            </span>
                            <span
                                style={{
                                    backgroundColor: '#ffc107',
                                    color: 'white',
                                    padding: '0.2em 0.5em',
                                    borderRadius: '5px',
                                    fontWeight: '500',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faClock}
                                    style={{ marginRight: '0.3em' }}
                                />
                                In: {phlebo.LoginTime}
                            </span>
                            <span
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    padding: '0.2em 0.5em',
                                    borderRadius: '5px',
                                    fontWeight: '500',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faClock}
                                    style={{ marginRight: '0.3em' }}
                                />
                                Out: {phlebo.LogoutTime}
                            </span>
                            <span
                                style={{
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    padding: '0.2em 0.5em',
                                    borderRadius: '5px',
                                    fontWeight: '500',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    style={{ marginRight: '0.3em' }}
                                />
                                {phlebo.WeakOff
                                    ? `Off: ${phlebo.WeakOff}`
                                    : 'No Week Off'}
                            </span>
                            {phlebo.FromDate && phlebo.ToDate && (
                                <span
                                    style={{
                                        backgroundColor: '#ffc107',
                                        color: 'white',
                                        padding: '0.2em 0.5em',
                                        borderRadius: '5px',
                                        fontWeight: '500',
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faCalendarTimes}
                                        style={{
                                            marginRight: '0.3em',
                                        }}
                                    />
                                    Holiday: {phlebo.FromDate} - {phlebo.ToDate}
                                </span>
                            )}
                        </div>
                    </div>
    
                    {/* Slot Selection or TestPayment */}
                    <div
                        style={{
                            flex: '1 1 100%', // Full width on mobile
                            padding: '0.5em',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1em',
                        }}
                    >
                        {selectedRowIndex === index ? (
                            <div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <h5
                                        style={{
                                            fontSize: '1rem',
                                            marginBottom: '0.5em',
                                            fontFamily: 'Source Sans Pro',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Test Selection and Billing
                                    </h5>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setSelectedRowIndex(null)}
                                        title="Back to slots"
                                    >
                                        <FontAwesomeIcon
                                            icon={faArrowLeft}
                                            style={{
                                                fontSize: '1rem',
                                                color: 'var(--bg-color)',
                                            }}
                                        />
                                    </div>
                                </div>
    
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1em',
                                    }}
                                >
                                    <TestPayment
                                        testPaymentState={testPaymentState}
                                        setTestPaymentState={setTestPaymentState}
                                        payloadData={values}
                                        setTestAddingTable={setTestAddingTable}
                                        testAddingTableState={testAddingTableState}
                                        TestData={[]}
                                        setbilldetails={setbilldetails}
                                    />
                                    <Tables
                                        thead={THEAD}
                                        tbody={testAddingTableState?.map(
                                            (item) => ({
                                                Code: item?.Code,
                                                Name: item?.ItemName,
                                                Amount: item?.Amount,
                                                Action: item?.Remove,
                                            })
                                        )}
                                    />
                                    <div style={{ flex: '1 1 50%', display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
               
               <div style={{ flex: '1 1 25%' }}>
                   <Input
                       name="alternateMobile"
                       className="form-control"
                       lable="Alternate Mobile"
                       onChange={handleChange}
                       value={values.alternateMobile || ""}
                   />
               </div>

               <div style={{ flex: '1 1 25%' }}>
                   <ReactSelect
                       name="sourceOfCollection"
                       label="Source of Collection"
                       placeholderName="Source of Collection"
                       options={[{ label: 'Walk-in', value: 'walkin' }, { label: 'Home Collection', value: 'home' }]}
                       value={values.sourceOfCollection}
                       handleChange={setFieldValue}
                   />
               </div>

               <div style={{ flex: '1 1 25%' }}>
                   <Input
                       name="remarks"
                       className="form-control"
                       lable="Remarks"
                       onChange={handleChange}
                       value={values.remarks || ""}
                   />
               </div>

               <div style={{ flex: '2 1 25%' }}>
                   <ReactSelect
                       name="paymentMode"
                       label="Payment Mode"
                       placeholderName="Payment Mode"
                       options={[{ label: 'Cash', value: 'cash' }, { label: 'Card', value: 'card' }, { label: 'Online', value: 'online' }]}
                       value={values.paymentMode}
                       handleChange={setFieldValue}
                   />
               </div>

               <div style={{ flex: '2 1 25%' }}>
                   <Input
                       name="totalAmount"
                       lable="Total Amount"
                       className="form-control"
                       disabled={true}
                       onChange={handleChange}
                       value={values.totalAmount || ""}
                   />
               </div>

               <div style={{ flex: '2 1 25%' }}>
                   <Input
                       name="discountAmount"
                       className="form-control"
                       lable="Discount Amount"
                       onChange={handleChange}
                       value={values.discountAmount || ""}
                   />
               </div>

               <div style={{ flex: '3 1 25%' }}>
                   <Input
                       name="discountPercent"
                       className="form-control"
                       lable="Discount Percent"
                       onChange={handleChange}
                       value={values.discountPercent || ""}
                   />
               </div>

               <div style={{ flex: '3 1 25%' }}>
                   <ReactSelect
                       name="discountBy"
                       lable="Discount By"
                       placeholderName="DiscountBy"
                       options={[{ label: 'Seasonal', value: 'seasonal' }, { label: 'Promotional', value: 'promo' }]}
                       value={values.discountReason}
                       handleChange={setFieldValue}
                   />
               </div>

               <div style={{ flex: '3 1 25%' }}>
                   <Input
                       name="discountReason"
                       className="form-control"
                       lable="Discount Reason"
                       onChange={handleChange}
                       value={values.discountBy || ""}
                   />
               </div>

               <div style={{ flex: '1 1 100%', textAlign: 'right' }}>
                   <button
                       style={{
                           padding: '0.5em 2em',
                           fontSize: '0.85rem',
                           backgroundColor: 'var(--bg-color)',
                           color: '#fff',
                           border: 'none',
                           borderRadius: '5px',
                           cursor: 'pointer',
                       }}
                       onClick={() => {
                           setslotSelected(null);
                           setSelectedRowIndex(null);
                       }}
                   >
                       {`Book slot for ${slotselected} on ${moment(values?.appointmentdate, 'DD-MM-YYYY').format('DD MMM YYYY')}`}
                   </button>
               </div>

           </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h5
                                    style={{
                                        fontSize: '1rem',
                                        marginBottom: '0.5em',
                                    }}
                                >
                                    Slots
                                </h5>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '0.5em',
                                    }}
                                >
                                    {slots.map((slot, slotIndex) => (
                                        <span
                                            key={slotIndex}
                                            style={{
                                                padding: '0.5em 1em',
                                                fontSize: '0.85rem',
                                                margin: '0.2em',
                                                cursor: 'pointer',
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '0.2em',
                                                border: '1px solid #ddd',
                                                textAlign: 'center',
                                            }}
                                            onClick={() =>
                                                handleSlotClick(index, slot)
                                            }
                                        >
                                            {slot}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ));
    };
    

    return (
        <div className="p-grid p-align-stretch p-justify-start">
            <div className="p-col-12">
                 { ['md','lg'].includes(screenSize) && renderPhlebosdesktop()}
                 {
                    ['xs','sm'].includes(screenSize) && renderPhlebos()
                 }
            </div>
        </div>
    );
};

export default PhleboSlotLayout;
