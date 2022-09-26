import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentUser: null, authenticated: false, vendor: null, vouchers: [] };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.authenticated = true;
    },
    setVenue: (state, action) => {
      state.vendor = action.payload;
    },
    setVouchers: (state, action) => {
      state.vouchers = action.payload;
    },
    endSession: (state, action) => {
      state.currentUser = null
      state.vendor = null
      state.authenticated = false
    },
  },
});

export const { setCurrentUser, setVendor, setVouchers, endSession } = userSlice.actions;

export default userSlice.reducer;
