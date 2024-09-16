import axios from "axios";
import { notify } from "../utils/utils";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";
const baseurl = import.meta.env.VITE_APP_REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  headers: {
    "Content-Type":"multipart/form-data",
  },
  withCredentials:true
});

let globalErrorFlag = false;

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const globalErrorNotifier = debounce((message) => {
  notify(message, "error");
  globalErrorFlag = false;
  logOut();
}, 1000);

const logOut = () => {
  localStorage.clear();
  window.location.href = "/login";
  notify("Please authenticate", "error");
};

const makeApiRequest = async (url, options, header) => {
  const localData = localStorage.getItem("token");
  
  const { method, data } = options;
  const lowerCaseMethod = method.toLowerCase();


  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localData}`,
  };
  const finalUrl = url;
   console.log(headers,finalUrl,options)
  try { 
    const response = await axiosInstance({
      method: lowerCaseMethod,
      url:finalUrl,
      ...(data && { data }),
      headers,
    });
    return response;
  } catch (error) {
    if (
      (error.response && error.response.status === 401) ||
      error.response.statusText === "Please authenticate"
    ) {
      if (!globalErrorFlag) {
        globalErrorFlag = true;
        globalErrorNotifier(error.response.statusText);
      }
      logOut();
    }
    return error.response;
  }
};

export default makeApiRequest;
