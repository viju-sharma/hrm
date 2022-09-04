import { createSlice } from "@reduxjs/toolkit";

const initialState = { IDs: [] };

export const absentIDs = createSlice({
  name: "absentIDs",
  initialState,
  reducers: {
    addAbsentIDs: (state, action) => {
      state.IDs = action.payload;
    },
  },
});

export const { addAbsentIDs } = absentIDs.actions;
export default absentIDs.reducer;
