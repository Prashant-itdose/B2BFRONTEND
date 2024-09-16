import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useTranslation } from "react-i18next";

const BarChart = ({ state }) => {
  const { t } = useTranslation();

  // Register ChartJS elements and ChartDataLabels plugin
  ChartJS.register(CategoryScale, LinearScale, Title, BarElement, Tooltip, ChartDataLabels);

  const data = {
    labels: [
      t("Collected"),
      t("Not Collected"),
      t("Received"),
      t("Rejected"),
      t("Approved"),
    ],
    datasets: [
      {
        label: "Bar Chart",
        borderRadius: 5,
        data: [
          state?.SampleCollectedCount,
          state?.SampleNotCollectedCount,
          state?.SampleReceivedCount,
          state?.SampleRejectedCount,
          state?.ApprovedCount,
        ],
        backgroundColor: [
          "rgba(252, 186,3)",
          "rgba(99,104,116,0.8)",
          "rgba(51, 122, 183)",
          "rgba(237, 21, 21)",
          "rgba(25, 163, 18)",
        ],
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Source Sans Pro", // Apply font to legend labels
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: t("Sample Status"), // Example title
        font: {
          family: "Source Sans Pro", // Apply font to title
          size: 20,
        },
      },
      // Configure ChartDataLabels to display inside the bar
      datalabels: {
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0; // Show only if the count is greater than 0
        },
        color: "white", // Set the label color to white
        anchor: "center", // Center the label inside the bar
        align: "center", // Align the label inside the bar
        font: {
          family: "Roboto", // Font for the count
          size: 14,
        },
        formatter: function (value) {
          return value; // Display the actual count
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "Roboto", // Apply font to x-axis labels
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "Roboto", // Apply font to y-axis labels
            size: 12,
          },
        },
      },
    },
    // Reduce the bar thickness
    barThickness: 40, // Adjust the bar thickness
  };

  return (
    <div style={{ width: "100%", height: "90%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
