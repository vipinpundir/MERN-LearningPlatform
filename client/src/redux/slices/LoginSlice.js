// loginSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    loginCheck: (state, action) => {
      return action.payload;
    },
  },
});

export const { loginCheck } = loginSlice.actions;
export default loginSlice.reducer;
