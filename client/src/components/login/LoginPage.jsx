import axios from "axios";
import React, { useState } from "react";
import "./loginpage.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth-slice";

const LoginPage = (props) => {
  const [isErr, setErr] = useState("");
  const dispatch = useDispatch();
  const user = props.user;
  const [initialValue, setValues] = useState({ email: "a@a.a", password: "a" });

  const handleChange = (e) => {
    setErr("");
    const name = e.target.name;
    const value = e.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  };

  let { email, password } = initialValue;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", initialValue)
      .then((response) => {
        response.status === 200 && dispatch(login(response.data.userId));
        sessionStorage.setItem("auth", `Bearer ${response.data.token}`);
      })
      .catch((err) => {
        setErr("error");
        setValues({ email: "", password: "" });
        console.log("from me " + err);
      });
  };
  if (!user) {
    return (
      <div className="ui segment placeholder" id="loginForm">
        {isErr && (
          <div className="ui error message">
            <div className="header">Incorrect Credentials</div>
            <p>Please check your email and Password</p>
          </div>
        )}
        <div className="ui form">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Username</label>
              <div className={`ui left icon input ${isErr}`}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <i className="user icon"></i>
              </div>
            </div>
            <div className="field">
              <label>Password</label>
              <div className={`ui left icon input ${isErr}`}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <i className="lock icon"></i>
              </div>
            </div>
            <button className="ui blue submit fluid button" type="submit">
              Login
            </button>
          </form>
        </div>
        <div className="ui horizontal divider">Or</div>
        <Link to="/signup">
          <div className="ui animated fade button" tabIndex="0">
            <div className="visible content">Don't have account ?</div>
            <div className="hidden content">Sign Up</div>
          </div>
        </Link>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default LoginPage;
