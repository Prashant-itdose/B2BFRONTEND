import React, { useEffect, useState } from "react";
import { DOCTOR_TIMING_COLOR } from "../../utils/constant";
import { DoctorAppointmentStatusByDoctorID } from "../../networkServices/doctorTimingapi";
import moment from "moment";

const DoctorDetails = ({ payloadData }) => {
  const [doctorData, setDoctorData] = useState([]);

  const handleDoctorAppointmentStatusByDoctorID = async (payload) => {
    try {
      const data = await DoctorAppointmentStatusByDoctorID(payload);
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (payloadData?.DoctorID && payloadData?.Date) {
      handleDoctorInfo(payloadData);
    }
  }, [payloadData]);

  const handleDoctorInfo = async (payloadData) => {
    const payload = {};

    payload.doctorID = String(payloadData?.DoctorID);
    payload.date = moment(payloadData?.Date).format("YYYY-MM-DD");

    const result = await handleDoctorAppointmentStatusByDoctorID(payload);

    const CARD_ARRAY = [
      {
        backGroundColor: DOCTOR_TIMING_COLOR[7],
        label: "Total Slots",
        data: result?.TotalSlots,
        image: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={DOCTOR_TIMING_COLOR[7]}
              stroke-width="2"
            />
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="12"
              fill={DOCTOR_TIMING_COLOR[7]}
            >
              TS
            </text>
          </svg>
        ),
      },
      {
        backGroundColor: DOCTOR_TIMING_COLOR[8],
        label: "Not Available",
        data: result?.Doctor_Slot_Not_Available,
        image: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={DOCTOR_TIMING_COLOR[8]}
              stroke-width="2"
            />
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="12"
              fill={DOCTOR_TIMING_COLOR[8]}
            >
              NA
            </text>
          </svg>
        ),
      },
      {
        backGroundColor: DOCTOR_TIMING_COLOR[0],
        label: "Expired",
        data: result?.Expired_WO_App,
        image: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={DOCTOR_TIMING_COLOR[0]}
              stroke-width="2"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              stroke={DOCTOR_TIMING_COLOR[0]}
              stroke-width="2"
            />
            <line
              x1="6"
              y1="18"
              x2="18"
              y2="6"
              stroke={DOCTOR_TIMING_COLOR[0]}
              stroke-width="2"
            />
          </svg>
        ),
      },
      {
        backGroundColor: DOCTOR_TIMING_COLOR[1],
        label: "Available Slot",
        data: result?.Available_Slots,
        image: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={DOCTOR_TIMING_COLOR[1]}
              stroke-width="2"
            />
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="12"
              fill={DOCTOR_TIMING_COLOR[1]}
            >
              AS
            </text>
          </svg>
        ),
      },
      {
        backGroundColor: DOCTOR_TIMING_COLOR[9],
        label: "Booked",
        data: result?.Booked,
        image: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={DOCTOR_TIMING_COLOR[9]}
              stroke-width="2"
            />
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="12"
              fill={DOCTOR_TIMING_COLOR[9]}
            >
              B
            </text>
          </svg>
        ),
      },
      {
        backGroundColor: DOCTOR_TIMING_COLOR[10],
        label: "Un-Confirmed",
        data: result?.UnConfirmed,
        image: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={DOCTOR_TIMING_COLOR[10]}
              stroke-width="2"
            />
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="12"
              fill={DOCTOR_TIMING_COLOR[10]}
            >
              UC
            </text>
          </svg>
        ),
      },
      {
        backGroundColor: DOCTOR_TIMING_COLOR[11],
        label: "Re-Scheduled",
        data: result?.Rescheduled,
        image: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={DOCTOR_TIMING_COLOR[11]}
              stroke-width="2"
            />
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="12"
              fill={DOCTOR_TIMING_COLOR[11]}
            >
              RS
            </text>
          </svg>
        ),
      },
      {
        backGroundColor: DOCTOR_TIMING_COLOR[6],
        label: "Confirmed",
        data: result?.Confirmed,
        image: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={DOCTOR_TIMING_COLOR[6]}
              stroke-width="2"
            />
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="12"
              fill={DOCTOR_TIMING_COLOR[6]}
            >
              C
            </text>
          </svg>
        ),
      },
      {
        backGroundColor: DOCTOR_TIMING_COLOR[5],
        label: "Triage",
        data: result?.Triage_Waiting,
        image: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={DOCTOR_TIMING_COLOR[5]}
              stroke-width="2"
            />
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="12"
              fill={DOCTOR_TIMING_COLOR[5]}
            >
              T
            </text>
          </svg>
        ),
      },
      {
        backGroundColor: DOCTOR_TIMING_COLOR[4],
        label: "Waiting",
        data: result?.Waiting,
        image: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={DOCTOR_TIMING_COLOR[4]}
              stroke-width="2"
            />
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="12"
              fill={DOCTOR_TIMING_COLOR[4]}
            >
              W
            </text>
          </svg>
        ),
      },
      {
        backGroundColor: DOCTOR_TIMING_COLOR[3],
        label: "Seen",
        data: result?.Seen,
        image: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={DOCTOR_TIMING_COLOR[3]}
              stroke-width="2"
            />
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="12"
              fill={DOCTOR_TIMING_COLOR[3]}
            >
              S
            </text>
          </svg>
        ),
      },
    ];
    setDoctorData(CARD_ARRAY);
  };

  return (
    <div className="d-flex align-items-center flex-wrap">
      {doctorData.map((items, i) => {
        return (
          <div
            className=" d-flex justify-content-between align-items-center data-viewer text-center text-white "
            style={{ backgroundColor: items?.backGroundColor, fontWeight: 500, marginBottom:"5px" }}
            key={i}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                margin: "0px 4px",
              }}
            >
              {items?.image}
            </div>
            <div className="mx-1">
              <div style={{marginTop:"-2px"}}>{items?.label}</div>
              <div style={{marginTop:"-5px"}}>{items?.data}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DoctorDetails;
