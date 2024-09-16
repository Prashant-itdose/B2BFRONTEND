import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../loadingSlice/loadingSlice";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import makeApiRequest from "../../../networkServices/axiosInstance";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";
import { headers } from "../../../utils/apiCalls";

export const CentreWiseCacheByCenterID = createAsyncThunk(
  "CentreWiseCache",
  async ({ Id }, { dispatch }) => {
    console.log('hello')
    console.log(Id)
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
    formData.append('SessionEmployeeID',Id);
    const options = {
      method: "POST",
      data: formData,
    };
      const dataResponse = await makeApiRequest(
        `${apiUrls?.GetCentresByEmployeeId}`,options
      );

      dispatch(setLoading(false));
      
      const data=dataResponse?.data?.data.map((item)=>{
       return {
        label:item?.Centre,
        value:item?.CentreID
       }
      })
      
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);





