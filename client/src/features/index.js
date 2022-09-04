import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import modalReducer from "./modal-slice";
import attendanceReducer from "./attendence-slice";
import absentIDsReducer from "./absent-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    attendance: attendanceReducer,
    absentIDs: absentIDsReducer,
  },
});

export default store;
