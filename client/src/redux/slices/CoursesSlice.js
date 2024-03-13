// courseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: [],
  reducers: {
    getCourses: (state, action) => {
      return action.payload;
    },

  },
});

export const { getCourses } = courseSlice.actions;
export default courseSlice.reducer;
