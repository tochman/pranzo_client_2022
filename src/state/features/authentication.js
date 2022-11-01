import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastMessage } from "../utilities/utilities";
import { auth, getHeaders } from "../utilities/authConfig";
import { endSession, setVenue, setVouchers } from "./userSlice";

const storeVendorData = createAsyncThunk(
  "vendor/storeVendorData",
  async (data, { dispatch }) => {
    debugger;
    const vendorResponse = await auth.privateRoute(
      `/api/vendors/${data.vendor_id}`,
      { method: "GET" }
    );
    dispatch(setVenue(vendorResponse.data.vendor));
    const voucherResponse = await auth.privateRoute(
      `/api/vendors/${data.vendor_id}/vouchers`,
      { method: "GET" }
    );
    dispatch(setVouchers(voucherResponse.data.vouchers));
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, { dispatch }) => {
    try {
      const response = await auth.signUp(data);
      dispatch({ type: "user/setCurrentUser", payload: response.data });
    } catch (error) {
      toastMessage(error.response.data.errors.full_messages);
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (params, { dispatch }) => {
    try {
      const response = await auth.signIn(params.email, params.password);
      // check if vendor_id is present. If yes fetch the vendor and dispatch "user/setVenue" action
      if (response.data.vendor_id) {
        storeVendorData(response.data.vendor_id);
        // const vendorResponse = await auth.privateRoute(
        //   `/api/vendors/${response.data.vendor_id}`,
        //   { method: "GET" }
        // );
        // dispatch(setVenue(vendorResponse.data.vendor))
        // const voucherResponse = await auth.privateRoute(
        //   `/api/vendors/${response.data.vendor_id}/vouchers`,
        //   { method: "GET" }
        // );
        // dispatch(setVouchers(voucherResponse.data.vouchers))
      }
      dispatch({ type: "user/setCurrentUser", payload: response.data });
      // check if vendor_id is present. If yes fetch the vendor and dispatch "user/setVenue" action
    } catch (error) {
      toastMessage(error.response.data.errors);
    }
  }
);
export const validateUserByToken = createAsyncThunk(
  "user/validateUserByToken",
  async (params, { dispatch }) => {
    try {
      const headers = getHeaders();
      const response = await auth.validateToken(headers);
      if (response.data.vendor_id) {
        storeVendorData(response.data.vendor_id);
        // const vendorResponse = await auth.privateRoute(
        //   `/api/vendors/${response.data.vendor_id}`,
        //   { method: "GET" }
        // );
        // dispatch({
        //   type: "user/setVenue",
        //   payload: vendorResponse.data.vendor,
        // });
        // const voucherResponse = await auth.privateRoute(
        //   `/api/vendors/${response.data.vendor_id}/vouchers`,
        //   { method: "GET" }
        // );
        // dispatch({
        //   type: "user/setVouchers",
        //   payload: voucherResponse.data.vouchers,
        // });
      }
      dispatch({ type: "user/setCurrentUser", payload: response.data });
    } catch (error) {
      null;
    }
  }
);

export const clearSession = createAsyncThunk(
  "user/clearSession",
  (params, { dispatch }) => {
    localStorage.removeItem("auth-storage");
    dispatch(endSession(params));
  }
);
