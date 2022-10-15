import { auth } from "../utilities/authConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastMessage } from "../utilities/utilities";

export const generateReport = createAsyncThunk(
  "users/generateReport",
  async (data, { dispatch }) => {
    const response = await auth.privateRoute(
      `/api/vendors/${data.vendor}/reports`,
      {
        method: "POST",
        data: { period: data.period },
      }
    );
    toastMessage([response.data.message], (status = "success"));
    return response.data;
  }
);
