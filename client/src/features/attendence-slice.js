import { createSlice } from "@reduxjs/toolkit";

const initialState = { changed: false };

export const attendance_isChanged = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    isChanged: (state) => {
      state.changed = !state.changed;
    },
  },
});

export const { isChanged } = attendance_isChanged.actions;
export default attendance_isChanged.reducer;
