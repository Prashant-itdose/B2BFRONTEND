import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function MultiAxisBarChart({ weeklydashboard,type }) {
 

  // Function to format dates as "dd MMM"
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(date);
  };

  // Generate labels for the last 7 days
  const getLastSevenDays = () => {
    const dates = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(formatDate(date));
    }
    return dates;
  };

  // Map the patient count to the last 7 days
  const mapPatientCounts = (labels, weeklydashboard) => {
    const counts = labels.map((label) => {
      const date = weeklydashboard.find((data) => formatDate(new Date(data.RegDate)) === label);
      return date ? date.PatientCount : 0; // Return the count or 0 if not found
    });
    return counts;
  };
  const mapBillingAmount = (labels, weeklydashboard) => {
    const counts = labels.map((label) => {
      const date = weeklydashboard.find((data) => formatDate(new Date(data.RegDate)) === label);
      return date ? date.BillingAmount : 0; // Return the count or 0 if not found
    });
    return counts;
  };

  const labels = getLastSevenDays();
  const patientCounts = mapPatientCounts(labels, weeklydashboard);
  const billincounts=mapBillingAmount(labels,weeklydashboard)

  const data = {
    labels: labels,
    datasets: [
      {
        label:type=='count'?'PatientCount':'Billing Amount',
        data: type=='count'?patientCounts:billincounts,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
}


export default MultiAxisBarChart;
