import moment from "moment";
import { apiUrls } from "./apiEndpoints";
import makeApiRequest from "./axiosInstance";

export const ValidateDuplicatePatientEntry = async () => {
  try {
    const data = await makeApiRequest(apiUrls.ValidateDuplicatePatientEntry, {
      method: "post",
      data: {
        "patientID": "AM24-05080003",
        "firstName": "SHYAM",
        "lastName": "SINGH",
        "mobileNumber": "5628963255",
        "idProof": [
          {
            "idProofID": "1",
            "idProofName": "AADHAAR",
            "idProofNumber": "4554545564561"
          }
        ]
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};
export const findAgeByDOB = async (dob) => {
  try {
    
    const data = await makeApiRequest(`${apiUrls.GetAgeByDateOfBirth}?Date=${moment(new Date(dob)).format('YYYY-MM-DD')}`, {
      method: "get"
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const PatientRegistrationAPI = async (params) => {
  try {
    const data = await makeApiRequest(apiUrls.SaveReg, {
      method: "post",
      data: params,
    });

    return data;
  } catch (error) {
    throw error;
  }
};