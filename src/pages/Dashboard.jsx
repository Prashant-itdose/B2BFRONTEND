import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {
  ChartData,
  getChart,
  
} from "./utility";
import { useNavigate } from "react-router-dom";
import MultiAxisLineChart from "./MultiAxisLineChart";
import RevenueChart from "./RevenueChart";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import ReactSelect from "../components/formComponent/ReactSelect";
import DatePicker from "../components/formComponent/DatePicker";
import moment from "moment/moment";
import { useFormik } from "formik";
import { fetchPanelswithid, formatDateToYYYYMMDD, getCentresworkorder } from "../utils/helperfunctions";
import Heading from "../components/UI/Heading";
import ReactSelectHead from "../components/formComponent/ReactSelectHead";
import { DashboardData, LastWeekTrend, SalesTrend, WelcomeDashBoard } from "../networkServices/opdserviceAPI";
const initialData={
  CentreId:'',
  PanelID:'',
  FromDate:moment().format("DD-MMM-YYYY"),
  ToDate:moment().format("DD-MMM-YYYY")
}

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MainDaashBoard = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [centres,setcentres]=useState([])
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visibleChart, setVisibleChart] = useState("revenue");

  const handleChartToggle = (chart) => {
    setVisibleChart(chart);
  };
  const [monthlydata,setMonthlydata]=useState([])
  const [patientcount,setpatientcount]=useState([])
  const [userWiseDashBoard, setUserWiseDashBoard] = useState([]);
  const [weeklydashboard,setweeklydashboard]=useState({BillingAmount:[],PatientCount:[]});
  const [testcount,settestcount]=useState({})
  const [payload, setPayload] = useState({
    CentreID: "",
    FromDate: new Date(),
    FromTime: "00:00:00",
    ToDate: new Date(),
    ToTime: "23:59:59",
    PanelID:''
  });
  const [Panels,setPanels]=useState([])

  useEffect(() => {
    // getDashboardAccessCentres({
    //   state: setAccessCentre,
    //   callbackFun: (field, values) => {
    //     let data = { ...payload };
    //     data.CentreID = values;
    //     getDashBoardData(field, values, data, setUserWiseDashBoard);
    //     fetchuserdata(data, setDashBoardData);
    //   },
    // });
  }, []);
  const { handleChange, values, setFieldValue, handleSubmit } = useFormik({
    initialValues:initialData,
  });

  const handleReactSelect = (name, value) => {
    setFieldValue(name, value);
    if (name == "CentreId") {
      
      setFieldValue("PanelID", "");
    }
    
  };
  useEffect(() => {
    if (values?.CentreId?.value)
      fetchPanelswithid(values?.CentreId.value, setPanels, setFieldValue);
    else fetchPanelswithid(values?.CentreId, setPanels, setFieldValue);
  }, [values?.CentreId]);
  useEffect(()=>{
    getCentresworkorder(setcentres,setFieldValue)
  },[])
  const handleApply=async()=>{

    const formData = new FormData();
      
      formData.append("SessionEmployeeID", localStorage.getItem("employeeId"));
      formData.append("SessionLoginName", localStorage.getItem("employeeName"));
      // formData.append('CentreID',values?.CentreId.value?values?.CentreId.value:values?.CentreId);
      // formData.append('Panel_ID',values?.PanelID)
      formData.append('CentreID',1);
      formData.append('Panel_ID',228)
      
      
    try {
        const dataResponse = await WelcomeDashBoard(formData);
        const monthlydata= await SalesTrend(formData);
        const weeklydata=await LastWeekTrend(formData)
        if (dataResponse.data.status == true) {
          setUserWiseDashBoard(dataResponse?.data?.data)
         
        }
        if(monthlydata.data.status==true)
          { setMonthlydata(monthlydata.data.data_Amount)
            setpatientcount(monthlydata?.data.data_PatientCount)
          }
          if(weeklydata.data.status==true)
          {
              setweeklydashboard({
                PatientCount:weeklydata.data.data_PatientCount,
                BillingAmount:weeklydata.data.data_Amount
              })
          }
      } catch (error) {
        console.error(error);
      }
  }
  const fetchDashboard=async()=>{
    const formData = new FormData();
      
    formData.append("SessionEmployeeID", localStorage.getItem("employeeId"));
    formData.append("SessionLoginName", localStorage.getItem("employeeName"));
    // formData.append('CentreID',values?.CentreId.value?values?.CentreId.value:values?.CentreId);
    // formData.append('Panel_ID',values?.PanelID)
    formData.append('CentreID',1);
    formData.append('Panel_ID',228)
    formData.append('FromDate',formatDateToYYYYMMDD(values?.FromDate))
    formData.append('ToDate',formatDateToYYYYMMDD(values?.ToDate))
    try {
      const dataResponse = await DashboardData(formData);
      if (dataResponse.data.status == true) {
      settestcount(dataResponse?.data?.data[0])
       
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
   handleApply();
   fetchDashboard();
  },[])
  return (
    <>
      <div className="card patient_registration border">
      <Heading
          title={"Dashboard"}
          isBreadcrumb={false}
        />
        <div className="row g-4 m-2">
         
          <ReactSelect
            placeholderName={"Centre"}
            id={"Centre"}
            name={"CentreId"}
            searchable={true}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={values?.CentreId}
            dynamicOptions={centres}
            handleChange={handleReactSelect}
          />
          <ReactSelect
                placeholderName={t("Client")}
                id={"Panel"}
                name={"PanelID"}
                searchable={true}
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                value={values?.PanelID}
                dynamicOptions={Panels}
                handleChange={handleReactSelect}
              />
          <DatePicker
            className="custom-calendar"
            id="FromDate"
            name="FromDate"
            handleChange={handleChange}
            value={
              values.FromDate
                ? moment(values?.FromDate, "DD-MMM-YYYY").toDate()
                : values?.FromDate
            }
            lable={"FromDate"}
            placeholder={VITE_DATE_FORMAT}
            respclass={"col-xl-2 col-md-3 col-sm-4 col-12"}
          />
          <DatePicker
            className="custom-calendar"
            id="ToDate"
            name="ToDate"
            handleChange={handleChange}
            value={
              values.ToDate
                ? moment(values?.ToDate, "DD-MMM-YYYY").toDate()
                : values?.ToDate
            }
            lable={"ToDate"}
            placeholder={VITE_DATE_FORMAT}
            respclass={"col-xl-2 col-md-3 col-sm-4 col-12"}
          />
          <div className="col-2">
            <button className="btn btn-sm btn-info" onClick={fetchDashboard}>
              {"Apply"}
            </button>
          </div>
        
          
        </div>
      </div>
      <div className="main-dashboard-outlet">
        <div className="main-cont-welcom">
          <div className="dashboard-welcome-cont">
            <div>
              {/* <span>{getGreeting("greeting")}</span>
              <span>{getGreeting("date")}</span> */}
              <span>{`Welcome ${localStorage.getItem('employeeName')}`}</span>
            </div>
            <img
              src={''}
              alt=""
              style={{ width: "150px", height: "150px" }}
            />
          </div>
        </div>
        <div class="div2 dashboard-Chart pt-3">
          <DataSet userWiseDashBoard={userWiseDashBoard} />
        </div>
        
        <div class="SalesCollection dashboard-Chart">
          <span>Revenue</span>
          <SalesCollection monthlydata={monthlydata} />
        </div>
        <div class="Countcollection dashboard-Chart">
          <span>PatientCount</span>
          <PatientCountChart monthlydata={patientcount} />
        </div>
        {/* <div class="MultiAxisLineChart dashboard-Chart">
          <span>Registration wise Revenue</span>
          <MultiAxisLineChart />
        </div> */}
        <div className="MultiAxisLineChartbilling dashboard-Chart">
      <MultiAxisLineChart weeklydashboard={weeklydashboard?.BillingAmount} type='amount' />
     </div>
     <div className="MultiAxisLineChartcount dashboard-Chart"><MultiAxisLineChart  weeklydashboard={weeklydashboard?.PatientCount} type='count'/></div>

        <div class="sample-data-chart dashboard-Chart">
        <div className="d-flex">
  <span>Sample Collection Status</span>
  <span>{`Total Patient: ${testcount?.PatientCount}`}</span>
  <span>{`Total Billing Amount: ${testcount?.BillingAmount}`}</span>
</div>

          <SampleCollection userWiseDashBoard={testcount} />
        </div>
      </div>
    </>
  );
};

