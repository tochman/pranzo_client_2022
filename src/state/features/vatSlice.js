import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VatData } from "../../resources/VatData";

export const validateVat = createAsyncThunk(
  "vat/validateVat",
  async (vatNumber, { rejectWithValue }) => {
    try {
      const response = await VatData.validate_vat({org_number: vatNumber});
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const vatSlice = createSlice({
  name: "vat",
  initialState: {
    vatNumber: "",
    legalName: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateVat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validateVat.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vatNumber = action.payload.vat_number;
        state.legalName = action.payload.legal_name;
      })
      .addCase(validateVat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default vatSlice.reducer;
