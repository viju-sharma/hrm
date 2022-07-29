import axios from "axios";
import React, { useState } from "react";
import "./loginpage.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth-slice";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const user = props.user
  const [initialValue, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
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
        console.log(err);
      });
  };
  if (!user) {
    return (
      <div className="ui segment placeholder" id="loginForm">
        <div className="ui form">
          <form>
            <div className="field">
              <label>Username</label>
              <div className="ui left icon input">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <i className="user icon"></i>
              </div>
            </div>
            <div className="field">
              <label>Password</label>
              <div className="ui left icon input">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
                <i className="lock icon"></i>
              </div>
            </div>
            <div className="ui blue submit button" onClick={handleSubmit}>
              Login
            </div>
          </form>
        </div>
        <div className="ui horizontal divider">Or</div>
        <Link to="/signup">
          <div className="middle aligned column">
            <div className="ui big button">
              <i className="signup icon"></i>
              Sign Up
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default LoginPage;
