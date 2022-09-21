import { auth } from "../utilities/authConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastErrorMessage } from "../utilities/utilities";

export const setupVendor = createAsyncThunk(
  "user/registerVendor",
  async (data, { dispatch }) => {
    try {
      const response = await auth.privateRoute("/api/vendors", {
        method: "POST",
        data: data,
      });
      dispatch({ type: "user/setVendor", payload: response.data.vendor });
    } catch (error) {
      const message = error?.response?.data?.errors?.full_messages || error.message + ". Please try again."
      toastErrorMessage([message]);
    }
  }
);
