import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import LoginPage from "./components/login/LoginPage";
import SignUpForm from "./components/signup/SignUpForm";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./features/auth-slice";


function App() {
  const dispatch = useDispatch();

  let clientToken = sessionStorage.getItem("auth");
  if (clientToken) {
    axios
      .post("/auth/check", { authorization: clientToken })
      .then((response) => {
        dispatch(login(response.data.userId))
      });
  }

  const user = useSelector((state) => state.auth.user);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage user={user} />} />
        <Route path="/signup" element={<SignUpForm user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
