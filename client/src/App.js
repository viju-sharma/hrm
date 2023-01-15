import React from "react";
import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { privateRequest } from "./utils/requestMethod";
import { login, logout } from "./features/auth-slice";

const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
const SignUpForm = lazy(() => import("./components/signup/SignUpForm"));

const AddEmployee = lazy(() => import("./pages/AddEmployees/AddEmployee"));
const AllEmployee = lazy(() => import("./pages/AllEmployee/AllEmployee"));
const Attendance = lazy(() => import("./pages/Attendence/Attendance"));

const VerifyAccount = lazy(() =>
  import("./pages/Verification/EmailVerification")
);

const PasswordRecovery = lazy(() =>
  import("./pages/PasswordRecovery/PasswordRecovery")
);

const Profile = lazy(() => import("./pages/Profile/Profile"));

const Home = lazy(() => import("./pages/Home/Home"));

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
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          n
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
      </Suspense>
    </div>
  );
}

export default App;
