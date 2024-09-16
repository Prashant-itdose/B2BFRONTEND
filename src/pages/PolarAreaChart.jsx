import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart,
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { useTranslation } from "react-i18next";

// Register necessary chart components
Chart.register(PolarAreaController, RadialLinearScale, PointElement, LineElement, ArcElement);

const PolarAreaChart = ({ state }) => {
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
          "rgba(252, 186, 3)",
          "rgba(99, 104, 116, 0.8)",
          "rgba(51, 122, 183)",
          "rgba(237, 21, 21)",
          "rgba(25, 163, 18)",
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "90%" }}>
      <PolarArea
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            r: {
              ticks: {
                stepSize: 1,
                beginAtZero: true,
                color: "white", // Set tick label color to white for this chart only
              },
            },
          },
          plugins: {
            legend: {
              
            },
          },
        }}
      />
    </div>
  );
};

export default PolarAreaChart;
