import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels); // Register the plugin

function Chat2({ state }) {
  const { t } = useTranslation();

  const data = {
    labels: [
      t("Sample Collected"),
      t("Sample Not Collected"),
      t("Sample Received"),
      t("Sample Rejected"),
      t("Sample Approved"),
    ],
    datasets: [
      {
        data: [
          state?.SampleCollectedCount,
          state?.SampleNotCollectedCount,
          state?.SampleReceivedCount,
          state?.SampleRejectedCount,
          state?.ApprovedCount,
        ],
        backgroundColor: [
          "rgba(252, 186, 3,0.8)",
          "rgba(99,104,116,0.8)",
          "rgba(51, 122, 183)",
          "rgba(237, 21, 21,0.8)",
          "rgba(25, 163, 18,0.8)",
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "left",
        align: "end",
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            family: "Roboto",
            size: 16,
          },
        },
      },
      datalabels: {
        color: "#fff", // Text color
        font: {
          family: "Roboto",
          size: 14,
          weight: "bold",
        },
        formatter: (value) => value>0?value:'', // Display the count (value)
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "85%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "10px",
      }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default Chat2;
