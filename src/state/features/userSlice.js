import {  createSlice } from "@reduxjs/toolkit";




const initialState = { currentUser: null, authenticated: false, vendor: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.authenticated = true;
    },
    setVendor: (state, action) => {
      state.vendor = action.payload;
    },
  },
});

export const { setCurrentUser, setVendor } = userSlice.actions;

export default userSlice.reducer;
