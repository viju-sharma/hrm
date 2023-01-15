import { createSlice } from "@reduxjs/toolkit";
import { privateRequest } from "../utils/requestMethod";
const initialState = { user: {} };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: async (state) => {
      await privateRequest
        .get("/api/user/getUserDetails")
        .then((result) => {
          console.log(result.data.user);
          state.user = result.data.user;
        })
        .catch((err) => console.log(err.response.data.message));
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "";
      privateRequest.post("/api/auth/logout");
    },
  },
});

export const { login, logout, getUser } = authSlice.actions;
export default authSlice.reducer;
