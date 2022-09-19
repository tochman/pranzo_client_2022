import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import JtockAuth from "j-tockauth";
const auth = new JtockAuth({
  host: "http://localhost:3001",
  debug: false,
});
const getHeaders = () => {
  const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  return { ...headers };
};
const initialState = { currentUser: null };
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    const response = await auth.signUp(data);
    return response.data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.data;
    });
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
