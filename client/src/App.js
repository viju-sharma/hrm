import React from "react";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import LoginPage from "./components/login/LoginPage";
import SignUpForm from "./components/signup/SignUpForm";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./features/auth-slice";
import AddEmployee from "./components/private/AddEmployee";
import AllEmployee from "./components/private/AllEmployee";
import Attendance from "./components/attendence/Attendance";
import VerifyAccount from "./components/verification/EmailVerification";
import PasswordRecovery from "./components/PasswordRecovery/PasswordRecovery";
import { privateRequest } from "./utils/requestMethod";
import Profile from "./components/profile/Profile";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    privateRequest
      .post("/auth/check")
      .then((response) => {
        dispatch(login(response.data.userId));
      })
      .catch((err) => {
        dispatch(logout());
      });
    //eslint-disable-next-line
  }, []);

  const absentIDs = useSelector((state) => state.absentIDs.IDs);
  const userId = useSelector((state) => state.auth.user);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/addEmployee"
          element={
            userId ? <AddEmployee user={userId} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/employees"
          element={
            userId ? <AllEmployee user={userId} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={
            userId ? <Profile user={userId} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/"
          element={userId ? <Home user={userId} /> : <Navigate to="/login" />}
        />
        <Route
          path="/attendance"
          element={
            userId ? (
              <Attendance absentIDs={absentIDs} user={userId} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<LoginPage user={userId} />} />
        <Route path="/signup" element={<SignUpForm user={userId} />} />
        <Route path="/users/:id/verify/:token" element={<VerifyAccount />} />
        <Route
          path="/forgotPassword/:id/verify/:token/user/:email"
          element={<PasswordRecovery />}
        />
      </Routes>
    </div>
  );
}

export default App;
