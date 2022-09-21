import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastErrorMessage } from "../utilities/utilities";
import { auth } from "../utilities/authConfig";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, { dispatch }) => {
    try {
      const response = await auth.signUp(data);
      dispatch({ type: "user/setCurrentUser", payload: response.data });
      // return response.data;
    } catch (error) {
      toastErrorMessage(error.response.data.errors.full_messages);
      // return error.response.data;
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (params, { dispatch }) => {
    try {
      const response = await auth.signIn(params.email, params.password);
      dispatch({ type: "user/setCurrentUser", payload: response.data });
    } catch (error) {
      toastErrorMessage(error.response.data.errors);
    }
  }
);
