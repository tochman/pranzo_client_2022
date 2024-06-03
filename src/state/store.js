import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import vatSlice from "./features/vatSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    vatData: vatSlice,
  },
});
