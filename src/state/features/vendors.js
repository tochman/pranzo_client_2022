import { auth } from "../utilities/authConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastMessage } from "../utilities/utilities";

export const setupVenue = createAsyncThunk(
  "user/registerVenue",
  async (data, { dispatch }) => {
    try {
      const response = await auth.privateRoute("/api/vendors", {
        method: "POST",
        data: { vendor: data },
      });
      dispatch({ type: "user/setVenue", payload: response.data.vendor });
    } catch (error) {
      const message =
        error?.response?.data?.errors?.full_messages ||
        error.message + ". Please try again.";
      toastMessage([message]);
    }
  }
);

export const editVenue = createAsyncThunk(
  "user/editVenue",
  async (data, { dispatch }) => {
    try {
      const response = await auth.privateRoute(`/api/vendors/${data.id}`, {
        method: "PUT",
        data: { vendor: data },
      });
      dispatch({ type: "user/setVenue", payload: response.data.vendor });
    } catch (error) {
      const message =
        error?.response?.data?.errors?.full_messages ||
        error.message + ". Please try again.";
      toastMessage([message]);
    }
  }
);

export const setupAffiliate = createAsyncThunk(
  "user/setupAffiliate",
  async (data, { getState, dispatch }) => {
    const response = await auth.privateRoute(
      `/api/vendors/${data.vendor}/affiliates`,
      { method: "POST", data: data }
    );

    const vendorResponse = await auth.privateRoute(
      `/api/vendors/${data.vendor}`,
      { method: "GET" }
    );
    dispatch({
      type: "user/setVenue",
      payload: vendorResponse.data.vendor,
    });
    toastMessage([response.data.message], (status = "success"));
  }
);
