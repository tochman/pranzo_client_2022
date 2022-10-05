import { auth } from "../utilities/authConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastMessage } from "../utilities/utilities";

export const createVouchers = createAsyncThunk(
  "users/createVouchers",
  async (data, { dispatch }) => {
    const payload = {
      command: data.command,
      amount: data.amount,
      voucher: {
        value: data.value,
        variant: data.variant,
      },
    };

    try {
      const response = await auth.privateRoute(
        `/api/vendors/${data.vendor}/vouchers`,
        {
          method: "POST",
          data: payload,
        }
      );
      const voucherResponse = await auth.privateRoute(
        `/api/vendors/${data.vendor.id}/vouchers`,
        { method: "GET" }
      );
      dispatch({
        type: "user/setVouchers",
        payload: voucherResponse.data.vouchers,
      });
      toastMessage([response.data.message], (status = "success"));
    } catch (error) {
      const message =
        error?.response?.data?.errors?.full_messages ||
        error.message + ". Please try again.";
      toastMessage([message]);
    }
  }
);

export const activateVoucher = createAsyncThunk(
  "users/activateVoucher",
  async (data, { dispatch }) => {
    const payload = {
      voucher: {
        command: "activate",
        email: data.email,
        activate_wallet: data["activate_wallet"],
        activate_pdf: data["activate_pdf"],
        pdf_options: {
          variant: data["pdf_variant"],
          language: data["pdf_language"],
        },
      },
    };
    try {
      const response = await auth.privateRoute(
        `/api/vendors/${data.vendor}/vouchers/${data.voucher}`,
        {
          method: "PUT",
          data: payload,
        }
      );
      const voucherResponse = await auth.privateRoute(
        `/api/vendors/${data.vendor.id}/vouchers`,
        { method: "GET" }
      );
      dispatch({
        type: "user/setVouchers",
        payload: voucherResponse.data.vouchers,
      });
      toastMessage([response.data.message], (status = "success"));
    } catch (error) {
      const message =
        error?.response?.data?.errors?.full_messages ||
        error.message + ". Please try again.";
      toastMessage([message]);
    }
  }
);

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
            ...response.data.voucher,
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