export default MainDaashBoard;

function SampleCollection({ userWiseDashBoard }) {
  const [state, setState] = useState("Pie Chart");

  function getPosition() {
    if (state === "Pie Chart") {
      return { top: "50px", left: "25px" };
    } else {
      return { top: "10px", left: "80%" };
    }
  }
 const handlechange=(option)=>{
 setState(option?.value)
 } 
 console.log(userWiseDashBoard)
 
  return (
    <>
      <div className="sample-collection-selectbox" style={{ ...getPosition() }}>
        <ReactSelectHead
          // className="required-fields"
          placeholderName="Chart Type"
          name="state"
          dynamicOptions={ChartData}
          value={state}
          respclass="col-8"
          handleChange={handlechange}
          lable="Chart Type"
        />
      </div>
      {getChart(state, userWiseDashBoard)}
    </>
  );
}

function RevenueCollection({ userWiseDashBoard }) {
  let data = {
    Cash: userWiseDashBoard.Cash || 0,
    Online: userWiseDashBoard.TotalOnlinepayment || 0,
    Cheque: userWiseDashBoard.Cheque || 0,
  };

  return <>{<RevenueChart state={data} />}</>;
}


function SalesCollection({ monthlydata }) {
  console.log(monthlydata);

  // Get the current month and the previous two months in the same format as RegDate ("MMM-YYYY")
  const currentMonth = moment().format('MMM-YYYY');
  const previousMonth = moment().subtract(1, 'months').format('MMM-YYYY');
  const twoMonthsAgo = moment().subtract(2, 'months').format('MMM-YYYY');

  // Find the BillingAmount for each month
  const getBillingAmountForMonth = (month) => {
    const monthData = monthlydata.find(data => data.RegDate === month);
    return monthData ? monthData.BillingAmount : 0;
  };

  const currentMonthSales = getBillingAmountForMonth(currentMonth);
  const lastMonthSales = getBillingAmountForMonth(previousMonth);
  const twoMonthsAgoSales = getBillingAmountForMonth(twoMonthsAgo);

  const trend = currentMonthSales - lastMonthSales;
  const trendColor = trend >= 0 ? "#66BB6A" : "#EF5350"; // Green for positive, Red for negative
  const trendText = trend >= 0 ? `+${trend}` : `${trend}`;

  const SalesCollectionData = {
    labels: [twoMonthsAgo, previousMonth, currentMonth],
    datasets: [
      {
        label: "Sales Data",
        data: [twoMonthsAgoSales, lastMonthSales, currentMonthSales],
        backgroundColor: [
          "#4FC3F7", // Modern Light Blue for two months ago
          "#81C784", // Modern Light Green for last month
          "#FFB74D", // Modern Light Orange for the current month
        ],
        borderColor: [
          "#0288D1", // Modern Darker Blue for two months ago
          "#388E3C", // Modern Darker Green for last month
          "#F57C00", // Modern Darker Orange for the current month
        ],
        borderWidth: 1.5,
        borderRadius: 2, // Rounded corners for bars
        hoverBackgroundColor: [
          "#29B6F6", // Hover color for two months ago
          "#66BB6A", // Hover color for last month
          "#FFA726", // Hover color for the current month
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend if there's only one dataset
      },
      tooltip: {
        backgroundColor: '#424242', // Darker background for tooltip
        titleFont: {
          size: 16,
          weight: 'bold',
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
        borderColor: '#212121',
        borderWidth: 1,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: trendColor,
        font: {
          size: 16,
          weight: 'bold',
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
        formatter: function (value, context) {
          if (context.dataIndex === 2) {
            return trendText;
          }
          return null;
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide grid lines for x-axis
        },
        ticks: {
          font: {
            size: 14, // Adjust the font size for x-axis labels
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
          color: '#757575', // Grey color for x-axis labels
        },
      },
      y: {
        grid: {
          color: '#E0E0E0', // Light grey grid lines for y-axis
        },
        ticks: {
          beginAtZero: true,
          font: {
            size: 14, // Adjust the font size for y-axis labels
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
          color: '#757575', // Grey color for y-axis labels
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Bar data={SalesCollectionData} options={options} />
    </div>
  );
}








function PatientCountChart({ monthlydata }) {
  console.log(monthlydata);

  // Get the current month and the previous two months in the same format as RegDate ("MMM-YYYY")
  const currentMonth = moment().format('MMM-YYYY');
  const previousMonth = moment().subtract(1, 'months').format('MMM-YYYY');
  const twoMonthsAgo = moment().subtract(2, 'months').format('MMM-YYYY');

  // Find the PatientCount for each month
  const getPatientCountForMonth = (month) => {
    const monthData = monthlydata.find(data => data.RegDate === month);
    return monthData ? monthData.PatientCount : 0;
  };

  const currentMonthPatients = getPatientCountForMonth(currentMonth);
  const lastMonthPatients = getPatientCountForMonth(previousMonth);
  const twoMonthsAgoPatients = getPatientCountForMonth(twoMonthsAgo);

  const trend = currentMonthPatients - lastMonthPatients;
  const trendPercentage = lastMonthPatients
    ? ((trend / lastMonthPatients) * 100).toFixed(2)
    : trend * 100; // If lastMonthPatients is 0, show trend as 100%

  const trendIcon = trend >= 0 ? <FaArrowUp color="#4CAF50" /> : <FaArrowDown color="#F44336" />;
  const trendColor = trend >= 0 ? "#4CAF50" : "#F44336"; // Green for positive, Red for negative
  const trendText = trend >= 0 ? `+${trendPercentage}%` : `${trendPercentage}%`;

  const PatientCountData = {
    labels: [twoMonthsAgo, previousMonth, currentMonth],
    datasets: [
      {
        label: "Patient Count",
        data: [twoMonthsAgoPatients, lastMonthPatients, currentMonthPatients],
        backgroundColor: [
          "#4FC3F7", // Modern Light Blue for two months ago
          "#81C784", // Modern Light Green for last month
          "#FFB74D", // Modern Light Orange for the current month
        ],
        borderColor: [
          "#0288D1", // Modern Darker Blue for two months ago
          "#388E3C", // Modern Darker Green for last month
          "#F57C00", // Modern Darker Orange for the current month
        ],
        borderWidth: 1.5,
        borderRadius: 2, // Rounded corners for bars
        hoverBackgroundColor: [
          "#29B6F6", // Hover color for two months ago
          "#66BB6A", // Hover color for last month
          "#FFA726", // Hover color for the current month
        ],
        
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend if there's only one dataset
      },
      tooltip: {
        backgroundColor: '#424242', // Darker background for tooltip
        titleFont: {
          size: 16,
          weight: 'bold',
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
        borderColor: '#212121',
        borderWidth: 1,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: trendColor,
        font: {
          size: 16,
          weight: 'bold',
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
        formatter: function (value, context) {
          if (context.dataIndex === 2) {
            return trendText;
          }
          return null;
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide grid lines for x-axis
        },
        ticks: {
          font: {
            size: 14, // Adjust the font size for x-axis labels
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
          color: '#757575', // Grey color for x-axis labels
        },
      },
      y: {
        grid: {
          color: '#E0E0E0', // Light grey grid lines for y-axis
        },
        ticks: {
          beginAtZero: true,
          font: {
            size: 14, // Adjust the font size for y-axis labels
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
          color: '#757575', // Grey color for y-axis labels
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: "100%", height: "100%" }}>
      {/* Icon and Percentage above the current month */}
      <div
        style={{
          position: 'absolute',
          left: '80%',
          top: '-20px',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: trendColor,
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        {trendIcon} {trendText}
      </div>

      <Bar data={PatientCountData} options={options} />
    </div>
  );
}










function DataSet({ userWiseDashBoard }) {
  
  return (
    <>
      <div className="data-set-cont">
        <label>Today</label>
        <p>
          <p>PatientCount</p> <p>{userWiseDashBoard[0]?.TodayPatientCount}</p>
        </p>
        <p>
        <p>BillingAmount</p> <p>{userWiseDashBoard[0]?.TodayBillingAmount}</p>
        </p>
     </div>
      <div className="data-set-cont">
        <label>Monthly</label>
        <p>
          <p>PatientCount</p> <p>{userWiseDashBoard[0]?.MonthlyPatientCount}</p>
        </p>
        <p>
        <p>BillingAmount</p> <p>{userWiseDashBoard[0]?.MonthlyBillingAmount}</p>
        </p>
      </div>
      
    </>
  );
}
