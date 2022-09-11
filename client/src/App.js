import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import LoginPage from "./components/login/LoginPage";
import SignUpForm from "./components/signup/SignUpForm";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./features/auth-slice";
import AddEmployee from "./components/private/AddEmployee";
import AllEmployee from "./components/private/AllEmployee";
import Attendance from "./components/attendence/Attendance";
import VerifyAccount from "./components/verification/EmailVerification";
function App() {
  const dispatch = useDispatch();

  let clientToken = sessionStorage.getItem("auth");
  if (clientToken) {
    axios
      .post("/auth/check", { authorization: clientToken })
      .then((response) => {
        dispatch(login(response.data.userId));
      })
      .catch((err) => {
        dispatch(logout());
      });
  }

  const absentIDs = useSelector((state) => state.absentIDs.IDs);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="App">
      <Routes>
        <Route path="/users/:id/verify/:token" element={<VerifyAccount />} />
        <Route
          path="/addEmployee"
          element={
            user ? <AddEmployee user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/employees"
          element={
            user ? <AllEmployee user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/attendance"
          element={
            user ? (
              <Attendance absentIDs={absentIDs} user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<LoginPage user={user} />} />
        <Route path="/signup" element={<SignUpForm user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
