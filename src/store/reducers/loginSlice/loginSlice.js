import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeApiRequest from "../../../networkServices/axiosInstance";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { notify } from "../../../utils/utils";
import { setLoading } from "../loadingSlice/loadingSlice";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { jwtDecode } from "jwt-decode";
const convertToFormData = (obj) => {
  const formData = new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      console.log(`Appending ${key}: ${obj[key]}`);
      formData.append(key, obj[key]);
    }
  }

  // Debug: Log FormData entries
  console.log('FormData entries:');
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  return formData;
};



const initialState = {
  user: {},
  loading: false,
  error: "",
  message: "",
  success: false,
};

export const signInAction = createAsyncThunk(
  "signIn",
  async (data, { dispatch }) => {
    
    const newdata={...data,client:'B2B'}
    
    const formData=convertToFormData(newdata)
    console.log(formData)
    const options = {
      method: "POST",
      data:formData
    };
    try {
      dispatch(setLoading(true));
      
      const data = await makeApiRequest(apiUrls?.login, options,"multipart/form-data");
      
      dispatch(setLoading(false));
      
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(signInAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload.message;
        payload?.success === false
          ? notify(payload.Message, "error")
          : notify(payload.Message, "success");
          console.log(payload)
        if (payload?.success) {
          useLocalStorage("userData", "set", payload?.data?.Employee_ID);
          useLocalStorage("token", "set", payload?.data?.Token);
        }
      })
      .addCase(signInAction.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        notify(error.message, "error");
      });
  },
});

export default authSlice.reducer;
