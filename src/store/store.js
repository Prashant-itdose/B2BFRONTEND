import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "@app/store/reducers/ui";

import {
  CommonSlice,
  TokenManagementSlice,
  authSlice,
  loadingSlice,
  logoutSlice,
} from "./reducers";
// import logger from "redux-logger";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    authSlice: authSlice,
    loadingSlice: loadingSlice,
    CommonSlice: CommonSlice,
    logoutSlice:logoutSlice,
    TokenManagementSlice:TokenManagementSlice
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export default store;
