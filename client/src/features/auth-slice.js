import { createSlice } from "@reduxjs/toolkit";
import { privateRequest } from "../utils/requestMethod";
const initialState = { user: "" };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "";
      privateRequest.post("auth/logout");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
