// adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "adminStatus",
  initialState: false,
  reducers: {
    adminStatus: (state, action) => {
      return action.payload;
    },

  },
});

export const { adminStatus } = adminSlice.actions;
export default adminSlice.reducer;
