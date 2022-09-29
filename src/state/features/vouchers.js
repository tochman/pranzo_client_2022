import { auth } from "../utilities/authConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastMessage } from "../utilities/utilities";

export const createTransaction = createAsyncThunk(
  "users/createTransaction",
  async (voucher, { getState, dispatch }) => {
    let { vendor, vouchers } = getState().user;
    try {
      const response = await auth.privateRoute(
        `/api/vendors/${vendor.id}/vouchers/${voucher.id}/transactions`,
        {
          method: "POST",
        }
      );
      const updatedVouchers = vouchers.map((voucher) => {
        if (voucher.id === response.data.voucher.id) {
          return {
            ...voucher,
            transactions: response.data.voucher.transactions,
          };
        }
        return voucher;
      });
      dispatch({
        type: "user/setVouchers",
        payload: updatedVouchers,
      });
      toastMessage([response.data.message], "success");
    } catch (error) {
      const message =
        error?.response?.data?.errors?.full_messages ||
        error.message + ". Please try again.";
      toastMessage([message]);
    }
  }
);
