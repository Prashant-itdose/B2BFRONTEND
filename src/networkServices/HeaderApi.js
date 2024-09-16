import { setLoading } from "../store/reducers/loadingSlice/loadingSlice";
import store from "../store/store";
import { apiUrls } from "./apiEndpoints";
import makeApiRequest from "./axiosInstance";

export const updateClaims = async (RoleID, CenterID) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "post",
    };
    const data = await makeApiRequest(
      `${apiUrls.UpdateCliam}?RoleID=${RoleID}&CenterID=${CenterID}`,options
    );
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error);
  }
};
