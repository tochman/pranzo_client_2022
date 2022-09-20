import { createAsyncThunk } from "@reduxjs/toolkit";
import JtockAuth from "j-tockauth";
import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

const auth = new JtockAuth({
  host: "http://localhost:3001",
  debug: false,
});
export const getHeaders = () => {
  const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  return { ...headers };
};
const toastErrorMessage = (messages) => {
  messages.forEach((message) => {
    toast({
      title: message,
      status: "error",
    });
  });
};

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
