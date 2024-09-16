import { setLoading } from "../store/reducers/loadingSlice/loadingSlice";
import store from "../store/store";
import { apiUrls } from "./apiEndpoints";
import makeApiRequest from "./axiosInstance";

export const SearchPatient = async (params) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };
    const data = await makeApiRequest(`${apiUrls.SearchPatient}`, options);
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error);
  }
};

export const GetDepartmentWiseDetails = async (
  transactionID,
  Type,
  LedgertransactionNo
) => {
  try {
    const url = `${apiUrls.GetDepartmentWiseDetails}?transactionID=${transactionID}&Type=${Type}&LedgertransactionNo=${LedgertransactionNo}`;
    const data = await makeApiRequest(url, {
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetDepartmentItemDetails = async (params) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };
    const data = await makeApiRequest(
      `${apiUrls.GetDepartmentItemDetails}`,
      options
    );
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error);
  }
};

export const GetPanelList = async (
  TransactionID,
  Type,
  LedgerTransactionNo
) => {
  try {
    const url = `${apiUrls.GetPanelList}?TransactionID=${TransactionID}&Type=${Type}&LedgerTransactionNo=${LedgerTransactionNo}`;
    const data = await makeApiRequest(url, {
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
};
