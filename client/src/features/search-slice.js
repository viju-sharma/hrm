import { createSlice } from "@reduxjs/toolkit";

const initialState = { search: "" };

export const searchValue = createSlice({
  name: "searchValue",
  initialState,
  reducers: {
    changeSearchValue: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { changeSearchValue } = searchValue.actions;
export default searchValue.reducer;
