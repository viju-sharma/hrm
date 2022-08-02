import { createSlice } from "@reduxjs/toolkit";

const initialState = { open: false, dimmer: undefined };

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.dimmer = action.payload.dimmer;
    },
    closeModal: (state) => {
      state.open = false;
      state.dimmer = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
