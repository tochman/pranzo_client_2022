import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastMessage } from "../utilities/utilities";
import { auth, getHeaders } from "../utilities/authConfig";
import { endSession, setVenue, setVouchers } from "./userSlice";
import i18n from "../../i18n";

const storeVendorData = createAsyncThunk(
  "vendor/storeVendorData",
  async (data, { dispatch }) => {
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
      if (response.data.vendor_id) {
        dispatch(storeVendorData({ vendor_id: response.data.vendor_id }));
      }
      dispatch({ type: "user/setCurrentUser", payload: response.data });
    } catch (error) {
      toastMessage(error.response.data.errors);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (params, { dispatch }) => {
    try {
      const response = await auth.changePassword(
        params.currentPassword,
        params.newPassword,
        params.newPasswordConfirmation
      );

      dispatch({ type: "user/setCurrentUser", payload: response.data.data });
      toastMessage([i18n.t('authentication.changePassword.successMessage')], (status =  "success"))
      return true
    } catch (error) {
      toastMessage(error.response.data.errors.full_messages);
      return false
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (params) => {
    const redirectUrl = import.meta.env.PROD ? 'https://pranzo.se/auth/change-password' : 'http://localhost:3000/auth/change-password'
    try {
      const response = await auth.resetPassword(params.email, redirectUrl)
      toastMessage([response.data.message], (status =  "success"));
    } catch (error) {
      toastMessage(error.response.data.errors);
      return false
    }
  }
)

export const validateUserByToken = createAsyncThunk(
  "user/validateUserByToken",
  async (undefined, { dispatch }) => {
    try {
      const headers = getHeaders();
      const response = await auth.validateToken(headers);
      if (response.data.vendor_id) {
        dispatch(storeVendorData({ vendor_id: response.data.vendor_id }));
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
